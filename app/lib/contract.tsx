import path from "path";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  renderToBuffer,
  View,
  Image,
} from "@react-pdf/renderer";

const logoPath = path.join(process.cwd(), "public", "images", "logo.png");

type ContractLocale = "fr" | "en" | "de" | "es";

export const contractVillas = {
  logis: {
    title: "Le Logis du Pêcheur",
    owner: "SCI DS Gestion",
    rcs: "RCS Poitiers 808 548 903",
    address: "7 rue du Logis – 17310 Saint-Pierre d’Oléron",
    capacity: 11,
    depositGuarantee: 2500,
    annex: {
      fr: "Maison de 200 m² pouvant accueillir jusqu'à 13 personnes, répartie en 4 chambres avec salle de bain privative : Chambre Mer (lit double 160x200), Chambre Paille (3 lits simples 80x200), Chambre Pierre (lit double 160x200 et 3 lits simples 80x200) et une chambre en annexe (lit double 160x200) — soit 4 salles de bain au total. Salon-séjour de 40 m² avec canapés convertibles, intégrant la salle à manger (12 couverts) et ouvert sur la grande terrasse. Cuisine équipée haut de gamme. Linge de maison fourni, lave-linge, sèche-linge. Piscine privée, jardin, terrasse en bois, barbecue, parking. 5 téléviseurs, Wi-Fi haut débit, chauffage et rafraîchissement par le sol. Enfants bienvenus.",
      en: "A 200 m² house accommodating up to 13 people, with 4 bedrooms each with a private bathroom: Sea Room (double bed 160x200), Straw Room (3 single beds 80x200), Stone Room (double bed 160x200 and 3 single beds 80x200) and an annex bedroom (double bed 160x200) — 4 bathrooms in total. 40 m² living room with sofa beds, including the dining area (12 seats) and opening onto the large terrace. High-end fitted kitchen. Linen provided, washing machine, tumble dryer. Private pool, garden, wooden terrace, barbecue, parking. 5 televisions, high-speed Wi-Fi, underfloor heating and cooling. Children welcome.",
      de: "Haus mit 200 m² für bis zu 13 Personen, mit 4 Schlafzimmern, jeweils mit eigenem Bad: Zimmer Meer (Doppelbett 160x200), Zimmer Stroh (3 Einzelbetten 80x200), Zimmer Stein (Doppelbett 160x200 und 3 Einzelbetten 80x200) sowie ein Nebenzimmer (Doppelbett 160x200) — insgesamt 4 Badezimmer. Wohnzimmer von 40 m² mit Schlafsofas, mit Essbereich (12 Sitzplätze) und Zugang zur großen Terrasse. Hochwertige Einbauküche. Bettwäsche vorhanden, Waschmaschine, Trockner. Privater Pool, Garten, Holzterrasse, Grill, Parkplatz. 5 Fernseher, schnelles WLAN, Fußbodenheizung und -kühlung. Kinder willkommen.",
      es: "Casa de 200 m² con capacidad para 13 personas, con 4 dormitorios con baño privado cada uno: Habitación Mar (cama doble 160x200), Habitación Paja (3 camas individuales 80x200), Habitación Piedra (cama doble 160x200 y 3 camas individuales 80x200) y una habitación anexa (cama doble 160x200) — 4 baños en total. Salón-comedor de 40 m² con sofás cama, que integra el comedor (12 comensales) y se abre a la gran terraza. Cocina equipada de alta gama. Ropa de cama incluida, lavadora, secadora. Piscina privada, jardín, terraza de madera, barbacoa, aparcamiento. 5 televisores, Wi-Fi de alta velocidad, calefacción y refrigeración por suelo radiante. Niños bienvenidos.",
    },
  },
  ecole: {
    title: "L’École",
    owner: "SCI COTIONE",
    rcs: "RCS Poitiers D 831 628 177",
    address: "37 avenue des Pins – 17310 Saint-Pierre d’Oléron",
    capacity: 12,
    depositGuarantee: 1000,
    annex: {
      fr: "Maison de 210 m² pouvant accueillir jusqu'à 12 personnes, répartie en 5 chambres, avec 5 salles de bain. Salon-séjour de 50 m² intégrant la salle à manger (12 couverts) et ouvert sur la grande terrasse. Cuisine équipée haut de gamme. Linge de maison fourni, lave-linge, sèche-linge. Piscine chauffée de 11 x 4,5 m sécurisée par volet roulant électrique. Jardin, terrasse en bois, barbecue, parking. 5 téléviseurs, Wi-Fi haut débit, chauffage et rafraîchissement par le sol. Enfants bienvenus.",
      en: "A 210 m² house accommodating up to 12 people, with 5 bedrooms and 5 bathrooms. 50 m² living room including the dining area (12 seats) and opening onto the large terrace. High-end fitted kitchen. Linen provided, washing machine, tumble dryer. Heated pool 11 x 4.5 m, secured by an electric roller shutter. Garden, wooden terrace, barbecue, parking. 5 televisions, high-speed Wi-Fi, underfloor heating and cooling. Children welcome.",
      de: "Haus mit 210 m² für bis zu 12 Personen, mit 5 Schlafzimmern und 5 Badezimmern. Wohnzimmer von 50 m² mit Essbereich (12 Sitzplätze) und Zugang zur großen Terrasse. Hochwertige Einbauküche. Bettwäsche vorhanden, Waschmaschine, Trockner. Beheizter Pool 11 x 4,5 m, gesichert durch elektrischen Rollladen. Garten, Holzterrasse, Grill, Parkplatz. 5 Fernseher, schnelles WLAN, Fußbodenheizung und -kühlung. Kinder willkommen.",
      es: "Casa de 210 m² con capacidad para 12 personas, con 5 dormitorios y 5 baños. Salón de 50 m² que integra el comedor (12 comensales) y se abre a la gran terraza. Cocina equipada de alta gama. Ropa de cama incluida, lavadora, secadora. Piscina climatizada de 11 x 4,5 m, asegurada con persiana eléctrica. Jardín, terraza de madera, barbacoa, aparcamiento. 5 televisores, Wi-Fi de alta velocidad, calefacción y refrigeración por suelo radiante. Niños bienvenidos.",
    },
  },
  mouettes: {
    title: "Les Mouettes",
    owner: "SCI COTIONE",
    rcs: "RCS Poitiers D 831 628 177",
    address: "23 rue des Mouettes – 17310 Saint-Pierre d’Oléron",
    capacity: 8,
    depositGuarantee: 1500,
    annex: {
      fr: "Maison de 167 m² pouvant accueillir jusqu'à 8 personnes, répartie en 4 chambres, avec 3 salles de bain. Salon-séjour de 60 m² intégrant la salle à manger (10 couverts) et ouvert sur la grande terrasse. Cuisine équipée haut de gamme. Linge de maison fourni, lave-linge, sèche-linge. Piscine chauffée de 9 x 4,5 m sécurisée par volet roulant électrique. Jardin, terrasse en bois, barbecue, parking. 5 téléviseurs, Wi-Fi haut débit, chauffage et rafraîchissement par le sol. Enfants bienvenus.",
      en: "A 167 m² house accommodating up to 8 people, with 4 bedrooms and 3 bathrooms. 60 m² living room including the dining area (10 seats) and opening onto the large terrace. High-end fitted kitchen. Linen provided, washing machine, tumble dryer. Heated pool 9 x 4.5 m, secured by an electric roller shutter. Garden, wooden terrace, barbecue, parking. 5 televisions, high-speed Wi-Fi, underfloor heating and cooling. Children welcome.",
      de: "Haus mit 167 m² für bis zu 8 Personen, mit 4 Schlafzimmern und 3 Badezimmern. Wohnzimmer von 60 m² mit Essbereich (10 Sitzplätze) und Zugang zur großen Terrasse. Hochwertige Einbauküche. Bettwäsche vorhanden, Waschmaschine, Trockner. Beheizter Pool 9 x 4,5 m, gesichert durch elektrischen Rollladen. Garten, Holzterrasse, Grill, Parkplatz. 5 Fernseher, schnelles WLAN, Fußbodenheizung und -kühlung. Kinder willkommen.",
      es: "Casa de 167 m² con capacidad para 8 personas, con 4 dormitorios y 3 baños. Salón de 60 m² que integra el comedor (10 comensales) y se abre a la gran terraza. Cocina equipada de alta gama. Ropa de cama incluida, lavadora, secadora. Piscina climatizada de 9 x 4,5 m, asegurada con persiana eléctrica. Jardín, terraza de madera, barbacoa, aparcamiento. 5 televisores, Wi-Fi de alta velocidad, calefacción y refrigeración por suelo radiante. Niños bienvenidos.",
    },
  },
  parour: {
    title: "Le Parour",
    owner: "SCI DS Gestion",
    rcs: "RCS Poitiers 808 548 903",
    address: "19 rue du Bon Accueil – 17310 Saint-Pierre d’Oléron",
    capacity: 10,
    depositGuarantee: 2450,
    annex: {
      fr: "Ensemble composé de deux logements. La Maison du Parour (130 m²) comprend 3 chambres pour 6 personnes, 3 salles de bain, un salon-séjour intégrant la salle à manger et la cuisine autour d'une cheminée saintongeaise typique. Le Chai du Parour (40 m²) comprend 1 à 2 chambres, une salle de bain, un salon-séjour ouvert sur une terrasse et la piscine. Cuisine équipée haut de gamme dans les deux logements. Linge de maison fourni, lave-linge, sèche-linge. Piscine chauffée et sécurisée de 9 x 4,5 m, jardin, terrasses, barbecue, Wi-Fi haut débit, chauffage par le sol. Enfants bienvenus.",
      en: "A property comprising two dwellings. The Parour House (130 m²) has 3 bedrooms for 6 people, 3 bathrooms, and a living room including the dining area and kitchen around a typical Saintonge fireplace. The Parour Chai (40 m²) has 1 to 2 bedrooms, a bathroom, and a living room opening onto a terrace and the pool. High-end fitted kitchen in both dwellings. Linen provided, washing machine, tumble dryer. Heated and secured pool 9 x 4.5 m, garden, terraces, barbecue, high-speed Wi-Fi, underfloor heating. Children welcome.",
      de: "Anwesen mit zwei Wohneinheiten. Das Haus Parour (130 m²) verfügt über 3 Schlafzimmer für 6 Personen, 3 Badezimmer und ein Wohnzimmer mit Essbereich und Küche um einen typischen Saintonge-Kamin. Das Chai du Parour (40 m²) verfügt über 1 bis 2 Schlafzimmer, ein Badezimmer und ein Wohnzimmer mit Zugang zu einer Terrasse und dem Pool. Hochwertige Einbauküche in beiden Wohneinheiten. Bettwäsche vorhanden, Waschmaschine, Trockner. Beheizter und gesicherter Pool 9 x 4,5 m, Garten, Terrassen, Grill, schnelles WLAN, Fußbodenheizung. Kinder willkommen.",
      es: "Conjunto compuesto por dos viviendas. La Casa del Parour (130 m²) cuenta con 3 dormitorios para 6 personas, 3 baños y un salón que integra el comedor y la cocina alrededor de una chimenea típica de Saintonge. El Chai del Parour (40 m²) cuenta con 1 a 2 dormitorios, un baño y un salón que se abre a una terraza y la piscina. Cocina equipada de alta gama en ambas viviendas. Ropa de cama incluida, lavadora, secadora. Piscina climatizada y segura de 9 x 4,5 m, jardín, terrazas, barbacoa, Wi-Fi de alta velocidad, calefacción por suelo radiante. Niños bienvenidos.",
    },
  },
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: "#082f3a",
  },
  villaTitle: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 24,
    color: "#082f3a",
  },
  sectionTitle: {
    fontSize: 15,
    marginTop: 14,
    marginBottom: 6,
    color: "#2f6fa3",
  },
  paragraph: {
    marginBottom: 8,
  },
  disclaimer: {
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    fontSize: 10,
    fontStyle: "italic",
    color: "#7a5b00",
    backgroundColor: "#fff6df",
  },
  frenchVersionHeading: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 26,
    marginBottom: 20,
    color: "#082f3a",
  },
  logoHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoCaption: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: 700,
    color: "#082f3a",
    letterSpacing: 1,
  },
  logoCaptionSmall: {
    marginTop: 2,
    fontSize: 9,
    color: "#8a755d",
  },
});

