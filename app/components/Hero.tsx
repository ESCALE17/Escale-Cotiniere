"use client";

import Image from "next/image";
import { useLanguage } from "@/app/i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen">
      <Image
        src="/images/hero/Accueil.jpg"
        alt="Escale à La Cotinière"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl px-8 text-white">
          <p className="mb-4 uppercase tracking-[0.35em] text-amber-300">
            {t("hero.kicker")}
          </p>

          <h1 className="max-w-3xl text-6xl font-bold leading-tight">
            {t("hero.title")}
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-white/90">
            {t("hero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
