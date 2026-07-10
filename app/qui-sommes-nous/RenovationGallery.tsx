"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./RenovationGallery.module.css";

/* Dossier des images dans /public. Les fichiers ont été déposés dans
   public/images/renovation/ (nommés <id>-avant.jpg / <id>-apres.jpg, etc.). */
const BASE = "/images/renovation";

type Pair = {
  id: string;
  label: string;
  beforeAlt: string;
  afterAlt: string;
};

type Shot = {
  id: string;
  caption: string;
  alt: string;
};

/* --- Paires avant / après. Pour renommer une pièce, changez "label". ------ */
const PAIRS: Pair[] = [
  {
    id: "chambre-paille",
    label: "La chambre",
    beforeAlt: "La chambre avant travaux : ancien garage encombré aux murs de pierre brute.",
    afterAlt: "La chambre après rénovation : murs couleur paille, armoire ancienne et bureau.",
  },
  {
    id: "salle-de-bain",
    label: "La salle de bain",
    beforeAlt: "La salle de bain avant : carrelage rose et sanitaires anciens.",
    afterAlt: "La salle de bain après : carrelage pierre, double vasque et baignoire.",
  },
  {
    id: "salon",
    label: "Le salon",
    beforeAlt: "Le séjour avant : tomettes, cheminée crépie et mobilier ancien.",
    afterAlt: "Le séjour après : pièce ouverte, pierres apparentes et cuisine contemporaine.",
  },
  {
    id: "terrasse",
    label: "La terrasse",
    beforeAlt: "La façade en pierre avant travaux.",
    afterAlt: "La terrasse après : table, parasol et plage en bois au bord de la piscine.",
  },
  {
    id: "piscine",
    label: "La piscine",
    beforeAlt: "La façade en pierre et sa cheminée avant travaux.",
    afterAlt: "La piscine après : bassin, transats et plage en bois.",
  },
];

/* --- Photos de chantier (seules). Modifiez librement les légendes. -------- */
const SHOTS: Shot[] = [
  {
    id: "chantier-reseaux",
    caption: "Le passage des réseaux avant la dalle : plomberie et électricité tirées à même la terre battue.",
    alt: "Tranchées et gaines dans le sol pendant le chantier.",
  },
  {
    id: "chantier-beton",
    caption: "Jour du coulage : la pompe à béton déployée dans la ruelle du logis.",
    alt: "Camion pompe à béton, bras déployé au-dessus du chantier.",
  },
  {
    id: "chantier-finitions",
    caption: "Les finitions : cloisons et plafonds montés, la pierre d'origine conservée et mise en valeur.",
    alt: "Grande pièce en finition avec mur de pierre apparente conservé.",
  },
];

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
        {PAIRS.map((p) => (
          <div className={styles.pair} key={p.id}>
            <div className={styles.fan}>
              <button
                type="button"
                className={`${styles.card} ${styles.cardBefore}`}
                onClick={() =>
                  setActive({ src: `${BASE}/${p.id}-avant.jpg`, alt: p.beforeAlt, caption: `${p.label} — avant` })
                }
                aria-label={`Agrandir : ${p.label}, avant`}
              >
                <Photo name={`${p.id}-avant`} alt={p.beforeAlt} />
              </button>

              <button
                type="button"
                className={`${styles.card} ${styles.cardAfter}`}
                onClick={() =>
                  setActive({ src: `${BASE}/${p.id}-apres.jpg`, alt: p.afterAlt, caption: `${p.label} — après` })
                }
                aria-label={`Agrandir : ${p.label}, après`}
              >
                <Photo name={`${p.id}-apres`} alt={p.afterAlt} />
              </button>
            </div>

            <div className={styles.pairLabel}>
              <span className={styles.rule} aria-hidden="true" />
              {p.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24">
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-[#082f3a]">Le chantier</h3>
        <p className="mt-3 mb-12 text-center text-[#082f3a]/70 max-w-2xl mx-auto leading-relaxed">
          Quelques étapes des travaux, du gros œuvre aux finitions.
        </p>

        <div className={styles.shots}>
          {SHOTS.map((s) => (
            <figure className={styles.shot} key={s.id}>
              <button
                type="button"
                className={styles.shotFrame}
                onClick={() => setActive({ src: `${BASE}/${s.id}.jpg`, alt: s.alt, caption: s.caption })}
                aria-label={`Agrandir : ${s.caption}`}
              >
                <Photo name={s.id} alt={s.alt} />
              </button>
              <figcaption className={styles.shotCaption}>{s.caption}</figcaption>
            </figure>
          ))}
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
