import { Resend } from "resend";
import { generateContractPdfBuffer } from "@/app/lib/contract";

const FROM_ADDRESS = "Escale à La Cotinière <contact@escalealacotiniere.fr>";
const OWNER_NOTIFICATION_ADDRESS = "contact@escalealacotiniere.fr";

export type PanierLigne = { nom: string; quantite: number };
export type BookingConfirmationEmailParams = {
  panierItems?: PanierLigne[];
  villaName: string;
  villaSlug: string;
  arrival: string;
  departure: string;
  nights: number;
  pricePerNight?: number;
  stayPrice?: number;
  cleaningFee?: number;
  linenFee?: number;
  petFee?: number;
  touristTax?: number;
  adults: number;
  children: number;
  babies: number;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  clientPhone?: string;
  total: number;
  deposit: number;
  balance: number;
  amountPaid: number;
  locale?: "fr" | "en" | "de" | "es";
};

const emailLabels = {
  fr: {
    subject: "Confirmation de votre réservation",
    title: "Votre réservation est confirmée",
    greeting: "Bonjour",
    intro: (villa: string) =>
      `Merci, nous avons bien reçu votre acompte pour votre séjour à « ${villa} ». Voici le récapitulatif de votre réservation :`,
    stay: "Séjour",
    travelers: "Voyageurs",
    travelersValue: (a: number, c: number, b: number) =>
      `${a} adulte(s), ${c} enfant(s), ${b} bébé(s)`,
    total: "Total du séjour",
    depositPaid: "Acompte réglé",
    balance: "Solde restant (à J-30)",
    touristTax: (amount: string) =>
      `+ Taxe de séjour de ${amount} €, à régler sur place à votre arrivée (non incluse dans les montants ci-dessus).`,
    attachment: "Vous trouverez votre contrat de location en pièce jointe de ce mail.",
    panierTitre: "Votre panier d'accueil vous attend à votre arrivée :",
    signOff: "À très bientôt à La Cotinière !",
    nightsSuffix: (n: number) => (n > 1 ? "nuits" : "nuit"),
  },
  en: {
    subject: "Confirmation of your booking",
    title: "Your booking is confirmed",
    greeting: "Hello",
    intro: (villa: string) =>
      `Thank you, we have received your deposit for your stay at "${villa}". Here is the summary of your booking:`,
    stay: "Stay",
    travelers: "Guests",
    travelersValue: (a: number, c: number, b: number) =>
      `${a} adult(s), ${c} child(ren), ${b} baby/babies`,
    total: "Total stay cost",
    depositPaid: "Deposit paid",
    balance: "Balance due (at D-30)",
    touristTax: (amount: string) =>
      `+ Tourist tax of €${amount}, payable on site upon arrival (not included in the amounts above).`,
    attachment: "You will find your rental contract attached to this email.",
    panierTitre: "Your welcome basket will be waiting for you on arrival:",
    signOff: "See you soon at La Cotinière!",
    nightsSuffix: (n: number) => (n > 1 ? "nights" : "night"),
  },
  de: {
    subject: "Bestätigung Ihrer Reservierung",
    title: "Ihre Reservierung ist bestätigt",
    greeting: "Hallo",
    intro: (villa: string) =>
      `Vielen Dank, wir haben Ihre Anzahlung für Ihren Aufenthalt in „${villa}“ erhalten. Hier die Zusammenfassung Ihrer Reservierung:`,
    stay: "Aufenthalt",
    travelers: "Gäste",
    travelersValue: (a: number, c: number, b: number) =>
      `${a} Erwachsene(r), ${c} Kind(er), ${b} Baby/Babys`,
    total: "Gesamtpreis des Aufenthalts",
    depositPaid: "Bezahlte Anzahlung",
    balance: "Restbetrag (fällig D-30)",
    touristTax: (amount: string) =>
      `+ Kurtaxe von ${amount} €, vor Ort bei Ankunft zu zahlen (in den obigen Beträgen nicht enthalten).`,
    attachment: "Ihren Mietvertrag finden Sie im Anhang dieser E-Mail.",
    panierTitre: "Ihr Willkommenskorb erwartet Sie bei Ihrer Ankunft:",
    signOff: "Bis bald in La Cotinière!",
    nightsSuffix: () => "Nacht/Nächte",
  },
  es: {
    subject: "Confirmación de su reserva",
    title: "Su reserva está confirmada",
    greeting: "Hola",
    intro: (villa: string) =>
      `Gracias, hemos recibido su depósito para su estancia en «${villa}». Aquí tiene el resumen de su reserva:`,
    stay: "Estancia",
    travelers: "Huéspedes",
    travelersValue: (a: number, c: number, b: number) =>
      `${a} adulto(s), ${c} niño(s), ${b} bebé(s)`,
    total: "Total de la estancia",
    depositPaid: "Depósito pagado",
    balance: "Saldo pendiente (D-30)",
    touristTax: (amount: string) =>
      `+ Tasa turística de ${amount} €, a pagar in situ a su llegada (no incluida en los importes anteriores).`,
    attachment: "Encontrará su contrato de alquiler adjunto a este correo.",
    panierTitre: "Su cesta de bienvenida le espera a su llegada:",
    signOff: "¡Hasta pronto en La Cotinière!",
    nightsSuffix: (n: number) => (n > 1 ? "noches" : "noche"),
  },
};

