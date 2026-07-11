import { Resend } from "resend";
import { generateContractPdfBuffer } from "@/app/lib/contract";

const FROM_ADDRESS = "Escale Ã  La CotiniÃ¨re <contact@escalealacotiniere.fr>";
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
    subject: "Confirmation de votre rÃ©servation",
    title: "Votre rÃ©servation est confirmÃ©e",
    greeting: "Bonjour",
    intro: (villa: string) =>
      `Merci, nous avons bien reÃ§u votre acompte pour votre sÃ©jour Ã  Â« ${villa} Â». Voici le rÃ©capitulatif de votre rÃ©servation :`,
    stay: "SÃ©jour",
    travelers: "Voyageurs",
    travelersValue: (a: number, c: number, b: number) =>
      `${a} adulte(s), ${c} enfant(s), ${b} bÃ©bÃ©(s)`,
    total: "Total du sÃ©jour",
    depositPaid: "Acompte rÃ©glÃ©",
    balance: "Solde restant (Ã  J-30)",
    touristTax: (amount: string) =>
      `+ Taxe de sÃ©jour de ${amount} â¬, Ã  rÃ©gler sur place Ã  votre arrivÃ©e (non incluse dans les montants ci-dessus).`,
    attachment: "Vous trouverez votre contrat de location en piÃ¨ce jointe de ce mail.",
    panierTitre: "Votre panier d'accueil vous attend a votre arrivee :",
    signOff: "Ã trÃ¨s bientÃ´t Ã  La CotiniÃ¨re !",
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
      `+ Tourist tax of â¬${amount}, payable on site upon arrival (not included in the amounts above).`,
    attachment: "You will find your rental contract attached to this email.",
    panierTitre: "Your welcome basket will be waiting for you on arrival:",
    signOff: "See you soon at La CotiniÃ¨re!",
    nightsSuffix: (n: number) => (n > 1 ? "nights" : "night"),
  },
  de: {
    subject: "BestÃ¤tigung Ihrer Reservierung",
    title: "Ihre Reservierung ist bestÃ¤tigt",
    greeting: "Hallo",
    intro: (villa: string) =>
      `Vielen Dank, wir haben Ihre Anzahlung fÃ¼r Ihren Aufenthalt in â${villa}â erhalten. Hier die Zusammenfassung Ihrer Reservierung:`,
    stay: "Aufenthalt",
    travelers: "GÃ¤ste",
    travelersValue: (a: number, c: number, b: number) =>
      `${a} Erwachsene(r), ${c} Kind(er), ${b} Baby/Babys`,
    total: "Gesamtpreis des Aufenthalts",
    depositPaid: "Bezahlte Anzahlung",
    balance: "Restbetrag (fÃ¤llig D-30)",
    touristTax: (amount: string) =>
      `+ Kurtaxe von ${amount} â¬, vor Ort bei Ankunft zu zahlen (in den obigen BetrÃ¤gen nicht enthalten).`,
    attachment: "Ihren Mietvertrag finden Sie im Anhang dieser E-Mail.",
    panierTitre: "Ihr Willkommenskorb erwartet Sie bei Ihrer Ankunft:",
    signOff: "Bis bald in La CotiniÃ¨re!",
    nightsSuffix: () => "Nacht/NÃ¤chte",
  },
  es: {
    subject: "ConfirmaciÃ³n de su reserva",
    title: "Su reserva estÃ¡ confirmada",
    greeting: "Hola",
    intro: (villa: string) =>
      `Gracias, hemos recibido su depÃ³sito para su estancia en Â«${villa}Â». AquÃ­ tiene el resumen de su reserva:`,
    stay: "Estancia",
    travelers: "HuÃ©spedes",
    travelersValue: (a: number, c: number, b: number) =>
      `${a} adulto(s), ${c} niÃ±o(s), ${b} bebÃ©(s)`,
    total: "Total de la estancia",
    depositPaid: "DepÃ³sito pagado",
    balance: "Saldo pendiente (D-30)",
    touristTax: (amount: string) =>
      `+ Tasa turÃ­stica de ${amount} â¬, a pagar in situ a su llegada (no incluida en los importes anteriores).`,
    attachment: "EncontrarÃ¡ su contrato de alquiler adjunto a este correo.",
    panierTitre: "Su cesta de bienvenida le espera a su llegada:",
    signOff: "Â¡Hasta pronto en La CotiniÃ¨re!",
    nightsSuffix: (n: number) => (n > 1 ? "noches" : "noche"),
  },
};

