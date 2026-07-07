import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export type ReservationInput = {
  stripeSessionId: string;
  villaSlug: string;
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  babies: number;
  pet: boolean;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  total: number;
  deposit: number;
  balance: number;
  amountPaid: number;
  touristTax: number;
  lang: string;
};

/**
 * Enregistre une réservation payée dans la base.
 * Grâce à la contrainte "unique" sur stripe_session_id, si la réservation
 * existe déjà (page rafraîchie), l'insertion est simplement ignorée
 * sans créer de doublon ni provoquer d'erreur bloquante.
 *
 * Bloque aussi automatiquement les dates du séjour dans le calendrier.
 */
export async function saveReservation(input: ReservationInput): Promise<void> {
  // 1) Enregistrer la réservation
  const { error, data } = await supabaseAdmin
    .from("reservations")
    .insert({
      stripe_session_id: input.stripeSessionId,
      villa_slug: input.villaSlug,
      arrival: input.arrival,
      departure: input.departure,
      adults: input.adults,
      children: input.children,
      babies: input.babies,
      pet: input.pet,
      client_name: input.clientName,
      client_email: input.clientEmail,
      client_phone: input.clientPhone,
      client_address: input.clientAddress,
      total: input.total,
      deposit: input.deposit,
      balance: input.balance,
      amount_paid: input.amountPaid,
      tourist_tax: input.touristTax,
      lang: input.lang,
    })
    .select()
    .maybeSingle();

  // Code 23505 = doublon (déjà enregistré) : ce n'est pas une vraie erreur.
  if (error && error.code !== "23505") {
    console.error("Erreur enregistrement réservation :", error.message);
    return;
  }

  // Si data est null, la réservation existait déjà : on ne bloque pas 2 fois.
  if (!data) return;

  // 2) Bloquer automatiquement les dates du séjour dans le calendrier
  const { error: blockError } = await supabaseAdmin
    .from("blocked_dates")
    .insert({
      villa_slug: input.villaSlug,
      start_date: input.arrival,
      end_date: input.departure,
      reason: `Réservation directe – ${input.clientName}`,
      source: "reservation",
    });

  if (blockError) {
    console.error("Erreur blocage auto des dates :", blockError.message);
  }
}