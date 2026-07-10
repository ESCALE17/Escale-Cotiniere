"use client";

import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/app/i18n/LanguageContext";
import { contenu, type Locale } from "./contenu";
import styles from "./RenovationGallery.module.css";

const BASE = "/images/renovation";

const PAIRS = [
  { id: "chambre-paille", key: "chambre" as const },
  { id: "salle-de-bain", key: "sdb" as const },
  { id: "salon", key: "salon" as const },
  { id: "terrasse", key: "terrasse" as const },
  { id: "piscine", key: "piscine" as const },
];

const SHOTS = [
  { id: "chantier-reseaux", key: "reseaux" as const },
  { id: "chantier-beton", key: "beton" as const },
  { id: "chantier-finitions", key: "finitions" as const },
];

// Petits mots d'interface selon la langue
const WORDS: Record<Locale, { avant: string; apres: string; enlarge: string }> = {
  fr: { avant: "avant", apres: "après", enlarge: "Agrandir" },
  en: { avant: "before", apres: "after", enlarge: "Enlarge" },
  de: { avant: "vorher", apres: "nachher", enlarge: "Vergrößern" },
  es: { avant: "antes", apres: "después", enlarge: "Ampliar" },
};

type Active = { src: string; alt: string; caption: string } | null;

function Photo({ name, alt }: { name: string; alt: string }) {
  return (
    <picture>
      <source srcSet={`${BASE}/${name}.webp`} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${BASE}/${name}.jpg`} alt={alt} loading="lazy" decoding="async" />
    </picture>
  );
}

export default function RenovationGallery() {
  const { locale } = useLanguage();
  const loc = (locale as Locale) in contenu ? (locale as Locale) : "fr";
  const c = contenu[loc];
  const w = WORDS[loc];

  const [active, setActive] = useState<Active>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <div className={styles.gallery}>
      <div className={styles.pairs}>
        {PAIRS.map((p) => {
          const label = c.pairs[p.key];
          return (
            <div className={styles.pair} key={p.id}>
              <div className={styles.fan}>
                <button
                  type="button"
                  className={`${styles.card} ${styles.cardBefore}`}
                  onClick={() =>
                    setActive({ src: `${BASE}/${p.id}-avant.jpg`, alt: `${label} — ${w.avant}`, caption: `${label} — ${w.avant}` })
                  }
                  aria-label={`${w.enlarge} : ${label}, ${w.avant}`}
                >
                  <Photo name={`${p.id}-avant`} alt={`${label} — ${w.avant}`} />
                </button>

                <button
                  type="button"
                  className={`${styles.card} ${styles.cardAfter}`}
                  onClick={() =>
                    setActive({ src: `${BASE}/${p.id}-apres.jpg`, alt: `${label} — ${w.apres}`, caption: `${label} — ${w.apres}` })
                  }
                  aria-label={`${w.enlarge} : ${label}, ${w.apres}`}
                >
                  <Photo name={`${p.id}-apres`} alt={`${label} — ${w.apres}`} />
                </button>
              </div>

              <div className={styles.pairLabel}>
                <span className={styles.rule} aria-hidden="true" />
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-24">
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-[#082f3a]">{c.chantierTitle}</h3>
        <p className="mt-3 mb-12 text-center text-[#082f3a]/70 max-w-2xl mx-auto leading-relaxed">
          {c.chantierIntro}
        </p>

        <div className={styles.shots}>
          {SHOTS.map((s) => {
            const caption = c.captions[s.key];
            return (
              <figure className={styles.shot} key={s.id}>
                <button
                  type="button"
                  className={styles.shotFrame}
                  onClick={() => setActive({ src: `${BASE}/${s.id}.jpg`, alt: caption, caption })}
                  aria-label={`${w.enlarge} : ${caption}`}
                >
                  <Photo name={s.id} alt={caption} />
                </button>
                <figcaption className={styles.shotCaption}>{caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={close}
        >
          <button className={styles.lightboxClose} onClick={close} aria-label="Fermer" autoFocus>
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.lightboxImg}
            src={active.src}
            alt={active.alt}
            onClick={(e) => e.stopPropagation()}
          />
          <p className={styles.lightboxCaption}>{active.caption}</p>
        </div>
      )}
    </div>
  );
}
