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
  detailedDescription?: string;
  gallery: string[];
  translations?: Partial<
    Record<
      "en" | "de" | "es",
      { capacity: string; description: string; detailedDescription?: string }
    >
  >;
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
    detailedDescription:
      "FR9LVJL6\n\nLe Logis du Pêcheur, situé au cœur du village de La Cotinière.\n\nCette maison de pays ancienne de type charentais (200 m²), totalement rénovée, se trouve dans un jardin clos de 450 m² avec une piscine chauffée de 11 m x 3,5 m.\n\nProche de tous commerces et plages (70 m).\n\nLa maison comporte une pièce de vie (60 m²) comprenant le salon, la salle à manger avec une cuisine ouverte et quatre chambres (21, 16, 21 et 12 m²) avec quatre salles de bains comprenant des toilettes et des toilettes séparées.\n\nToutes les chambres bénéficient d'une entrée totalement indépendante afin de permettre à des couples d'amis de se retrouver en toute indépendance.\n\nL'ensemble des pièces s'ouvre sur la terrasse, le jardin et la piscine. La maison dispose d'un chauffage par le sol.\n\nLa rénovation a été faite pour conserver et mettre en valeur les éléments typiques de l'architecture oléronaise tout en y apportant le confort d'une habitation moderne.\n\nAvec quatre chambres et quatre salles de bains, la disposition de la maison convient notamment pour des couples d'amis.\n\nLa maison se trouve à 1 minute à pied de la plage.\n\nLa maison se trouve à 5 min à pied des commerces, dans le bourg de La Cotinière, célèbre pour son port de pêche et sa criée.\n\nUne fois au Logis du Pêcheur, oubliez votre voiture et profitez, grâce au meilleur ensoleillement de la côte atlantique, de toutes les activités, à pied ou à vélo : plage et bord de mer, balades, sorties...",
    gallery: [
      "/images/villas/logis/Accueil.jpg",
      "/images/villas/logis/Chambre 1 bis.jpg",
      "/images/villas/logis/Chambre 1.jpg",
      "/images/villas/logis/Chambre 2- 2 lits.jpg",
      "/images/villas/logis/Chambre 2- 3 lits.jpg",
      "/images/villas/logis/Chambre 2b.jpg",
      "/images/villas/logis/Extérieur entrée.jpg",
      "/images/villas/logis/extérieur piscine 2.jpg",
      "/images/villas/logis/extérieur piscine 3.jpg",
      "/images/villas/logis/extérieur piscine 4.jpg",
      "/images/villas/logis/extérieur piscine 5.jpg",
      "/images/villas/logis/Extérieur repas 2.jpg",
      "/images/villas/logis/Extérieur repas 3.jpg",
      "/images/villas/logis/Extérieur repas.jpg",
      "/images/villas/logis/piscine.jpg",
      "/images/villas/logis/Salon.jpg",
      "/images/villas/logis/SdB annexe.jpg",
      "/images/villas/logis/SdB annexeb.jpg",
      "/images/villas/logis/SdB CH1.jpg",
      "/images/villas/logis/SdB CH2.jpg",
      "/images/villas/logis/SdB CH3.jpg",
      "/images/villas/logis/SdB CH3b.jpg",
      "/images/villas/logis/Sécurité volet.jpg",
    ],
    translations: {
      en: {
        capacity: "8 to 11 guests",
        description:
          "A spacious family home with a private pool, ideal for large gatherings with family or friends.",
        detailedDescription:
          "FR9LVJL6\n\nLe Logis du Pêcheur, in the heart of the village of La Cotinière.\n\nThis fully renovated 200 m² traditional Charentaise country house sits in a 450 m² enclosed garden with a heated pool measuring 11 x 3.5 m.\n\nClose to all shops and beaches (70 m).\n\nThe house has a 60 m² living area combining the lounge and dining room with an open kitchen, plus four bedrooms (21, 16, 21 and 12 m²) each with its own bathroom, including separate WCs.\n\nEvery bedroom has its own fully independent entrance, allowing groups of friends to enjoy real privacy.\n\nAll the rooms open onto the terrace, garden and pool. The house has underfloor heating.\n\nThe renovation preserved and highlighted the typical features of Oléron architecture while adding the comfort of a modern home.\n\nWith four bedrooms and four bathrooms, the layout is particularly well suited to groups of friends as couples.\n\nThe house is a 1-minute walk from the beach.\n\nThe house is a 5-minute walk from the shops, in the village of La Cotinière, famous for its fishing port and fish auction.\n\nOnce at Le Logis du Pêcheur, leave your car behind and enjoy, thanks to the best sunshine on the Atlantic coast, all the activities on foot or by bike: the beach and seaside, walks, outings...",
      },
      de: {
        capacity: "8 bis 11 Gäste",
        description:
          "Ein geräumiges Familienhaus mit privatem Pool, ideal für große Treffen mit Familie oder Freunden.",
        detailedDescription:
          "FR9LVJL6\n\nLe Logis du Pêcheur, im Herzen des Dorfes La Cotinière gelegen.\n\nDieses vollständig renovierte, typisch charentesische Landhaus (200 m²) liegt in einem 450 m² großen, umzäunten Garten mit einem beheizten Pool von 11 x 3,5 m.\n\nGanz in der Nähe von Geschäften und Stränden (70 m).\n\nDas Haus verfügt über einen 60 m² großen Wohnbereich mit Wohnzimmer, Esszimmer und offener Küche sowie vier Schlafzimmer (21, 16, 21 und 12 m²), jeweils mit eigenem Bad und separatem WC.\n\nAlle Schlafzimmer verfügen über einen komplett unabhängigen Eingang, sodass befreundete Paare in völliger Unabhängigkeit zusammenkommen können.\n\nAlle Räume öffnen sich zur Terrasse, zum Garten und zum Pool. Das Haus verfügt über eine Fußbodenheizung.\n\nBei der Renovierung wurden die typischen Elemente der Architektur der Insel Oléron bewahrt und hervorgehoben, während gleichzeitig der Komfort eines modernen Wohnhauses geschaffen wurde.\n\nMit vier Schlafzimmern und vier Badezimmern eignet sich das Haus besonders für befreundete Paare.\n\nDas Haus liegt eine Gehminute vom Strand entfernt.\n\nDas Haus liegt 5 Gehminuten von den Geschäften entfernt, im Ort La Cotinière, bekannt für seinen Fischereihafen und seine Fischauktion.\n\nSobald Sie im Logis du Pêcheur angekommen sind, vergessen Sie Ihr Auto und genießen Sie dank der besten Sonneneinstrahlung an der Atlantikküste alle Aktivitäten zu Fuß oder mit dem Fahrrad: Strand und Meer, Spaziergänge, Ausflüge...",
      },
      es: {
        capacity: "8 a 11 huéspedes",
        description:
          "Una amplia casa familiar con piscina privada, ideal para grandes reuniones en familia o con amigos.",
        detailedDescription:
          "FR9LVJL6\n\nLe Logis du Pêcheur, situado en el corazón del pueblo de La Cotinière.\n\nEsta antigua casa de campo de estilo charentés (200 m²), totalmente renovada, se encuentra en un jardín cerrado de 450 m² con una piscina climatizada de 11 x 3,5 m.\n\nCerca de todos los comercios y playas (70 m).\n\nLa casa cuenta con una sala de estar (60 m²) que incluye el salón, el comedor con cocina abierta, y cuatro dormitorios (21, 16, 21 y 12 m²) con cuatro baños, cada uno con aseo y aseo separado.\n\nTodos los dormitorios cuentan con una entrada totalmente independiente, lo que permite a parejas de amigos disfrutar de total independencia.\n\nTodas las estancias se abren a la terraza, el jardín y la piscina. La casa dispone de calefacción por suelo radiante.\n\nLa renovación se realizó para conservar y realzar los elementos típicos de la arquitectura de Oléron, aportando a la vez el confort de una vivienda moderna.\n\nCon cuatro dormitorios y cuatro baños, la distribución de la casa es especialmente adecuada para parejas de amigos.\n\nLa casa se encuentra a 1 minuto a pie de la playa.\n\nLa casa se encuentra a 5 minutos a pie de los comercios, en el pueblo de La Cotinière, famoso por su puerto pesquero y su lonja.\n\nUna vez en Le Logis du Pêcheur, olvide su coche y disfrute, gracias a la mejor insolación de la costa atlántica, de todas las actividades a pie o en bicicleta: playa y costa, paseos, salidas...",
      },
    },
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
    detailedDescription:
      "FR35SCO8\n\nÀ La Cotinière, ancienne école primaire du village, totalement rénovée dans un jardin clos de 500 m² avec une piscine chauffée de 11 m x 4,5 m.\n\nLa villa comporte une grande pièce de vie comprenant le salon, la salle à manger avec une cuisine ouverte et cinq chambres spacieuses avec cinq salles de bains comprenant des toilettes et des toilettes séparées.\n\nL'ensemble des pièces s'ouvre sur la terrasse et la piscine. Amusez-vous avec toute la famille dans ce logement chic.\n\nLa maison comporte une pièce de vie (45 m²) comprenant le salon, la salle à manger avec une cuisine ouverte et cinq chambres (23, 15, 15, 14 et 13 m²) avec cinq salles de bains comprenant des toilettes et des toilettes séparées.\n\nL'ensemble des pièces s'ouvre sur la terrasse, le jardin et la piscine. La maison dispose d'un chauffage par le sol réversible (rafraîchissement l'été).\n\nLa rénovation a été faite pour conserver et mettre en valeur les éléments typiques de l'architecture de cette école oléronaise tout en y apportant le confort d'une habitation moderne.\n\nAvec cinq chambres et cinq salles de bains, la disposition de la maison convient notamment pour des couples d'amis.\n\nLa maison se trouve à 1 minute à pied de la plage.\n\nLa maison se trouve à 5 min à pied des commerces, dans le bourg de La Cotinière, célèbre pour son port de pêche et sa criée.\n\nSur la propriété, il est possible de stationner jusqu'à 3 véhicules.\n\nUne fois à l'École, oubliez votre voiture et profitez, grâce au meilleur ensoleillement de la côte atlantique, de toutes les activités, à pied ou à vélo : plage et bord de mer, balades, sorties...",
    gallery: [
      "/images/villas/ecole/01.jpg",
      "/images/villas/ecole/03.jpg",
      "/images/villas/ecole/05.jpg",
      "/images/villas/ecole/06.jpg",
      "/images/villas/ecole/07.jpg",
      "/images/villas/ecole/08.jpg",
      "/images/villas/ecole/09.jpg",
      "/images/villas/ecole/10.jpg",
      "/images/villas/ecole/11.jpg",
      "/images/villas/ecole/12.jpg",
      "/images/villas/ecole/13.jpg",
      "/images/villas/ecole/14.jpg",
      "/images/villas/ecole/15.jpg",
      "/images/villas/ecole/16.jpg",
      "/images/villas/ecole/17.jpg",
      "/images/villas/ecole/18.jpg",
      "/images/villas/ecole/19.jpg",
      "/images/villas/ecole/20.jpg",
      "/images/villas/ecole/21.jpg",
      "/images/villas/ecole/22.jpg",
      "/images/villas/ecole/25.jpg",
      "/images/villas/ecole/26.jpg",
    ],
    translations: {
      en: {
        capacity: "12 guests",
        description:
          "A characterful house with generous spaces, five bedrooms and five private bathrooms.",
        detailedDescription:
          "FR35SCO8\n\nIn La Cotinière, a former village primary school, fully renovated, set in a 500 m² enclosed garden with a heated pool measuring 11 x 4.5 m.\n\nThe villa has a large living area combining the lounge and dining room with an open kitchen, plus five spacious bedrooms with five bathrooms, each including a separate WC.\n\nAll the rooms open onto the terrace and the pool. Enjoy fun times with the whole family in this stylish home.\n\nThe house has a 45 m² living area combining the lounge and dining room with an open kitchen, plus five bedrooms (23, 15, 15, 14 and 13 m²) with five bathrooms, each including a separate WC.\n\nAll the rooms open onto the terrace, garden and pool. The house has reversible underfloor heating (cooling in summer).\n\nThe renovation preserved and highlighted the typical architectural features of this Oléron school building while adding the comfort of a modern home.\n\nWith five bedrooms and five bathrooms, the layout is particularly well suited to groups of friends as couples.\n\nThe house is a 1-minute walk from the beach.\n\nThe house is a 5-minute walk from the shops, in the village of La Cotinière, famous for its fishing port and fish auction.\n\nUp to 3 vehicles can be parked on the property.\n\nOnce at L'École, leave your car behind and enjoy, thanks to the best sunshine on the Atlantic coast, all the activities on foot or by bike: the beach and seaside, walks, outings...",
      },
      de: {
        capacity: "12 Gäste",
        description:
          "Ein charaktervolles Haus mit großzügigen Räumen, fünf Schlafzimmern und fünf eigenen Badezimmern.",
        detailedDescription:
          "FR35SCO8\n\nIn La Cotinière, eine ehemalige Dorfgrundschule, vollständig renoviert, in einem 500 m² großen, umzäunten Garten mit einem beheizten Pool von 11 x 4,5 m.\n\nDie Villa verfügt über einen großen Wohnbereich mit Wohnzimmer, Esszimmer und offener Küche sowie fünf geräumige Schlafzimmer mit fünf Badezimmern, jeweils mit separatem WC.\n\nAlle Räume öffnen sich zur Terrasse und zum Pool. Genießen Sie mit der ganzen Familie schöne Momente in diesem eleganten Zuhause.\n\nDas Haus verfügt über einen 45 m² großen Wohnbereich mit Wohnzimmer, Esszimmer und offener Küche sowie fünf Schlafzimmer (23, 15, 15, 14 und 13 m²) mit fünf Badezimmern, jeweils mit separatem WC.\n\nAlle Räume öffnen sich zur Terrasse, zum Garten und zum Pool. Das Haus verfügt über eine reversible Fußbodenheizung (Kühlung im Sommer).\n\nBei der Renovierung wurden die typischen architektonischen Elemente dieser Oléron-Schule bewahrt und hervorgehoben, während gleichzeitig der Komfort eines modernen Wohnhauses geschaffen wurde.\n\nMit fünf Schlafzimmern und fünf Badezimmern eignet sich das Haus besonders für befreundete Paare.\n\nDas Haus liegt eine Gehminute vom Strand entfernt.\n\nDas Haus liegt 5 Gehminuten von den Geschäften entfernt, im Ort La Cotinière, bekannt für seinen Fischereihafen und seine Fischauktion.\n\nAuf dem Grundstück können bis zu 3 Fahrzeuge geparkt werden.\n\nSobald Sie in der École angekommen sind, vergessen Sie Ihr Auto und genießen Sie dank der besten Sonneneinstrahlung an der Atlantikküste alle Aktivitäten zu Fuß oder mit dem Fahrrad: Strand und Meer, Spaziergänge, Ausflüge...",
      },
      es: {
        capacity: "12 huéspedes",
        description:
          "Una casa con encanto y amplios espacios, cinco dormitorios y cinco baños privados.",
        detailedDescription:
          "FR35SCO8\n\nEn La Cotinière, una antigua escuela primaria del pueblo, totalmente renovada, en un jardín cerrado de 500 m² con una piscina climatizada de 11 x 4,5 m.\n\nLa villa cuenta con una amplia sala de estar que incluye el salón, el comedor con cocina abierta, y cinco dormitorios espaciosos con cinco baños, cada uno con aseo separado.\n\nTodas las estancias se abren a la terraza y la piscina. Diviértase con toda la familia en esta elegante vivienda.\n\nLa casa cuenta con una sala de estar (45 m²) que incluye el salón, el comedor con cocina abierta, y cinco dormitorios (23, 15, 15, 14 y 13 m²) con cinco baños, cada uno con aseo separado.\n\nTodas las estancias se abren a la terraza, el jardín y la piscina. La casa dispone de calefacción por suelo radiante reversible (refrigeración en verano).\n\nLa renovación se realizó para conservar y realzar los elementos arquitectónicos típicos de esta escuela de Oléron, aportando a la vez el confort de una vivienda moderna.\n\nCon cinco dormitorios y cinco baños, la distribución de la casa es especialmente adecuada para parejas de amigos.\n\nLa casa se encuentra a 1 minuto a pie de la playa.\n\nLa casa se encuentra a 5 minutos a pie de los comercios, en el pueblo de La Cotinière, famoso por su puerto pesquero y su lonja.\n\nEn la propiedad es posible aparcar hasta 3 vehículos.\n\nUna vez en L'École, olvide su coche y disfrute, gracias a la mejor insolación de la costa atlántica, de todas las actividades a pie o en bicicleta: playa y costa, paseos, salidas...",
      },
    },
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
    detailedDescription:
      "FR9X8297\n\nÀ La Cotinière, maison contemporaine (167 m²) résolument moderne dans un esprit luxe, dans un jardin clos d'environ 400 m² avec une piscine chauffée de 8 m x 4,5 m.\n\nProche de tous commerces et plages (200 m).\n\nLa maison comporte une pièce de vie de 60 m².\n\nAu rez-de-chaussée : le salon, la salle à manger, une cuisine ouverte et deux chambres (13 et 16 m²) avec une salle de bain comprenant des toilettes et des toilettes séparées.\n\nÀ l'étage : deux chambres de 13 et 12 m², ayant chacune sa salle de bain.\n\nL'ensemble des pièces s'ouvre sur la terrasse, le jardin et la piscine. La maison dispose d'un chauffage par le sol.\n\nLa construction a été réalisée pour offrir tout le confort moderne avec des matériaux nobles et de qualité.\n\nAvec quatre chambres et trois salles de bains, la disposition de la maison convient notamment pour des couples d'amis.\n\nLa maison se trouve à 3 minutes à pied de la plage.\n\nLa maison se trouve à 3 min à pied des commerces, dans le bourg de La Cotinière, célèbre pour son port de pêche et sa criée.\n\nUne fois aux Mouettes, oubliez votre voiture et profitez, grâce au meilleur ensoleillement de la côte atlantique, de toutes les activités, à pied ou à vélo : plage et bord de mer, balades, sorties...",
    gallery: [
      "/images/villas/mouettes/26 copie.jpg",
      "/images/villas/mouettes/01 copie.jpg",
      "/images/villas/mouettes/02 copie.jpg",
      "/images/villas/mouettes/03 copie.jpg",
      "/images/villas/mouettes/05 copie.jpg",
      "/images/villas/mouettes/06 copie.jpg",
      "/images/villas/mouettes/09 copie.jpg",
      "/images/villas/mouettes/13 copie.jpg",
      "/images/villas/mouettes/15 copie.jpg",
      "/images/villas/mouettes/16 copie.jpg",
      "/images/villas/mouettes/17 copie.jpg",
      "/images/villas/mouettes/19 copie.jpg",
      "/images/villas/mouettes/20 copie.jpg",
      "/images/villas/mouettes/22 copie.jpg",
      "/images/villas/mouettes/23 copie.jpg",
      "/images/villas/mouettes/24 copie.jpg",
      "/images/villas/mouettes/25 copie.jpg",
      "/images/villas/mouettes/27 copie.jpg",
      "/images/villas/mouettes/28 copie.jpg",
      "/images/villas/mouettes/29 copie.jpg",
      "/images/villas/mouettes/30 copie.jpg",
    ],
    translations: {
      en: {
        capacity: "8 guests",
        description:
          "A bright, contemporary house designed for family stays.",
        detailedDescription:
          "FR9X8297\n\nIn La Cotinière, a resolutely modern contemporary house (167 m²) with a luxury feel, set in an enclosed garden of around 400 m² with a heated pool measuring 8 x 4.5 m.\n\nClose to all shops and beaches (200 m).\n\nThe house has a 60 m² living area.\n\nOn the ground floor: the lounge, dining room, an open kitchen and two bedrooms (13 and 16 m²) sharing a bathroom with separate WCs.\n\nUpstairs: two bedrooms of 13 and 12 m², each with its own bathroom.\n\nAll the rooms open onto the terrace, garden and pool. The house has underfloor heating.\n\nThe house was built to offer full modern comfort using fine, high-quality materials.\n\nWith four bedrooms and three bathrooms, the layout is particularly well suited to groups of friends as couples.\n\nThe house is a 3-minute walk from the beach.\n\nThe house is a 3-minute walk from the shops, in the village of La Cotinière, famous for its fishing port and fish auction.\n\nOnce at Les Mouettes, leave your car behind and enjoy, thanks to the best sunshine on the Atlantic coast, all the activities on foot or by bike: the beach and seaside, walks, outings...",
      },
      de: {
        capacity: "8 Gäste",
        description:
          "Ein helles, modernes Haus für Familienaufenthalte.",
        detailedDescription:
          "FR9X8297\n\nIn La Cotinière, ein konsequent modernes, zeitgenössisches Haus (167 m²) mit luxuriösem Flair, in einem etwa 400 m² großen, umzäunten Garten mit beheiztem Pool von 8 x 4,5 m.\n\nGanz in der Nähe von Geschäften und Stränden (200 m).\n\nDas Haus verfügt über einen 60 m² großen Wohnbereich.\n\nIm Erdgeschoss: Wohnzimmer, Esszimmer, offene Küche und zwei Schlafzimmer (13 und 16 m²) mit einem gemeinsamen Bad und separatem WC.\n\nIm Obergeschoss: zwei Schlafzimmer von 13 und 12 m², jeweils mit eigenem Bad.\n\nAlle Räume öffnen sich zur Terrasse, zum Garten und zum Pool. Das Haus verfügt über eine Fußbodenheizung.\n\nDer Bau wurde realisiert, um mit edlen, hochwertigen Materialien vollen modernen Komfort zu bieten.\n\nMit vier Schlafzimmern und drei Badezimmern eignet sich das Haus besonders für befreundete Paare.\n\nDas Haus liegt 3 Gehminuten vom Strand entfernt.\n\nDas Haus liegt 3 Gehminuten von den Geschäften entfernt, im Ort La Cotinière, bekannt für seinen Fischereihafen und seine Fischauktion.\n\nSobald Sie in Les Mouettes angekommen sind, vergessen Sie Ihr Auto und genießen Sie dank der besten Sonneneinstrahlung an der Atlantikküste alle Aktivitäten zu Fuß oder mit dem Fahrrad: Strand und Meer, Spaziergänge, Ausflüge...",
      },
      es: {
        capacity: "8 huéspedes",
        description:
          "Una casa luminosa y contemporánea, pensada para estancias en familia.",
        detailedDescription:
          "FR9X8297\n\nEn La Cotinière, una casa contemporánea (167 m²) resueltamente moderna con un toque de lujo, en un jardín cerrado de unos 400 m² con una piscina climatizada de 8 x 4,5 m.\n\nCerca de todos los comercios y playas (200 m).\n\nLa casa cuenta con una sala de estar de 60 m².\n\nEn la planta baja: el salón, el comedor, una cocina abierta y dos dormitorios (13 y 16 m²) que comparten un baño con aseo separado.\n\nEn la planta alta: dos dormitorios de 13 y 12 m², cada uno con su propio baño.\n\nTodas las estancias se abren a la terraza, el jardín y la piscina. La casa dispone de calefacción por suelo radiante.\n\nLa construcción se realizó para ofrecer todo el confort moderno con materiales nobles y de calidad.\n\nCon cuatro dormitorios y tres baños, la distribución de la casa es especialmente adecuada para parejas de amigos.\n\nLa casa se encuentra a 3 minutos a pie de la playa.\n\nLa casa se encuentra a 3 minutos a pie de los comercios, en el pueblo de La Cotinière, famoso por su puerto pesquero y su lonja.\n\nUna vez en Les Mouettes, olvide su coche y disfrute, gracias a la mejor insolación de la costa atlántica, de todas las actividades a pie o en bicicleta: playa y costa, paseos, salidas...",
      },
    },
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
    detailedDescription:
      "FR6ABZXZ\n\nMon logement est proche du centre-ville, de la mer, du port de pêche et des plages. Vous apprécierez cette villa pour les espaces extérieurs, le quartier, la luminosité et l'ambiance. Cette villa est parfaite pour les couples, les familles (avec enfants) et les grands groupes. Le Parour est composé de 2 maisons totalement indépendantes et sans vis-à-vis, situées de part et d'autre de la piscine.\n\nLa maison :\nComporte une pièce de vie (40 m²) comprenant le salon, la salle à manger avec une cuisine ouverte et trois chambres (17, 16 et 13 m²) avec trois salles de bains comprenant des toilettes et des toilettes séparées. L'ensemble des pièces s'ouvre au sud, sur la terrasse, le jardin et la piscine. La maison dispose d'un chauffage par le sol réversible, rafraîchissant l'été, permettant de maintenir une température fraîche si nécessaire.\n\nAvec trois chambres et trois salles de bains, la disposition de la maison convient notamment pour des couples d'amis.\n\nUn canapé convertible avec un vrai matelas de 160x200 permet d'accueillir 2 personnes supplémentaires.\n\nLe chai :\nComporte une pièce de vie comprenant le salon et la cuisine ouverte (cette pièce peut être transformée en chambre à la demande), une chambre et une salle d'eau avec WC. Il est mansardé et orienté est/ouest. Il ouvre à l'est sur une terrasse, le jardin et la piscine. Le chai dispose d'un chauffage par le sol.\n\nLa rénovation a été faite pour conserver et mettre en valeur les éléments typiques de l'architecture oléronaise tout en y apportant le confort d'une habitation visant un classement préfectoral 5 étoiles. Ont été remis en état la cheminée, le puits, si caractéristique de l'île, et les murs chaulés.\n\nLa maison et le chai se trouvent à 5 min à pied des commerces et de la plage, dans le bourg de La Cotinière, célèbre pour son port de pêche et sa criée. La maison est accessible par une venelle oléronaise.",
    gallery: [
      "/images/villas/parour/2014-04-25 14.31.21.jpg",
      "/images/villas/parour/Chambre chai.jpg",
      "/images/villas/parour/Chambre1.jpg",
      "/images/villas/parour/Chambre2.jpg",
      "/images/villas/parour/Chambre3.jpg",
      "/images/villas/parour/Cuisine chai.jpg",
      "/images/villas/parour/Cuisine.jpg",
      "/images/villas/parour/Ext1.jpg",
      "/images/villas/parour/Ext2.jpg",
      "/images/villas/parour/Ext3.jpg",
      "/images/villas/parour/Salon chai.jpg",
      "/images/villas/parour/Salon et cuisine.jpg",
      "/images/villas/parour/Salon.jpg",
      "/images/villas/parour/SDB chai.jpg",
      "/images/villas/parour/SDB1.jpg",
      "/images/villas/parour/SDB2.jpg",
      "/images/villas/parour/SDB3.jpg",
    ],
    translations: {
      en: {
        capacity: "10 guests",
        description:
          "A warm, quiet and elegant home, close to the ocean.",
        detailedDescription:
          "FR6ABZXZ\n\nMy property is close to the town centre, the sea, the fishing port and the beaches. You'll love this villa for its outdoor spaces, the neighbourhood, the light and the atmosphere. This villa is perfect for couples, families (with children) and large groups. Le Parour consists of 2 fully independent houses with no overlooking views, set on either side of the pool.\n\nThe house:\nHas a 40 m² living area combining the lounge and dining room with an open kitchen, plus three bedrooms (17, 16 and 13 m²) with three bathrooms, each including a separate WC. All the rooms face south, opening onto the terrace, garden and pool. The house has reversible underfloor heating that also cools in summer, keeping a cool temperature when needed.\n\nWith three bedrooms and three bathrooms, the layout is particularly well suited to groups of friends as couples.\n\nA sofa bed with a genuine 160x200 mattress can accommodate 2 extra guests.\n\nThe Chai (converted barn):\nHas a living area combining the lounge and open kitchen (this room can be converted into a bedroom on request), one bedroom, and a shower room with WC. It has a sloped ceiling and faces east/west. It opens to the east onto a terrace, the garden and the pool. The Chai has underfloor heating.\n\nThe renovation preserved and highlighted the typical features of Oléron architecture while adding the comfort of a home aimed at a 5-star prefectural rating. The fireplace and the well — so characteristic of the island — along with the limewashed walls, were restored.\n\nThe house and the Chai are a 5-minute walk from the shops and the beach, in the village of La Cotinière, famous for its fishing port and fish auction. The house is accessed via a typical Oléron lane.",
      },
      de: {
        capacity: "10 Gäste",
        description:
          "Ein warmes, ruhiges und elegantes Haus in Meeresnähe.",
        detailedDescription:
          "FR6ABZXZ\n\nMeine Unterkunft liegt in der Nähe des Stadtzentrums, des Meeres, des Fischereihafens und der Strände. Sie werden diese Villa wegen der Außenbereiche, der Umgebung, der Helligkeit und der Atmosphäre schätzen. Diese Villa eignet sich perfekt für Paare, Familien (mit Kindern) und große Gruppen. Le Parour besteht aus 2 völlig unabhängigen Häusern ohne Einsicht, die sich beidseitig des Pools befinden.\n\nDas Haus:\nVerfügt über einen 40 m² großen Wohnbereich mit Wohnzimmer, Esszimmer und offener Küche sowie drei Schlafzimmer (17, 16 und 13 m²) mit drei Badezimmern, jeweils mit separatem WC. Alle Räume sind nach Süden ausgerichtet und öffnen sich zur Terrasse, zum Garten und zum Pool. Das Haus verfügt über eine reversible Fußbodenheizung, die im Sommer auch kühlt und bei Bedarf eine angenehme Temperatur hält.\n\nMit drei Schlafzimmern und drei Badezimmern eignet sich das Haus besonders für befreundete Paare.\n\nEin Schlafsofa mit einer echten Matratze (160x200) bietet Platz für 2 zusätzliche Gäste.\n\nDas Chai (umgebaute Scheune):\nVerfügt über einen Wohnbereich mit Wohnzimmer und offener Küche (dieser Raum kann auf Wunsch in ein Schlafzimmer umgewandelt werden), ein Schlafzimmer und ein Duschbad mit WC. Es hat eine Dachschräge und ist nach Ost/West ausgerichtet. Es öffnet sich nach Osten zu einer Terrasse, dem Garten und dem Pool. Das Chai verfügt über eine Fußbodenheizung.\n\nBei der Renovierung wurden die typischen Elemente der Architektur der Insel Oléron bewahrt und hervorgehoben, während gleichzeitig der Komfort eines Hauses mit angestrebter 5-Sterne-Präfekturklassifizierung geschaffen wurde. Der Kamin, der für die Insel so charakteristische Brunnen und die gekalkten Wände wurden restauriert.\n\nDas Haus und das Chai liegen 5 Gehminuten von den Geschäften und dem Strand entfernt, im Ort La Cotinière, bekannt für seinen Fischereihafen und seine Fischauktion. Das Haus ist über eine typische Oléron-Gasse zu erreichen.",
      },
      es: {
        capacity: "10 huéspedes",
        description:
          "Una casa cálida, tranquila y elegante, cerca del océano.",
        detailedDescription:
          "FR6ABZXZ\n\nMi alojamiento está cerca del centro de la ciudad, del mar, del puerto pesquero y de las playas. Apreciará esta villa por sus espacios exteriores, el barrio, la luminosidad y el ambiente. Esta villa es perfecta para parejas, familias (con niños) y grandes grupos. Le Parour se compone de 2 casas totalmente independientes y sin vistas entre sí, situadas a ambos lados de la piscina.\n\nLa casa:\nCuenta con una sala de estar (40 m²) que incluye el salón, el comedor con cocina abierta, y tres dormitorios (17, 16 y 13 m²) con tres baños, cada uno con aseo separado. Todas las estancias se orientan al sur, abriéndose a la terraza, el jardín y la piscina. La casa dispone de calefacción por suelo radiante reversible, que refresca en verano, permitiendo mantener una temperatura fresca si es necesario.\n\nCon tres dormitorios y tres baños, la distribución de la casa es especialmente adecuada para parejas de amigos.\n\nUn sofá cama con un colchón real de 160x200 permite alojar a 2 personas adicionales.\n\nEl Chai (antigua bodega reformada):\nCuenta con una sala de estar que incluye el salón y la cocina abierta (esta estancia puede convertirse en dormitorio a petición), un dormitorio y un aseo con ducha y WC. Tiene techos abuhardillados y está orientado este/oeste. Se abre al este a una terraza, el jardín y la piscina. El Chai dispone de calefacción por suelo radiante.\n\nLa renovación se realizó para conservar y realzar los elementos típicos de la arquitectura de Oléron, aportando a la vez el confort de una vivienda con vistas a una clasificación prefectural de 5 estrellas. Se restauraron la chimenea, el pozo, tan característico de la isla, y los muros encalados.\n\nLa casa y el Chai se encuentran a 5 minutos a pie de los comercios y de la playa, en el pueblo de La Cotinière, famoso por su puerto pesquero y su lonja. Se accede a la casa por una callejuela típica de Oléron.",
      },
    },
  },
];

export function getVillaBySlug(slug: string | null | undefined) {
  return villas.find((villa) => villa.slug === slug);
}