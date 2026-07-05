"use client";

import { useState } from "react";

type Props = {
  photos: string[];
};

export default function VillaGallery({ photos }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);

  if (!photos || photos.length === 0) return null;

  if (!open) return null;

  const previous = () => {
    setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      {/* Photo */}
      <img
        src={photos[index]}
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* Fermer */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-6 right-6 z-[10000] flex h-14 w-14 items-center justify-center rounded-full bg-white text-4xl font-bold text-black shadow-xl hover:scale-105"
      >
        ✕
      </button>

      {/* Précédent */}
      <button
        onClick={previous}
        className="absolute left-6 top-1/2 z-[10000] -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-5xl font-bold text-black shadow-xl hover:scale-105"
      >
        ‹
      </button>

      {/* Suivant */}
      <button
        onClick={next}
        className="absolute right-6 top-1/2 z-[10000] -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full bg-white text-5xl font-bold text-black shadow-xl hover:scale-105"
      >
        ›
      </button>

      {/* Compteur */}
      <div className="absolute bottom-6 left-1/2 z-[10000] -translate-x-1/2 rounded-full bg-white px-6 py-2 text-lg font-semibold text-black shadow-lg">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}