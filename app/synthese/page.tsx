"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { computePricing } from "@/app/lib/pricing";
import { buildBookingQuery, readBookingQuery } from "@/app/lib/bookingQuery";

export default function SynthesePage() {
  const searchParams = useSearchParams();
  const booking = readBookingQuery(searchParams);

  const pricing = computePricing({
    villaSlug: booking.villa,
    arrival: booking.arrival,
    departure: booking.departure,
    adults: booking.adults,
    children: booking.children,
    babies: booking.babies,
    pet: booking.pet === "oui",
  });

  const villa = pricing.villa;
  const incomplete = !villa || !booking.arrival || !booking.departure || !booking.email;

  if (incomplete) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-[#082f3a]">
            Informations manquantes
          </h1>
          <p className="mb-8 text-slate-600">
            Certaines informations de votre réservation sont manquantes.
            Merci de reprendre le parcours depuis le début.
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

  const nextQuery = buildBookingQuery({ ...booking });

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-5xl font-bold text-[#082f3a]">
          Synthèse de votre réservation
        </h1>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <div className="space-y-4 text-slate-700">
            <p>
              <strong>Demeure :</strong> {villa.name}
            </p>
            <p>
              <strong>Séjour :</strong> du {booking.arrival} au{" "}
              {booking.departure} ({pricing.nights} nuit
              {pricing.nights > 1 ? "s" : ""})
            </p>
            <p>
              <strong>Voyageurs :</strong> {booking.adults} adulte
              {booking.adults > 1 ? "s" : ""}, {booking.children} enfant
              {booking.children > 1 ? "s" : ""}, {booking.babies} bébé
              {booking.babies > 1 ? "s" : ""}
              {booking.pet === "oui" ? ", avec animal" : ""}
            </p>
            <p>
              <strong>Client :</strong> {booking.prenom} {booking.nom} —{" "}
              {booking.email}
            </p>

            <hr />

            <p className="text-2xl font-bold text-[#082f3a]">
              <strong>Total :</strong> {pricing.total.toFixed(2)} €
            </p>
            <p>
              <strong>Acompte à régler maintenant :</strong>{" "}
              {pricing.deposit.toFixed(2)} €
            </p>
            <p>
              <strong>Solde à régler à J-30 :</strong>{" "}
              {pricing.balance.toFixed(2)} €
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-[#f7f1e8] p-6 text-sm text-slate-700">
            En cliquant sur le bouton ci-dessous, vous serez dirigé vers le
            paiement sécurisé de l’acompte.
          </div>

          <Link
            href={`/paiement?${nextQuery}`}
            className="mt-8 block w-full rounded-full bg-[#082f3a] px-8 py-4 text-center text-white"
          >
            Aller vers le paiement sécurisé
          </Link>
        </div>
      </section>
    </main>
  );
}
