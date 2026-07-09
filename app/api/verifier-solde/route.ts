import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { sendBalancePaidOwnerEmail } from "@/app/lib/email";
import { villas } from "@/app/data/villa";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { sessionId } = (await request.json()) as { sessionId: string };
  if (!sessionId) {
    return NextResponse.json({ error: "Session manquante." }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    return NextResponse.json({ paid: false });
  }

  const reservationId = session.metadata?.reservation_id;
  if (!reservationId) {
    return NextResponse.json({ paid: true });
  }

  const { data: r } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("id", reservationId)
    .maybeSingle();

  if (!r) {
    return NextResponse.json({ paid: true });
  }

  const villaName = villas.find((v) => v.slug === r.villa_slug)?.name ?? r.villa_slug;

  if (r.balance_status === "paid") {
    return NextResponse.json({ paid: true, villaName });
  }

  const newAmountPaid = (Number(r.amount_paid) || 0) + (Number(r.balance) || 0);
  await supabaseAdmin
    .from("reservations")
    .update({
      balance_status: "paid",
      balance_paid_at: new Date().toISOString(),
      payment_status: "solde",
      amount_paid: newAmountPaid,
    })
    .eq("id", reservationId);

  try {
    await sendBalancePaidOwnerEmail({
      clientName: r.client_name || "",
      villaName,
      arrival: r.arrival,
      departure: r.departure,
      balance: Number(r.balance) || 0,
    });
  } catch (e) {
    console.error("Erreur envoi alerte solde regle :", e);
  }

  return NextResponse.json({ paid: true, villaName });
}
