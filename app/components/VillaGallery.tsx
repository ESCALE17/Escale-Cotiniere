"use client";

import { useState } from "react";

type Props = {
  photos: string[];
};

export default function VillaGallery({ photos }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (!photos || photos.length === 0) return null;

  const previous = () => {
    setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Aperçu de la photo principale, cliquable pour ouvrir la galerie */}
      <div
        role="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className="group relative h-[70vh] w-full cursor-pointer overflow-hidden"
      >
        <img
          src={photos[0]}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {photos.length > 1 && (
          <span className="absolute bottom-6 right-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-xl">
            Voir les {photos.length} photos
          </span>
        )}
      </div>

      {/* Galerie plein écran, seulement si ouverte volontairement */}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <img
            src={photos[index]}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
          />

          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 z-[10000] flex h-14 w-14 items-center justify-center rounded-full bg-white text-4xl font-bold text-black shadow-xl hover:scale-105"
          >
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={previous}
                className="absolute left-6 top-1/2 z-[10000] -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-5xl font-bold text-black shadow-xl hover:scale-105"
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute right-6 top-1/2 z-[10000] -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-5xl font-bold text-black shadow-xl hover:scale-105"
              >
                ›
              </button>

              <div className="absolute bottom-6 left-1/2 z-[10000] -translate-x-1/2 rounded-full bg-white px-6 py-2 text-lg font-semibold text-black shadow-lg">
                {index + 1} / {photos.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}