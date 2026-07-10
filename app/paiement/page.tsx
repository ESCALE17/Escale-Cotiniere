"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { computePricing } from "@/app/lib/pricing";
import { buildBookingQuery, readBookingQuery } from "@/app/lib/bookingQuery";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { defaultSettings, type AppSettings } from "@/app/lib/clientSettings";
import type { PricingPeriod } from "@/app/lib/periodPricing";
export const dynamic = "force-dynamic";
function PaiementPageContent() {
  const searchParams = useSearchParams();
  const booking = readBookingQuery(searchParams);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [periods, setPeriods] = useState<PricingPeriod[]>([]);
  const [panierTotal, setPanierTotal] = useState(0);
  useEffect(function () {
    fetch("/api/public-settings")
      .then(function (res) { return res.json(); })
      .then(function (data) { if (data.settings) setSettings(data.settings); })
      .catch(function () {});
  }, []);
  useEffect(function () {
    fetch("/api/public-pricing-periods?villa=" + booking.villa)
      .then(function (res) { return res.json(); })
      .then(function (data) { if (data.periods) setPeriods(data.periods); })
      .catch(function () {});
  }, [booking.villa]);
  useEffect(function () {
    if (!booking.panier) { setPanierTotal(0); return; }
    fetch("/api/panier-total", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ panier: booking.panier }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) { setPanierTotal(Number(data.total) || 0); })
      .catch(function () { setPanierTotal(0); });
  }, [booking.panier]);
  const pricing = computePricing({
    villaSlug: booking.villa,
    arrival: booking.arrival,
    departure: booking.departure,
    adults: booking.adults,
    children: booking.children,
    babies: booking.babies,
    pet: booking.pet === "oui",
  }, settings, periods, panierTotal);
  const villa = pricing.villa;
  const incomplete = !villa || !booking.arrival || !booking.departure || !booking.email;
  async function handlePayment() {
    if (!villa) return;
    setLoading(true);
    setError(null);
    try {
      const forwardQuery = buildBookingQuery({ ...booking, panier: booking.panier });
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(pricing.deposit * 100),
          productName: t("paiement.productNamePrefix") + " - " + villa.name,
          description: t("paiement.checkoutDescription", {
            villa: villa.name,
            arrival: booking.arrival,
            departure: booking.departure,
          }),
          clientEmail: booking.email,
          forwardQuery: forwardQuery,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(t("paiement.errorInit"));
      }
    } catch {
      setError(t("paiement.errorConnect"));
    } finally {
      setLoading(false);
    }
  }
  if (incomplete) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 pt-40 pb-20">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-[#082f3a]">{t("common.incompleteTitle")}</h1>
          <p className="mb-8 text-slate-600">{t("common.incompleteText")}</p>
          <Link href="/" className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white">{t("common.backHome")}</Link>
        </section>
      </main>
    );
  }
  if (pricing.needsQuote) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 pt-40 pb-20">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-[#082f3a]">{t("devis.quoteTitle")}</h1>
          <p className="mb-8 text-slate-600">{t("devis.quoteText")} contact@escalealacotiniere.fr</p>
          <Link href="/" className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white">{t("common.backHome")}</Link>
        </section>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 pt-40 pb-20">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-5xl font-bold text-[#082f3a]">{t("paiement.title")}</h1>
        <div className="rounded-3xl bg-white p-10 shadow-xl">
          <p className="mb-2 text-lg text-slate-700">{t("paiement.redirectText", { villa: villa.name })}</p>
          <p className="mb-6 text-3xl font-bold text-[#082f3a]">{pricing.deposit.toFixed(2)} EUR</p>
          {error && (<div className="mb-6 rounded-2xl bg-red-50 p-5 text-red-900">{error}</div>)}
          <button onClick={handlePayment} disabled={loading} className="w-full rounded-full bg-[#082f3a] px-8 py-5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? t("paiement.loading") : t("paiement.payButton")}
          </button>
        </div>
      </section>
    </main>
  );
}
export default function PaiementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f1e8]" />}>
      <PaiementPageContent />
    </Suspense>
  );
}
