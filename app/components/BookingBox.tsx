"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DayPicker, DateRange } from "react-day-picker";
import { fr } from "date-fns/locale/fr";
import { enUS } from "date-fns/locale/en-US";
import { de } from "date-fns/locale/de";
import { es } from "date-fns/locale/es";
import "react-day-picker/dist/style.css";
import { useLanguage } from "@/app/i18n/LanguageContext";
import {
  type BlockedPeriod,
  toDateString,
  rangeOverlapsBlocked,
  expandBlockedDates,
} from "@/app/lib/availability";
import { checkStayRules, type PricingPeriod } from "@/app/lib/periodPricing";

const calendarLocales = { fr, en: enUS, de, es };

export default function BookingBox({ villaSlug }: { villaSlug: string }) {
  const { locale, t } = useLanguage();
  const [range, setRange] = useState<DateRange | undefined>();
  const [checked, setChecked] = useState(false);

  const [blocked, setBlocked] = useState<BlockedPeriod[]>([]);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [periods, setPeriods] = useState<PricingPeriod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/availability?villa=${villaSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        const p: BlockedPeriod[] = data.blocked ?? [];
        setBlocked(p);
        setBlockedDates(expandBlockedDates(p));
      })
      .catch(() => {
        if (active) setBlocked([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [villaSlug]);

  useEffect(() => {
    fetch(`/api/public-pricing-periods?villa=${villaSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.periods) setPeriods(data.periods);
      })
      .catch(() => {});
  }, [villaSlug]);

  const arrival = range?.from;
  const departure = range?.to;
  const canCheck = Boolean(arrival && departure);

  const arrivalParam = arrival ? toDateString(arrival) : undefined;
  const departureParam = departure ? toDateString(departure) : undefined;

  const isAvailable =
    canCheck &&
    !rangeOverlapsBlocked(
      toDateString(arrival!),
      toDateString(departure!),
      blocked
    );

  const rulesCheck =
    canCheck && arrivalParam && departureParam
      ? checkStayRules(arrivalParam, departureParam, periods)
      : { ok: true };
  const rulesOk = rulesCheck.ok;

  return (
    <div className="rounded-3xl bg-white p-4 shadow-xl md:p-8">
      <h2 className="mb-6 text-3xl font-bold text-[#082f3a]">
        {t("booking.checkAvailability")}
      </h2>

      <div className="rounded-3xl border border-[#eadfce] bg-[#fbf7f0] p-2 md:p-6">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={(value) => {
            setRange(value);
            setChecked(false);
          }}
          locale={calendarLocales[locale]}
          numberOfMonths={2}
          disabled={[{ before: new Date() }, ...blockedDates]}
          modifiers={{ booked: blockedDates }}
          modifiersClassNames={{
            booked: "bg-red-100 text-red-400 line-through",
          }}
          classNames={{
            months: "flex flex-col gap-8 md:flex-row",
            month: "space-y-4",
            caption: "flex justify-center items-center pb-4 text-xl font-bold text-[#082f3a] relative",
              caption_label: "text-xl font-bold text-[#082f3a]",
              nav_button: "text-[#082f3a] hover:bg-[#d8b66a]/30 rounded-full p-1",
            table: "w-full border-collapse",
            head_cell: "w-9 md:w-11 text-xs md:text-sm font-semibold text-[#8a755d]",
            cell: "h-9 w-9 md:h-11 md:w-11 text-center text-xs md:text-sm",
            day: "h-9 w-9 md:h-11 md:w-11 rounded-full font-semibold text-[#082f3a] hover:bg-[#d8b66a]/30",
            day_selected: "bg-[#082f3a] text-white hover:bg-[#082f3a]",
            day_range_start: "bg-[#082f3a] text-white",
            day_range_end: "bg-[#082f3a] text-white",
            day_range_middle: "bg-[#d8b66a]/40 text-[#082f3a]",
            day_disabled: "text-gray-300",
            day_today: "border border-[#c99b4a]",
          }}
        />

        {/* Légende */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#eadfce] pt-4 text-sm text-[#082f3a]">
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-white border border-[#eadfce]" />
            {t("booking.legendAvailable")}
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-red-100 border border-red-200" />
            {t("booking.legendBooked")}
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full bg-[#082f3a]" />
            {t("booking.legendSelected")}
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled={!canCheck || loading}
        onClick={() => setChecked(true)}
        className="mt-6 rounded-full bg-[#082f3a] px-8 py-4 text-white transition hover:bg-[#0d4757] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("booking.checkButton")}
      </button>

      {checked && isAvailable && !rulesOk && (
        <div className="mt-8 rounded-2xl bg-orange-50 p-6 text-orange-900">
          <p className="font-bold">Dates non conformes</p>
          <p className="mt-2">{rulesCheck.message}</p>
        </div>
      )}

      {checked && isAvailable && rulesOk && (
        <div className="mt-8 rounded-2xl bg-green-50 p-6 text-green-900">
          <p className="mb-4 font-bold">{t("booking.available")}</p>
          <Link
            href={`/panier?villa=${villaSlug}&arrival=${arrivalParam}&departure=${departureParam}&lang=${locale}`}
            className="inline-block rounded-full bg-[#082f3a] px-6 py-3 text-white"
          >
            {t("booking.continueToQuote")}
          </Link>
        </div>
      )}

      {checked && !isAvailable && (
        <div className="mt-8 rounded-2xl bg-red-50 p-6 text-red-900">
          <p className="font-bold">{t("booking.notAvailable")}</p>
          <p className="mt-2">{t("booking.chooseOtherDates")}</p>
        </div>
      )}
    </div>
  );
}