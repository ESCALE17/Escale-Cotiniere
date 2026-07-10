import type { Metadata } from "next";
import RenovationGallery from "./RenovationGallery";

export const metadata: Metadata = {
  title: "Qui sommes-nous — Escale à La Cotinière",
  description:
    "L'histoire du Logis du pêcheur à La Cotinière, île d'Oléron : notre rénovation, pièce par pièce, en avant/après.",
};

export default function QuiSommesNousPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      {/* ---- En-tête ---- */}
      <header className="mb-12 md:mb-16">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#082f3a]/70">Escale à La Cotinière</p>
        <h1 className="text-4xl font-semibold text-[#082f3a] md:text-5xl">Qui sommes-nous</h1>
        <p className="mt-5 max-w-2xl text-xl leading-relaxed text-[#082f3a]/75">
          Bien plus qu&apos;une location : une histoire, un lieu, un art de recevoir.
        </p>
      </header>

      {/* ---- Présentation : portrait + première partie ---- */}
      <section className="mb-14 grid items-start gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
        <picture>
          <source srcSet="/images/renovation/portrait-hote.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/renovation/portrait-hote.jpg"
            alt="Portrait de votre hôte"
            className="w-full rounded-sm shadow-xl"
            style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
          />
        </picture>

        <div className="text-lg leading-relaxed text-[#082f3a]/85">
          <h2 className="mb-4 text-2xl font-semibold text-[#082f3a]">Un passionné avant d&apos;être un hôte</h2>
          <div className="space-y-5">
            <p>
              Originaire de Lorraine, ingénieur de formation et diplômé d&apos;école de commerce, j&apos;ai
              toujours eu deux amours qui ne m&apos;ont jamais quitté : le patrimoine et l&apos;art de recevoir.
              Tout a commencé à seize ans, chez ma grand-mère, qui venait d&apos;acquérir une vieille maison.
              Quatre étés durant, j&apos;ai appris à rénover de mes mains, à comprendre le bâti ancien, à lui
              redonner vie. Je n&apos;ai jamais cessé depuis.
            </p>
            <p>
              Aujourd&apos;hui installé à Bordeaux, je passe une partie de mon temps à parcourir les châteaux
              du Médoc, de Saint-Émilion, des Graves et de Pessac-Léognan, et à dénicher au fil de mes voyages
              de nouveaux vins et champagnes — comme récemment ces cuvées zéro dosage que j&apos;aime tant faire
              découvrir. La gastronomie est une autre de mes passions : j&apos;aime cuisiner, et je fréquente
              régulièrement les tables étoilées, non pour le prestige, mais pour la découverte de saveurs et de
              présentations nouvelles.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Suite du récit ---- */}
      <section className="mb-24 max-w-3xl text-lg leading-relaxed text-[#082f3a]/85">
        <h2 className="mb-4 text-2xl font-semibold text-[#082f3a]">La rencontre avec le Logis du pêcheur</h2>
        <div className="space-y-5">
          <p>
            C&apos;est un peu par hasard que je suis arrivé à Oléron. J&apos;ai tout de suite aimé cette île :
            variée, vivante, authentique. Et puis, un jour, j&apos;ai visité une maison dont personne ne voulait
            — laide, massacrée par ses précédents propriétaires. Là où d&apos;autres voyaient un problème,
            j&apos;ai vu immédiatement ce qu&apos;elle pouvait devenir.
          </p>
          <p>
            La maison appartenait à un vieux pêcheur, un homme d&apos;une grande gentillesse que je salue
            toujours au passage. Elle se trouve rue du Logis. De cette double évidence est né son nom : le Logis
            du pêcheur — un hommage à celui qui l&apos;a habitée avant nous, et à ce quartier de La Cotinière où
            la mer n&apos;est jamais loin.
          </p>
          <p>
            Il a fallu un an de chantier. Un curage total, une réorganisation complète de l&apos;espace, et
            beaucoup de soin apporté à chaque détail. De cette maison oubliée est née la demeure que vous
            découvrez aujourd&apos;hui.
          </p>
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-semibold text-[#082f3a]">Un art de recevoir</h2>
        <div className="space-y-5">
          <p>
            Ce qui me tient à cœur, c&apos;est que vous vous sentiez chez vous, dans un lieu pensé avec exigence
            et générosité. Le respect du patrimoine, la qualité de l&apos;accueil, le goût du beau et du bon : ce
            sont ces valeurs que je mets dans chacune de mes maisons, et que j&apos;ai envie de partager avec vous.
          </p>
          <p>
            Rien n&apos;est laissé au hasard, jusque dans l&apos;ameublement. J&apos;ai fait le choix de grandes
            maisons du design et de l&apos;art de vivre — Cinna, Ligne Roset, Duvivier, Villeroy &amp; Boch,
            Calligaris, Foscarini, Fast — non pour le prestige, mais pour la qualité, la robustesse et le soin
            apporté à chaque pièce. Ces éditeurs travaillent avec de véritables designers et suivent leurs
            collections dans le temps : le gage d&apos;un mobilier pensé pour durer et pour être beau.
          </p>
          <p>
            Le confort d&apos;un canapé, la lumière d&apos;un luminaire, la finesse d&apos;une vaisselle : ce sont
            ces détails, souvent invisibles, qui font qu&apos;un séjour devient un vrai moment de dépaysement.
          </p>
          <p>
            Parce qu&apos;un séjour, ce n&apos;est pas seulement quatre murs et un toit. C&apos;est une atmosphère,
            une attention, une histoire dont vous repartez avec le souvenir.
          </p>
        </div>
      </section>

      {/* ---- Rénovation ---- */}
      <section>
        <h2 className="text-center text-3xl font-semibold text-[#082f3a] md:text-4xl">
          La rénovation du Logis du pêcheur
        </h2>
        <p className="mx-auto mt-4 mb-16 max-w-2xl text-center leading-relaxed text-[#082f3a]/70">
          De l&apos;ancienne maison de pêcheur à la villa d&apos;aujourd&apos;hui : l&apos;avant et l&apos;après,
          pièce par pièce. Touchez une photo pour l&apos;agrandir.
        </p>

        <RenovationGallery />
      </section>
      </div>
    </main>
  );
}
