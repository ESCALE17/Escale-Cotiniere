"use client";

import { useLanguage } from "@/app/i18n/LanguageContext";

export default function CotiniereSection() {
  const { t } = useLanguage();

  return (
    <section id="cotiniere" className="bg-white px-8 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#8a755d]">
          {t("cotiniereSection.kicker")}
        </p>
        <h2 className="mb-6 text-4xl font-bold text-[#082f3a]">
          {t("cotiniereSection.title")}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          {t("cotiniereSection.text")}
        </p>
        <a
          href="https://www.saint-pierre-oleron-tourisme.fr/decouvrir"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block font-semibold text-[#082f3a] underline"
        >
          {t("cotiniereSection.learnMoreLink")}
        </a>
      </div>
    </section>
  );
}
