"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const villaCapacities: Record<string, number> = {
  logis: 11,
  ecole: 12,
  mouettes: 8,
  parour: 10,
};

export default function DevisPage() {
  const searchParams = useSearchParams();

  const villa = searchParams.get("villa") || "logis";
  const arrival = searchParams.get("arrival");
  const departure = searchParams.get("departure");

  const capacity = villaCapacities[villa] || 0;

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [pet, setPet] = useState("non");

  const travelersForCapacity = adults + children;
  const capacityExceeded = travelersForCapacity > capacity;

  const nights =
    arrival && departure
      ? Math.max(
          1,
          Math.ceil(
            (new Date(departure).getTime() - new Date(arrival).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const pricePerNight = 350;
  const stayPrice = nights * pricePerNight;
  const cleaningFee = 200;
  const linenFee = (adults + children) * 20;
  const petFee = pet === "oui" ? 100 : 0;
  const touristTax = adults * nights * 3.3;

  const total = stayPrice + cleaningFee + linenFee + petFee + touristTax;
  const deposit = total * 0.4;
  const balance = total - deposit;

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl bg-green-50 p-6 text-green-900">
          <p className="font-bold">Séjour disponible</p>
          <p>
            {villa} — du {arrival} au {departure} — {nights} nuit(s)
          </p>
        </div>

        <h1 className="mb-8 text-5xl font-bold text-[#082f3a]">
          Votre devis
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-[#082f3a]">
              Informations du séjour
            </h2>

            <div className="grid gap-4">
              <label>
                Adultes
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border p-4"
                />
              </label>

              <label>
                Enfants
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border p-4"
                />
              </label>

              <label>
                Bébés
                <input
                  type="number"
                  min="0"
                  value={babies}
                  onChange={(e) => setBabies(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border p-4"
                />
              </label>

              <label>
                Animal domestique
                <select
                  value={pet}
                  onChange={(e) => setPet(e.target.value)}
                  className="mt-2 w-full rounded-xl border p-4"
                >
                  <option value="non">Non</option>
                  <option value="oui">Oui</option>
                </select>
              </label>
            </div>

            {capacityExceeded && (
              <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-900">
                <p className="font-bold">Capacité dépassée.</p>
                <p>
                  Cette demeure accepte au maximum {capacity} voyageurs hors
                  bébés. Contactez le propriétaire pour étudier votre demande.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-[#082f3a]">
              Récapitulatif
            </h2>

            <div className="space-y-4 text-slate-700">
              <p>Location : {stayPrice.toFixed(2)} €</p>
              <p>Ménage : {cleaningFee.toFixed(2)} €</p>
              <p>Draps & serviettes : {linenFee.toFixed(2)} €</p>
              <p>Animal : {petFee.toFixed(2)} €</p>
              <p>Taxe de séjour : {touristTax.toFixed(2)} €</p>

              <hr />

              <p className="text-2xl font-bold text-[#082f3a]">
                Total : {capacityExceeded ? "—" : `${total.toFixed(2)} €`}
              </p>

              <p className="font-semibold">
                Acompte 40 % :{" "}
                {capacityExceeded ? "—" : `${deposit.toFixed(2)} €`}
              </p>

              <p className="font-semibold">
                Solde à J-30 :{" "}
                {capacityExceeded ? "—" : `${balance.toFixed(2)} €`}
              </p>
            </div>

            {!capacityExceeded ? (
              <Link
                href="/coordonnees"
                className="mt-8 block w-full rounded-full bg-[#082f3a] px-8 py-4 text-center text-white"
              >
                Continuer vers mes coordonnées
              </Link>
            ) : (
              <button
                disabled
                className="mt-8 w-full rounded-full bg-[#082f3a] px-8 py-4 text-white opacity-40"
              >
                Continuer vers mes coordonnées
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}