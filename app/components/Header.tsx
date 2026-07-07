"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { locales, localeLabels } from "@/app/i18n/translations";

export default function Header() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin");

  // Sur les pages d'administration, on n'affiche pas le bandeau public du site.
  if (isAdmin) {
    return null;
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-8 py-6">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <div className="relative -ml-36 h-0 w-72 shrink-0">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="Escale à La Cotinière"
              className="absolute left-0 top-1/2 h-72 w-72 -translate-y-[42%]"
            />
          </Link>
        </div>

        <nav className="flex flex-1 items-center justify-between rounded-full bg-white/85 px-6 py-4 shadow-lg backdrop-blur">
          <div className="flex items-center gap-4">
            {!isHome && (
              <Link
                href="/"
                className="rounded-full bg-[#082f3a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d4757]"
              >
                {t("nav.backHome")}
              </Link>
            )}

            <Link
              href="/"
              className="text-lg font-bold tracking-wide text-[#082f3a]"
            >
              {t("nav.brand")}
            </Link>
          </div>

          <div className="hidden items-center gap-8 text-sm font-semibold text-[#082f3a] md:flex">
            <a href="/#collection">{t("nav.collection")}</a>
            <a href="/#cotiniere">{t("nav.cotiniere")}</a>
            <a href="/#contact">{t("nav.contact")}</a>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-[#f7f1e8] p-1 text-xs font-bold text-[#082f3a]">
            {locales.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`rounded-full px-3 py-1.5 transition ${
                  locale === code
                    ? "bg-[#082f3a] text-white"
                    : "hover:bg-white"
                }`}
              >
                {localeLabels[code]}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}