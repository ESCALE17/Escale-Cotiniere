"use client";

import { useState } from "react";
import VillaGallery from "@/app/components/VillaGallery";
import BookingBox from "@/app/components/BookingBox";
import { villas } from "@/app/data/villa";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function VillaPageContent({ villaSlug }: { villaSlug: string }) {
  const { locale, t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const villa = villas.find((v) => v.slug === villaSlug);

  if (!villa) return null;

  const translated =
    locale !== "fr" ? villa.translations?.[locale] : undefined;

  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <VillaGallery photos={villa.gallery} />

      <section className="mx-auto max-w-6xl px-8 py-20">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-bold text-[#082f3a]">{villa.name}</h1>
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="rounded-full border border-[#082f3a] px-4 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white"
          >
            {showDetails ? t("villaPage.hideDescription") : t("villaPage.learnMore")}
          </button>
        </div>

        <p className="mb-6 max-w-3xl text-lg text-slate-600">
          {translated?.description ?? villa.description}
        </p>

        {showDetails && (
          <div className="mb-10 max-w-3xl whitespace-pre-line rounded-3xl bg-white p-8 text-slate-700 shadow-lg">
            {translated?.detailedDescription ??
              villa.detailedDescription ??
              villa.description}
          </div>
        )}

        <div className="mb-10 grid grid-cols-2 gap-6 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500">{t("villaPage.capacity")}</p>
            <p className="font-semibold">
              {translated?.capacity ?? villa.capacity}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t("villaPage.bedrooms")}</p>
            <p className="font-semibold">{villa.bedrooms}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              {t("villaPage.bathrooms")}
            </p>
            <p className="font-semibold">{villa.bathrooms}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t("villaPage.pool")}</p>
            <p className="font-semibold">{t("villaPage.poolPrivate")}</p>
          </div>
        </div>

        <BookingBox villaSlug={villaSlug} />
      </section>
    </main>
  );
}
