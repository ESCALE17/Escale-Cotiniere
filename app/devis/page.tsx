"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { computePricing } from "@/app/lib/pricing";
import { buildBookingQuery } from "@/app/lib/bookingQuery";

export default function DevisPage() {
  const searchParams = useSearchParams();

  const villaSlug = searchParams.get("villa") || "logis";
  const arrival = searchParams.get("arrival");
  const departure = searchParams.get("departure");

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [pet, setPet] = useState<"oui" | "non">("non");

  const pricing = computePricing({
    villaSlug,
    arrival,
    departure,
    adults,
    children,
    babies,
    pet: pet === "oui",
  });

  const villa = pricing.villa;
  const missingDates = !arrival || !departure;

  if (!villa) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-[#082f3a]">
            Demeure introuvable
          </h1>
          <p className="mb-8 text-slate-600">
            Merci de repartir de la fiche d’une de nos demeures pour choisir
            vos dates.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
          >
            Retour à l’accueil
          </Link>
        </section>
      </main>
    );
  }

  if (missingDates) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-[#082f3a]">
            Choisissez d’abord vos dates
          </h1>
          <p className="mb-8 text-slate-600">
            Retournez sur la fiche de « {villa.name} » et sélectionnez vos
            dates d’arrivée et de départ pour obtenir votre devis.
          </p>
          <Link
            href={villa.href}
            className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
          >
            Voir « {villa.name} »
          </Link>
        </section>
      </main>
    );
  }

  const nextQuery = buildBookingQuery({
    villa: villaSlug,
    arrival: arrival ?? undefined,
    departure: departure ?? undefined,
    adults,
    children,
    babies,
    pet,
  });

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl bg-green-50 p-6 text-green-900">
          <p className="font-bold">Séjour disponible</p>
          <p>
            {villa.name} — du {arrival} au {departure} — {pricing.nights}{" "}
            nuit(s)
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
                  onChange={(e) => setPet(e.target.value as "oui" | "non")}
                  className="mt-2 w-full rounded-xl border p-4"
                >
                  <option value="non">Non</option>
                  <option value="oui">Oui</option>
                </select>
              </label>
            </div>

            {pricing.capacityExceeded && (
              <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-900">
                <p className="font-bold">Capacité dépassée.</p>
                <p>
                  Cette demeure accepte au maximum {villa.maxTravelers}{" "}
                  voyageurs hors bébés. Contactez le propriétaire pour étudier
                  votre demande.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-[#082f3a]">
              Récapitulatif
            </h2>

            <div className="space-y-4 text-slate-700">
              <p>Location : {pricing.stayPrice.toFixed(2)} €</p>
              <p>Ménage : {pricing.cleaningFee.toFixed(2)} €</p>
              <p>Draps & serviettes : {pricing.linenFee.toFixed(2)} €</p>
              <p>Animal : {pricing.petFee.toFixed(2)} €</p>
              <p>Taxe de séjour : {pricing.touristTax.toFixed(2)} €</p>

              <hr />

              <p className="text-2xl font-bold text-[#082f3a]">
                Total :{" "}
                {pricing.capacityExceeded
                  ? "—"
                  : `${pricing.total.toFixed(2)} €`}
              </p>

              <p className="font-semibold">
                Acompte 40 % :{" "}
                {pricing.capacityExceeded
                  ? "—"
                  : `${pricing.deposit.toFixed(2)} €`}
              </p>

              <p className="font-semibold">
                Solde à J-30 :{" "}
                {pricing.capacityExceeded
                  ? "—"
                  : `${pricing.balance.toFixed(2)} €`}
              </p>
            </div>

            {!pricing.capacityExceeded ? (
              <Link
                href={`/coordonnees?${nextQuery}`}
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