function formatDateFr(isoDate: string): string {
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const [year, month, day] = parts;
  return `${day}-${month}-${year}`;
}

export type ContractParams = {
  villaSlug: string;
  clientName: string;
  clientAddress?: string;
  clientPhone?: string;
  arrival: string;
  departure: string;
  total: number;
  deposit: number;
  nights?: number;
  pricePerNight?: number;
  stayPrice?: number;
  cleaningFee?: number;
  linenFee?: number;
  petFee?: number;
  touristTax?: number;
  locale?: ContractLocale;
};

const labels: Record<ContractLocale, Record<string, string>> = {
  fr: {
    titleMain: "Contrat de location meublée saisonnière",
    between:
      "Entre les soussignés : {owner}, société civile immobilière, {rcs}, représentée par Monsieur Dominique Stepec, gérant, ci-après désignée « le Bailleur ».",
    and: "Et : {clientName}{address}{phone}, ci-après désigné « le Preneur ».",
    addressPart: ", demeurant {address}",
    phonePart: ", téléphone {phone}",
    article1Title: "Article 1. Objet",
    article1:
      "Le Bailleur donne à louer au Preneur, qui accepte, les locaux meublés sis {address}, comprenant un ensemble désigné comme « {title} ».",
    article2Title: "Article 2. Durée de la location",
    article2:
      "La présente location est consentie du {arrival} à partir de 16h00 pour se terminer le {departure} à 11h00.",
    article3Title: "Article 3. Obligations du Preneur",
    article3:
      "Le Preneur s’engage à user paisiblement des lieux, à respecter la destination contractuelle, à ne pas troubler le voisinage et à ne pas faire occuper les lieux par un nombre de personnes supérieur à {capacity}.",
    article4Title: "Article 4. Obligations du Bailleur",
    article4:
      "Le Bailleur s’engage à délivrer au Preneur le logement loué en bon état d’usage et de réparation, avec ses équipements.",
    article5Title: "Article 5. Loyer",
    article5Breakdown: "Le loyer se décompose de la façon suivante :",
    lineLocation: "- Location ({nights} nuit(s) à {pricePerNight} € / nuit) : {stayPrice} €",
    lineCleaning: "- Ménage de fin de séjour : {cleaningFee} €",
    lineLinen: "- Draps et serviettes : {linenFee} €",
    linePet: "- Supplément animal : {petFee} €",
    totalLine:
      "Soit un montant total de {total} euros (hors taxe de séjour, voir Article 7).",
    depositLine:
      "Le Preneur verse à la réservation, à titre d’acompte, la somme de {deposit} euros. Le solde, soit {balance} euros, sera réglé 30 jours avant l’arrivée.",
    article6Title: "Article 6. Dépôt de garantie",
    article6:
      "Le Preneur devra verser au Bailleur le jour de la prise de possession des lieux une somme de {depositGuarantee} euros à titre de dépôt de garantie.",
    article7Title: "Article 7. Taxe de séjour",
    article7:
      "La taxe de séjour, d’un montant estimé à {touristTax} euros pour ce séjour, n’est pas incluse dans le montant du loyer ci-dessus. Elle est à régler sur place, à l’arrivée, selon les conditions applicables.",
    article8Title: "Article 8. Services",
    article8:
      "Le service de réception / conciergerie est ouvert de 8h30 à 20h30 au numéro communiqué avant l’arrivée.",
    article9Title: "Article 9. Annulation",
    article9:
      "La signature du Contrat engage les Parties de manière irrévocable. Aucune résiliation n’est possible sauf accord écrit des Parties.",
    article10Title: "Article 10. Cession et sous-location",
    article10:
      "Toute cession du présent bail, toute sous-location totale ou partielle, sont interdites.",
    article11Title: "Article 11. Assurance",
    article11:
      "Le locataire produira à son arrivée une attestation d’assurance villégiature.",
    article12Title: "Article 12. État des lieux",
    article12:
      "Un état des lieux sera établi contradictoirement entre les Parties lors de l’entrée et de la sortie.",
    article13Title: "Article 13. Droit applicable",
    article13: "Le présent contrat est régi par le droit français.",
    annexTitle: "Annexe descriptive",
    disclaimer: "",
    frenchVersionHeading: "",
  },
  en: {
    titleMain: "Seasonal Furnished Rental Agreement",
    between:
      "Between the undersigned: {owner}, a French civil real estate company (SCI), {rcs}, represented by Mr. Dominique Stepec, manager, hereinafter referred to as the \"Landlord\".",
    and: "And: {clientName}{address}{phone}, hereinafter referred to as the \"Tenant\".",
    addressPart: ", residing at {address}",
    phonePart: ", phone {phone}",
    article1Title: "Article 1. Purpose",
    article1:
      "The Landlord lets to the Tenant, who accepts, the furnished premises located at {address}, forming the property known as \"{title}\".",
    article2Title: "Article 2. Rental period",
    article2:
      "This rental is granted from {arrival} from 4:00 p.m. until {departure} at 11:00 a.m.",
    article3Title: "Article 3. Tenant's obligations",
    article3:
      "The Tenant undertakes to make peaceful use of the premises, to respect their intended use, not to disturb the neighbourhood, and not to allow occupancy by more than {capacity} people.",
    article4Title: "Article 4. Landlord's obligations",
    article4:
      "The Landlord undertakes to hand over to the Tenant the rented property in good working order and repair, together with its equipment.",
    article5Title: "Article 5. Rent",
    article5Breakdown: "The rent is broken down as follows:",
    lineLocation: "- Accommodation ({nights} night(s) at {pricePerNight} €/night): {stayPrice} €",
    lineCleaning: "- End-of-stay cleaning: {cleaningFee} €",
    lineLinen: "- Sheets and towels: {linenFee} €",
    linePet: "- Pet supplement: {petFee} €",
    totalLine:
      "That is, a total amount of {total} euros (excluding tourist tax, see Article 7).",
    depositLine:
      "The Tenant pays, at the time of booking, a deposit of {deposit} euros. The balance, i.e. {balance} euros, will be paid 30 days before arrival.",
    article6Title: "Article 6. Security deposit",
    article6:
      "The Tenant must pay the Landlord, on the day of taking possession of the premises, a sum of {depositGuarantee} euros as a security deposit.",
    article7Title: "Article 7. Tourist tax",
    article7:
      "The tourist tax, estimated at {touristTax} euros for this stay, is not included in the rent above. It is payable on site upon arrival, in accordance with the applicable conditions.",
    article8Title: "Article 8. Services",
    article8:
      "The reception / concierge service is open from 8:30 a.m. to 8:30 p.m. at the number provided before arrival.",
    article9Title: "Article 9. Cancellation",
    article9:
      "Signing the Contract binds the Parties irrevocably. No termination is possible except by written agreement of the Parties.",
    article10Title: "Article 10. Assignment and subletting",
    article10:
      "Any assignment of this lease, and any total or partial subletting, are prohibited.",
    article11Title: "Article 11. Insurance",
    article11:
      "The tenant will provide, on arrival, proof of holiday-home liability insurance.",
    article12Title: "Article 12. Inventory of condition",
    article12:
      "A joint inventory of condition will be drawn up between the Parties upon check-in and check-out.",
    article13Title: "Article 13. Applicable law",
    article13: "This contract is governed by French law.",
    annexTitle: "Descriptive annex",
    disclaimer:
      "Note: this translation is provided for information purposes only. Only the French version below is legally binding.",
    frenchVersionHeading: "French version (legally binding)",
  },
  de: {
    titleMain: "Saisonaler Mietvertrag für möblierten Wohnraum",
    between:
      "Zwischen den Unterzeichnenden: {owner}, eine französische Immobiliengesellschaft (SCI), {rcs}, vertreten durch Herrn Dominique Stepec, Geschäftsführer, im Folgenden „der Vermieter“ genannt.",
    and: "Und: {clientName}{address}{phone}, im Folgenden „der Mieter“ genannt.",
    addressPart: ", wohnhaft in {address}",
    phonePart: ", Telefon {phone}",
    article1Title: "Artikel 1. Gegenstand",
    article1:
      "Der Vermieter vermietet dem Mieter, der annimmt, die möblierten Räumlichkeiten in {address}, die die Unterkunft „{title}“ bilden.",
    article2Title: "Artikel 2. Mietdauer",
    article2:
      "Diese Vermietung wird ab dem {arrival} ab 16:00 Uhr bis zum {departure} um 11:00 Uhr gewährt.",
    article3Title: "Artikel 3. Pflichten des Mieters",
    article3:
      "Der Mieter verpflichtet sich, die Räumlichkeiten friedlich zu nutzen, ihre vertragsgemäße Bestimmung zu respektieren, die Nachbarschaft nicht zu stören und die Räumlichkeiten nicht mit mehr als {capacity} Personen zu belegen.",
    article4Title: "Artikel 4. Pflichten des Vermieters",
    article4:
      "Der Vermieter verpflichtet sich, dem Mieter die gemietete Unterkunft in gutem Gebrauchs- und Reparaturzustand samt Ausstattung zu übergeben.",
    article5Title: "Artikel 5. Miete",
    article5Breakdown: "Die Miete setzt sich wie folgt zusammen:",
    lineLocation: "- Unterkunft ({nights} Nacht/Nächte à {pricePerNight} € / Nacht): {stayPrice} €",
    lineCleaning: "- Endreinigung: {cleaningFee} €",
    lineLinen: "- Bettwäsche und Handtücher: {linenFee} €",
    linePet: "- Haustierzuschlag: {petFee} €",
    totalLine:
      "Das ergibt einen Gesamtbetrag von {total} Euro (ohne Kurtaxe, siehe Artikel 7).",
    depositLine:
      "Der Mieter zahlt bei der Buchung eine Anzahlung von {deposit} Euro. Der Restbetrag von {balance} Euro wird 30 Tage vor der Ankunft fällig.",
    article6Title: "Artikel 6. Kaution",
    article6:
      "Der Mieter muss dem Vermieter am Tag der Übernahme der Räumlichkeiten eine Kaution in Höhe von {depositGuarantee} Euro zahlen.",
    article7Title: "Artikel 7. Kurtaxe",
    article7:
      "Die Kurtaxe, geschätzt auf {touristTax} Euro für diesen Aufenthalt, ist in der obigen Miete nicht enthalten. Sie ist vor Ort bei Ankunft gemäß den geltenden Bedingungen zu zahlen.",
    article8Title: "Artikel 8. Dienstleistungen",
    article8:
      "Der Empfangs-/Concierge-Service ist von 8:30 bis 20:30 Uhr unter der vor Ankunft mitgeteilten Nummer erreichbar.",
    article9Title: "Artikel 9. Kündigung",
    article9:
      "Die Unterzeichnung des Vertrags verpflichtet die Parteien unwiderruflich. Eine Kündigung ist nur mit schriftlicher Zustimmung der Parteien möglich.",
    article10Title: "Artikel 10. Abtretung und Untervermietung",
    article10:
      "Jede Abtretung dieses Mietvertrags sowie jede vollständige oder teilweise Untervermietung sind untersagt.",
    article11Title: "Artikel 11. Versicherung",
    article11:
      "Der Mieter legt bei Ankunft einen Nachweis über eine Ferienhaus-Haftpflichtversicherung vor.",
    article12Title: "Artikel 12. Zustandsprotokoll",
    article12:
      "Bei Ein- und Auszug wird gemeinsam ein Zustandsprotokoll zwischen den Parteien erstellt.",
    article13Title: "Artikel 13. Anwendbares Recht",
    article13: "Dieser Vertrag unterliegt französischem Recht.",
    annexTitle: "Beschreibende Anlage",
    disclaimer:
      "Hinweis: Diese Übersetzung dient nur zur Information. Rechtsverbindlich ist ausschließlich die nachstehende französische Fassung.",
    frenchVersionHeading: "Französische Fassung (rechtsverbindlich)",
  },
  es: {
    titleMain: "Contrato de alquiler temporal amueblado",
    between:
      "Entre los abajo firmantes: {owner}, sociedad civil inmobiliaria francesa (SCI), {rcs}, representada por el Sr. Dominique Stepec, gerente, en adelante «el Arrendador».",
    and: "Y: {clientName}{address}{phone}, en adelante «el Arrendatario».",
    addressPart: ", con domicilio en {address}",
    phonePart: ", teléfono {phone}",
    article1Title: "Artículo 1. Objeto",
    article1:
      "El Arrendador alquila al Arrendatario, quien acepta, el local amueblado situado en {address}, que constituye la vivienda denominada «{title}».",
    article2Title: "Artículo 2. Duración del alquiler",
    article2:
      "El presente alquiler se concede desde el {arrival} a partir de las 16:00 h hasta el {departure} a las 11:00 h.",
    article3Title: "Artículo 3. Obligaciones del Arrendatario",
    article3:
      "El Arrendatario se compromete a hacer un uso pacífico de las instalaciones, a respetar su destino contractual, a no molestar a los vecinos y a no permitir la ocupación por un número de personas superior a {capacity}.",
    article4Title: "Artículo 4. Obligaciones del Arrendador",
    article4:
      "El Arrendador se compromete a entregar al Arrendatario la vivienda alquilada en buen estado de uso y conservación, junto con su equipamiento.",
    article5Title: "Artículo 5. Alquiler",
    article5Breakdown: "El alquiler se desglosa de la siguiente manera:",
    lineLocation: "- Alojamiento ({nights} noche(s) a {pricePerNight} € / noche): {stayPrice} €",
    lineCleaning: "- Limpieza de fin de estancia: {cleaningFee} €",
    lineLinen: "- Sábanas y toallas: {linenFee} €",
    linePet: "- Suplemento por mascota: {petFee} €",
    totalLine:
      "Es decir, un importe total de {total} euros (sin incluir la tasa turística, véase el Artículo 7).",
    depositLine:
      "El Arrendatario abona en el momento de la reserva, en concepto de anticipo, la suma de {deposit} euros. El saldo, es decir {balance} euros, se pagará 30 días antes de la llegada.",
    article6Title: "Artículo 6. Depósito de garantía",
    article6:
      "El Arrendatario deberá abonar al Arrendador, el día de la toma de posesión de la vivienda, la suma de {depositGuarantee} euros en concepto de depósito de garantía.",
    article7Title: "Artículo 7. Tasa turística",
    article7:
      "La tasa turística, estimada en {touristTax} euros para esta estancia, no está incluida en el alquiler anterior. Se abona in situ a la llegada, conforme a las condiciones aplicables.",
    article8Title: "Artículo 8. Servicios",
    article8:
      "El servicio de recepción/conserjería está disponible de 8:30 a 20:30 h en el número comunicado antes de la llegada.",
    article9Title: "Artículo 9. Cancelación",
    article9:
      "La firma del Contrato compromete a las Partes de forma irrevocable. Ninguna resolución es posible salvo acuerdo escrito de las Partes.",
    article10Title: "Artículo 10. Cesión y subarriendo",
    article10:
      "Se prohíbe cualquier cesión del presente contrato, así como cualquier subarriendo total o parcial.",
    article11Title: "Artículo 11. Seguro",
    article11:
      "El inquilino presentará a su llegada un justificante de seguro de responsabilidad civil vacacional.",
    article12Title: "Artículo 12. Inventario de estado",
    article12:
      "Se realizará un inventario de estado contradictorio entre las Partes a la entrada y a la salida.",
    article13Title: "Artículo 13. Ley aplicable",
    article13: "El presente contrato se rige por el derecho francés.",
    annexTitle: "Anexo descriptivo",
    disclaimer:
      "Nota: esta traducción se proporciona únicamente a título informativo. Solo la versión francesa siguiente tiene validez legal.",
    frenchVersionHeading: "Versión francesa (con validez legal)",
  },
};

