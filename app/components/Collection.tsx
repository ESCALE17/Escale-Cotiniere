import Link from "next/link";
import { villas } from "../data/villa";

export default function Collection() {
  return (
    <section id="collection" className="bg-[#f7f1e8] px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#c99b4a]">
          Notre Collection
        </p>

        <h2 className="mb-12 max-w-3xl text-5xl font-bold text-[#082f3a]">
          Quatre demeures de caractère à La Cotinière.
        </h2>

        <div className="grid gap-8 md:grid-cols-4">
          {villas.map((villa) => (
            <Link
              key={villa.slug}
              href={villa.href}
              className="overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={villa.image}
                alt={villa.name}
                className="h-80 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#082f3a]">
                  {villa.name}
                </h3>

                <p className="mt-2 text-sm text-[#294c55]">
                  {villa.capacity}
                </p>

                <p className="mt-4 font-semibold text-[#082f3a]">
                  Découvrir →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}