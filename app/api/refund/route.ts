import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * POST : rembourse une partie (ou la totalité) de l'acompte d'une réservation.
 * Corps attendu : { id, amount }  (amount en euros)
 *
 * Retrouve le paiement Stripe via stripe_session_id, effectue le remboursement,
 * puis enregistre le montant remboursé cumulé et la date.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const { id, amount } = body;

  if (!id || amount === undefined || Number(amount) <= 0) {
    return NextResponse.json(
      { error: "Réservation ou montant invalide." },
      { status: 400 }
    );
  }

  // 1) Récupère la réservation
  const { data: reservation, error: fetchError } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !reservation) {
    return NextResponse.json({ error: "Réservation introuvable." }, { status: 404 });
  }

  const alreadyRefunded = Number(reservation.refunded_amount) || 0;
  const amountPaid = Number(reservation.amount_paid) || 0;

  // Ne pas rembourser plus que ce qui a été payé
  if (alreadyRefunded + Number(amount) > amountPaid + 0.001) {
    return NextResponse.json(
      {
        error: `Le total remboursé dépasserait l'acompte payé (${amountPaid.toFixed(
          2
        )} €). Déjà remboursé : ${alreadyRefunded.toFixed(2)} €.`,
      },
      { status: 400 }
    );
  }

  try {
    // 2) Retrouve le paiement (payment_intent) via la session Stripe
    const session = await stripe.checkout.sessions.retrieve(
      reservation.stripe_session_id
    );

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Paiement Stripe introuvable pour cette réservation." },
        { status: 400 }
      );
    }

    // 3) Effectue le remboursement (montant en centimes)
    await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: Math.round(Number(amount) * 100),
    });

    // 4) Enregistre le remboursement cumulé
    const newRefunded = Math.round((alreadyRefunded + Number(amount)) * 100) / 100;

    await supabaseAdmin
      .from("reservations")
      .update({
        refunded_amount: newRefunded,
        refunded_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ success: true, refunded_amount: newRefunded });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur lors du remboursement.";
    console.error("Erreur remboursement Stripe :", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}