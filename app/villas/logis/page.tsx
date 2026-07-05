import VillaGallery from "@/app/components/VillaGallery";
import BookingBox from "@/app/components/BookingBox";

const photos = [
  "/images/villas/logis/Accueil.jpg",
  "/images/villas/logis/Cuisine.jpg",
  "/images/villas/logis/Salon.jpg",
  "/images/villas/logis/Piscine.jpg",
];

export default function LogisPage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <VillaGallery photos={photos} />

      <section className="mx-auto max-w-6xl px-8 py-20">
        <h1 className="mb-6 text-5xl font-bold text-[#082f3a]">
          Le Logis du Pêcheur
        </h1>

        <p className="mb-10 max-w-3xl text-lg text-slate-600">
          Grande demeure familiale avec piscine privée, pensée pour les grandes
          retrouvailles en famille ou entre amis.
        </p>

        <div className="mb-10 grid grid-cols-2 gap-6 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500">Capacité</p>
            <p className="font-semibold">8 à 11 voyageurs</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Chambres</p>
            <p className="font-semibold">4</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Salles de bains</p>
            <p className="font-semibold">4</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Piscine</p>
            <p className="font-semibold">Privée</p>
          </div>
        </div>

        <BookingBox villaSlug="logis" />
      </section>
    </main>
  );
}