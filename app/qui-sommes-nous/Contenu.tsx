"use client";

import { useLanguage } from "@/app/i18n/LanguageContext";
import { contenu, type Locale } from "./contenu";
import RenovationGallery from "./RenovationGallery";

export default function Contenu() {
  const { locale } = useLanguage();
  const c = contenu[(locale as Locale)] ?? contenu.fr;

  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        {/* En-tête */}
        <header className="mb-12 md:mb-16">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#082f3a]/70">{c.eyebrow}</p>
          <h1 className="text-4xl font-semibold text-[#082f3a] md:text-5xl">{c.title}</h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-[#082f3a]/75">{c.tagline}</p>
        </header>

        {/* Portrait + première partie */}
        <section className="mb-14 grid items-start gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-14">
          <picture>
            <source srcSet="/images/renovation/portrait-hote.webp" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/renovation/portrait-hote.jpg"
              alt={c.portraitAlt}
              className="w-full rounded-sm shadow-xl"
              style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
            />
          </picture>

          <div className="text-lg leading-relaxed text-[#082f3a]/85">
            <h2 className="mb-4 text-2xl font-semibold text-[#082f3a]">{c.s1title}</h2>
            <div className="space-y-5">
              <p>{c.s1p1}</p>
              <p>{c.s1p2}</p>
            </div>
          </div>
        </section>

        {/* Suite du récit */}
        <section className="mb-24 max-w-3xl text-lg leading-relaxed text-[#082f3a]/85">
          <h2 className="mb-4 text-2xl font-semibold text-[#082f3a]">{c.s2title}</h2>
          <div className="space-y-5">
            <p>{c.s2p1}</p>
            <p>{c.s2p2}</p>
            <p>{c.s2p3}</p>
          </div>

          <h2 className="mt-12 mb-4 text-2xl font-semibold text-[#082f3a]">{c.s3title}</h2>
          <div className="space-y-5">
            <p>{c.s3p1}</p>
            <p>{c.s3p2}</p>
            <p>{c.s3p3}</p>
            <p>{c.s3p4}</p>
          </div>
        </section>

        {/* Rénovation */}
        <section>
          <h2 className="text-center text-3xl font-semibold text-[#082f3a] md:text-4xl">{c.renoTitle}</h2>
          <p className="mx-auto mt-4 mb-16 max-w-2xl text-center leading-relaxed text-[#082f3a]/70">
            {c.renoIntro}
          </p>

          <RenovationGallery />
        </section>
      </div>
    </main>
  );
}
