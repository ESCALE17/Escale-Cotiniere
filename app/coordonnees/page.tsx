"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buildBookingQuery, readBookingQuery } from "@/app/lib/bookingQuery";

export default function CoordonneesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const booking = readBookingQuery(searchParams);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    telephoneFixe: "",
    adresse: "",
    codePostal: "",
    ville: "",
    pays: "",
  });
  const [accepte, setAccepte] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    const newErrors: string[] = [];

    if (!form.nom.trim()) newErrors.push("Le nom est obligatoire.");
    if (!form.prenom.trim()) newErrors.push("Le prénom est obligatoire.");
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.push("L’adresse e-mail n’est pas valide.");
    if (!form.telephone.trim())
      newErrors.push("Le téléphone portable est obligatoire.");
    if (!accepte)
      newErrors.push(
        "Vous devez accepter les conditions générales de location."
      );

    setErrors(newErrors);

    if (newErrors.length > 0) return;

    const query = buildBookingQuery({
      villa: booking.villa,
      arrival: booking.arrival,
      departure: booking.departure,
      adults: booking.adults,
      children: booking.children,
      babies: booking.babies,
      pet: booking.pet,
      ...form,
    });

    router.push(`/synthese?${query}`);
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-5xl font-bold text-[#082f3a]">
          Vos coordonnées
        </h1>

        <div className="rounded-3xl bg-white p-10 shadow-xl">
          {errors.length > 0 && (
            <div className="mb-8 rounded-2xl bg-red-50 p-6 text-red-900">
              <p className="mb-2 font-bold">
                Merci de corriger les points suivants :
              </p>
              <ul className="list-inside list-disc">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <input
              className="rounded-xl border p-4"
              placeholder="Nom *"
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Prénom *"
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder="Adresse e-mail *"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Téléphone portable *"
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Téléphone fixe (facultatif)"
              value={form.telephoneFixe}
              onChange={(e) => update("telephoneFixe", e.target.value)}
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder="Adresse"
              value={form.adresse}
              onChange={(e) => update("adresse", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Code postal"
              value={form.codePostal}
              onChange={(e) => update("codePostal", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder="Ville"
              value={form.ville}
              onChange={(e) => update("ville", e.target.value)}
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder="Pays"
              value={form.pays}
              onChange={(e) => update("pays", e.target.value)}
            />
          </div>

          <div className="mt-10 rounded-2xl bg-[#f7f1e8] p-6">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={accepte}
                onChange={(e) => setAccepte(e.target.checked)}
              />
              <span>
                Je reconnais avoir pris connaissance des conditions générales
                de location et je les accepte.
              </span>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-10 block w-full rounded-full bg-[#082f3a] py-5 text-center text-lg font-semibold text-white transition hover:bg-[#0d4757]"
          >
            Voir la synthèse de ma réservation
          </button>
        </div>
      </section>
    </main>
  );
}