/**
 * Envoie le mail de confirmation de rÃ©servation au client (avec le contrat
 * en piÃ¨ce jointe) et une copie de notification au propriÃ©taire.
 * N'est appelÃ© qu'une fois le paiement Stripe vÃ©rifiÃ© comme rÃ©ellement payÃ©.
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
        alt="Escale Ã  La CotiniÃ¨re"
        width="100"
        style="display: block; margin: 0 auto 20px; width: 100px; height: auto;"
      />
      <h1 style="font-size: 22px;">${M.title}</h1>
      <p>${M.greeting} ${params.clientName || ""},</p>
      <p>${M.intro(params.villaName)}</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 6px 0;"><strong>${M.stay}</strong></td>
          <td style="padding: 6px 0;">${params.arrival} â ${params.departure} (${params.nights} ${M.nightsSuffix(params.nights)})</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>${M.travelers}</strong></td>
          <td style="padding: 6px 0;">${M.travelersValue(params.adults, params.children, params.babies)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>${M.total}</strong></td>
          <td style="padding: 6px 0;">${params.total.toFixed(2)} â¬</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>${M.depositPaid}</strong></td>
          <td style="padding: 6px 0;">${params.amountPaid.toFixed(2)} â¬</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>${M.balance}</strong></td>
          <td style="padding: 6px 0;">${params.balance.toFixed(2)} â¬</td>
        </tr>
      </table>
      <p style="font-size: 14px;">
        ${M.touristTax((params.touristTax ?? 0).toFixed(2))}
      </p>
      ${(params.panierItems && params.panierItems.length > 0) ? `<div style="border: 1px solid #e0d6c4; background: #faf6ee; border-radius: 12px; padding: 16px 20px; margin: 20px 0;"><p style="margin: 0 0 8px; font-weight: bold;">🧺 ${M.panierTitre}</p><ul style="margin: 0; padding-left: 20px;">${params.panierItems.map(function(i){return "<li>" + i.quantite + " × " + i.nom + "</li>";}).join("")}</ul></div>` : ""}
      <p>${M.attachment}</p>
      <p>${M.signOff}</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: params.clientEmail,
      bcc: OWNER_NOTIFICATION_ADDRESS,
      subject: `${M.subject} â ${params.villaName}`,
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
    console.error("Ãchec de l'envoi du mail de confirmation :", error);
    return { sent: false, reason: "send_error" as const };
  }
}

/**
 * Envoie une alerte au propriÃ©taire (contact@escalealacotiniere.fr)
 * Ã  chaque nouvelle rÃ©servation payÃ©e.
 */
