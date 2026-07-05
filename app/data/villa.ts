export type Villa = {
  slug: string;
  name: string;
  image: string;
  href: string;
  capacity: string;
  maxTravelers: number;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  pool: string;
  description: string;
  gallery: string[];
};

// ⚠️ pricePerNight est une valeur provisoire pour faire fonctionner le
// tunnel de réservation de bout en bout. Remplacez ces montants par vos
// vrais tarifs par nuit pour chaque demeure.
export const villas: Villa[] = [
  {
    slug: "logis",
    name: "Le Logis du Pêcheur",
    image: "/images/villas/logis/Accueil.jpg",
    href: "/villas/logis",
    capacity: "8 à 11 voyageurs",
    maxTravelers: 11,
    pricePerNight: 380,
    bedrooms: 4,
    bathrooms: 4,
    pool: "Piscine privée",
    description:
      "Grande demeure familiale avec piscine privée, pensée pour les grandes retrouvailles en famille ou entre amis.",
    gallery: ["/images/villas/logis/Accueil.jpg"],
  },
  {
    slug: "ecole",
    name: "L’École",
    image: "/images/villas/ecole/01.jpg",
    href: "/villas/ecole",
    capacity: "12 voyageurs",
    maxTravelers: 12,
    pricePerNight: 420,
    bedrooms: 5,
    bathrooms: 5,
    pool: "Piscine privée",
    description:
      "Maison de caractère avec de beaux volumes, cinq chambres et cinq salles de bains privatives.",
    gallery: ["/images/villas/ecole/01.jpg"],
  },
  {
    slug: "mouettes",
    name: "Les Mouettes",
    image: "/images/villas/mouettes/26 copie.jpg",
    href: "/villas/mouettes",
    capacity: "8 voyageurs",
    maxTravelers: 8,
    pricePerNight: 320,
    bedrooms: 4,
    bathrooms: 4,
    pool: "Piscine privée",
    description:
      "Maison lumineuse et contemporaine, pensée pour les séjours en famille.",
    gallery: ["/images/villas/mouettes/26 copie.jpg"],
  },
  {
    slug: "parour",
    name: "Le Parour",
    image: "/images/villas/parour/2014-04-25 14.31.21.jpg",
    href: "/villas/parour",
    capacity: "10 voyageurs",
    maxTravelers: 10,
    pricePerNight: 400,
    bedrooms: 5,
    bathrooms: 5,
    pool: "Piscine privée",
    description:
      "Demeure chaleureuse, calme et élégante, proche de l’océan.",
    gallery: ["/images/villas/parour/2014-04-25 14.31.21.jpg"],
  },
];

export function getVillaBySlug(slug: string | null | undefined) {
  return villas.find((villa) => villa.slug === slug);
}