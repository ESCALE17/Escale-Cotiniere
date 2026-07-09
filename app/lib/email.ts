import { Resend } from "resend";
import { generateContractPdfBuffer } from "@/app/lib/contract";

const FROM_ADDRESS = "Escale à La Cotinière <contact@escalealacotiniere.fr>";
const OWNER_NOTIFICATION_ADDRESS = "contact@escalealacotiniere.fr";

export type BookingConfirmationEmailParams = {
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

  const html = `
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
      <p>${M.attachment}</p>
      <p>${M.signOff}</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: params.clientEmail,
      bcc: OWNER_NOTIFICATION_ADDRESS,
      subject: `${M.subject} — ${params.villaName}`,
      html,
      attachments: [
        {
          filename: `contrat-${params.villaSlug}.pdf`,
          content: contractBuffer,
        },
      ],
    });

    return { sent: true as const };
  } catch (error) {
    console.error("Échec de l'envoi du mail de confirmation :", error);
    return { sent: false, reason: "send_error" as const };
  }
}

/**
 * Envoie une alerte au propriétaire (contact@escalealacotiniere.fr)
 * à chaque nouvelle réservation payée.
 */
export async function sendOwnerNotificationEmail(
  params: BookingConfirmationEmailParams
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante pour l'alerte propriétaire.");
    return { sent: false, reason: "no_api_key" };
  }

  const resend = new Resend(apiKey);

  const petText = params.petFee && params.petFee > 0 ? "oui" : "non";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #082f3a;">
      <h2 style="color: #082f3a;">🔔 Nouvelle réservation</h2>
      <p style="font-size: 16px;">Une réservation vient d'être payée sur le site.</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Villa</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.villaName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Séjour</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.arrival} → ${params.departure} (${params.nights} nuit(s))</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Voyageurs</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.adults} adulte(s), ${params.children} enfant(s), ${params.babies} bébé(s) — animal : ${petText}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Client</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.clientName ?? "—"}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.clientEmail}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Téléphone</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.clientPhone ?? "—"}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Adresse</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.clientAddress ?? "—"}</td></tr>
        <tr><td style="padding: 8px;"><strong>Total séjour</strong></td><td style="padding: 8px; text-align: right;">${params.total.toFixed(2)} €</td></tr>
        <tr><td style="padding: 8px;"><strong>Acompte payé</strong></td><td style="padding: 8px; text-align: right; color: #15803d;">${params.amountPaid.toFixed(2)} €</td></tr>
        <tr><td style="padding: 8px;"><strong>Solde restant</strong></td><td style="padding: 8px; text-align: right;">${params.balance.toFixed(2)} €</td></tr>
      </table>

      <p style="margin-top: 20px; font-size: 14px; color: #8a755d;">
        Retrouvez le détail dans votre espace d'administration.
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_NOTIFICATION_ADDRESS,
      subject: `Nouvelle réservation — ${params.villaName} (${params.arrival} → ${params.departure})`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Échec de l'envoi de l'alerte propriétaire :", error);
    return { sent: false, reason: "send_error" };
  }
}

// ============ RÈGLEMENT DU SOLDE ============

/**
 * Envoie au client le lien de règlement de son solde (avec copie au
 * propriétaire en bcc). Appelé depuis /api/checkout-solde.
 */
export async function sendBalanceRequestEmail(params: {
  clientName: string;
  clientEmail: string;
  villaName: string;
  arrival: string;
  departure: string;
  balance: number;
  paymentUrl: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante pour la demande de solde.");
    return { sent: false, reason: "no_api_key" };
  }
  const resend = new Resend(apiKey);
  const { clientName, clientEmail, villaName, arrival, departure, balance, paymentUrl } = params;
  const fmt = (d: string) => {
    const [y, m, j] = d.split("-");
    return `${j}/${m}/${y}`;
  };
  const html = `
    <div style="font-family:Arial,sans-serif;color:#082f3a;max-width:560px;margin:auto">
      <h2 style="color:#082f3a">Règlement du solde de votre séjour</h2>
      <p>Bonjour ${clientName},</p>
      <p>Votre séjour à <strong>${villaName}</strong> approche (du ${fmt(arrival)} au ${fmt(departure)}).</p>
      <p>Il vous reste à régler le solde de <strong>${balance.toFixed(2)} €</strong> pour finaliser votre réservation.</p>
      <p style="text-align:center;margin:32px 0">
        <a href="${paymentUrl}" style="background:#082f3a;color:#fff;padding:14px 28px;border-radius:9999px;text-decoration:none;font-weight:bold">Régler mon solde en ligne</a>
      </p>
      <p style="font-size:13px;color:#8a755d">Paiement sécurisé par carte bancaire via Stripe. Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>${paymentUrl}</p>
      <p>À très bientôt,<br>Escale à La Cotinière</p>
    </div>`;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: clientEmail,
      bcc: OWNER_NOTIFICATION_ADDRESS,
      subject: `Règlement du solde – ${villaName}`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Échec de l'envoi de la demande de solde :", error);
    return { sent: false, reason: "send_error" };
  }
}

/**
 * Alerte le propriétaire quand un client a réglé son solde.
 * Appelé depuis /api/verifier-solde une fois le paiement confirmé.
 */
export async function sendBalancePaidOwnerEmail(params: {
  clientName: string;
  villaName: string;
  arrival: string;
  departure: string;
  balance: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante pour l'alerte solde réglé.");
    return { sent: false, reason: "no_api_key" };
  }
  const resend = new Resend(apiKey);
  const { clientName, villaName, arrival, departure, balance } = params;
  const fmt = (d: string) => {
    const [y, m, j] = d.split("-");
    return `${j}/${m}/${y}`;
  };
  const html = `
    <div style="font-family:Arial,sans-serif;color:#082f3a">
      <h2>✅ Solde réglé</h2>
      <p><strong>${clientName}</strong> vient de régler son solde.</p>
      <ul>
        <li>Villa : <strong>${villaName}</strong></li>
        <li>Séjour : du ${fmt(arrival)} au ${fmt(departure)}</li>
        <li>Montant réglé : <strong>${balance.toFixed(2)} €</strong></li>
      </ul>
    </div>`;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_NOTIFICATION_ADDRESS,
      subject: `✅ Solde réglé – ${clientName} (${villaName})`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Échec de l'envoi de l'alerte solde réglé :", error);
    return { sent: false, reason: "send_error" };
  }
}

// ============ CAUTION ============

/**
 * Envoie au client le lien de paiement de sa caution (avec copie au
 * proprietaire en bcc). Appele depuis /api/checkout-caution.
 */
export async function sendCautionRequestEmail(params: {
  clientName: string;
  clientEmail: string;
  villaName: string;
  arrival: string;
  departure: string;
  caution: number;
  paymentUrl: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante pour la demande de caution.");
    return { sent: false, reason: "no_api_key" };
  }
  const resend = new Resend(apiKey);
  const { clientName, clientEmail, villaName, arrival, departure, caution, paymentUrl } = params;
  const fmt = (d: string) => {
    const [y, m, j] = d.split("-");
    return `${j}/${m}/${y}`;
  };
  const html = `
    <div style="font-family:Arial,sans-serif;color:#082f3a;max-width:560px;margin:auto">
      <h2 style="color:#082f3a">Caution de votre sejour</h2>
      <p>Bonjour ${clientName},</p>
      <p>Dans le cadre de votre sejour a <strong>${villaName}</strong> (du ${fmt(arrival)} au ${fmt(departure)}), nous vous demandons le versement d'une caution de <strong>${caution.toFixed(2)} €</strong>.</p>
      <p>Cette caution vous sera <strong>integralement restituee apres votre depart</strong>, sous reserve de l'etat des lieux de sortie.</p>
      <p style="text-align:center;margin:32px 0">
        <a href="${paymentUrl}" style="background:#082f3a;color:#fff;padding:14px 28px;border-radius:9999px;text-decoration:none;font-weight:bold">Verser ma caution en ligne</a>
      </p>
      <p style="font-size:13px;color:#8a755d">Paiement securise par carte bancaire via Stripe. Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>${paymentUrl}</p>
      <p>A tres bientot,<br>Escale a La Cotiniere</p>
    </div>`;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: clientEmail,
      bcc: OWNER_NOTIFICATION_ADDRESS,
      subject: `Caution - ${villaName}`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Echec de l'envoi de la demande de caution :", error);
    return { sent: false, reason: "send_error" };
  }
}

/**
 * Alerte le proprietaire quand un client a verse sa caution.
 * Appele depuis /api/verifier-caution une fois le paiement confirme.
 */
export async function sendCautionPaidOwnerEmail(params: {
  clientName: string;
  villaName: string;
  arrival: string;
  departure: string;
  caution: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante pour l'alerte caution versee.");
    return { sent: false, reason: "no_api_key" };
  }
  const resend = new Resend(apiKey);
  const { clientName, villaName, arrival, departure, caution } = params;
  const fmt = (d: string) => {
    const [y, m, j] = d.split("-");
    return `${j}/${m}/${y}`;
  };
  const html = `
    <div style="font-family:Arial,sans-serif;color:#082f3a">
      <h2>Caution versee</h2>
      <p><strong>${clientName}</strong> vient de verser sa caution.</p>
      <ul>
        <li>Villa : <strong>${villaName}</strong></li>
        <li>Sejour : du ${fmt(arrival)} au ${fmt(departure)}</li>
        <li>Montant : <strong>${caution.toFixed(2)} €</strong></li>
      </ul>
      <p style="font-size:13px;color:#8a755d">Pensez a la restituer (totalement ou partiellement) apres le depart, depuis votre espace d'administration.</p>
    </div>`;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_NOTIFICATION_ADDRESS,
      subject: `Caution versee - ${clientName} (${villaName})`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Echec de l'envoi de l'alerte caution versee :", error);
    return { sent: false, reason: "send_error" };
  }
}
