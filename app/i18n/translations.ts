export type Locale = "fr" | "en" | "de" | "es";

export const locales: Locale[] = ["fr", "en", "de", "es"];

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
  es: "ES",
};

type LegalArticle = { title: string; text: string };

const frArticles: LegalArticle[] = [
  {
    title: "Réservation et acompte",
    text: "Toute réservation devient effective après réception d'un acompte égal à 40 % du montant total du séjour, réglé en ligne par carte bancaire au moment de la réservation. Le solde, soit 60 % du montant total, doit être réglé au plus tard 30 jours avant la date d'arrivée.",
  },
  {
    title: "Prix et frais inclus",
    text: "Le prix de la location comprend le loyer de la demeure pour la période réservée. S'y ajoutent, selon les cas : les frais de ménage de fin de séjour, la fourniture de draps et de serviettes, un supplément pour animal domestique le cas échéant, ainsi que la taxe de séjour, calculée par adulte et par nuit conformément au tarif en vigueur dans la commune. La taxe de séjour n'est pas incluse dans le paiement en ligne et se règle sur place, à l'arrivée.",
  },
  {
    title: "Arrivée et départ",
    text: "Sauf disposition contraire convenue avec le propriétaire, l'arrivée s'effectue à partir de 16h00 le jour du début du séjour, et le départ doit avoir lieu avant 11h00 le jour de fin de séjour.",
  },
  {
    title: "Capacité d'accueil",
    text: "Le nombre de voyageurs ne peut excéder la capacité maximale indiquée pour chaque demeure au moment de la réservation. Toute demande dépassant cette capacité doit faire l'objet d'un accord préalable et écrit du propriétaire.",
  },
  {
    title: "Dépôt de garantie",
    text: "Un dépôt de garantie, dont le montant est précisé dans le contrat de location propre à chaque demeure, sera demandé au locataire le jour de son arrivée. Il sera restitué après l'état des lieux de sortie, déduction faite, le cas échéant, du coût des réparations ou du remplacement des biens endommagés ou manquants.",
  },
  {
    title: "Annulation",
    text: "La réservation engage le locataire de manière ferme dès le règlement de l'acompte. Sauf accord écrit contraire du propriétaire, aucune annulation, réduction de séjour ou modification de dates ne donne droit à un remboursement, total ou partiel, de l'acompte versé. Il est vivement recommandé au locataire de souscrire une assurance annulation adaptée à son séjour.",
  },
  {
    title: "Animaux domestiques",
    text: "Les animaux domestiques ne sont admis qu'avec l'accord préalable du propriétaire et moyennant le supplément indiqué lors de la réservation. Le locataire reste responsable de tout dommage causé par son animal.",
  },
  {
    title: "Assurance",
    text: "Le locataire doit être couvert par une assurance villégiature (responsabilité civile) pour toute la durée du séjour et devra en produire une attestation à son arrivée si elle lui est demandée.",
  },
  {
    title: "État des lieux",
    text: "Un état des lieux contradictoire est établi à l'arrivée et au départ du locataire. Le logement doit être rendu dans l'état où il a été trouvé à l'arrivée.",
  },
  {
    title: "Usage des lieux",
    text: "Le locataire s'engage à faire un usage paisible des lieux loués, à respecter le voisinage et à ne pas sous-louer ou céder son contrat de location, en tout ou partie, à un tiers.",
  },
  {
    title: "Réclamations",
    text: "Toute réclamation relative à l'état du logement doit être signalée au propriétaire dans les 24 heures suivant l'arrivée, afin de permettre une vérification contradictoire.",
  },
  {
    title: "Droit applicable",
    text: "Les présentes conditions générales, ainsi que le contrat de location remis à chaque locataire, sont régis par le droit français.",
  },
];

const enArticles: LegalArticle[] = [
  {
    title: "Booking and deposit",
    text: "A booking becomes effective upon receipt of a deposit equal to 40% of the total cost of the stay, paid online by credit card at the time of booking. The balance, i.e. 60% of the total amount, must be paid no later than 30 days before the arrival date.",
  },
  {
    title: "Price and included fees",
    text: "The rental price includes the rent for the property for the booked period. Depending on the case, the following may be added: end-of-stay cleaning fees, the provision of sheets and towels, a supplement for pets where applicable, and the tourist tax, calculated per adult and per night according to the rate in force in the municipality. The tourist tax is not included in the online payment and is payable on site upon arrival.",
  },
  {
    title: "Arrival and departure",
    text: "Unless otherwise agreed with the owner, arrival is from 4:00 p.m. on the first day of the stay, and departure must take place before 11:00 a.m. on the last day of the stay.",
  },
  {
    title: "Occupancy capacity",
    text: "The number of guests may not exceed the maximum capacity indicated for each property at the time of booking. Any request exceeding this capacity must be subject to the owner's prior written agreement.",
  },
  {
    title: "Security deposit",
    text: "A security deposit, the amount of which is specified in the rental contract specific to each property, will be requested from the tenant on the day of arrival. It will be refunded after the check-out inspection, less, where applicable, the cost of repairing or replacing damaged or missing items.",
  },
  {
    title: "Cancellation",
    text: "The booking is a firm commitment by the tenant as soon as the deposit is paid. Unless otherwise agreed in writing by the owner, no cancellation, shortening of stay or change of dates entitles the tenant to a full or partial refund of the deposit paid. Tenants are strongly advised to take out cancellation insurance suited to their stay.",
  },
  {
    title: "Pets",
    text: "Pets are only accepted with the owner's prior agreement and subject to the supplement indicated at the time of booking. The tenant remains liable for any damage caused by their pet.",
  },
  {
    title: "Insurance",
    text: "The tenant must be covered by holiday home (public liability) insurance for the entire duration of the stay and must provide proof of this on arrival if requested.",
  },
  {
    title: "Check-in / check-out inventory",
    text: "A joint inventory of condition is drawn up on the tenant's arrival and departure. The property must be returned in the condition in which it was found on arrival.",
  },
  {
    title: "Use of the premises",
    text: "The tenant undertakes to make peaceful use of the rented premises, to respect the neighbourhood, and not to sublet or assign their rental agreement, in whole or in part, to a third party.",
  },
  {
    title: "Complaints",
    text: "Any complaint regarding the condition of the property must be reported to the owner within 24 hours of arrival, to allow for a joint inspection.",
  },
  {
    title: "Applicable law",
    text: "These general terms and conditions, as well as the rental contract given to each tenant, are governed by French law.",
  },
];

