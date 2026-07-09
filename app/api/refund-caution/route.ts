import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * POST : rembourse une partie (ou la totalite) de la CAUTION d'une reservation.
 * Corps attendu : { id, amount }  (amount en euros)
 *
 * Retrouve le paiement de la caution via caution_stripe_session_id, effectue
 * le remboursement, enregistre le montant rendu cumule et la date. Si la
 * caution est entierement rendue, passe caution_status a "refunded".
 */
export async function POST(request: Request) {
  const body = await request.json();
  const { id, amount } = body;

  if (!id || amount === undefined || Number(amount) <= 0) {
    return NextResponse.json(
      { error: "Reservation ou montant invalide." },
      { status: 400 }
    );
  }

  const { data: reservation, error: fetchError } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !reservation) {
    return NextResponse.json({ error: "Reservation introuvable." }, { status: 404 });
  }

  if (reservation.caution_status !== "paid" && reservation.caution_status !== "refunded") {
    return NextResponse.json(
      { error: "La caution n'a pas ete versee." },
      { status: 400 }
    );
  }

  const cautionAmount = Number(reservation.caution_amount) || 0;
  const alreadyRefunded = Number(reservation.caution_refunded_amount) || 0;

  // Ne pas rendre plus que la caution versee
  if (alreadyRefunded + Number(amount) > cautionAmount + 0.001) {
    return NextResponse.json(
      {
        error: `Le total rendu depasserait la caution versee (${cautionAmount.toFixed(
          2
        )} €). Deja rendu : ${alreadyRefunded.toFixed(2)} €.`,
      },
      { status: 400 }
    );
  }

  if (!reservation.caution_stripe_session_id) {
    return NextResponse.json(
      { error: "Paiement de caution introuvable pour cette reservation." },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(
      reservation.caution_stripe_session_id
    );

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Paiement Stripe introuvable pour cette caution." },
        { status: 400 }
      );
    }

    await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: Math.round(Number(amount) * 100),
    });

    const newRefunded = Math.round((alreadyRefunded + Number(amount)) * 100) / 100;

    // Si toute la caution est rendue, on passe le statut a "refunded"
    const fullyRefunded = newRefunded >= cautionAmount - 0.001;

    await supabaseAdmin
      .from("reservations")
      .update({
        caution_refunded_amount: newRefunded,
        caution_refunded_at: new Date().toISOString(),
        caution_status: fullyRefunded ? "refunded" : "paid",
      })
      .eq("id", id);

    return NextResponse.json({
      success: true,
      caution_refunded_amount: newRefunded,
      caution_status: fullyRefunded ? "refunded" : "paid",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur lors du remboursement.";
    console.error("Erreur remboursement caution Stripe :", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