export async function sendOwnerNotificationEmail(
  params: BookingConfirmationEmailParams
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante pour l'alerte propriÃ©taire.");
    return { sent: false, reason: "no_api_key" };
  }

  const resend = new Resend(apiKey);

  const petText = params.petFee && params.petFee > 0 ? "oui" : "non";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #082f3a;">
      <h2 style="color: #082f3a;">ð Nouvelle rÃ©servation</h2>
      <p style="font-size: 16px;">Une rÃ©servation vient d'Ãªtre payÃ©e sur le site.</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Villa</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.villaName}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>SÃ©jour</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.arrival} â ${params.departure} (${params.nights} nuit(s))</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Voyageurs</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.adults} adulte(s), ${params.children} enfant(s), ${params.babies} bÃ©bÃ©(s) â animal : ${petText}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Client</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.clientName ?? "â"}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.clientEmail}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>TÃ©lÃ©phone</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.clientPhone ?? "â"}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eadfce;"><strong>Adresse</strong></td><td style="padding: 8px; border-bottom: 1px solid #eadfce;">${params.clientAddress ?? "â"}</td></tr>
        <tr><td style="padding: 8px;"><strong>Total sÃ©jour</strong></td><td style="padding: 8px; text-align: right;">${params.total.toFixed(2)} â¬</td></tr>
        <tr><td style="padding: 8px;"><strong>Acompte payÃ©</strong></td><td style="padding: 8px; text-align: right; color: #15803d;">${params.amountPaid.toFixed(2)} â¬</td></tr>
        <tr><td style="padding: 8px;"><strong>Solde restant</strong></td><td style="padding: 8px; text-align: right;">${params.balance.toFixed(2)} â¬</td></tr>
      </table>

      <p style="margin-top: 20px; font-size: 14px; color: #8a755d;">
        Retrouvez le dÃ©tail dans votre espace d'administration.
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_NOTIFICATION_ADDRESS,
      subject: `Nouvelle rÃ©servation â ${params.villaName} (${params.arrival} â ${params.departure})`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Ãchec de l'envoi de l'alerte propriÃ©taire :", error);
    return { sent: false, reason: "send_error" };
  }
}

// ============ RÃGLEMENT DU SOLDE ============

/**
 * Envoie au client le lien de rÃ¨glement de son solde (avec copie au
 * propriÃ©taire en bcc). AppelÃ© depuis /api/checkout-solde.
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
      <h2 style="color:#082f3a">RÃ¨glement du solde de votre sÃ©jour</h2>
      <p>Bonjour ${clientName},</p>
      <p>Votre sÃ©jour Ã  <strong>${villaName}</strong> approche (du ${fmt(arrival)} au ${fmt(departure)}).</p>
      <p>Il vous reste Ã  rÃ©gler le solde de <strong>${balance.toFixed(2)} â¬</strong> pour finaliser votre rÃ©servation.</p>
      <p style="text-align:center;margin:32px 0">
        <a href="${paymentUrl}" style="background:#082f3a;color:#fff;padding:14px 28px;border-radius:9999px;text-decoration:none;font-weight:bold">RÃ©gler mon solde en ligne</a>
      </p>
      <p style="font-size:13px;color:#8a755d">Paiement sÃ©curisÃ© par carte bancaire via Stripe. Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>${paymentUrl}</p>
      <p>Ã trÃ¨s bientÃ´t,<br>Escale Ã  La CotiniÃ¨re</p>
    </div>`;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: clientEmail,
      bcc: OWNER_NOTIFICATION_ADDRESS,
      subject: `RÃ¨glement du solde â ${villaName}`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Ãchec de l'envoi de la demande de solde :", error);
    return { sent: false, reason: "send_error" };
  }
}

/**
 * Alerte le propriÃ©taire quand un client a rÃ©glÃ© son solde.
 * AppelÃ© depuis /api/verifier-solde une fois le paiement confirmÃ©.
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
    console.error("RESEND_API_KEY manquante pour l'alerte solde rÃ©glÃ©.");
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
      <h2>â Solde rÃ©glÃ©</h2>
      <p><strong>${clientName}</strong> vient de rÃ©gler son solde.</p>
      <ul>
        <li>Villa : <strong>${villaName}</strong></li>
        <li>SÃ©jour : du ${fmt(arrival)} au ${fmt(departure)}</li>
        <li>Montant rÃ©glÃ© : <strong>${balance.toFixed(2)} â¬</strong></li>
      </ul>
    </div>`;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_NOTIFICATION_ADDRESS,
      subject: `â Solde rÃ©glÃ© â ${clientName} (${villaName})`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Ãchec de l'envoi de l'alerte solde rÃ©glÃ© :", error);
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
      <p>Dans le cadre de votre sejour a <strong>${villaName}</strong> (du ${fmt(arrival)} au ${fmt(departure)}), nous vous demandons le versement d'une caution de <strong>${caution.toFixed(2)} â¬</strong>.</p>
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
        <li>Montant : <strong>${caution.toFixed(2)} â¬</strong></li>
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

// ============ EMAILS DE REMBOURSEMENT ============

/**
 * Previent le client qu'un remboursement de sa caution a ete effectue.
 * Si le remboursement est partiel, on inclut le motif saisi par le proprietaire.
 */
