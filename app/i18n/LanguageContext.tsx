"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { translations, locales, type Locale } from "./translations";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

function getByPath(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce(
      (acc: unknown, key) =>
        acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined,
      obj
    );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("locale");
    if (saved && (locales as string[]).includes(saved)) {
      setLocaleState(saved as Locale);
    }
  }, []);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    window.localStorage.setItem("locale", newLocale);
  }

  function t(path: string, vars?: Record<string, string | number>): string {
    const value =
      getByPath(translations[locale], path) ?? getByPath(translations.fr, path);
    let result = typeof value === "string" ? value : path;

    if (vars) {
      Object.entries(vars).forEach(([key, val]) => {
        result = result.replace(new RegExp(`{{${key}}}`, "g"), String(val));
      });
    }

    return result;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé dans un LanguageProvider");
  }
  return context;
}
