import { NextResponse } from "next/server";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

const villas = {
  logis: {
    title: "Le Logis du Pêcheur",
    owner: "SCI DS Gestion",
    rcs: "RCS Poitiers 808 548 903",
    address: "7 rue du Logis – 17310 Saint-Pierre d’Oléron",
    capacity: 11,
    depositGuarantee: 2500,
    annex:
      "Maison de 200 m² comprenant quatre chambres, quatre salles de bain, piscine, jardin, terrasse, cuisine équipée, parking, Wi-Fi, chauffage par le sol.",
  },
  ecole: {
    title: "L’École",
    owner: "SCI COTIONE",
    rcs: "RCS Poitiers D 831 628 177",
    address: "37 avenue des Pins – 17310 Saint-Pierre d’Oléron",
    capacity: 12,
    depositGuarantee: 1000,
    annex:
      "Maison de 210 m² comprenant cinq chambres, cinq salles de bain, piscine, jardin, terrasse, cuisine équipée, parking, Wi-Fi, chauffage par le sol.",
  },
  mouettes: {
    title: "Les Mouettes",
    owner: "SCI COTIONE",
    rcs: "RCS Poitiers D 831 628 177",
    address: "23 rue des Mouettes – 17310 Saint-Pierre d’Oléron",
    capacity: 8,
    depositGuarantee: 1500,
    annex:
      "Maison de 167 m² comprenant quatre chambres, trois salles de bain, piscine chauffée, jardin, terrasse, cuisine équipée, parking, Wi-Fi.",
  },
  parour: {
    title: "Le Parour",
    owner: "SCI DS Gestion",
    rcs: "RCS Poitiers 808 548 903",
    address: "19 rue du Bon Accueil – 17310 Saint-Pierre d’Oléron",
    capacity: 10,
    depositGuarantee: 2450,
    annex:
      "Ensemble composé de la maison du Parour et du chai du Parour, avec cinq chambres, piscine, jardin, terrasse, cuisine équipée, parking, Wi-Fi.",
  },
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
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
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const villaSlug = searchParams.get("villa") || "logis";
  const villa = villas[villaSlug as keyof typeof villas] || villas.logis;

  const clientName = searchParams.get("client") || "Client à compléter";
  const arrival = searchParams.get("arrival") || "date d’arrivée";
  const departure = searchParams.get("departure") || "date de départ";
  const total = Number(searchParams.get("total") || 0);
  const deposit = Number(searchParams.get("deposit") || 0);
  const balance = total - deposit;

  const pdf = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Contrat de location meublée saisonnière{"\n"}
          {villa.title}
        </Text>

        <Text style={styles.paragraph}>
          Entre les soussignés : {villa.owner}, société civile immobilière,
          {villa.rcs}, représentée par Monsieur Dominique Stepec, gérant,
          ci-après désignée « le Bailleur ».
        </Text>

        <Text style={styles.paragraph}>
          Et : {clientName}, ci-après désigné « le Preneur ».
        </Text>

        <Text style={styles.sectionTitle}>Article 1. Objet</Text>
        <Text style={styles.paragraph}>
          Le Bailleur donne à louer au Preneur, qui accepte, les locaux meublés
          sis {villa.address}, comprenant un ensemble désigné comme «{" "}
          {villa.title} ».
        </Text>

        <Text style={styles.sectionTitle}>Article 2. Durée de la location</Text>
        <Text style={styles.paragraph}>
          La présente location est consentie du {arrival} à partir de 16h00 pour
          se terminer le {departure} à 11h00.
        </Text>

        <Text style={styles.sectionTitle}>Article 3. Obligations du Preneur</Text>
        <Text style={styles.paragraph}>
          Le Preneur s’engage à user paisiblement des lieux, à respecter la
          destination contractuelle, à ne pas troubler le voisinage et à ne pas
          faire occuper les lieux par un nombre de personnes supérieur à{" "}
          {villa.capacity}.
        </Text>

        <Text style={styles.sectionTitle}>Article 4. Obligations du Bailleur</Text>
        <Text style={styles.paragraph}>
          Le Bailleur s’engage à délivrer au Preneur le logement loué en bon
          état d’usage et de réparation, avec ses équipements.
        </Text>

        <Text style={styles.sectionTitle}>Article 5. Loyer</Text>
        <Text style={styles.paragraph}>
          La présente location est consentie moyennant un montant total de{" "}
          {total.toFixed(2)} euros.
        </Text>
        <Text style={styles.paragraph}>
          Le Preneur verse à la réservation, à titre d’arrhes, la somme de{" "}
          {deposit.toFixed(2)} euros. Le solde, soit {balance.toFixed(2)} euros,
          sera réglé 30 jours avant l’arrivée.
        </Text>

        <Text style={styles.sectionTitle}>Article 6. Dépôt de garantie</Text>
        <Text style={styles.paragraph}>
          Le Preneur devra verser au Bailleur le jour de la prise de possession
          des lieux une somme de {villa.depositGuarantee} euros à titre de dépôt
          de garantie.
        </Text>

        <Text style={styles.sectionTitle}>Article 7. Taxe de séjour</Text>
        <Text style={styles.paragraph}>
          La taxe de séjour est à régler selon les conditions applicables.
        </Text>

        <Text style={styles.sectionTitle}>Article 8. Services</Text>
        <Text style={styles.paragraph}>
          Le service de réception / conciergerie est ouvert de 8h30 à 20h30 au
          numéro communiqué avant l’arrivée.
        </Text>

        <Text style={styles.sectionTitle}>Article 9. Annulation</Text>
        <Text style={styles.paragraph}>
          La signature du Contrat engage les Parties de manière irrévocable.
          Aucune résiliation n’est possible sauf accord écrit des Parties.
        </Text>

        <Text style={styles.sectionTitle}>Article 10. Cession et sous-location</Text>
        <Text style={styles.paragraph}>
          Toute cession du présent bail, toute sous-location totale ou partielle,
          sont interdites.
        </Text>

        <Text style={styles.sectionTitle}>Article 11. Assurance</Text>
        <Text style={styles.paragraph}>
          Le locataire produira à son arrivée une attestation d’assurance
          villégiature.
        </Text>

        <Text style={styles.sectionTitle}>Article 12. État des lieux</Text>
        <Text style={styles.paragraph}>
          Un état des lieux sera établi contradictoirement entre les Parties lors
          de l’entrée et de la sortie.
        </Text>

        <Text style={styles.sectionTitle}>Article 13. Droit applicable</Text>
        <Text style={styles.paragraph}>
          Le présent contrat est régi par le droit français.
        </Text>

        <Text style={styles.sectionTitle}>Annexe descriptive</Text>
        <Text style={styles.paragraph}>{villa.annex}</Text>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(pdf);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="contrat-${villaSlug}.pdf"`,
    },
  });
}