import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen">
      <Image
        src="/images/hero/Accueil.jpg"
        alt="Escale à La Cotinière"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl px-8 text-white">
          <p className="mb-4 uppercase tracking-[0.35em] text-amber-300">
            Île d'Oléron · La Cotinière
          </p>

          <h1 className="max-w-3xl text-6xl font-bold leading-tight">
            Des demeures d'exception pour des séjours inoubliables.
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-white/90">
            Découvrez notre collection de maisons de caractère à La Cotinière.
          </p>
        </div>
      </div>
    </section>
  );
}