"use client";

import Link from "next/link";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { T, type Locale } from "./textes";
import type { Reco, Produit } from "./parts";

function useT() {
  const { locale } = useLanguage();
  const loc = ((locale as Locale) in T ? (locale as Locale) : "fr") as Locale;
  return T[loc];
}

function Shell({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  const t = useT();
  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-32 md:pb-24 md:pt-40">
        <Link
          href="/coup-de-coeur"
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-[#082f3a] transition hover:opacity-70"
        >
          ← {t.back}
        </Link>
        <h1 className="text-4xl font-semibold text-[#082f3a] md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#082f3a]/70">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </main>
  );
}

function RecoCard({ reco, voirSite }: { reco: Reco; voirSite: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e7ddcd] bg-white shadow-sm">
      {reco.photo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={reco.photo_url} alt={reco.nom} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 w-full bg-[#eee6d6]" />
      )}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-[#082f3a]">{reco.nom}</h2>
        {reco.description && <p className="mt-1.5 text-sm leading-relaxed text-[#5f6f74]">{reco.description}</p>}
        {reco.avis && (
          <p className="mt-3 border-l-2 border-[#082f3a] pl-3 text-sm italic leading-relaxed text-[#082f3a]/75">
            « {reco.avis} »
          </p>
        )}
        {reco.lien && (
          <a
            href={reco.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#082f3a] hover:underline"
          >
            {voirSite}
          </a>
        )}
      </div>
    </div>
  );
}

export function RestaurantsView({ recos }: { recos: Reco[] }) {
  const t = useT();
  return (
    <Shell title={t.restaurants.title} intro={t.restaurants.intro}>
      {recos.length === 0 ? (
        <p className="text-[#082f3a]/60">{t.restaurants.empty}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recos.map((r) => (
            <RecoCard key={r.id} reco={r} voirSite={t.voirSite} />
          ))}
        </div>
      )}
    </Shell>
  );
}

export function VisitesView({ recos }: { recos: Reco[] }) {
  const t = useT();
  return (
    <Shell title={t.visites.title} intro={t.visites.intro}>
      {recos.length === 0 ? (
        <p className="text-[#082f3a]/60">{t.visites.empty}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recos.map((r) => (
            <RecoCard key={r.id} reco={r} voirSite={t.voirSite} />
          ))}
        </div>
      )}
    </Shell>
  );
}

export function ProducteursView({ produits }: { produits: Produit[] }) {
  const t = useT();
  const parCategorie = produits.reduce<Record<string, Produit[]>>((acc, p) => {
    (acc[p.categorie] = acc[p.categorie] || []).push(p);
    return acc;
  }, {});
  const categories = Object.keys(parCategorie);

  return (
    <Shell title={t.producteurs.title} intro={t.producteurs.intro}>
      {categories.length === 0 ? (
        <p className="text-[#082f3a]/60">{t.producteurs.empty}</p>
      ) : (
        <div className="space-y-14">
          {categories.map((cat) => (
            <section key={cat}>
              <h2 className="mb-6 text-2xl font-semibold capitalize text-[#082f3a]">{cat}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {parCategorie[cat].map((p) => (
                  <div key={p.id} className="overflow-hidden rounded-2xl border border-[#e7ddcd] bg-white shadow-sm">
                    {p.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.photo_url} alt={p.nom} className="h-48 w-full object-cover" />
                    ) : (
                      <div className="h-48 w-full bg-[#eee6d6]" />
                    )}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#082f3a]">{p.nom}</h3>
                      {p.producteur && <p className="mt-0.5 text-sm font-medium text-[#082f3a]/60">{p.producteur}</p>}
                      {p.description && <p className="mt-2 text-sm leading-relaxed text-[#5f6f74]">{p.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <p className="rounded-2xl bg-white/70 px-6 py-5 text-center text-sm leading-relaxed text-[#082f3a]/80">
            {t.producteurs.panier}
          </p>
        </div>
      )}
    </Shell>
  );
}

export function VeloView({ recos }: { recos: Reco[] }) {
  const t = useT();
  const loueur = recos[0];

  return (
    <Shell title={t.velo.title} intro={t.velo.intro}>
      {!loueur ? (
        <p className="text-[#082f3a]/60">{t.velo.empty}</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e7ddcd] bg-white shadow-sm md:flex">
          {loueur.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={loueur.photo_url} alt={loueur.nom} className="h-56 w-full object-cover md:h-auto md:w-2/5" />
          ) : (
            <div className="h-56 w-full bg-[#eee6d6] md:h-auto md:w-2/5" />
          )}
          <div className="p-7 md:flex-1">
            <h2 className="text-2xl font-semibold text-[#082f3a]">{loueur.nom}</h2>
            {loueur.description && <p className="mt-3 leading-relaxed text-[#5f6f74]">{loueur.description}</p>}
            {loueur.avis && (
              <p className="mt-4 border-l-2 border-[#082f3a] pl-3 italic leading-relaxed text-[#082f3a]/75">
                « {loueur.avis} »
              </p>
            )}

            {loueur.code_promo && (
              <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-dashed border-[#082f3a] bg-[#f7f1e8] px-5 py-3">
                <span className="text-sm text-[#082f3a]/70">{t.velo.code}</span>
                <span className="text-lg font-semibold tracking-[0.08em] text-[#082f3a]">{loueur.code_promo}</span>
              </div>
            )}

            {loueur.lien && (
              <div className="mt-6">
                <a
                  href={loueur.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-[#082f3a] px-7 py-3 font-semibold text-white transition hover:bg-[#0d4757]"
                >
                  {t.velo.reserver}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </Shell>
  );
}