const deArticles: LegalArticle[] = [
  {
    title: "Buchung und Anzahlung",
    text: "Eine Buchung wird wirksam, sobald eine Anzahlung in Höhe von 40 % des Gesamtbetrags des Aufenthalts eingegangen ist, die zum Zeitpunkt der Buchung online per Kreditkarte gezahlt wird. Der Restbetrag, d. h. 60 % des Gesamtbetrags, muss spätestens 30 Tage vor dem Anreisedatum bezahlt werden.",
  },
  {
    title: "Preis und enthaltene Gebühren",
    text: "Der Mietpreis umfasst die Miete der Unterkunft für den gebuchten Zeitraum. Je nach Fall können hinzukommen: Endreinigungsgebühren, die Bereitstellung von Bettwäsche und Handtüchern, ein Zuschlag für Haustiere, sofern zutreffend, sowie die Kurtaxe, die pro Erwachsenem und Nacht gemäß dem in der Gemeinde geltenden Satz berechnet wird. Die Kurtaxe ist nicht in der Online-Zahlung enthalten und wird vor Ort bei Ankunft bezahlt.",
  },
  {
    title: "Anreise und Abreise",
    text: "Sofern nicht anders mit dem Eigentümer vereinbart, erfolgt die Anreise ab 16:00 Uhr am ersten Tag des Aufenthalts, und die Abreise muss vor 11:00 Uhr am letzten Tag des Aufenthalts erfolgen.",
  },
  {
    title: "Aufnahmekapazität",
    text: "Die Anzahl der Gäste darf die zum Zeitpunkt der Buchung für jede Unterkunft angegebene Höchstkapazität nicht überschreiten. Jede Anfrage, die diese Kapazität überschreitet, bedarf der vorherigen schriftlichen Zustimmung des Eigentümers.",
  },
  {
    title: "Kaution",
    text: "Eine Kaution, deren Höhe im jeweiligen Mietvertrag für jede Unterkunft angegeben ist, wird vom Mieter am Tag der Ankunft verlangt. Sie wird nach der Abnahme zurückerstattet, abzüglich gegebenenfalls der Kosten für die Reparatur oder den Ersatz beschädigter oder fehlender Gegenstände.",
  },
  {
    title: "Stornierung",
    text: "Die Buchung verpflichtet den Mieter verbindlich, sobald die Anzahlung geleistet wurde. Sofern der Eigentümer nicht schriftlich anders zustimmt, berechtigt keine Stornierung, Verkürzung des Aufenthalts oder Terminänderung zu einer vollständigen oder teilweisen Rückerstattung der geleisteten Anzahlung. Dem Mieter wird dringend empfohlen, eine für seinen Aufenthalt geeignete Reiserücktrittsversicherung abzuschließen.",
  },
  {
    title: "Haustiere",
    text: "Haustiere werden nur mit vorheriger Zustimmung des Eigentümers und gegen den bei der Buchung angegebenen Zuschlag akzeptiert. Der Mieter haftet für jeden durch sein Haustier verursachten Schaden.",
  },
  {
    title: "Versicherung",
    text: "Der Mieter muss für die gesamte Dauer des Aufenthalts durch eine Ferienhaus-Haftpflichtversicherung abgedeckt sein und muss bei Ankunft auf Verlangen einen entsprechenden Nachweis vorlegen.",
  },
  {
    title: "Zustandsprotokoll",
    text: "Bei Ankunft und Abreise des Mieters wird gemeinsam ein Zustandsprotokoll erstellt. Die Unterkunft muss in dem Zustand zurückgegeben werden, in dem sie bei Ankunft vorgefunden wurde.",
  },
  {
    title: "Nutzung der Räumlichkeiten",
    text: "Der Mieter verpflichtet sich, die gemieteten Räumlichkeiten friedlich zu nutzen, die Nachbarschaft zu respektieren und seinen Mietvertrag weder ganz noch teilweise unterzuvermieten oder an Dritte abzutreten.",
  },
  {
    title: "Reklamationen",
    text: "Jede Reklamation bezüglich des Zustands der Unterkunft muss dem Eigentümer innerhalb von 24 Stunden nach Ankunft gemeldet werden, um eine gemeinsame Überprüfung zu ermöglichen.",
  },
  {
    title: "Anwendbares Recht",
    text: "Diese allgemeinen Geschäftsbedingungen sowie der jedem Mieter ausgehändigte Mietvertrag unterliegen französischem Recht.",
  },
];

