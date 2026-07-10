"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";

type Produit = {
  id: string;
  categorie: string;
  nom: string;
  producteur: string | null;
  description: string | null;
  photo_url: string | null;
};

type Loc = "fr" | "en" | "de" | "es";

const TXT: Record<Loc, { titre: string; sousTitre: string; intro: string }> = {
  fr: {
    titre: "Panier d'accueil",
    sousTitre: "(a trouver a votre arrivee)",
    intro: "Choisissez ce que vous souhaitez trouver dans la maison a votre arrivee. Les quantites s'ajoutent a votre sejour.",
  },
  en: {
    titre: "Welcome basket",
    sousTitre: "(waiting for you on arrival)",
    intro: "Choose what you would like to find in the house when you arrive. The quantities are added to your stay.",
  },
  de: {
    titre: "Willkommenskorb",
    sousTitre: "(wartet bei Ihrer Ankunft)",
    intro: "Waehlen Sie, was Sie bei Ihrer Ankunft im Haus vorfinden moechten. Die Mengen werden zu Ihrem Aufenthalt hinzugefuegt.",
  },
  es: {
    titre: "Cesta de bienvenida",
    sousTitre: "(le espera a su llegada)",
    intro: "Elija lo que desea encontrar en la casa a su llegada. Las cantidades se anaden a su estancia.",
  },
};

function decode(code: string): Record<string, number> {
  const out: Record<string, number> = {};
  if (!code) return out;
  for (const part of code.split(",")) {
    const [id, q] = part.split(":");
    const n = Math.max(0, Math.floor(Number(q)));
    if (id && n > 0) out[id] = n;
  }
  return out;
}

function encode(qte: Record<string, number>): string {
  return Object.entries(qte)
    .filter(([, n]) => n > 0)
    .map(([id, n]) => id + ":" + n)
    .join(",");
}

export default function PanierSelector({
  initialCode,
  onChange,
}: {
  initialCode: string;
  onChange: (code: string, total: number) => void;
}) {
  const { locale } = useLanguage();
  const loc: Loc = (["fr", "en", "de", "es"].indexOf(locale as string) >= 0 ? (locale as Loc) : "fr");
  const txt = TXT[loc];

  const [open, setOpen] = useState(false);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [qte, setQte] = useState<Record<string, number>>(() => decode(initialCode));

  useEffect(() => {
    fetch("/api/panier-liste")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.produits)) setProduits(d.produits);
      })
      .catch(() => {});
  }, []);

  const code = useMemo(() => encode(qte), [qte]);

  useEffect(() => {
    if (!code) {
      onChange("", 0);
      return;
    }
    let annule = false;
    fetch("/api/panier-total", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ panier: code }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!annule) onChange(code, Number(d.total) || 0);
      })
      .catch(() => {
        if (!annule) onChange(code, 0);
      });
    return () => {
      annule = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  function setQuantite(id: string, delta: number) {
    setQte((prev) => {
      const n = Math.max(0, (prev[id] ?? 0) + delta);
      const next = { ...prev };
      if (n === 0) delete next[id];
      else next[id] = n;
      return next;
    });
  }

  const nbArticles = Object.values(qte).reduce((s, n) => s + n, 0);

  if (produits.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#e0d6c4] bg-[#faf6ee]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="font-semibold text-[#082f3a]">
          {txt.titre}
          <span className="ml-2 text-sm font-normal text-[#8a755d]">{txt.sousTitre}</span>
        </span>
        <span className="flex items-center gap-3">
          {nbArticles > 0 && (
            <span className="rounded-full bg-[#082f3a] px-2.5 py-0.5 text-xs font-semibold text-white">
              {nbArticles}
            </span>
          )}
          <span className="text-[#082f3a]">{open ? "\u25B2" : "\u25BC"}</span>
        </span>
      </button>

      {open && (
        <div className="border-t border-[#e0d6c4] px-5 py-4">
          <p className="mb-4 text-sm text-[#8a755d]">{txt.intro}</p>
          <ul className="space-y-3">
            {produits.map((p) => {
              const n = qte[p.id] ?? 0;
              return (
                <li key={p.id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-[#082f3a]">{p.nom}</p>
                    {p.producteur && <p className="text-xs text-[#8a755d]">{p.producteur}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantite(p.id, -1)}
                      disabled={n === 0}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#082f3a] text-[#082f3a] disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-semibold text-[#082f3a]">{n}</span>
                    <button
                      type="button"
                      onClick={() => setQuantite(p.id, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#082f3a] text-white"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
