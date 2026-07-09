import Stripe from "stripe";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { sendBalanceRequestEmail } from "@/app/lib/email";
import { villas } from "@/app/data/villa";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type GenerateBalanceResult =
  | { ok: true; url: string }
  | { ok: false; error: string; status: number };

/**
 * Génère le lien de paiement du solde pour une réservation, enregistre
 * l'état en base (balance_status = "requested") et envoie l'email au
 * client (avec copie au propriétaire en bcc).
 *
 * Utilisé à la fois par le bouton manuel de l'admin (/api/checkout-solde)
 * et par le rappel automatique à J-30 (cron dans /api/sync-ical).
 *
 * @param id      identifiant de la réservation
 * @param origin  origine du site (ex. https://escalealacotiniere.fr) pour
 *                construire les URLs de retour Stripe
 */
export async function generateBalancePayment(
  id: string,
  origin: string
): Promise<GenerateBalanceResult> {
  const { data: r, error } = await supabaseAdmin
    .from("reservations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !r) {
    return { ok: false, error: "Reservation introuvable.", status: 404 };
  }
  if (r.status === "cancelled") {
    return { ok: false, error: "Reservation annulee.", status: 400 };
  }
  if (r.balance_status === "paid") {
    return { ok: false, error: "Le solde est deja regle.", status: 400 };
  }
  const balance = Number(r.balance) || 0;
  if (balance <= 0) {
    return { ok: false, error: "Aucun solde a regler.", status: 400 };
  }

  const villa = villas.find((v) => v.slug === r.villa_slug);
  const villaName = villa?.name ?? r.villa_slug;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: r.client_email || undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          product_data: {
            name: `Solde du sejour - ${villaName}`,
            description: `Reglement du solde pour le sejour du ${r.arrival} au ${r.departure}`,
          },
          unit_amount: Math.round(balance * 100),
        },
      },
    ],
    metadata: { reservation_id: String(r.id), kind: "solde" },
    success_url: `${origin}/solde-confirme?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/solde-confirme?annule=1`,
  });

  await supabaseAdmin
    .from("reservations")
    .update({
      balance_status: "requested",
      balance_stripe_session_id: session.id,
      balance_requested_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (r.client_email) {
    try {
      await sendBalanceRequestEmail({
        clientName: r.client_name || "",
        clientEmail: r.client_email,
        villaName,
        arrival: r.arrival,
        departure: r.departure,
        balance,
        paymentUrl: session.url!,
      });
    } catch (e) {
      console.error("Erreur envoi email demande de solde :", e);
    }
  }

  return { ok: true, url: session.url! };
}
