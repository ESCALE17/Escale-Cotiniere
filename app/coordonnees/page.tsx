"use client";
import { Suspense } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { buildBookingQuery, readBookingQuery } from "@/app/lib/bookingQuery";
import { useLanguage } from "@/app/i18n/LanguageContext";
export const dynamic = "force-dynamic";

function CoordonneesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const booking = readBookingQuery(searchParams);
  const { t } = useLanguage();

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

    if (!form.nom.trim()) newErrors.push(t("coord.errNom"));
    if (!form.prenom.trim()) newErrors.push(t("coord.errPrenom"));
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.push(t("coord.errEmail"));
    if (!form.telephone.trim()) newErrors.push(t("coord.errTelephone"));
    if (!form.adresse.trim()) newErrors.push("L'adresse est obligatoire.");
    if (!form.codePostal.trim()) newErrors.push("Le code postal est obligatoire.");
    if (!form.ville.trim()) newErrors.push("La ville est obligatoire.");
    if (!form.pays.trim()) newErrors.push("Le pays est obligatoire.");
    if (!accepte) newErrors.push(t("coord.errCgl"));

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
      lang: booking.lang,
      ...form,
    });

    router.push(`/synthese?${query}`);
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-5xl font-bold text-[#082f3a]">
          {t("coord.title")}
        </h1>

        <div className="rounded-3xl bg-white p-10 shadow-xl">
          {errors.length > 0 && (
            <div className="mb-8 rounded-2xl bg-red-50 p-6 text-red-900">
              <p className="mb-2 font-bold">{t("coord.errorsTitle")}</p>
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
              placeholder={t("coord.nom")}
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder={t("coord.prenom")}
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder={t("coord.email")}
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder={t("coord.telephone")}
              value={form.telephone}
              onChange={(e) => update("telephone", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder={t("coord.telephoneFixe")}
              value={form.telephoneFixe}
              onChange={(e) => update("telephoneFixe", e.target.value)}
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder={t("coord.adresse")}
              value={form.adresse}
              onChange={(e) => update("adresse", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder={t("coord.codePostal")}
              value={form.codePostal}
              onChange={(e) => update("codePostal", e.target.value)}
            />

            <input
              className="rounded-xl border p-4"
              placeholder={t("coord.ville")}
              value={form.ville}
              onChange={(e) => update("ville", e.target.value)}
            />

            <input
              className="rounded-xl border p-4 md:col-span-2"
              placeholder={t("coord.pays")}
              value={form.pays}
              onChange={(e) => update("pays", e.target.value)}
            />
          </div>

          <div className="mt-10 rounded-2xl bg-[#f7f1e8] p-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="accepte-cgl"
                className="mt-1"
                checked={accepte}
                onChange={(e) => setAccepte(e.target.checked)}
              />
              <span>
                <label htmlFor="accepte-cgl" className="cursor-pointer">
                  {t("coord.cglPrefix")}
                </label>{" "}
                <Link
                  href={`/conditions-generales?${buildBookingQuery({
                    villa: booking.villa,
                    arrival: booking.arrival,
                    departure: booking.departure,
                    adults: booking.adults,
                    children: booking.children,
                    babies: booking.babies,
                    pet: booking.pet,
                    lang: booking.lang,
                  })}`}
                  target="_blank"
                  className="underline font-semibold"
                >
                  {t("coord.cglLink")}
                </Link>{" "}
                <label htmlFor="accepte-cgl" className="cursor-pointer">
                  {t("coord.cglSuffix")}
                </label>
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-10 block w-full rounded-full bg-[#082f3a] py-5 text-center text-lg font-semibold text-white transition hover:bg-[#0d4757]"
          >
            {t("coord.submit")}
          </button>
        </div>
      </section>
    </main>
  );
}export default function CoordonneesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f1e8]" />}>
      <CoordonneesPageContent />
    </Suspense>
  );
}
