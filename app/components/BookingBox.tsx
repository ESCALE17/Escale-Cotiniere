"use client";

import { useState } from "react";
import Link from "next/link";
import { DayPicker, DateRange } from "react-day-picker";
import { fr } from "date-fns/locale/fr";
import "react-day-picker/dist/style.css";

export default function BookingBox({ villaSlug }: { villaSlug: string }) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [checked, setChecked] = useState(false);

  const arrival = range?.from;
  const departure = range?.to;
  const canCheck = Boolean(arrival && departure);

  const isAvailable =
    canCheck && arrival?.toISOString().slice(0, 10) !== "2026-08-10";

  const arrivalParam = arrival?.toISOString().slice(0, 10);
  const departureParam = departure?.toISOString().slice(0, 10);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-3xl font-bold text-[#082f3a]">
        Vérifier les disponibilités
      </h2>

      <div className="rounded-3xl border border-[#eadfce] bg-[#fbf7f0] p-6">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={(value) => {
            setRange(value);
            setChecked(false);
          }}
          locale={fr}
          numberOfMonths={2}
          disabled={{ before: new Date() }}
          classNames={{
            months: "flex flex-col gap-8 md:flex-row",
            month: "space-y-4",
            caption: "flex justify-center pb-4 text-xl font-bold text-[#082f3a]",
            table: "w-full border-collapse",
            head_cell: "w-11 text-sm font-semibold text-[#8a755d]",
            cell: "h-11 w-11 text-center text-sm",
            day: "h-11 w-11 rounded-full font-semibold text-[#082f3a] hover:bg-[#d8b66a]/30",
            day_selected: "bg-[#082f3a] text-white hover:bg-[#082f3a]",
            day_range_start: "bg-[#082f3a] text-white",
            day_range_end: "bg-[#082f3a] text-white",
            day_range_middle: "bg-[#d8b66a]/40 text-[#082f3a]",
            day_disabled: "text-gray-300 line-through",
            day_today: "border border-[#c99b4a]",
          }}
        />
      </div>

      <button
        type="button"
        disabled={!canCheck}
        onClick={() => setChecked(true)}
        className="mt-6 rounded-full bg-[#082f3a] px-8 py-4 text-white transition hover:bg-[#0d4757] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Vérifier disponible
      </button>

      {checked && isAvailable && (
        <div className="mt-8 rounded-2xl bg-green-50 p-6 text-green-900">
          <p className="mb-4 font-bold">Séjour disponible.</p>

          <Link
            href={`/devis?villa=${villaSlug}&arrival=${arrivalParam}&departure=${departureParam}`}
            className="inline-block rounded-full bg-[#082f3a] px-6 py-3 text-white"
          >
            Continuer vers le devis
          </Link>
        </div>
      )}

      {checked && !isAvailable && (
        <div className="mt-8 rounded-2xl bg-red-50 p-6 text-red-900">
          <p className="font-bold">Cette période n’est pas disponible.</p>
          <p className="mt-2">Choisissez d’autres dates dans le calendrier.</p>
        </div>
      )}
    </div>
  );
}