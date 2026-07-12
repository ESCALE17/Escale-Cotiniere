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
 * Gère le cas où le séjour a été payé en DEUX fois (acompte + solde) :
 * le remboursement est réparti d'abord sur le paiement de l'acompte,
 * puis sur le paiement du solde si le montant demandé dépasse l'acompte.
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
  const amountNum = Number(amount);
  if (alreadyRefunded + amountNum > amountPaid + 0.001) {
    return NextResponse.json(
      {
        error: `Le total remboursé dépasserait le montant payé (${amountPaid.toFixed(
          2
        )} €). Déjà remboursé : ${alreadyRefunded.toFixed(2)} €.`,
      },
      { status: 400 }
    );
  }

  // Récupère le montant déjà remboursé (en centimes) sur un payment_intent donné,
  // pour savoir combien il reste de remboursable dessus.
  async function refundableCentsOf(paymentIntentId: string): Promise<number> {
    try {
      const pi = await stripe.paymentIntents.retrieve(paymentIntentId, {
        expand: ["latest_charge"],
      });
      const charge = pi.latest_charge as Stripe.Charge | null;
      if (!charge) return 0;
      const captured = charge.amount_captured ?? charge.amount ?? 0;
      const refunded = charge.amount_refunded ?? 0;
      return Math.max(0, captured - refunded);
    } catch {
      return 0;
    }
  }

  // Récupère le payment_intent d'une session Stripe (ou null).
  async function paymentIntentOfSession(
    sessionId: string | null | undefined
  ): Promise<string | null> {
    if (!sessionId) return null;
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const pi =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id;
      return pi ?? null;
    } catch {
      return null;
    }
  }

  try {
    // Les deux paiements possibles : acompte (session initiale) et solde.
    const acomptePi = await paymentIntentOfSession(reservation.stripe_session_id);
    const soldePi = await paymentIntentOfSession(
      reservation.balance_stripe_session_id
    );

    if (!acomptePi && !soldePi) {
      return NextResponse.json(
        { error: "Paiement Stripe introuvable pour cette réservation." },
        { status: 400 }
      );
    }

    // Montant total à rembourser, en centimes.
    let remainingCents = Math.round(amountNum * 100);

    // On rembourse d'abord sur l'acompte, puis sur le solde.
    const targets: string[] = [];
    if (acomptePi) targets.push(acomptePi);
    if (soldePi && soldePi !== acomptePi) targets.push(soldePi);

    let totalRefundedCents = 0;
    for (const pi of targets) {
      if (remainingCents <= 0) break;
      const availableCents = await refundableCentsOf(pi);
      if (availableCents <= 0) continue;
      const toRefund = Math.min(remainingCents, availableCents);
      if (toRefund <= 0) continue;
      await stripe.refunds.create({ payment_intent: pi, amount: toRefund });
      remainingCents -= toRefund;
      totalRefundedCents += toRefund;
    }

    if (totalRefundedCents <= 0) {
      return NextResponse.json(
        {
          error:
            "Aucun montant n'a pu être remboursé (paiements déjà remboursés ?).",
        },
        { status: 400 }
      );
    }

    const actuallyRefunded = totalRefundedCents / 100;
    const newRefunded =
      Math.round((alreadyRefunded + actuallyRefunded) * 100) / 100;
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
          refundedAmount: actuallyRefunded,
          reason: reason?.trim() || undefined,
        });
      } catch (e) {
        console.error("Erreur envoi email remboursement :", e);
      }
    }
    return NextResponse.json({
      success: true,
      refunded_amount: newRefunded,
      refunded_now: actuallyRefunded,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erreur lors du remboursement.";
    console.error("Erreur remboursement Stripe :", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
