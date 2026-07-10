"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { locales, localeLabels } from "@/app/i18n/translations";

export default function Header() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin");
  const [menuOpen, setMenuOpen] = useState(false);

  // Sur les pages d'administration, on n'affiche pas le bandeau public du site.
  if (isAdmin) {
    return null;
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-8 md:py-6">
      <div className="mx-auto flex max-w-7xl items-center gap-2 md:gap-4">
        {/* Logo : grand sur desktop (débordant à gauche), compact sur mobile */}
        <div className="relative h-0 w-16 shrink-0 md:-ml-36 md:w-72">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="Escale à La Cotinière"
              className="absolute left-0 top-1/2 h-20 w-20 -translate-y-[42%] md:h-72 md:w-72"
            />
          </Link>
        </div>

        <nav className="flex flex-1 items-center justify-between rounded-full bg-white/85 px-3 py-3 shadow-lg backdrop-blur md:px-6 md:py-4">
          <div className="flex items-center gap-2 md:gap-4">
            {!isHome && (
              <Link
                href="/"
                className="hidden rounded-full bg-[#082f3a] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0d4757] md:inline-block md:px-4 md:text-sm"
              >
                {t("nav.backHome")}
              </Link>
            )}

            <Link
              href="/"
              className="text-sm font-bold tracking-wide text-[#082f3a] md:text-lg"
            >
              {t("nav.brand")}
            </Link>
          </div>

          {/* Liens de navigation : visibles sur desktop uniquement */}
          <div className="hidden items-center gap-8 text-sm font-semibold text-[#082f3a] md:flex">
            <a href="/#collection">{t("nav.collection")}</a>
            <a href="/#cotiniere">{t("nav.cotiniere")}</a>
            <Link href="/qui-sommes-nous">{t("nav.about")}</Link>
            <a href="/#contact">{t("nav.contact")}</a>
            <Link href="/coup-de-coeur">{t("nav.recos")}</Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Sélecteur de langue : toujours visible */}
            <div className="flex items-center gap-1 rounded-full bg-[#f7f1e8] p-1 text-xs font-bold text-[#082f3a]">
              {locales.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`rounded-full px-2 py-1 transition md:px-3 md:py-1.5 ${
                    locale === code
                      ? "bg-[#082f3a] text-white"
                      : "hover:bg-white"
                  }`}
                >
                  {localeLabels[code]}
                </button>
              ))}
            </div>

            {/* Bouton hamburger : visible sur mobile uniquement */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#082f3a] transition hover:bg-[#f7f1e8] md:hidden"
            >
              {menuOpen ? (
                // Croix (fermer)
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                // Trois barres (hamburger)
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Panneau du menu mobile : s'ouvre au clic sur le hamburger */}
      {menuOpen && (
        <div className="mx-auto mt-2 max-w-7xl md:hidden">
          <div className="rounded-3xl bg-white/95 p-4 shadow-lg backdrop-blur">
            <nav className="flex flex-col gap-1 text-base font-semibold text-[#082f3a]">
              {!isHome && (
                <a
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl bg-[#082f3a] px-4 py-3 text-white transition hover:bg-[#0d4757]"
                >
                  {t("nav.backHome")}
                </a>
              )}
              <a
                href="/#collection"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 transition hover:bg-[#f7f1e8]"
              >
                {t("nav.collection")}
              </a>
              <a
                href="/#cotiniere"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 transition hover:bg-[#f7f1e8]"
              >
                {t("nav.cotiniere")}
              </a>
              <Link
                href="/qui-sommes-nous"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 transition hover:bg-[#f7f1e8]"
              >
                {t("nav.about")}
              </Link>
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 transition hover:bg-[#f7f1e8]"
              >
                {t("nav.contact")}
              </a>
              <Link
                href="/coup-de-coeur"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 transition hover:bg-[#f7f1e8]"
              >
                {t("nav.recos")}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
