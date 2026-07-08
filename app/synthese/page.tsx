"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { computePricing } from "@/app/lib/pricing";
import { buildBookingQuery, readBookingQuery } from "@/app/lib/bookingQuery";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { defaultSettings, type AppSettings } from "@/app/lib/clientSettings";
import type { PricingPeriod } from "@/app/lib/periodPricing";
export const dynamic = "force-dynamic";

function SynthesePageContent() {
  const searchParams = useSearchParams();
  const booking = readBookingQuery(searchParams);
  const { t } = useLanguage();

  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [periods, setPeriods] = useState<PricingPeriod[]>([]);

  useEffect(() => {
    fetch("/api/public-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(`/api/public-pricing-periods?villa=${booking.villa}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.periods) setPeriods(data.periods);
      })
      .catch(() => {});
  }, [booking.villa]);

  const pricing = computePricing({
    villaSlug: booking.villa,
    arrival: booking.arrival,
    departure: booking.departure,
    adults: booking.adults,
    children: booking.children,
    babies: booking.babies,
    pet: booking.pet === "oui",
  }, settings, periods);

  const villa = pricing.villa;
  const incomplete = !villa || !booking.arrival || !booking.departure || !booking.email;

  if (incomplete) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-[#082f3a]">
            {t("common.incompleteTitle")}
          </h1>
          <p className="mb-8 text-slate-600">{t("common.incompleteText")}</p>
          <Link href="/" className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white">
            {t("common.backHome")}
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
          {t("synthese.title")}
        </h1>

        <div className="rounded-3xl bg-white p-8 shadow-xl">
          {pricing.needsQuote ? (
            <div className="rounded-2xl bg-amber-50 p-6 text-amber-900">
              <p className="mb-2 font-bold">{t("devis.quoteTitle")}</p>
              <p className="mb-4">{t("devis.quoteText")}</p>
              <a href="mailto:contact@escalealacotiniere.fr" className="font-semibold underline">
                contact@escalealacotiniere.fr
              </a>
            </div>
          ) : (
            <div className="space-y-4 text-slate-700">
              <p><strong>{t("synthese.villa")} :</strong> {villa.name}</p>
              <p>
                <strong>{t("synthese.stay")} :</strong> {booking.arrival} →{" "}
                {booking.departure} ({pricing.nights} {t("synthese.nightsSuffix")})
              </p>
              <p>
                <strong>{t("synthese.travelers")} :</strong> {booking.adults}{" "}
                {t("synthese.adult")}{booking.adults > 1 ? "s" : ""}, {booking.children}{" "}
                {t("synthese.child")}{booking.children > 1 ? "s" : ""}, {booking.babies}{" "}
                {t("synthese.baby")}{booking.babies > 1 ? "s" : ""}
                {booking.pet === "oui" ? t("synthese.withAnimal") : ""}
              </p>
              <p>
                <strong>{t("synthese.client")} :</strong> {booking.prenom}{" "}
                {booking.nom} — {booking.email}
              </p>

              <hr />

              {pricing.weeklyDiscount > 0 && (
                <p className="text-green-700">
                  Remise semaine incluse : −{pricing.weeklyDiscount.toFixed(2)} €
                </p>
              )}
              <p className="text-2xl font-bold text-[#082f3a]">
                <strong>{t("synthese.total")} :</strong> {pricing.total.toFixed(2)} €
              </p>
              <p><strong>{t("synthese.depositNow")} :</strong> {pricing.deposit.toFixed(2)} €</p>
              <p><strong>{t("synthese.balance")} :</strong> {pricing.balance.toFixed(2)} €</p>
              <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
                {t("synthese.touristTaxNote", { amount: pricing.touristTax.toFixed(2) })}
              </p>
            </div>
          )}

          <div className="mt-8 rounded-2xl bg-[#f7f1e8] p-6 text-sm text-slate-700">
            {t("synthese.payNote")}
          </div>

          {pricing.needsQuote ? (
            <button disabled className="mt-8 block w-full rounded-full bg-[#082f3a] px-8 py-4 text-center text-white opacity-40">
              {t("synthese.continue")}
            </button>
          ) : (
            <Link href={`/paiement?${nextQuery}`} className="mt-8 block w-full rounded-full bg-[#082f3a] px-8 py-4 text-center text-white">
              {t("synthese.continue")}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

export default function SynthesePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f1e8]" />}>
      <SynthesePageContent />
    </Suspense>
  );
}