/**
 * Envoie le mail de confirmation de réservation au client (avec le contrat
 * en pièce jointe) et une copie de notification au propriétaire.
 * N'est appelé qu'une fois le paiement Stripe vérifié comme réellement payé.
 */
export async function sendBookingConfirmationEmail(
  params: BookingConfirmationEmailParams
) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error(
      "RESEND_API_KEY manquant : impossible d'envoyer le mail de confirmation."
    );
    return { sent: false, reason: "missing_api_key" as const };
  }

  const resend = new Resend(apiKey);
  const locale = params.locale ?? "fr";
  const M = emailLabels[locale];

  const contractBuffer = await generateContractPdfBuffer({
    villaSlug: params.villaSlug,
    clientName: params.clientName,
    clientAddress: params.clientAddress,
    clientPhone: params.clientPhone,
    arrival: params.arrival,
    departure: params.departure,
    total: params.total,
    deposit: params.deposit,
    nights: params.nights,
    pricePerNight: params.pricePerNight,
    stayPrice: params.stayPrice,
    cleaningFee: params.cleaningFee,
    linenFee: params.linenFee,
    petFee: params.petFee,
    touristTax: params.touristTax,
    locale: params.locale,
  });

  const html = `<meta charset="utf-8" />
    <div style="font-family: Arial, Helvetica, sans-serif; color: #082f3a; max-width: 600px; margin: 0 auto;">
      <img
        src="https://escalealacotiniere.fr/images/logo.png"
        alt="Escale à La Cotinière"
        width="100"
        style="display: block; margin: 0 auto 20px; width: 100px; height: auto;"
      />
      <h1 style="font-size: 22px;">${M.title}</h1>
      <p>${M.greeting} ${params.clientName || ""},</p>
      <p>${M.intro(params.villaName)}</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 6px 0;"><strong>${M.stay}</strong></td>
          <td style="padding: 6px 0;">${params.arrival} → ${params.departure} (${params.nights} ${M.nightsSuffix(params.nights)})</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>${M.travelers}</strong></td>
          <td style="padding: 6px 0;">${M.travelersValue(params.adults, params.children, params.babies)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>${M.total}</strong></td>
          <td style="padding: 6px 0;">${params.total.toFixed(2)} €</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>${M.depositPaid}</strong></td>
          <td style="padding: 6px 0;">${params.amountPaid.toFixed(2)} €</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>${M.balance}</strong></td>
          <td style="padding: 6px 0;">${params.balance.toFixed(2)} €</td>
        </tr>
      </table>
      <p style="font-size: 14px;">
        ${M.touristTax((params.touristTax ?? 0).toFixed(2))}
      </p>
      ${(params.panierItems && params.panierItems.length > 0) ? `<div style="border: 1px solid #e0d6c4; background: #faf6ee; border-radius: 12px; padding: 16px 20px; margin: 20px 0;"><p style="margin: 0 0 8px; font-weight: bold;">