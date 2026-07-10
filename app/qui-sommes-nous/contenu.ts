export type Locale = "fr" | "en" | "de" | "es";

type Contenu = {
  eyebrow: string;
  title: string;
  tagline: string;
  portraitAlt: string;
  s1title: string;
  s1p1: string;
  s1p2: string;
  s2title: string;
  s2p1: string;
  s2p2: string;
  s2p3: string;
  s3title: string;
  s3p1: string;
  s3p2: string;
  s3p3: string;
  s3p4: string;
  renoTitle: string;
  renoIntro: string;
  pairs: { chambre: string; sdb: string; salon: string; terrasse: string; piscine: string };
  chantierTitle: string;
  chantierIntro: string;
  captions: { reseaux: string; beton: string; finitions: string };
};

export const contenu: Record<Locale, Contenu> = {
  fr: {
    eyebrow: "Escale à La Cotinière",
    title: "Qui sommes-nous",
    tagline: "Bien plus qu'une location : une histoire, un lieu, un art de recevoir.",
    portraitAlt: "Portrait de votre hôte",
    s1title: "Un passionné avant d'être un hôte",
    s1p1:
      "Originaire de Lorraine, ingénieur de formation et diplômé d'école de commerce, j'ai toujours eu deux amours qui ne m'ont jamais quitté : le patrimoine et l'art de recevoir. Tout a commencé à seize ans, chez ma grand-mère, qui venait d'acquérir une vieille maison. Quatre étés durant, j'ai appris à rénover de mes mains, à comprendre le bâti ancien, à lui redonner vie. Je n'ai jamais cessé depuis.",
    s1p2:
      "Aujourd'hui installé à Bordeaux, je passe une partie de mon temps à parcourir les châteaux du Médoc, de Saint-Émilion, des Graves et de Pessac-Léognan, et à dénicher au fil de mes voyages de nouveaux vins et champagnes — comme récemment ces cuvées zéro dosage que j'aime tant faire découvrir. La gastronomie est une autre de mes passions : j'aime cuisiner, et je fréquente régulièrement les tables étoilées, non pour le prestige, mais pour la découverte de saveurs et de présentations nouvelles.",
    s2title: "La rencontre avec le Logis du pêcheur",
    s2p1:
      "C'est un peu par hasard que je suis arrivé à Oléron. J'ai tout de suite aimé cette île : variée, vivante, authentique. Et puis, un jour, j'ai visité une maison dont personne ne voulait — laide, massacrée par ses précédents propriétaires. Là où d'autres voyaient un problème, j'ai vu immédiatement ce qu'elle pouvait devenir.",
    s2p2:
      "La maison appartenait à un vieux pêcheur, un homme d'une grande gentillesse que je salue toujours au passage. Elle se trouve rue du Logis. De cette double évidence est né son nom : le Logis du pêcheur — un hommage à celui qui l'a habitée avant nous, et à ce quartier de La Cotinière où la mer n'est jamais loin.",
    s2p3:
      "Il a fallu un an de chantier. Un curage total, une réorganisation complète de l'espace, et beaucoup de soin apporté à chaque détail. De cette maison oubliée est née la demeure que vous découvrez aujourd'hui.",
    s3title: "Un art de recevoir",
    s3p1:
      "Ce qui me tient à cœur, c'est que vous vous sentiez chez vous, dans un lieu pensé avec exigence et générosité. Le respect du patrimoine, la qualité de l'accueil, le goût du beau et du bon : ce sont ces valeurs que je mets dans chacune de mes maisons, et que j'ai envie de partager avec vous.",
    s3p2:
      "Rien n'est laissé au hasard, jusque dans l'ameublement. J'ai fait le choix de grandes maisons du design et de l'art de vivre — Cinna, Ligne Roset, Duvivier, Villeroy & Boch, Calligaris, Foscarini, Fast — non pour le prestige, mais pour la qualité, la robustesse et le soin apporté à chaque pièce. Ces éditeurs travaillent avec de véritables designers et suivent leurs collections dans le temps : le gage d'un mobilier pensé pour durer et pour être beau.",
    s3p3:
      "Le confort d'un canapé, la lumière d'un luminaire, la finesse d'une vaisselle : ce sont ces détails, souvent invisibles, qui font qu'un séjour devient un vrai moment de dépaysement.",
    s3p4:
      "Parce qu'un séjour, ce n'est pas seulement quatre murs et un toit. C'est une atmosphère, une attention, une histoire dont vous repartez avec le souvenir.",
    renoTitle: "La rénovation du Logis du pêcheur",
    renoIntro:
      "De l'ancienne maison de pêcheur à la villa d'aujourd'hui : l'avant et l'après, pièce par pièce. Touchez une photo pour l'agrandir.",
    pairs: { chambre: "La chambre", sdb: "La salle de bain", salon: "Le salon", terrasse: "La terrasse", piscine: "La piscine" },
    chantierTitle: "Le chantier",
    chantierIntro: "Quelques étapes des travaux, du gros œuvre aux finitions.",
    captions: {
      reseaux: "Le passage des réseaux avant la dalle : plomberie et électricité tirées à même la terre battue.",
      beton: "Jour du coulage : la pompe à béton déployée dans la ruelle du logis.",
      finitions: "Les finitions : cloisons et plafonds montés, la pierre d'origine conservée et mise en valeur.",
    },
  },

  en: {
    eyebrow: "Escale à La Cotinière",
    title: "About us",
    tagline: "Far more than a rental: a story, a place, and the art of welcoming guests.",
    portraitAlt: "Portrait of your host",
    s1title: "An enthusiast before being a host",
    s1p1:
      "Originally from Lorraine, trained as an engineer and a graduate of a business school, I have always had two passions that never left me: heritage and the art of welcoming people. It all began at the age of sixteen, at my grandmother's, who had just bought an old house. For four summers, I learned to renovate with my own hands, to understand old buildings, to bring them back to life. I have never stopped since.",
    s1p2:
      "Now based in Bordeaux, I spend part of my time exploring the châteaux of the Médoc, Saint-Émilion, Graves and Pessac-Léognan, and, as I travel, seeking out new wines and champagnes — such as those zero-dosage cuvées I recently discovered and love to share. Fine food is another of my passions: I love to cook, and I regularly visit Michelin-starred restaurants, not for the prestige, but to discover new flavours and new ways of presenting them.",
    s2title: "Meeting the Logis du pêcheur",
    s2p1:
      "I came to Oléron almost by chance. I loved this island straight away: varied, lively, authentic. And then, one day, I visited a house that no one wanted — ugly, ruined by its previous owners. Where others saw a problem, I immediately saw what it could become.",
    s2p2:
      "The house belonged to an old fisherman, a wonderfully kind man whom I still greet whenever I pass by. It stands on the Rue du Logis. From this twofold connection came its name: the Logis du pêcheur — the Fisherman's Lodge — a tribute to the man who lived there before us, and to this district of La Cotinière where the sea is never far away.",
    s2p3:
      "It took a year of work. A complete gutting, a full reorganisation of the space, and great care given to every detail. From this forgotten house was born the home you discover today.",
    s3title: "The art of welcoming",
    s3p1:
      "What matters most to me is that you feel at home, in a place designed with both high standards and generosity. Respect for heritage, the quality of the welcome, a taste for beautiful and good things: these are the values I put into each of my houses, and that I want to share with you.",
    s3p2:
      "Nothing is left to chance, right down to the furniture. I chose great names in design and the art of living — Cinna, Ligne Roset, Duvivier, Villeroy & Boch, Calligaris, Foscarini, Fast — not for the prestige, but for the quality, the sturdiness and the care given to each piece. These makers work with real designers and support their collections over time: the promise of furniture made to last and to be beautiful.",
    s3p3:
      "The comfort of a sofa, the glow of a light, the delicacy of tableware: these are the often invisible details that turn a stay into a true change of scenery.",
    s3p4:
      "Because a stay is not just four walls and a roof. It is an atmosphere, a thoughtfulness, a story you leave with as a memory.",
    renoTitle: "The renovation of the Logis du pêcheur",
    renoIntro:
      "From the old fisherman's house to today's villa: before and after, room by room. Tap a photo to enlarge it.",
    pairs: { chambre: "The bedroom", sdb: "The bathroom", salon: "The living room", terrasse: "The terrace", piscine: "The pool" },
    chantierTitle: "The building work",
    chantierIntro: "A few stages of the works, from structural work to the finishing touches.",
    captions: {
      reseaux: "Laying the networks before the slab: plumbing and electrics run straight through the bare earth.",
      beton: "Pouring day: the concrete pump deployed in the lane beside the house.",
      finitions: "The finishing touches: partitions and ceilings up, the original stone kept and highlighted.",
    },
  },

  de: {
    eyebrow: "Escale à La Cotinière",
    title: "Wer wir sind",
    tagline: "Weit mehr als eine Ferienunterkunft: eine Geschichte, ein Ort, die Kunst des Gastgebens.",
    portraitAlt: "Porträt Ihres Gastgebers",
    s1title: "Ein Liebhaber, bevor ich Gastgeber wurde",
    s1p1:
      "Ursprünglich aus Lothringen, von Beruf Ingenieur und Absolvent einer Wirtschaftshochschule, hatte ich stets zwei Leidenschaften, die mich nie verlassen haben: das kulturelle Erbe und die Kunst des Gastgebens. Alles begann mit sechzehn Jahren bei meiner Großmutter, die gerade ein altes Haus erworben hatte. Vier Sommer lang lernte ich, mit meinen eigenen Händen zu renovieren, alte Bausubstanz zu verstehen und ihr neues Leben einzuhauchen. Seitdem habe ich nie damit aufgehört.",
    s1p2:
      "Heute lebe ich in Bordeaux und verbringe einen Teil meiner Zeit damit, die Schlösser des Médoc, von Saint-Émilion, Graves und Pessac-Léognan zu erkunden und auf meinen Reisen neue Weine und Champagner zu entdecken — wie kürzlich jene Cuvées ohne Dosage, die ich so gern weitergebe. Die Gastronomie ist eine weitere meiner Leidenschaften: Ich koche gern und besuche regelmäßig Sterneküchen, nicht des Prestiges wegen, sondern um neue Aromen und Präsentationen zu entdecken.",
    s2title: "Die Begegnung mit dem Logis du pêcheur",
    s2p1:
      "Eher zufällig kam ich nach Oléron. Diese Insel gefiel mir sofort: abwechslungsreich, lebendig, authentisch. Und dann besichtigte ich eines Tages ein Haus, das niemand haben wollte — hässlich, von seinen Vorbesitzern verunstaltet. Wo andere ein Problem sahen, sah ich sofort, was daraus werden konnte.",
    s2p2:
      "Das Haus gehörte einem alten Fischer, einem überaus freundlichen Mann, den ich bis heute grüße, wenn ich vorbeikomme. Es steht in der Rue du Logis. Aus dieser doppelten Selbstverständlichkeit entstand sein Name: das Logis du pêcheur — das Haus des Fischers — eine Hommage an den Mann, der vor uns hier lebte, und an dieses Viertel von La Cotinière, in dem das Meer nie weit ist.",
    s2p3:
      "Es brauchte ein Jahr Bauzeit. Eine vollständige Entkernung, eine komplette Neugestaltung des Raums und viel Sorgfalt im Detail. Aus diesem vergessenen Haus entstand das Anwesen, das Sie heute entdecken.",
    s3title: "Die Kunst des Gastgebens",
    s3p1:
      "Mir liegt am Herzen, dass Sie sich wie zu Hause fühlen, an einem mit Anspruch und Großzügigkeit gestalteten Ort. Der Respekt vor dem Erbe, die Qualität des Empfangs, der Sinn für das Schöne und das Gute: Das sind die Werte, die ich in jedes meiner Häuser einbringe und die ich mit Ihnen teilen möchte.",
    s3p2:
      "Nichts ist dem Zufall überlassen, bis hin zur Einrichtung. Ich habe mich für große Namen des Designs und der Wohnkultur entschieden — Cinna, Ligne Roset, Duvivier, Villeroy & Boch, Calligaris, Foscarini, Fast — nicht des Prestiges wegen, sondern wegen der Qualität, der Robustheit und der Sorgfalt jedes einzelnen Stücks. Diese Hersteller arbeiten mit echten Designern und pflegen ihre Kollektionen über die Jahre: das Versprechen von Möbeln, die dauerhaft und schön sein sollen.",
    s3p3:
      "Der Komfort eines Sofas, das Licht einer Leuchte, die Feinheit des Geschirrs: Es sind diese oft unsichtbaren Details, die aus einem Aufenthalt einen echten Tapetenwechsel machen.",
    s3p4:
      "Denn ein Aufenthalt ist nicht nur vier Wände und ein Dach. Er ist eine Atmosphäre, eine Aufmerksamkeit, eine Geschichte, die Sie als Erinnerung mitnehmen.",
    renoTitle: "Die Renovierung des Logis du pêcheur",
    renoIntro:
      "Vom alten Fischerhaus zur heutigen Villa: vorher und nachher, Raum für Raum. Tippen Sie auf ein Foto, um es zu vergrößern.",
    pairs: { chambre: "Das Schlafzimmer", sdb: "Das Badezimmer", salon: "Das Wohnzimmer", terrasse: "Die Terrasse", piscine: "Der Pool" },
    chantierTitle: "Die Baustelle",
    chantierIntro: "Einige Etappen der Arbeiten, vom Rohbau bis zu den letzten Handgriffen.",
    captions: {
      reseaux: "Die Verlegung der Leitungen vor der Bodenplatte: Sanitär und Elektrik direkt im Erdreich verlegt.",
      beton: "Am Tag des Betonierens: die Betonpumpe in der Gasse neben dem Haus.",
      finitions: "Die Fertigstellung: Wände und Decken stehen, der ursprüngliche Stein bewahrt und in Szene gesetzt.",
    },
  },

  es: {
    eyebrow: "Escale à La Cotinière",
    title: "Quiénes somos",
    tagline: "Mucho más que un alquiler: una historia, un lugar, el arte de recibir.",
    portraitAlt: "Retrato de su anfitrión",
    s1title: "Un apasionado antes que un anfitrión",
    s1p1:
      "Originario de Lorena, ingeniero de formación y diplomado en una escuela de comercio, siempre tuve dos pasiones que nunca me abandonaron: el patrimonio y el arte de recibir. Todo comenzó a los dieciséis años, en casa de mi abuela, que acababa de comprar una vieja casa. Durante cuatro veranos aprendí a renovar con mis propias manos, a comprender la construcción antigua y a devolverle la vida. Desde entonces no he parado.",
    s1p2:
      "Hoy instalado en Burdeos, dedico parte de mi tiempo a recorrer los castillos del Médoc, de Saint-Émilion, de Graves y de Pessac-Léognan, y a descubrir en mis viajes nuevos vinos y champagnes — como esas cuvées sin dosificación que descubrí hace poco y que tanto me gusta compartir. La gastronomía es otra de mis pasiones: me gusta cocinar y frecuento con regularidad las mesas con estrella, no por el prestigio, sino por el descubrimiento de nuevos sabores y presentaciones.",
    s2title: "El encuentro con el Logis du pêcheur",
    s2p1:
      "Llegué a Oléron un poco por casualidad. Esta isla me gustó de inmediato: variada, viva, auténtica. Y un día visité una casa que nadie quería — fea, destrozada por sus anteriores propietarios. Donde otros veían un problema, yo vi enseguida lo que podía llegar a ser.",
    s2p2:
      "La casa pertenecía a un viejo pescador, un hombre de gran amabilidad al que sigo saludando al pasar. Se encuentra en la Rue du Logis. De esta doble evidencia nació su nombre: el Logis du pêcheur — la Casa del Pescador — un homenaje a quien la habitó antes que nosotros y a este barrio de La Cotinière donde el mar nunca está lejos.",
    s2p3:
      "Hizo falta un año de obras. Un vaciado total, una reorganización completa del espacio y mucho cuidado en cada detalle. De esta casa olvidada nació la vivienda que descubre hoy.",
    s3title: "El arte de recibir",
    s3p1:
      "Lo que más me importa es que se sienta como en casa, en un lugar pensado con exigencia y generosidad. El respeto por el patrimonio, la calidad de la acogida, el gusto por lo bello y lo bueno: son los valores que pongo en cada una de mis casas y que deseo compartir con usted.",
    s3p2:
      "Nada se deja al azar, hasta en el mobiliario. He elegido grandes firmas del diseño y del arte de vivir — Cinna, Ligne Roset, Duvivier, Villeroy & Boch, Calligaris, Foscarini, Fast — no por el prestigio, sino por la calidad, la robustez y el cuidado de cada pieza. Estos editores trabajan con verdaderos diseñadores y mantienen sus colecciones en el tiempo: la garantía de un mobiliario pensado para durar y para ser bello.",
    s3p3:
      "La comodidad de un sofá, la luz de una lámpara, la finura de una vajilla: son esos detalles, a menudo invisibles, los que convierten una estancia en un auténtico cambio de aires.",
    s3p4:
      "Porque una estancia no es solo cuatro paredes y un techo. Es un ambiente, una atención, una historia de la que uno se lleva el recuerdo.",
    renoTitle: "La renovación del Logis du pêcheur",
    renoIntro:
      "De la antigua casa de pescador a la villa de hoy: el antes y el después, habitación por habitación. Toque una foto para ampliarla.",
    pairs: { chambre: "El dormitorio", sdb: "El baño", salon: "El salón", terrasse: "La terraza", piscine: "La piscina" },
    chantierTitle: "La obra",
    chantierIntro: "Algunas etapas de los trabajos, de la obra gruesa a los acabados.",
    captions: {
      reseaux: "El paso de las instalaciones antes de la solera: fontanería y electricidad tendidas sobre la tierra.",
      beton: "Día del hormigonado: la bomba de hormigón desplegada en la callejuela de la casa.",
      finitions: "Los acabados: tabiques y techos montados, la piedra original conservada y realzada.",
    },
  },
};
