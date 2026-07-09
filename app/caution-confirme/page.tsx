"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CautionConfirmeContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const annule = params.get("annule");
  const [state, setState] = useState<"loading" | "paid" | "notpaid" | "error">("loading");
  const [villaName, setVillaName] = useState("");

  useEffect(() => {
    if (annule) {
      setState("notpaid");
      return;
    }
    if (!sessionId) {
      setState("error");
      return;
    }
    fetch("/api/verifier-caution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.paid) {
          setState("paid");
          if (data.villaName) setVillaName(data.villaName);
        } else {
          setState("notpaid");
        }
      })
      .catch(() => setState("error"));
  }, [sessionId, annule]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f1e8] px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow">
        {state === "loading" && (
          <p className="text-[#8a755d]">Verification de votre paiement...</p>
        )}
        {state === "paid" && (
          <>
            <div className="mb-4 text-5xl">✅</div>
            <h1 className="mb-3 text-2xl font-bold text-[#082f3a]">Caution enregistree, merci !</h1>
            <p className="text-[#082f3a]">
              Votre caution{villaName ? ` pour ${villaName}` : ""} a bien ete enregistree. Elle vous sera restituee apres votre depart, sous reserve de l'etat des lieux.
            </p>
            <p className="mt-4 text-sm text-[#8a755d]">
              Nous avons hate de vous accueillir !
            </p>
            <a href="/" className="mt-8 inline-block rounded-full bg-[#082f3a] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#0d4757]">
              Retour a l'accueil
            </a>
          </>
        )}
        {state === "notpaid" && (
          <>
            <div className="mb-4 text-5xl">⏳</div>
            <h1 className="mb-3 text-2xl font-bold text-[#082f3a]">Paiement non finalise</h1>
            <p className="text-[#082f3a]">
              Votre paiement n'a pas ete finalise. Vous pouvez reessayer depuis le lien recu par e-mail.
            </p>
            <a href="/" className="mt-8 inline-block rounded-full border border-[#082f3a] px-8 py-3 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Retour a l'accueil
            </a>
          </>
        )}
        {state === "error" && (
          <>
            <div className="mb-4 text-5xl">⚠️</div>
            <h1 className="mb-3 text-2xl font-bold text-[#082f3a]">Une erreur est survenue</h1>
            <p className="text-[#082f3a]">
              Impossible de verifier votre paiement. Contactez-nous a contact@escalealacotiniere.fr si besoin.
            </p>
            <a href="/" className="mt-8 inline-block rounded-full border border-[#082f3a] px-8 py-3 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Retour a l'accueil
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function CautionConfirmePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f1e8]" />}>
      <CautionConfirmeContent />
    </Suspense>
  );
}