function fill(template: string, vars: Record<string, string | number>): string {
  let result = template;
  Object.entries(vars).forEach(([key, value]) => {
    result = result.replaceAll(`{${key}}`, String(value));
  });
  return result;
}

function buildArticles(
  L: Record<string, string>,
  villa: (typeof contractVillas)[keyof typeof contractVillas],
  params: ContractParams,
  arrivalDate: string,
  departureDate: string,
  balance: number,
  annexText: string
) {
  const vars = {
    owner: villa.owner,
    rcs: villa.rcs,
    address: villa.address,
    title: villa.title,
    capacity: villa.capacity,
    depositGuarantee: villa.depositGuarantee,
    arrival: arrivalDate,
    departure: departureDate,
    nights: params.nights ?? 0,
    pricePerNight: (params.pricePerNight ?? 0).toFixed(2),
    stayPrice: (params.stayPrice ?? 0).toFixed(2),
    cleaningFee: (params.cleaningFee ?? 0).toFixed(2),
    linenFee: (params.linenFee ?? 0).toFixed(2),
    petFee: (params.petFee ?? 0).toFixed(2),
    touristTax: (params.touristTax ?? 0).toFixed(2),
    total: params.total.toFixed(2),
    deposit: params.deposit.toFixed(2),
    balance: balance.toFixed(2),
    clientName: params.clientName,
    address2: params.clientAddress
      ? fill(L.addressPart, { address: params.clientAddress })
      : "",
    phone2: params.clientPhone ? fill(L.phonePart, { phone: params.clientPhone }) : "",
  };

  return (
    <>
      <Text style={styles.title}>{L.titleMain}</Text>
      <Text style={styles.villaTitle}>{villa.title}</Text>

      <Text style={styles.paragraph}>{fill(L.between, vars)}</Text>
      <Text style={styles.paragraph}>
        {fill(L.and, {
          ...vars,
          address: vars.address2,
          phone: vars.phone2,
        })}
      </Text>

      <Text style={styles.sectionTitle}>{L.article1Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article1, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article2Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article2, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article3Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article3, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article4Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article4, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article5Title}</Text>
      <Text style={styles.paragraph}>
        {L.article5Breakdown}
        {"\n"}
        {fill(L.lineLocation, vars)}
        {"\n"}
        {fill(L.lineCleaning, vars)}
        {"\n"}
        {fill(L.lineLinen, vars)}
        {"\n"}
        {fill(L.linePet, vars)}
      </Text>
      <Text style={styles.paragraph}>{fill(L.totalLine, vars)}</Text>
      <Text style={styles.paragraph}>{fill(L.depositLine, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article6Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article6, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article7Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article7, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article8Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article8, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article9Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article9, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article10Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article10, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article11Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article11, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article12Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article12, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.article13Title}</Text>
      <Text style={styles.paragraph}>{fill(L.article13, vars)}</Text>

      <Text style={styles.sectionTitle}>{L.annexTitle}</Text>
      <Text style={styles.paragraph}>{annexText}</Text>
    </>
  );
}

/**
 * Génère le PDF du contrat de location, dans la langue choisie par le
 * client. Si la langue n'est pas le français, la version française
 * complète est ajoutée à la suite (avec mention que seule celle-ci fait
 * foi), car c'est un document légal.
 */
export async function generateContractPdfBuffer(
  params: ContractParams
): Promise<Buffer> {
  const villa =
    contractVillas[params.villaSlug as keyof typeof contractVillas] ??
    contractVillas.logis;

  const locale: ContractLocale = params.locale ?? "fr";
  const balance = params.total - params.deposit;
  const arrivalDate = formatDateFr(params.arrival);
  const departureDate = formatDateFr(params.departure);

  const L = labels[locale];
  const annexText = villa.annex[locale];

  const isFrench = locale === "fr";

  const pdf = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoHeader}>
          <Image src={logoPath} style={{ width: 130, height: 65 }} />
        </View>

        {!isFrench && (
          <Text style={styles.disclaimer}>{L.disclaimer}</Text>
        )}

        {buildArticles(L, villa, params, arrivalDate, departureDate, balance, annexText)}

        {!isFrench && (
          <>
            <Text style={styles.frenchVersionHeading}>
              {L.frenchVersionHeading}
            </Text>
            {buildArticles(
              labels.fr,
              villa,
              params,
              arrivalDate,
              departureDate,
              balance,
              villa.annex.fr
            )}
          </>
        )}
      </Page>
    </Document>
  );

  return renderToBuffer(pdf);
}