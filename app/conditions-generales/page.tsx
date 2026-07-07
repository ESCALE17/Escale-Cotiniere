"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { translations } from "@/app/i18n/translations";
export const dynamic = "force-dynamic";

export default function ConditionsGeneralesPage() {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();
  const frArticles = translations.fr.conditions.articles;
  const localeArticles = translations[locale].conditions.articles;
  const isFrench = locale === "fr";
  const backQuery = searchParams.toString();

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="mb-8 text-4xl font-bold text-[#082f3a]">
          {t("conditions.title")}
        </h1>

        <div className="space-y-6 text-slate-700">
          <p>{t("conditions.intro")}</p>

          {!isFrench && (
            <p className="rounded-xl bg-amber-50 p-4 text-sm font-semibold text-amber-900">
              {t("conditions.disclaimer")}
            </p>
          )}

          {frArticles.map((frArticle, index) => {
            const translatedArticle = localeArticles[index];
            return (
              <div key={index}>
                <h2 className="mb-2 text-xl font-bold text-[#082f3a]">
                  {index + 1}. {translatedArticle.title}
                </h2>
                <p>{translatedArticle.text}</p>

                {!isFrench && (
                  <div className="mt-3 rounded-xl bg-[#f7f1e8] p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#082f3a]">
                      {t("conditions.frenchLabel")}
                    </p>
                    <p className="text-sm">
                      <strong>{frArticle.title}.</strong> {frArticle.text}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <p className="text-sm text-slate-500">{t("conditions.contactNote")}</p>
        </div>

        <Link
          href={backQuery ? `/coordonnees?${backQuery}` : "/coordonnees"}
          className="mt-10 inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
        >
          {t("conditions.backToBooking")}
        </Link>
      </section>
    </main>
  );
}
