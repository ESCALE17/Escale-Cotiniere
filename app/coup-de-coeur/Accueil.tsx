"use client";

import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { T, type Locale } from "./textes";

const ICONS = {
  restaurants: (
    <path d="M7 3v8m0 0a2 2 0 0 0 2-2V3m-2 8v10M5 3v6a2 2 0 0 0 2 2M17 3c-1.66 0-3 2.24-3 5s1.34 5 3 5m0 0v8" />
  ),
  visites: (
    <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7" />
  ),
  producteurs: (
    <path d="M8 2h8M9 2v4.5a4 4 0 0 1-.5 1.94l-3 5.56A4 4 0 0 0 9 20h6a4 4 0 0 0 3.5-6l-3-5.56A4 4 0 0 1 15 6.5V2M7 14h10" />
  ),
  velo: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17L9 8h6l2 4m-8 5l4-9m4 9l-3-9" />
    </>
  ),
};

export default function Accueil() {
  const { locale } = useLanguage();
  const loc = ((locale as Locale) in T ? (locale as Locale) : "fr") as Locale;
  const t = T[loc];

  const rubriques = [
    { href: "/coup-de-coeur/restaurants", ...t.cards.restaurants, icon: ICONS.restaurants },
    { href: "/coup-de-coeur/visites", ...t.cards.visites, icon: ICONS.visites },
    { href: "/coup-de-coeur/producteurs", ...t.cards.producteurs, icon: ICONS.producteurs },
    { href: "/coup-de-coeur/velo", ...t.cards.velo, icon: ICONS.velo },
  ];

  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <header className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#082f3a]/60">{t.eyebrow}</p>
          <h1 className="text-4xl font-semibold text-[#082f3a] md:text-5xl">{t.homeTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#082f3a]/70">{t.homeTagline}</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {rubriques.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex items-center gap-5 rounded-2xl border border-[#e7ddcd] bg-white p-6 shadow-sm transition hover:border-[#082f3a] hover:shadow-md"
            >
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#f7f1e8] text-[#082f3a]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {r.icon}
                </svg>
              </span>
              <span>
                <span className="block text-xl font-semibold text-[#082f3a]">{r.titre}</span>
                <span className="mt-1 block text-sm leading-relaxed text-[#5f6f74]">{r.texte}</span>
              </span>
              <span className="ml-auto text-[#082f3a] opacity-0 transition group-hover:opacity-100">→</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
