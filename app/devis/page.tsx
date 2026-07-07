"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { computePricing } from "@/app/lib/pricing";
import { buildBookingQuery } from "@/app/lib/bookingQuery";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { defaultSettings, type AppSettings } from "@/app/lib/clientSettings";
import type { PricingPeriod } from "@/app/lib/periodPricing";

export default function DevisPage() {
  const searchParams = useSearchParams();
  const { t, locale } = useLanguage();

  const villaSlug = searchParams.get("villa") || "logis";
  const arrival = searchParams.get("arrival");
  const departure = searchParams.get("departure");

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [pet, setPet] = useState<"oui" | "non">("non");
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
    fetch(`/api/public-pricing-periods?villa=${villaSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.periods) setPeriods(data.periods);
      })
      .catch(() => {});
  }, [villaSlug]);

  const pricing = computePricing({
    villaSlug,
    arrival,
    departure,
    adults,
    children,
    babies,
    pet: pet === "oui",
  }, settings, periods);

  const villa = pricing.villa;
  const missingDates = !arrival || !departure;

  if (!villa) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-[#082f3a]">
            {t("devis.villaNotFound")}
          </h1>
          <p className="mb-8 text-slate-600">{t("devis.villaNotFoundText")}</p>
          <Link href="/" className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white">
            {t("devis.backHome")}
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
            {t("devis.chooseDatesFirst")}
          </h1>
          <p className="mb-8 text-slate-600">
            {t("devis.chooseDatesFirstText", { villa: villa.name })}
          </p>
          <Link href={villa.href} className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white">
            {t("devis.seeVilla", { villa: villa.name })}
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
    lang: locale,
  });

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl bg-green-50 p-6 text-green-900">
          <p className="font-bold">{t("devis.availableStay")}</p>
          <p>
            {villa.name} — {arrival} → {departure} — {pricing.nights}{" "}
            {t("devis.nightsSuffix")}
          </p>
        </div>

        <h1 className="mb-8 text-5xl font-bold text-[#082f3a]">
          {t("devis.title")}
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-[#082f3a]">
              {t("devis.stayInfo")}
            </h2>

            <div className="grid gap-4">
              <label>
                {t("devis.adults")}
                <input type="number" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="mt-2 w-full rounded-xl border p-4" />
              </label>

              <label>
                {t("devis.children")}
                <input type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} className="mt-2 w-full rounded-xl border p-4" />
              </label>

              <label>
                {t("devis.babies")}
                <input type="number" min="0" value={babies} onChange={(e) => setBabies(Number(e.target.value))} className="mt-2 w-full rounded-xl border p-4" />
              </label>

              <label>
                {t("devis.pet")}
                <select value={pet} onChange={(e) => setPet(e.target.value as "oui" | "non")} className="mt-2 w-full rounded-xl border p-4">
                  <option value="non">{t("devis.petNo")}</option>
                  <option value="oui">{t("devis.petYes")}</option>
                </select>
              </label>
            </div>

            {pricing.capacityExceeded && (
              <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-900">
                <p className="font-bold">{t("devis.capacityExceeded")}</p>
                <p>{t("devis.capacityExceededText", { max: villa.maxTravelers })}</p>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-[#082f3a]">
              {t("devis.summary")}
            </h2>

            {pricing.needsQuote ? (
              <div className="rounded-2xl bg-amber-50 p-6 text-amber-900">
                <p className="mb-2 font-bold">Tarif sur demande</p>
                <p className="mb-4">
                  Pour ces dates, merci de nous consulter afin d&apos;obtenir un tarif personnalise :
                </p>
                <a href="mailto:contact@escalealacotiniere.fr" className="font-semibold underline">
                  contact@escalealacotiniere.fr
                </a>
              </div>
            ) : (
              <div className="space-y-4 text-slate-700">
                <p>{t("devis.stay")} : {pricing.stayPrice.toFixed(2)} €</p>
                {pricing.weeklyDiscount > 0 && (
                  <p className="text-green-700">
                    Remise semaine incluse : −{pricing.weeklyDiscount.toFixed(2)} €
                  </p>
                )}
                <p>{t("devis.cleaning")} : {pricing.cleaningFee.toFixed(2)} €</p>
                <p>{t("devis.linen")} : {pricing.linenFee.toFixed(2)} €</p>
                <p>{t("devis.animal")} : {pricing.petFee.toFixed(2)} €</p>

                <hr />

                <p className="text-2xl font-bold text-[#082f3a]">
                  {t("devis.total")} : {pricing.capacityExceeded ? "—" : `${pricing.total.toFixed(2)} €`}
                </p>
                <p className="font-semibold">
                  {t("devis.deposit")} : {pricing.capacityExceeded ? "—" : `${pricing.deposit.toFixed(2)} €`}
                </p>
                <p className="font-semibold">
                  {t("devis.balance")} : {pricing.capacityExceeded ? "—" : `${pricing.balance.toFixed(2)} €`}
                </p>

                {!pricing.capacityExceeded && (
                  <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
                    {t("devis.touristTaxNote", { amount: pricing.touristTax.toFixed(2) })}
                  </p>
                )}
              </div>
            )}

            {!pricing.capacityExceeded && !pricing.needsQuote ? (
              <Link href={`/coordonnees?${nextQuery}`} className="mt-8 block w-full rounded-full bg-[#082f3a] px-8 py-4 text-center text-white">
                {t("devis.continue")}
              </Link>
            ) : (
              <button disabled className="mt-8 w-full rounded-full bg-[#082f3a] px-8 py-4 text-white opacity-40">
                {t("devis.continue")}
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}