const esArticles: LegalArticle[] = [
  {
    title: "Reserva y depósito",
    text: "Toda reserva se hace efectiva tras la recepción de un depósito equivalente al 40 % del importe total de la estancia, pagado en línea con tarjeta bancaria en el momento de la reserva. El saldo, es decir, el 60 % del importe total, deberá pagarse a más tardar 30 días antes de la fecha de llegada.",
  },
  {
    title: "Precio y gastos incluidos",
    text: "El precio del alquiler incluye la renta de la casa por el período reservado. Según el caso, se añaden: los gastos de limpieza de fin de estancia, el suministro de sábanas y toallas, un suplemento por mascota si procede, así como la tasa turística, calculada por adulto y por noche conforme a la tarifa vigente en el municipio. La tasa turística no está incluida en el pago en línea y se abona in situ a la llegada.",
  },
  {
    title: "Llegada y salida",
    text: "Salvo acuerdo distinto con el propietario, la llegada se realiza a partir de las 16:00 h del primer día de la estancia, y la salida debe efectuarse antes de las 11:00 h del último día de la estancia.",
  },
  {
    title: "Capacidad de alojamiento",
    text: "El número de huéspedes no podrá superar la capacidad máxima indicada para cada casa en el momento de la reserva. Cualquier solicitud que supere esta capacidad deberá contar con el acuerdo previo y por escrito del propietario.",
  },
  {
    title: "Depósito de garantía",
    text: "Se solicitará al inquilino, el día de su llegada, un depósito de garantía cuyo importe se especifica en el contrato de alquiler propio de cada casa. Se devolverá tras la inspección de salida, deduciendo, en su caso, el coste de las reparaciones o la sustitución de los bienes dañados o que falten.",
  },
  {
    title: "Cancelación",
    text: "La reserva compromete firmemente al inquilino desde el momento del pago del depósito. Salvo acuerdo escrito en contrario del propietario, ninguna cancelación, reducción de la estancia o cambio de fechas dará derecho a un reembolso, total o parcial, del depósito abonado. Se recomienda encarecidamente al inquilino suscribir un seguro de cancelación adecuado a su estancia.",
  },
  {
    title: "Mascotas",
    text: "Las mascotas solo se admiten con el acuerdo previo del propietario y mediante el suplemento indicado en el momento de la reserva. El inquilino sigue siendo responsable de cualquier daño causado por su mascota.",
  },
  {
    title: "Seguro",
    text: "El inquilino debe estar cubierto por un seguro de responsabilidad civil vacacional durante toda la duración de la estancia y deberá presentar un justificante a su llegada si se le solicita.",
  },
  {
    title: "Inventario de estado",
    text: "Se realizará un inventario de estado contradictorio a la llegada y a la salida del inquilino. La vivienda debe devolverse en el estado en que se encontró a la llegada.",
  },
  {
    title: "Uso de las instalaciones",
    text: "El inquilino se compromete a hacer un uso pacífico de las instalaciones alquiladas, a respetar la vecindad y a no subarrendar ni ceder su contrato de alquiler, total o parcialmente, a un tercero.",
  },
  {
    title: "Reclamaciones",
    text: "Cualquier reclamación relativa al estado de la vivienda debe comunicarse al propietario dentro de las 24 horas siguientes a la llegada, para permitir una verificación contradictoria.",
  },
  {
    title: "Ley aplicable",
    text: "Las presentes condiciones generales, así como el contrato de alquiler entregado a cada inquilino, se rigen por el derecho francés.",
  },
];

