import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { sendPaymentRefundEmail } from "@/app/lib/email";
import { villas } from "@/app/data/villa";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * POST : rembourse une partie (ou la totalité) de l'acompte d'une réservation.
 * Corps attendu : { id, amount, reason? }  (amount en euros)
 *
 * Retrouve le paiement Stripe via stripe_session_id, effectue le remboursement,
 * enregistre le montant remboursé cumulé et la date, puis envoie un email au
 * client avec le motif saisi.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const { id, amount, reason } = body;

  if (!id || amount === undefined || Number(amount) <= 0) {
    return NextResponse.json(
      { error: "Réservation ou montant invalide." },
      { status: 400 }
    );
  }

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

    await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: Math.round(Number(amount) * 100),
    });

    const newRefunded = Math.round((alreadyRefunded + Number(amount)) * 100) / 100;

    await supabaseAdmin
      .from("reservations")
      .update({
        refunded_amount: newRefunded,
        refunded_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (reservation.client_email) {
      const villaName =
        villas.find((v) => v.slug === reservation.villa_slug)?.name ??
        reservation.villa_slug;
      try {
        await sendPaymentRefundEmail({
          clientName: reservation.client_name || "",
          clientEmail: reservation.client_email,
          villaName,
          refundedAmount: Number(amount),
          reason: reason?.trim() || undefined,
        });
      } catch (e) {
        console.error("Erreur envoi email remboursement :", e);
      }
    }

    return NextResponse.json({ success: true, refunded_amount: newRefunded });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur lors du remboursement.";
    console.error("Erreur remboursement Stripe :", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
