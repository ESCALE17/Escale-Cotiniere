import Stripe from "stripe";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { sendCautionRequestEmail } from "@/app/lib/email";
import { villas } from "@/app/data/villa";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type GenerateCautionResult =
  | { ok: true; url: string }
  | { ok: false; error: string; status: number };

/**
 * Recupere le montant de caution par defaut depuis app_settings
 * (cle deposit_caution_amount). Retombe sur 800 si absent.
 */
async function getDefaultCautionAmount(): Promise<number> {
  try {
    const { data } = await supabaseAdmin
      .from("app_settings")
      .select("value")
      .eq("key", "deposit_caution_amount")
      .maybeSingle();
    const v = data ? Number(data.value) : NaN;
    return Number.isFinite(v) && v > 0 ? v : 800;
  } catch {
    return 800;
  }
}

/**
 * Genere le lien de paiement de la caution pour une reservation, enregistre
 * l'etat en base (caution_status = "requested") et envoie l'email au client
 * (avec copie au proprietaire en bcc).
 *
 * @param id       identifiant de la reservation
 * @param origin   origine du site pour construire les URLs de retour Stripe
 * @param amount   montant de la caution (optionnel). Si absent, on prend la
 *                 valeur par defaut de app_settings (deposit_caution_amount).
 */
export async function generateCautionPayment(
  id: string,
  origin: string,
  amount?: number
): Promise<GenerateCautionResult> {
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
  if (r.caution_status === "paid") {
    return { ok: false, error: "La caution est deja versee.", status: 400 };
  }
  if (r.caution_status === "refunded") {
    return { ok: false, error: "La caution a deja ete rendue.", status: 400 };
  }

  const cautionAmount =
    amount && amount > 0 ? amount : await getDefaultCautionAmount();
  if (cautionAmount <= 0) {
    return { ok: false, error: "Montant de caution invalide.", status: 400 };
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
            name: `Caution - ${villaName}`,
            description: `Caution pour le sejour du ${r.arrival} au ${r.departure}, restituee apres votre depart.`,
          },
          unit_amount: Math.round(cautionAmount * 100),
        },
      },
    ],
    metadata: { reservation_id: String(r.id), kind: "caution" },
    success_url: `${origin}/caution-confirme?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/caution-confirme?annule=1`,
  });

  await supabaseAdmin
    .from("reservations")
    .update({
      caution_status: "requested",
      caution_amount: cautionAmount,
      caution_stripe_session_id: session.id,
      caution_requested_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (r.client_email) {
    try {
      await sendCautionRequestEmail({
        clientName: r.client_name || "",
        clientEmail: r.client_email,
        villaName,
        arrival: r.arrival,
        departure: r.departure,
        caution: cautionAmount,
        paymentUrl: session.url!,
      });
    } catch (e) {
      console.error("Erreur envoi email demande de caution :", e);
    }
  }

  return { ok: true, url: session.url! };
}