export const translations = {
  fr: {
    nav: {
      brand: "Escale à La Cotinière",
      backHome: "← Retour à l'accueil",
      about: "Qui sommes-nous",
      collection: "Notre Collection",
      cotiniere: "La Cotinière",
      contact: "Contact",
    },
    hero: {
      kicker: "Île d'Oléron · La Cotinière",
      title: "Des demeures d'exception pour des séjours inoubliables.",
      subtitle:
        "Découvrez notre collection de maisons de caractère à La Cotinière.",
    },
    collection: {
      kicker: "Notre Collection",
      title: "Quatre demeures de caractère à La Cotinière.",
      discover: "Découvrir →",
    },
    cotiniereSection: {
      kicker: "Île d'Oléron",
      title: "La Cotinière, un village de pêcheurs authentique",
      text: "Blottie sur la façade atlantique de l'île d'Oléron, La Cotinière est réputée pour son port de pêche, l'un des plus actifs de la côte, et sa criée où les prises du jour sont vendues chaque matin. Entre plages de sable fin, sentiers côtiers à vélo et petits restaurants de poissons, le village offre un cadre de vacances authentique, à quelques minutes à pied de chacune de nos demeures.",
      learnMoreLink: "En savoir plus sur l'Île d'Oléron →",
    },
    contactSection: {
      title: "Contact",
      text: "Une question sur une demeure, une demande particulière ? Nous sommes à votre écoute.",
      emailLabel: "Par e-mail",
      phoneLabel: "Par téléphone",
    },
    devis: {
      villaNotFound: "Demeure introuvable",
      villaNotFoundText:
        "Merci de repartir de la fiche d'une de nos demeures pour choisir vos dates.",
      backHome: "Retour à l'accueil",
      chooseDatesFirst: "Choisissez d'abord vos dates",
      chooseDatesFirstText:
        "Retournez sur la fiche de « {{villa}} » et sélectionnez vos dates d'arrivée et de départ pour obtenir votre devis.",
      seeVilla: "Voir « {{villa}} »",
      availableStay: "Séjour disponible",
      nightsSuffix: "nuit(s)",
      quoteTitle: "Tarif sur demande",
      quoteText: "Pour ces dates, merci de nous consulter afin d'obtenir un tarif personnalisé :",
      title: "Votre devis",
      stayInfo: "Informations du séjour",
      adults: "Adultes",
      children: "Enfants",
      babies: "Bébés",
      pet: "Animal domestique",
      petNo: "Non",
      petYes: "Oui",
      capacityExceeded: "Capacité dépassée.",
      capacityExceededText:
        "Cette demeure accepte au maximum {{max}} voyageurs hors bébés. Contactez le propriétaire pour étudier votre demande.",
      summary: "Récapitulatif",
      stay: "Location",
      cleaning: "Ménage",
      linen: "Draps & serviettes",
      animal: "Animal",
      total: "Total",
      deposit: "Acompte 40 %",
      balance: "Solde à J-30",
      touristTaxNote:
        "+ Taxe de séjour de {{amount}} €, à régler sur place à votre arrivée (non incluse dans le total ci-dessus).",
      continue: "Continuer vers mes coordonnées",
    },
    booking: {
      checkAvailability: "Vérifier les disponibilités",
      checkButton: "Vérifier disponible",
      available: "Séjour disponible.",
      continueToQuote: "Continuer vers le devis",
      notAvailable: "Cette période n'est pas disponible.",
      chooseOtherDates: "Choisissez d'autres dates dans le calendrier.",
      legendAvailable: "Disponible",
      legendBooked: "Réservé",
      legendSelected: "Sélectionné",
    },
    common: {
      backHome: "Retour à l'accueil",
      incompleteTitle: "Informations manquantes",
      incompleteText:
        "Certaines informations de votre réservation sont manquantes. Merci de reprendre le parcours depuis le début.",
    },
    coord: {
      title: "Vos coordonnées",
      errorsTitle: "Merci de corriger les points suivants :",
      errNom: "Le nom est obligatoire.",
      errPrenom: "Le prénom est obligatoire.",
      errEmail: "L'adresse e-mail n'est pas valide.",
      errTelephone: "Le téléphone portable est obligatoire.",
      errAdresse: "L'adresse est obligatoire.",
      errCodePostal: "Le code postal est obligatoire.",
      errVille: "La ville est obligatoire.",
      errPays: "Le pays est obligatoire.",
      errCgl: "Vous devez accepter les conditions générales de location.",
      nom: "Nom *",
      prenom: "Prénom *",
      email: "Adresse e-mail *",
      telephone: "Téléphone portable *",
      telephoneFixe: "Téléphone fixe (facultatif)",
      adresse: "Adresse",
      codePostal: "Code postal",
      ville: "Ville",
      pays: "Pays",
      cglPrefix: "Je reconnais avoir pris connaissance des",
      cglLink: "conditions générales de location",
      cglSuffix: "et je les accepte.",
      submit: "Voir la synthèse de ma réservation",
    },
    synthese: {
      title: "Synthèse de votre réservation",
      villa: "Demeure",
      stay: "Séjour",
      nightsSuffix: "nuit(s)",
      travelers: "Voyageurs",
      adult: "adulte",
      child: "enfant",
      baby: "bébé",
      withAnimal: ", avec animal",
      client: "Client",
      total: "Total",
      depositNow: "Acompte à régler maintenant",
      balance: "Solde à régler à J-30",
      touristTaxNote:
        "+ Taxe de séjour de {{amount}} €, à régler sur place à votre arrivée (non incluse dans le total ci-dessus).",
      payNote:
        "En cliquant sur le bouton ci-dessous, vous serez dirigé vers le paiement sécurisé de l'acompte.",
      continue: "Aller vers le paiement sécurisé",
    },
    paiement: {
      title: "Paiement sécurisé",
      redirectText:
        "Vous allez être redirigé vers Stripe pour régler l'acompte de votre séjour à « {{villa}} ».",
      errorInit:
        "Le paiement n'a pas pu être initié. Merci de réessayer dans quelques instants.",
      errorConnect:
        "Une erreur est survenue lors de la connexion au paiement sécurisé.",
      loading: "Redirection en cours...",
      payButton: "Payer mon acompte sécurisé",
      productNamePrefix: "Acompte réservation",
      checkoutDescription:
        "Acompte réservation — {{villa}} du {{arrival}} au {{departure}}",
    },
    confirmation: {
      noSessionTitle: "Aucune confirmation trouvée",
      noSessionText:
        "Nous n'avons pas retrouvé de paiement associé à cette page. Si vous venez de régler un acompte et que vous voyez ce message, contactez-nous directement — votre paiement peut malgré tout avoir été enregistré chez Stripe.",
      notPaidTitle: "Paiement non confirmé",
      notPaidTextError: "Nous n'avons pas pu vérifier ce paiement pour le moment.",
      notPaidTextPending:
        "Ce paiement n'a pas encore été validé (annulé ou toujours en attente).",
      notPaidContact:
        "Si vous pensez qu'il s'agit d'une erreur, contactez-nous en précisant la référence ci-dessous.",
      reference: "Référence",
      paidTitle: "Paiement confirmé",
      thanksText:
        "Merci {{name}}, votre acompte de {{amount}} € a bien été enregistré pour « {{villa}} ».",
      stay: "Séjour",
      total: "Total du séjour",
      balance: "Solde restant, à régler à J-30",
      touristTaxNote:
        "+ Taxe de séjour de {{amount}} €, à régler sur place à votre arrivée.",
      emailSent:
        "Un mail de confirmation avec votre contrat en pièce jointe vous a été envoyé à {{email}}.",
      emailFailed:
        "Le mail de confirmation n'a pas pu être envoyé automatiquement. Vous pouvez télécharger votre contrat ci-dessous en attendant.",
      downloadContract: "Télécharger mon contrat de location (PDF)",
    },
    villaPage: {
      capacity: "Capacité",
      bedrooms: "Chambres",
      bathrooms: "Salles de bains",
      pool: "Piscine",
      poolPrivate: "Privée",
      learnMore: "En savoir plus",
      hideDescription: "Masquer la description",
    },
    conditions: {
      title: "Conditions générales de location",
      intro:
        "Les présentes conditions générales régissent toute réservation effectuée auprès d'Escale à La Cotinière pour l'une des demeures proposées à la location (Le Logis du Pêcheur, L'École, Les Mouettes, Le Parour). Toute réservation implique l'acceptation pleine et entière des présentes conditions.",
      backToBooking: "Retour à ma réservation",
      disclaimer: "",
      frenchLabel: "Version française",
      translatedLabel: "",
      contactNote:
        "Pour toute question relative à ces conditions, vous pouvez nous contacter avant de finaliser votre réservation.",
      articles: frArticles,
    },
  },
  en: {
    nav: {
      brand: "Escale à La Cotinière",
      backHome: "← Back to home",
      about: "About us",
      collection: "Our Collection",
      cotiniere: "La Cotinière",
      contact: "Contact",
    },
    hero: {
      kicker: "Île d'Oléron · La Cotinière",
      title: "Exceptional homes for unforgettable stays.",
      subtitle:
        "Discover our collection of characterful houses in La Cotinière.",
    },
    collection: {
      kicker: "Our Collection",
      title: "Four characterful homes in La Cotinière.",
      discover: "Discover →",
    },
    cotiniereSection: {
      kicker: "Île d'Oléron",
      title: "La Cotinière, an authentic fishing village",
      text: "Nestled on the Atlantic coast of Île d'Oléron, La Cotinière is renowned for its fishing port, one of the most active on the coast, and its fish auction where the day's catch is sold every morning. Between sandy beaches, coastal cycling paths and small seafood restaurants, the village offers an authentic holiday setting, just a few minutes' walk from each of our properties.",
      learnMoreLink: "Learn more about Île d'Oléron →",
    },
    contactSection: {
      title: "Contact",
      text: "A question about one of our properties, a special request? We're here to help.",
      emailLabel: "By email",
      phoneLabel: "By phone",
    },
    devis: {
      villaNotFound: "Property not found",
      villaNotFoundText:
        "Please go back to one of our properties to choose your dates.",
      backHome: "Back to home",
      chooseDatesFirst: "Choose your dates first",
      chooseDatesFirstText:
        "Go back to the “{{villa}}” page and select your arrival and departure dates to get your quote.",
      seeVilla: "See “{{villa}}”",
      availableStay: "Stay available",
      nightsSuffix: "night(s)",
      quoteTitle: "Price on request",
      quoteText: "For these dates, please contact us for a personalised quote:",
      title: "Your quote",
      stayInfo: "Stay details",
      adults: "Adults",
      children: "Children",
      babies: "Babies",
      pet: "Pet",
      petNo: "No",
      petYes: "Yes",
      capacityExceeded: "Capacity exceeded.",
      capacityExceededText:
        "This property accommodates a maximum of {{max}} guests (excluding babies). Please contact the owner to discuss your request.",
      summary: "Summary",
      stay: "Accommodation",
      cleaning: "Cleaning",
      linen: "Linen & towels",
      animal: "Pet",
      total: "Total",
      deposit: "Deposit 40%",
      balance: "Balance due at D-30",
      touristTaxNote:
        "+ Tourist tax of €{{amount}}, payable on site upon arrival (not included in the total above).",
      continue: "Continue to my details",
    },
    booking: {
      checkAvailability: "Check availability",
      checkButton: "Check availability",
      available: "Stay available.",
      continueToQuote: "Continue to quote",
      notAvailable: "This period is not available.",
      chooseOtherDates: "Please choose other dates in the calendar.",
      legendAvailable: "Disponible",
      legendBooked: "Réservé",
      legendSelected: "Sélectionné",
    },
    common: {
      backHome: "Back to home",
      incompleteTitle: "Missing information",
      incompleteText:
        "Some information about your booking is missing. Please start the process again from the beginning.",
    },
    coord: {
      title: "Your details",
      errorsTitle: "Please fix the following:",
      errNom: "Last name is required.",
      errPrenom: "First name is required.",
      errEmail: "The email address is not valid.",
      errTelephone: "Mobile phone number is required.",
      errAdresse: "Address is required.",
      errCodePostal: "Postal code is required.",
      errVille: "City is required.",
      errPays: "Country is required.",
      errCgl: "You must accept the rental terms and conditions.",
      nom: "Last name *",
      prenom: "First name *",
      email: "Email address *",
      telephone: "Mobile phone *",
      telephoneFixe: "Landline phone (optional)",
      adresse: "Address",
      codePostal: "Postal code",
      ville: "City",
      pays: "Country",
      cglPrefix: "I confirm that I have read the",
      cglLink: "rental terms and conditions",
      cglSuffix: "and I accept them.",
      submit: "View my booking summary",
    },
    synthese: {
      title: "Your booking summary",
      villa: "Property",
      stay: "Stay",
      nightsSuffix: "night(s)",
      travelers: "Guests",
      adult: "adult",
      child: "child",
      baby: "baby",
      withAnimal: ", with pet",
      client: "Guest",
      total: "Total",
      depositNow: "Deposit to pay now",
      balance: "Balance due at D-30",
      touristTaxNote:
        "+ Tourist tax of €{{amount}}, payable on site upon arrival (not included in the total above).",
      payNote:
        "By clicking the button below, you will be taken to the secure deposit payment.",
      continue: "Go to secure payment",
    },
    paiement: {
      title: "Secure payment",
      redirectText:
        "You will be redirected to Stripe to pay the deposit for your stay at “{{villa}}”.",
      errorInit: "Payment could not be started. Please try again shortly.",
      errorConnect:
        "An error occurred while connecting to the secure payment.",
      loading: "Redirecting...",
      payButton: "Pay my secure deposit",
      productNamePrefix: "Booking deposit",
      checkoutDescription:
        "Booking deposit — {{villa}} from {{arrival}} to {{departure}}",
    },
    confirmation: {
      noSessionTitle: "No confirmation found",
      noSessionText:
        "We could not find a payment linked to this page. If you have just paid a deposit and see this message, please contact us directly — your payment may still have been recorded by Stripe.",
      notPaidTitle: "Payment not confirmed",
      notPaidTextError: "We could not verify this payment at the moment.",
      notPaidTextPending:
        "This payment has not yet been validated (cancelled or still pending).",
      notPaidContact:
        "If you believe this is an error, please contact us with the reference below.",
      reference: "Reference",
      paidTitle: "Payment confirmed",
      thanksText:
        "Thank you {{name}}, your deposit of €{{amount}} has been recorded for “{{villa}}”.",
      stay: "Stay",
      total: "Total stay cost",
      balance: "Balance due at D-30",
      touristTaxNote:
        "+ Tourist tax of €{{amount}}, payable on site upon arrival.",
      emailSent:
        "A confirmation email with your contract attached has been sent to {{email}}.",
      emailFailed:
        "The confirmation email could not be sent automatically. You can download your contract below in the meantime.",
      downloadContract: "Download my rental contract (PDF)",
    },
    villaPage: {
      capacity: "Capacity",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      pool: "Pool",
      poolPrivate: "Private",
      learnMore: "Learn more",
      hideDescription: "Hide description",
    },
    conditions: {
      title: "Rental Terms and Conditions",
      intro:
        "These general terms and conditions govern any booking made with Escale à La Cotinière for one of our properties (Le Logis du Pêcheur, L'École, Les Mouettes, Le Parour). Any booking implies full acceptance of these terms.",
      backToBooking: "Back to my booking",
      disclaimer:
        "Note: this translation is provided for information purposes only. Only the French version is legally binding.",
      frenchLabel: "French version (legally binding)",
      translatedLabel: "English translation",
      contactNote:
        "For any question about these terms, please contact us before finalising your booking.",
      articles: enArticles,
    },
  },
  de: {
    nav: {
      brand: "Escale à La Cotinière",
      backHome: "← Zurück zur Startseite",
      about: "Über uns",
      collection: "Unsere Kollektion",
      cotiniere: "La Cotinière",
      contact: "Kontakt",
    },
    hero: {
      kicker: "Île d'Oléron · La Cotinière",
      title: "Außergewöhnliche Häuser für unvergessliche Aufenthalte.",
      subtitle:
        "Entdecken Sie unsere Kollektion charaktervoller Häuser in La Cotinière.",
    },
    collection: {
      kicker: "Unsere Kollektion",
      title: "Vier charaktervolle Häuser in La Cotinière.",
      discover: "Entdecken →",
    },
    cotiniereSection: {
      kicker: "Île d'Oléron",
      title: "La Cotinière, ein authentisches Fischerdorf",
      text: "An der Atlantikküste der Île d'Oléron gelegen, ist La Cotinière bekannt für seinen Fischereihafen, einen der aktivsten der Küste, und seine Fischauktion, bei der jeden Morgen der Tagesfang verkauft wird. Zwischen Sandstränden, Küstenradwegen und kleinen Fischrestaurants bietet das Dorf einen authentischen Urlaubsrahmen, nur wenige Gehminuten von jeder unserer Unterkünfte entfernt.",
      learnMoreLink: "Mehr über die Île d'Oléron erfahren →",
    },
    contactSection: {
      title: "Kontakt",
      text: "Eine Frage zu einer Unterkunft, ein besonderer Wunsch? Wir sind für Sie da.",
      emailLabel: "Per E-Mail",
      phoneLabel: "Per Telefon",
    },
    devis: {
      villaNotFound: "Unterkunft nicht gefunden",
      villaNotFoundText:
        "Bitte kehren Sie zu einer unserer Unterkünfte zurück, um Ihre Daten auszuwählen.",
      backHome: "Zurück zur Startseite",
      chooseDatesFirst: "Wählen Sie zuerst Ihre Daten",
      chooseDatesFirstText:
        "Gehen Sie zurück zur Seite von „{{villa}}“ und wählen Sie Ihr An- und Abreisedatum, um Ihr Angebot zu erhalten.",
      seeVilla: "„{{villa}}“ ansehen",
      availableStay: "Aufenthalt verfügbar",
      nightsSuffix: "Nacht/Nächte",
      quoteTitle: "Preis auf Anfrage",
      quoteText: "Für diese Daten kontaktieren Sie uns bitte für ein individuelles Angebot:",
      title: "Ihr Angebot",
      stayInfo: "Angaben zum Aufenthalt",
      adults: "Erwachsene",
      children: "Kinder",
      babies: "Babys",
      pet: "Haustier",
      petNo: "Nein",
      petYes: "Ja",
      capacityExceeded: "Kapazität überschritten.",
      capacityExceededText:
        "Diese Unterkunft nimmt maximal {{max}} Gäste auf (ohne Babys). Bitte kontaktieren Sie den Eigentümer, um Ihre Anfrage zu besprechen.",
      summary: "Zusammenfassung",
      stay: "Miete",
      cleaning: "Endreinigung",
      linen: "Bettwäsche & Handtücher",
      animal: "Haustier",
      total: "Gesamt",
      deposit: "Anzahlung 40 %",
      balance: "Restbetrag (fällig D-30)",
      touristTaxNote:
        "+ Kurtaxe von {{amount}} €, vor Ort bei Ankunft zu zahlen (im obigen Gesamtbetrag nicht enthalten).",
      continue: "Weiter zu meinen Angaben",
    },
    booking: {
      checkAvailability: "Verfügbarkeit prüfen",
      checkButton: "Verfügbarkeit prüfen",
      available: "Aufenthalt verfügbar.",
      continueToQuote: "Weiter zum Angebot",
      notAvailable: "Dieser Zeitraum ist nicht verfügbar.",
      chooseOtherDates: "Bitte wählen Sie andere Daten im Kalender.",
      legendAvailable: "Disponible",
      legendBooked: "Réservé",
      legendSelected: "Sélectionné",
    },
    common: {
      backHome: "Zurück zur Startseite",
      incompleteTitle: "Fehlende Angaben",
      incompleteText:
        "Einige Angaben zu Ihrer Reservierung fehlen. Bitte beginnen Sie den Vorgang erneut.",
    },
    coord: {
      title: "Ihre Kontaktdaten",
      errorsTitle: "Bitte korrigieren Sie Folgendes:",
      errNom: "Der Nachname ist erforderlich.",
      errPrenom: "Der Vorname ist erforderlich.",
      errEmail: "Die E-Mail-Adresse ist ungültig.",
      errTelephone: "Die Mobiltelefonnummer ist erforderlich.",
      errAdresse: "Adresse ist erforderlich.",
      errCodePostal: "Postleitzahl ist erforderlich.",
      errVille: "Stadt ist erforderlich.",
      errPays: "Land ist erforderlich.",
      errCgl: "Sie müssen die Mietbedingungen akzeptieren.",
      nom: "Nachname *",
      prenom: "Vorname *",
      email: "E-Mail-Adresse *",
      telephone: "Mobiltelefon *",
      telephoneFixe: "Festnetz (optional)",
      adresse: "Adresse",
      codePostal: "Postleitzahl",
      ville: "Stadt",
      pays: "Land",
      cglPrefix: "Ich bestätige, dass ich die",
      cglLink: "Mietbedingungen",
      cglSuffix: "gelesen habe und akzeptiere.",
      submit: "Zusammenfassung meiner Reservierung ansehen",
    },
    synthese: {
      title: "Zusammenfassung Ihrer Reservierung",
      villa: "Unterkunft",
      stay: "Aufenthalt",
      nightsSuffix: "Nacht/Nächte",
      travelers: "Gäste",
      adult: "Erwachsener",
      child: "Kind",
      baby: "Baby",
      withAnimal: ", mit Haustier",
      client: "Gast",
      total: "Gesamt",
      depositNow: "Jetzt zu zahlende Anzahlung",
      balance: "Restbetrag (fällig D-30)",
      touristTaxNote:
        "+ Kurtaxe von {{amount}} €, vor Ort bei Ankunft zu zahlen (im obigen Gesamtbetrag nicht enthalten).",
      payNote:
        "Wenn Sie auf die Schaltfläche unten klicken, gelangen Sie zur sicheren Zahlung der Anzahlung.",
      continue: "Zur sicheren Zahlung",
    },
    paiement: {
      title: "Sichere Zahlung",
      redirectText:
        "Sie werden zu Stripe weitergeleitet, um die Anzahlung für Ihren Aufenthalt in „{{villa}}“ zu leisten.",
      errorInit:
        "Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es in Kürze erneut.",
      errorConnect:
        "Bei der Verbindung zur sicheren Zahlung ist ein Fehler aufgetreten.",
      loading: "Weiterleitung läuft...",
      payButton: "Anzahlung sicher bezahlen",
      productNamePrefix: "Anzahlung Reservierung",
      checkoutDescription:
        "Anzahlung Reservierung — {{villa}} vom {{arrival}} bis {{departure}}",
    },
    confirmation: {
      noSessionTitle: "Keine Bestätigung gefunden",
      noSessionText:
        "Wir konnten keine mit dieser Seite verknüpfte Zahlung finden. Falls Sie gerade eine Anzahlung geleistet haben und diese Meldung sehen, kontaktieren Sie uns bitte direkt — Ihre Zahlung wurde möglicherweise dennoch bei Stripe erfasst.",
      notPaidTitle: "Zahlung nicht bestätigt",
      notPaidTextError: "Wir konnten diese Zahlung derzeit nicht überprüfen.",
      notPaidTextPending:
        "Diese Zahlung wurde noch nicht bestätigt (storniert oder noch ausstehend).",
      notPaidContact:
        "Falls Sie glauben, dass dies ein Fehler ist, kontaktieren Sie uns bitte mit der unten stehenden Referenz.",
      reference: "Referenz",
      paidTitle: "Zahlung bestätigt",
      thanksText:
        "Vielen Dank {{name}}, Ihre Anzahlung von {{amount}} € wurde für „{{villa}}“ erfasst.",
      stay: "Aufenthalt",
      total: "Gesamtpreis des Aufenthalts",
      balance: "Restbetrag (fällig D-30)",
      touristTaxNote:
        "+ Kurtaxe von {{amount}} €, vor Ort bei Ankunft zu zahlen.",
      emailSent:
        "Eine Bestätigungs-E-Mail mit Ihrem Vertrag im Anhang wurde an {{email}} gesendet.",
      emailFailed:
        "Die Bestätigungs-E-Mail konnte nicht automatisch gesendet werden. Sie können Ihren Vertrag in der Zwischenzeit unten herunterladen.",
      downloadContract: "Meinen Mietvertrag herunterladen (PDF)",
    },
    villaPage: {
      capacity: "Kapazität",
      bedrooms: "Schlafzimmer",
      bathrooms: "Badezimmer",
      pool: "Pool",
      poolPrivate: "Privat",
      learnMore: "Mehr erfahren",
      hideDescription: "Beschreibung ausblenden",
    },
    conditions: {
      title: "Allgemeine Mietbedingungen",
      intro:
        "Diese allgemeinen Geschäftsbedingungen regeln jede Buchung bei Escale à La Cotinière für eine unserer Unterkünfte (Le Logis du Pêcheur, L'École, Les Mouettes, Le Parour). Jede Buchung setzt die vollständige Annahme dieser Bedingungen voraus.",
      backToBooking: "Zurück zu meiner Reservierung",
      disclaimer:
        "Hinweis: Diese Übersetzung dient nur zur Information. Rechtsverbindlich ist ausschließlich die französische Fassung.",
      frenchLabel: "Französische Fassung (rechtsverbindlich)",
      translatedLabel: "Deutsche Übersetzung",
      contactNote:
        "Bei Fragen zu diesen Bedingungen können Sie uns vor Abschluss Ihrer Reservierung kontaktieren.",
      articles: deArticles,
    },
  },
  es: {
    nav: {
      brand: "Escale à La Cotinière",
      backHome: "← Volver al inicio",
      about: "Quiénes somos",
      collection: "Nuestra Colección",
      cotiniere: "La Cotinière",
      contact: "Contacto",
    },
    hero: {
      kicker: "Isla de Oléron · La Cotinière",
      title: "Casas excepcionales para estancias inolvidables.",
      subtitle:
        "Descubra nuestra colección de casas con encanto en La Cotinière.",
    },
    collection: {
      kicker: "Nuestra Colección",
      title: "Cuatro casas con encanto en La Cotinière.",
      discover: "Descubrir →",
    },
    cotiniereSection: {
      kicker: "Isla de Oléron",
      title: "La Cotinière, un auténtico pueblo de pescadores",
      text: "Situada en la fachada atlántica de la isla de Oléron, La Cotinière es conocida por su puerto pesquero, uno de los más activos de la costa, y su lonja, donde cada mañana se vende la pesca del día. Entre playas de arena fina, senderos costeros para bicicleta y pequeños restaurantes de pescado, el pueblo ofrece un ambiente de vacaciones auténtico, a pocos minutos a pie de cada una de nuestras casas.",
      learnMoreLink: "Más información sobre la Île d'Oléron →",
    },
    contactSection: {
      title: "Contacto",
      text: "¿Alguna pregunta sobre una casa, una solicitud especial? Estamos a su disposición.",
      emailLabel: "Por correo electrónico",
      phoneLabel: "Por teléfono",
    },
    devis: {
      villaNotFound: "Casa no encontrada",
      villaNotFoundText:
        "Vuelva a la ficha de una de nuestras casas para elegir sus fechas.",
      backHome: "Volver al inicio",
      chooseDatesFirst: "Elija primero sus fechas",
      chooseDatesFirstText:
        "Vuelva a la página de «{{villa}}» y seleccione sus fechas de llegada y salida para obtener su presupuesto.",
      seeVilla: "Ver «{{villa}}»",
      availableStay: "Estancia disponible",
      nightsSuffix: "noche(s)",
      quoteTitle: "Precio bajo petición",
      quoteText: "Para estas fechas, contáctenos para obtener un presupuesto personalizado:",
      title: "Su presupuesto",
      stayInfo: "Información de la estancia",
      adults: "Adultos",
      children: "Niños",
      babies: "Bebés",
      pet: "Mascota",
      petNo: "No",
      petYes: "Sí",
      capacityExceeded: "Capacidad superada.",
      capacityExceededText:
        "Esta casa admite un máximo de {{max}} huéspedes (sin contar bebés). Contacte con el propietario para estudiar su solicitud.",
      summary: "Resumen",
      stay: "Alojamiento",
      cleaning: "Limpieza",
      linen: "Sábanas y toallas",
      animal: "Mascota",
      total: "Total",
      deposit: "Depósito 40 %",
      balance: "Saldo a pagar (D-30)",
      touristTaxNote:
        "+ Tasa turística de {{amount}} €, a pagar in situ a su llegada (no incluida en el total anterior).",
      continue: "Continuar a mis datos",
    },
    booking: {
      checkAvailability: "Comprobar disponibilidad",
      checkButton: "Comprobar disponibilidad",
      available: "Estancia disponible.",
      continueToQuote: "Continuar al presupuesto",
      notAvailable: "Este período no está disponible.",
      chooseOtherDates: "Elija otras fechas en el calendario.",
      legendAvailable: "Disponible",
      legendBooked: "Réservé",
      legendSelected: "Sélectionné",
    },
    common: {
      backHome: "Volver al inicio",
      incompleteTitle: "Información incompleta",
      incompleteText:
        "Falta información de su reserva. Por favor, reinicie el proceso desde el principio.",
    },
    coord: {
      title: "Sus datos",
      errorsTitle: "Corrija lo siguiente:",
      errNom: "El apellido es obligatorio.",
      errPrenom: "El nombre es obligatorio.",
      errEmail: "La dirección de correo electrónico no es válida.",
      errTelephone: "El número de móvil es obligatorio.",
      errAdresse: "La dirección es obligatoria.",
      errCodePostal: "El código postal es obligatorio.",
      errVille: "La ciudad es obligatoria.",
      errPays: "El país es obligatorio.",
      errCgl: "Debe aceptar las condiciones generales de alquiler.",
      nom: "Apellido *",
      prenom: "Nombre *",
      email: "Correo electrónico *",
      telephone: "Móvil *",
      telephoneFixe: "Teléfono fijo (opcional)",
      adresse: "Dirección",
      codePostal: "Código postal",
      ville: "Ciudad",
      pays: "País",
      cglPrefix: "Confirmo que he leído las",
      cglLink: "condiciones generales de alquiler",
      cglSuffix: "y las acepto.",
      submit: "Ver el resumen de mi reserva",
    },
    synthese: {
      title: "Resumen de su reserva",
      villa: "Casa",
      stay: "Estancia",
      nightsSuffix: "noche(s)",
      travelers: "Huéspedes",
      adult: "adulto",
      child: "niño",
      baby: "bebé",
      withAnimal: ", con mascota",
      client: "Huésped",
      total: "Total",
      depositNow: "Depósito a pagar ahora",
      balance: "Saldo a pagar (D-30)",
      touristTaxNote:
        "+ Tasa turística de {{amount}} €, a pagar in situ a su llegada (no incluida en el total anterior).",
      payNote:
        "Al hacer clic en el botón de abajo, será dirigido al pago seguro del depósito.",
      continue: "Ir al pago seguro",
    },
    paiement: {
      title: "Pago seguro",
      redirectText:
        "Será redirigido a Stripe para pagar el depósito de su estancia en «{{villa}}».",
      errorInit:
        "No se pudo iniciar el pago. Vuelva a intentarlo en unos instantes.",
      errorConnect:
        "Se produjo un error al conectar con el pago seguro.",
      loading: "Redirigiendo...",
      payButton: "Pagar mi depósito seguro",
      productNamePrefix: "Depósito de reserva",
      checkoutDescription:
        "Depósito de reserva — {{villa}} del {{arrival}} al {{departure}}",
    },
    confirmation: {
      noSessionTitle: "No se encontró confirmación",
      noSessionText:
        "No hemos encontrado ningún pago asociado a esta página. Si acaba de pagar un depósito y ve este mensaje, contáctenos directamente — su pago puede haberse registrado igualmente en Stripe.",
      notPaidTitle: "Pago no confirmado",
      notPaidTextError: "No hemos podido verificar este pago en este momento.",
      notPaidTextPending:
        "Este pago aún no ha sido validado (cancelado o pendiente).",
      notPaidContact:
        "Si cree que se trata de un error, contáctenos indicando la referencia a continuación.",
      reference: "Referencia",
      paidTitle: "Pago confirmado",
      thanksText:
        "Gracias {{name}}, su depósito de {{amount}} € ha sido registrado para «{{villa}}».",
      stay: "Estancia",
      total: "Total de la estancia",
      balance: "Saldo pendiente (D-30)",
      touristTaxNote:
        "+ Tasa turística de {{amount}} €, a pagar in situ a su llegada.",
      emailSent:
        "Se le ha enviado un correo de confirmación con su contrato adjunto a {{email}}.",
      emailFailed:
        "El correo de confirmación no pudo enviarse automáticamente. Mientras tanto, puede descargar su contrato a continuación.",
      downloadContract: "Descargar mi contrato de alquiler (PDF)",
    },
    villaPage: {
      capacity: "Capacidad",
      bedrooms: "Dormitorios",
      bathrooms: "Baños",
      pool: "Piscina",
      poolPrivate: "Privada",
      learnMore: "Saber más",
      hideDescription: "Ocultar descripción",
    },
    conditions: {
      title: "Condiciones generales de alquiler",
      intro:
        "Estas condiciones generales rigen cualquier reserva realizada con Escale à La Cotinière para una de nuestras casas (Le Logis du Pêcheur, L'École, Les Mouettes, Le Parour). Toda reserva implica la aceptación plena de estas condiciones.",
      backToBooking: "Volver a mi reserva",
      disclaimer:
        "Nota: esta traducción se proporciona únicamente a título informativo. Solo la versión francesa tiene validez legal.",
      frenchLabel: "Versión francesa (con validez legal)",
      translatedLabel: "Traducción al español",
      contactNote:
        "Para cualquier pregunta sobre estas condiciones, puede contactarnos antes de finalizar su reserva.",
      articles: esArticles,
    },
  },
} as const;
