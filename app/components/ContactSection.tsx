"use client";

import { useLanguage } from "@/app/i18n/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="bg-[#f7f1e8] px-8 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-4xl font-bold text-[#082f3a]">
          {t("contactSection.title")}
        </h2>
        <p className="mb-8 text-lg text-slate-600">
          {t("contactSection.text")}
        </p>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#8a755d]">
          {t("contactSection.emailLabel")}
        </p>
        <a
          href="mailto:contact@escalealacotiniere.fr"
          className="mt-2 inline-block text-xl font-semibold text-[#082f3a] underline"
        >
          contact@escalealacotiniere.fr
        </a>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-[#8a755d]">
          {t("contactSection.phoneLabel")}
        </p>
        <a
          href="tel:+33673286478"
          className="mt-2 inline-block text-xl font-semibold text-[#082f3a] underline"
        >
          06 73 28 64 78
        </a>
      </div>
    </section>
  );
}
