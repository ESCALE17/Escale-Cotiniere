export type Locale = "fr" | "en" | "de" | "es";

type Textes = {
  eyebrow: string;
  homeTitle: string;
  homeTagline: string;
  cards: {
    restaurants: { titre: string; texte: string };
    visites: { titre: string; texte: string };
    producteurs: { titre: string; texte: string };
    velo: { titre: string; texte: string };
  };
  back: string;
  voirSite: string;
  restaurants: { title: string; intro: string; empty: string };
  visites: { title: string; intro: string; empty: string };
  producteurs: { title: string; intro: string; empty: string; panier: string };
  velo: { title: string; intro: string; empty: string; code: string; reserver: string };
};

export const T: Record<Locale, Textes> = {
  fr: {
    eyebrow: "Escale à La Cotinière",
    homeTitle: "Coup de cœur & recommandations",
    homeTagline: "Nos adresses préférées autour du Logis du pêcheur, pour vivre l'île comme nous l'aimons.",
    cards: {
      restaurants: { titre: "Restaurants", texte: "Nos tables préférées, du port aux terres." },
      visites: { titre: "Visites", texte: "Les lieux à ne pas manquer, dont l'île d'Aix." },
      producteurs: { titre: "Producteurs", texte: "Pineau, vin, champagne, cognac et gourmandises." },
      velo: { titre: "Location de vélo", texte: "Notre loueur partenaire et votre code réduction." },
    },
    back: "Coup de cœur",
    voirSite: "Voir le site →",
    restaurants: {
      title: "Restaurants",
      intro: "Nos tables préférées, à deux pas du Logis du pêcheur.",
      empty: "Nos adresses arrivent très bientôt.",
    },
    visites: {
      title: "Visites",
      intro: "Les lieux à ne pas manquer pendant votre séjour, dont l'île d'Aix.",
      empty: "Nos idées de visites arrivent très bientôt.",
    },
    producteurs: {
      title: "Nos producteurs",
      intro:
        "Cognac, pineau, vin de Bordeaux, champagne et gourmandises, choisis avec soin. Composez votre panier d'accueil au moment de réserver.",
      empty: "Notre sélection arrive très bientôt.",
      panier:
        "Envie de retrouver ces produits à votre arrivée ? Composez votre panier d'accueil lors de votre réservation, et il vous attendra dans la maison.",
    },
    velo: {
      title: "Location de vélo",
      intro: "Notre loueur partenaire, à deux pas de la maison.",
      empty: "Les informations arrivent très bientôt.",
      code: "Code réduction",
      reserver: "Réserver mes vélos →",
    },
  },

  en: {
    eyebrow: "Escale à La Cotinière",
    homeTitle: "Favourites & recommendations",
    homeTagline: "Our favourite spots around the Logis du pêcheur, to experience the island the way we love it.",
    cards: {
      restaurants: { titre: "Restaurants", texte: "Our favourite tables, from the harbour to the countryside." },
      visites: { titre: "Places to visit", texte: "The sights not to be missed, including the Île d'Aix." },
      producteurs: { titre: "Local producers", texte: "Pineau, wine, champagne, cognac and treats." },
      velo: { titre: "Bike rental", texte: "Our partner rental shop and your discount code." },
    },
    back: "Favourites",
    voirSite: "Visit the website →",
    restaurants: {
      title: "Restaurants",
      intro: "Our favourite tables, just steps from the Logis du pêcheur.",
      empty: "Our addresses are coming very soon.",
    },
    visites: {
      title: "Places to visit",
      intro: "The sights not to be missed during your stay, including the Île d'Aix.",
      empty: "Our visit ideas are coming very soon.",
    },
    producteurs: {
      title: "Our local producers",
      intro:
        "Cognac, pineau, Bordeaux wine, champagne and treats, carefully selected. Put together your welcome basket when you book.",
      empty: "Our selection is coming very soon.",
      panier:
        "Would you like to find these products waiting for you on arrival? Put together your welcome basket when you book, and it will be waiting for you in the house.",
    },
    velo: {
      title: "Bike rental",
      intro: "Our partner rental shop, just steps from the house.",
      empty: "Information is coming very soon.",
      code: "Discount code",
      reserver: "Book my bikes →",
    },
  },

  de: {
    eyebrow: "Escale à La Cotinière",
    homeTitle: "Herzensempfehlungen",
    homeTagline: "Unsere Lieblingsadressen rund um das Logis du pêcheur, um die Insel so zu erleben, wie wir sie lieben.",
    cards: {
      restaurants: { titre: "Restaurants", texte: "Unsere Lieblingslokale, vom Hafen bis ins Landesinnere." },
      visites: { titre: "Ausflüge", texte: "Die Orte, die man nicht verpassen sollte, darunter die Île d'Aix." },
      producteurs: { titre: "Erzeuger", texte: "Pineau, Wein, Champagner, Cognac und Köstlichkeiten." },
      velo: { titre: "Fahrradverleih", texte: "Unser Partnerverleih und Ihr Rabattcode." },
    },
    back: "Empfehlungen",
    voirSite: "Zur Website →",
    restaurants: {
      title: "Restaurants",
      intro: "Unsere Lieblingslokale, nur wenige Schritte vom Logis du pêcheur entfernt.",
      empty: "Unsere Adressen folgen in Kürze.",
    },
    visites: {
      title: "Ausflüge",
      intro: "Die Sehenswürdigkeiten, die Sie während Ihres Aufenthalts nicht verpassen sollten, darunter die Île d'Aix.",
      empty: "Unsere Ausflugsideen folgen in Kürze.",
    },
    producteurs: {
      title: "Unsere Erzeuger",
      intro:
        "Cognac, Pineau, Bordeaux-Wein, Champagner und Köstlichkeiten, sorgfältig ausgewählt. Stellen Sie Ihren Willkommenskorb bei der Buchung zusammen.",
      empty: "Unsere Auswahl folgt in Kürze.",
      panier:
        "Möchten Sie diese Produkte bei Ihrer Ankunft vorfinden? Stellen Sie Ihren Willkommenskorb bei der Buchung zusammen, und er wartet im Haus auf Sie.",
    },
    velo: {
      title: "Fahrradverleih",
      intro: "Unser Partnerverleih, nur wenige Schritte vom Haus entfernt.",
      empty: "Informationen folgen in Kürze.",
      code: "Rabattcode",
      reserver: "Meine Fahrräder buchen →",
    },
  },

  es: {
    eyebrow: "Escale à La Cotinière",
    homeTitle: "Recomendaciones favoritas",
    homeTagline: "Nuestras direcciones favoritas alrededor del Logis du pêcheur, para vivir la isla como nos gusta.",
    cards: {
      restaurants: { titre: "Restaurantes", texte: "Nuestras mesas preferidas, del puerto al interior." },
      visites: { titre: "Visitas", texte: "Los lugares que no hay que perderse, como la Île d'Aix." },
      producteurs: { titre: "Productores", texte: "Pineau, vino, champagne, coñac y delicias." },
      velo: { titre: "Alquiler de bicicletas", texte: "Nuestro alquiler asociado y su código de descuento." },
    },
    back: "Recomendaciones",
    voirSite: "Ver el sitio →",
    restaurants: {
      title: "Restaurantes",
      intro: "Nuestras mesas preferidas, a dos pasos del Logis du pêcheur.",
      empty: "Nuestras direcciones llegan muy pronto.",
    },
    visites: {
      title: "Visitas",
      intro: "Los lugares que no hay que perderse durante su estancia, como la Île d'Aix.",
      empty: "Nuestras ideas de visitas llegan muy pronto.",
    },
    producteurs: {
      title: "Nuestros productores",
      intro:
        "Coñac, pineau, vino de Burdeos, champagne y delicias, elegidos con cuidado. Prepare su cesta de bienvenida al reservar.",
      empty: "Nuestra selección llega muy pronto.",
      panier:
        "¿Le gustaría encontrar estos productos a su llegada? Prepare su cesta de bienvenida al reservar, y le estará esperando en la casa.",
    },
    velo: {
      title: "Alquiler de bicicletas",
      intro: "Nuestro alquiler asociado, a dos pasos de la casa.",
      empty: "La información llega muy pronto.",
      code: "Código de descuento",
      reserver: "Reservar mis bicicletas →",
    },
  },
};
