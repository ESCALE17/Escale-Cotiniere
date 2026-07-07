import Stripe from "stripe";
import { computePricing } from "@/app/lib/pricing";
import { sendBookingConfirmationEmail } from "@/app/lib/email";
import { saveReservation } from "@/app/lib/reservations";
import { getSettings } from "@/app/lib/getSettings";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import ConfirmationView from "./ConfirmationView";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type SearchParams = { [key: string]: string | string[] | undefined };

function getParam(searchParams: SearchParams, key: string): string {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sessionId = getParam(params, "session_id");

  if (!sessionId) {
    return <ConfirmationView state="no-session" />;
  }

  let session: Stripe.Checkout.Session | null = null;
  let fetchError = false;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    fetchError = true;
  }

  const paid = session?.payment_status === "paid";

  if (fetchError || !session || !paid) {
    return (
      <ConfirmationView
        state="not-paid"
        fetchError={fetchError}
        sessionId={sessionId}
      />
    );
  }

  const villaSlug = getParam(params, "villa");
  const arrival = getParam(params, "arrival");
  const departure = getParam(params, "departure");
  const adults = Number(getParam(params, "adults") || 0);
  const children = Number(getParam(params, "children") || 0);
  const babies = Number(getParam(params, "babies") || 0);
  const pet = getParam(params, "pet");
  const nom = getParam(params, "nom");
  const prenom = getParam(params, "prenom");
  const email = getParam(params, "email");
  const telephone = getParam(params, "telephone");
  const adresse = getParam(params, "adresse");
  const codePostal = getParam(params, "codePostal");
  const ville = getParam(params, "ville");
  const pays = getParam(params, "pays");
  const lang = getParam(params, "lang") || "fr";

  const clientAddress = [adresse, [codePostal, ville].filter(Boolean).join(" "), pays]
    .filter(Boolean)
    .join(", ");

  // Lit les paramètres ET les périodes tarifaires de la villa depuis la base
  const appSettings = await getSettings();

  const { data: periodsData } = await supabaseAdmin
    .from("pricing_periods")
    .select("start_date, end_date, price_per_night, weekly_discount_percent")
    .eq("villa_slug", villaSlug)
    .order("start_date", { ascending: true });

  const periods = periodsData ?? [];

  const pricing = computePricing(
    {
      villaSlug,
      arrival,
      departure,
      adults,
      children,
      babies,
      pet: pet === "oui",
    },
    appSettings,
    periods
  );

  const amountPaid = (session.amount_total ?? 0) / 100;
  const clientName = `${prenom} ${nom}`.trim() || "Client";

  // Enregistre la réservation en base (anti-doublon via l'id de session Stripe).
  // Bloque aussi automatiquement les dates du séjour dans le calendrier.
  await saveReservation({
    stripeSessionId: sessionId,
    villaSlug,
    arrival,
    departure,
    adults,
    children,
    babies,
    pet: pet === "oui",
    clientName,
    clientEmail: email,
    clientPhone: telephone,
    clientAddress,
    total: pricing.total,
    deposit: pricing.deposit,
    balance: pricing.balance,
    amountPaid,
    touristTax: pricing.touristTax,
    lang,
  });

  const contractUrl = "/api/contract?villa=" + encodeURIComponent(villaSlug) +
    "&client=" + encodeURIComponent(clientName) +
    "&address=" + encodeURIComponent(clientAddress) +
    "&phone=" + encodeURIComponent(telephone) +
    "&arrival=" + encodeURIComponent(arrival) +
    "&departure=" + encodeURIComponent(departure) +
    "&total=" + pricing.total +
    "&deposit=" + pricing.deposit +
    "&nights=" + pricing.nights +
    "&pricePerNight=" + pricing.pricePerNight +
    "&stayPrice=" + pricing.stayPrice +
    "&cleaningFee=" + pricing.cleaningFee +
    "&linenFee=" + pricing.linenFee +
    "&petFee=" + pricing.petFee +
    "&touristTax=" + pricing.touristTax +
    "&lang=" + lang;

  let emailSent = false;
  const alreadySent = session.metadata?.email_sent === "true";

  if (alreadySent) {
    emailSent = true;
  } else if (email) {
    const emailResult = await sendBookingConfirmationEmail({
      villaName: pricing.villa?.name ?? villaSlug,
      villaSlug: villaSlug,
      arrival: arrival,
      departure: departure,
      nights: pricing.nights,
      pricePerNight: pricing.pricePerNight,
      stayPrice: pricing.stayPrice,
      cleaningFee: pricing.cleaningFee,
      linenFee: pricing.linenFee,
      petFee: pricing.petFee,
      touristTax: pricing.touristTax,
      adults: adults,
      children: children,
      babies: babies,
      clientName: clientName,
      clientEmail: email,
      clientAddress: clientAddress,
      clientPhone: telephone,
      total: pricing.total,
      deposit: pricing.deposit,
      balance: pricing.balance,
      amountPaid: amountPaid,
      locale: lang,
    });

    emailSent = emailResult.sent;

    if (emailSent) {
      try {
        await stripe.checkout.sessions.update(sessionId, {
          metadata: { ...session.metadata, email_sent: "true" },
        });
      } catch (error) {
        console.error("Impossible de marquer la session comme mail envoyé :", error);
      }
    }
  }

  return (
    <ConfirmationView
      state="paid"
      prenom={prenom}
      amountPaid={amountPaid}
      villaName={pricing.villa?.name ?? villaSlug}
      arrival={arrival}
      departure={departure}
      total={pricing.total}
      balance={pricing.balance}
      touristTax={pricing.touristTax}
      emailSent={emailSent}
      email={email}
      contractUrl={contractUrl}
    />
  );
}