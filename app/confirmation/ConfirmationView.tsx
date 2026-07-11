"use client";
import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageContext";

type PanierItem = { nom: string; quantite: number };

type ConfirmationViewProps =
  | { state: "no-session" }
  | { state: "not-paid"; fetchError: boolean; sessionId: string }
  | {
      state: "paid";
      prenom: string;
      amountPaid: number;
      villaName: string;
      arrival: string;
      departure: string;
      total: number;
      balance: number;
      touristTax: number;
      emailSent: boolean;
      email: string;
      contractUrl: string;
      panierItems?: PanierItem[];
    };

const PANIER_TXT: Record<string, { titre: string }> = {
  fr: { titre: "Votre panier d'accueil vous attend à votre arrivée :" },
  en: { titre: "Your welcome basket will be waiting for you on arrival:" },
  de: { titre: "Ihr Willkommenskorb erwartet Sie bei Ihrer Ankunft:" },
  es: { titre: "Su cesta de bienvenida le espera a su llegada:" },
};

export default function ConfirmationView(props: ConfirmationViewProps) {
  const { t, locale } = useLanguage();
  const loc = (["fr", "en", "de", "es"].indexOf(locale as string) >= 0 ? (locale as string) : "fr");
  if (props.state === "no-session") {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="mb-6 text-4xl font-bold text-[#082f3a]">
            {t("confirmation.noSessionTitle")}
          </h1>
          <p className="mb-8 text-lg text-slate-700">
            {t("confirmation.noSessionText")}
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
          >
            {t("common.backHome")}
          </Link>
        </section>
      </main>
    );
  }
  if (props.state === "not-paid") {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="mb-6 text-4xl font-bold text-[#082f3a]">
            {t("confirmation.notPaidTitle")}
          </h1>
          <p className="mb-8 text-lg text-slate-700">
            {props.fetchError
              ? t("confirmation.notPaidTextError")
              : t("confirmation.notPaidTextPending")}{" "}
            {t("confirmation.notPaidContact")}
          </p>
          <p className="mb-8 rounded-xl bg-[#f7f1e8] p-4 font-mono text-sm text-slate-600">
            {t("confirmation.reference")} : {props.sessionId}
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
          >
            {t("common.backHome")}
          </Link>
        </section>
      </main>
    );
  }
  const panierItems = props.panierItems ?? [];
  const panierTxt = PANIER_TXT[loc] ?? PANIER_TXT.fr;
  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="mb-6 text-5xl font-bold text-[#082f3a]">
          {t("confirmation.paidTitle")}
        </h1>
        <p className="mb-8 text-lg text-slate-700">
          {t("confirmation.thanksText", {
            name: props.prenom || "",
            amount: props.amountPaid.toFixed(2),
            villa: props.villaName,
          })}
        </p>
        <div className="mb-8 space-y-3 rounded-2xl bg-[#f7f1e8] p-6 text-slate-700">
          <p>
            <strong>{t("confirmation.stay")} :</strong> {props.arrival} →{" "}
            {props.departure}
          </p>
          <p>
            <strong>{t("confirmation.total")} :</strong>{" "}
            {props.total.toFixed(2)} €
          </p>
          <p>
            <strong>{t("confirmation.balance")} :</strong>{" "}
            {props.balance.toFixed(2)} €
          </p>
          <p className="text-sm">
            {t("confirmation.touristTaxNote", {
              amount: props.touristTax.toFixed(2),
            })}
          </p>
        </div>
        {panierItems.length > 0 && (
          <div className="mb-8 rounded-2xl border border-[#e0d6c4] bg-[#faf6ee] p-6">
            <p className="mb-3 font-semibold text-[#082f3a]">🧺 {panierTxt.titre}</p>
            <ul className="list-disc space-y-1 pl-6 text-slate-700">
              {panierItems.map((item, i) => (
                <li key={i}>
                  {item.quantite} × {item.nom}
                </li>
              ))}
            </ul>
          </div>
        )}
        {props.emailSent ? (
          <p className="mb-6 rounded-2xl bg-green-50 p-4 text-sm text-green-900">
            {t("confirmation.emailSent", { email: props.email })}
          </p>
        ) : (
          <p className="mb-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
            {t("confirmation.emailFailed")}
          </p>
        )}
        <a
          href={props.contractUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
        >
          {t("confirmation.downloadContract")}
        </a>
      </section>
    </main>
  );
}
