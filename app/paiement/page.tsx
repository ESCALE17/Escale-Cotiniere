"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { computePricing } from "@/app/lib/pricing";
import { buildBookingQuery, readBookingQuery } from "@/app/lib/bookingQuery";

export default function PaiementPage() {
  const searchParams = useSearchParams();
  const booking = readBookingQuery(searchParams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handlePayment() {
    if (!villa) return;
    setLoading(true);
    setError(null);

    try {
      const forwardQuery = buildBookingQuery({ ...booking });

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(pricing.deposit * 100), // en centimes
          villaName: villa.name,
          description: `Acompte réservation — ${villa.name} du ${booking.arrival} au ${booking.departure}`,
          clientEmail: booking.email,
          forwardQuery,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(
          "Le paiement n’a pas pu être initié. Merci de réessayer dans quelques instants."
        );
      }
    } catch {
      setError(
        "Une erreur est survenue lors de la connexion au paiement sécurisé."
      );
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-5xl font-bold text-[#082f3a]">
          Paiement sécurisé
        </h1>

        <div className="rounded-3xl bg-white p-10 shadow-xl">
          <p className="mb-2 text-lg text-slate-700">
            Vous allez être redirigé vers Stripe pour régler l’acompte de
            votre séjour à « {villa.name} ».
          </p>
          <p className="mb-6 text-3xl font-bold text-[#082f3a]">
            {pricing.deposit.toFixed(2)} €
          </p>

          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 p-5 text-red-900">
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full rounded-full bg-[#082f3a] px-8 py-5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Redirection en cours..." : "Payer mon acompte sécurisé"}
          </button>
        </div>
      </section>
    </main>
  );
}