export async function sendCautionRefundEmail(params: {
  clientName: string;
  clientEmail: string;
  villaName: string;
  cautionAmount: number;
  refundedAmount: number;
  reason?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante pour le remboursement de caution.");
    return { sent: false, reason: "no_api_key" };
  }
  const resend = new Resend(apiKey);
  const { clientName, clientEmail, villaName, cautionAmount, refundedAmount, reason } = params;
  const isPartial = refundedAmount < cautionAmount - 0.001;

  const partialBlock = isPartial
    ? `
      <p>Le montant restitue est de <strong>${refundedAmount.toFixed(2)} â¬</strong> sur une caution de ${cautionAmount.toFixed(2)} â¬.</p>
      ${reason ? `<p style="background:#f7f1e8;padding:12px 16px;border-radius:12px"><strong>Motif de la retenue :</strong><br>${reason}</p>` : ""}
    `
    : `<p>Votre caution de <strong>${refundedAmount.toFixed(2)} â¬</strong> vous a ete <strong>integralement restituee</strong>.</p>`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#082f3a;max-width:560px;margin:auto">
      <h2 style="color:#082f3a">Restitution de votre caution</h2>
      <p>Bonjour ${clientName},</p>
      <p>Suite a votre sejour a <strong>${villaName}</strong>, nous avons procede au remboursement de votre caution.</p>
      ${partialBlock}
      <p style="font-size:13px;color:#8a755d">Le remboursement apparaitra sur votre compte sous quelques jours (delai bancaire).</p>
      <p>Merci de votre sejour et a bientot,<br>Escale a La Cotiniere</p>
    </div>`;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: clientEmail,
      bcc: OWNER_NOTIFICATION_ADDRESS,
      subject: `Restitution de votre caution - ${villaName}`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Echec de l'envoi du remboursement de caution :", error);
    return { sent: false, reason: "send_error" };
  }
}

/**
 * Previent le client qu'un remboursement (loyer/acompte) a ete effectue,
 * avec le motif saisi par le proprietaire.
 */
export async function sendPaymentRefundEmail(params: {
  clientName: string;
  clientEmail: string;
  villaName: string;
  refundedAmount: number;
  reason?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante pour le remboursement.");
    return { sent: false, reason: "no_api_key" };
  }
  const resend = new Resend(apiKey);
  const { clientName, clientEmail, villaName, refundedAmount, reason } = params;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#082f3a;max-width:560px;margin:auto">
      <h2 style="color:#082f3a">Remboursement effectue</h2>
      <p>Bonjour ${clientName},</p>
      <p>Nous avons procede a un remboursement de <strong>${refundedAmount.toFixed(2)} â¬</strong> concernant votre reservation a <strong>${villaName}</strong>.</p>
      ${reason ? `<p style="background:#f7f1e8;padding:12px 16px;border-radius:12px"><strong>Motif :</strong><br>${reason}</p>` : ""}
      <p style="font-size:13px;color:#8a755d">Le remboursement apparaitra sur votre compte sous quelques jours (delai bancaire).</p>
      <p>Cordialement,<br>Escale a La Cotiniere</p>
    </div>`;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: clientEmail,
      bcc: OWNER_NOTIFICATION_ADDRESS,
      subject: `Remboursement - ${villaName}`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Echec de l'envoi du remboursement :", error);
    return { sent: false, reason: "send_error" };
  }
}
