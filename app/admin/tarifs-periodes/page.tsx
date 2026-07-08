"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { authFetch } from "@/app/lib/authFetch";
import { villas } from "@/app/data/villa";

type Period = {
  id: string;
  villa_slug: string;
  start_date: string;
  end_date: string;
  price_per_night: number;
  weekly_discount_percent: number;
  label: string | null;
  min_nights: number;
  arrival_day: string;
  departure_day: string;
};

const JOURS = [
  { value: "tous", label: "Tous les jours" },
  { value: "lundi", label: "Lundi" },
  { value: "mardi", label: "Mardi" },
  { value: "mercredi", label: "Mercredi" },
  { value: "jeudi", label: "Jeudi" },
  { value: "vendredi", label: "Vendredi" },
  { value: "samedi", label: "Samedi" },
  { value: "dimanche", label: "Dimanche" },
];

function jourLabel(value: string): string {
  return JOURS.find((j) => j.value === value)?.label ?? "Tous les jours";
}

export default function AdminTarifsPeriodesPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [villaSlug, setVillaSlug] = useState(villas[0]?.slug ?? "");
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [label, setLabel] = useState("");
  const [minNights, setMinNights] = useState("1");
  const [arrivalDay, setArrivalDay] = useState("tous");
  const [departureDay, setDepartureDay] = useState("tous");

  // iCal
  const [icalAirbnb, setIcalAirbnb] = useState("");
  const [icalBooking, setIcalBooking] = useState("");
  const [icalAbritel, setIcalAbritel] = useState("");
  const [icalMessage, setIcalMessage] = useState("");
  const [icalSaving, setIcalSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        setAuthChecked(true);
      }
    });
  }, [router]);

  const loadPeriods = useCallback(async () => {
    const res = await authFetch(`/api/pricing-periods?villa=${villaSlug}`);
    const data = await res.json();
    setPeriods(data.periods ?? []);
  }, [villaSlug]);

  const loadIcal = useCallback(async () => {
    const res = await authFetch(`/api/villa-ical?villa=${villaSlug}`);
    const data = await res.json();
    setIcalAirbnb(data.ical?.ical_airbnb ?? "");
    setIcalBooking(data.ical?.ical_booking ?? "");
    setIcalAbritel(data.ical?.ical_abritel ?? "");
    setIcalMessage("");
  }, [villaSlug]);

  useEffect(() => {
    if (authChecked) {
      loadPeriods();
      loadIcal();
    }
  }, [authChecked, loadPeriods, loadIcal]);

  async function saveIcal() {
    setIcalSaving(true);
    setIcalMessage("");
    const res = await authFetch("/api/villa-ical", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        villa_slug: villaSlug,
        ical_airbnb: icalAirbnb,
        ical_booking: icalBooking,
        ical_abritel: icalAbritel,
      }),
    });
    setIcalSaving(false);
    setIcalMessage(res.ok ? "Liens iCal enregistrés." : "Erreur lors de l'enregistrement.");
  }

  async function handleAdd() {
    setMessage("");
    if (!startDate || !endDate || !price) {
      setMessage("Renseigne au moins les dates et le prix par nuit.");
      return;
    }
    setLoading(true);

    const res = await authFetch("/api/pricing-periods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        villa_slug: villaSlug,
        start_date: startDate,
        end_date: endDate,
        price_per_night: price,
        weekly_discount_percent: discount || 0,
        label,
        min_nights: minNights || 1,
        arrival_day: arrivalDay,
        departure_day: departureDay,
      }),
    });

    setLoading(false);
    const data = await res.json();

    if (!res.ok) {
      setMessage("Erreur : " + (data.error ?? "impossible d'ajouter"));
      return;
    }

    setStartDate("");
    setEndDate("");
    setPrice("");
    setDiscount("");
    setLabel("");
    setMinNights("1");
    setArrivalDay("tous");
    setDepartureDay("tous");
    setMessage("Période tarifaire ajoutée.");
    loadPeriods();
  }

  async function handleDelete(id: string) {
    setLoading(true);
    await authFetch("/api/pricing-periods", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    loadPeriods();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  function formatFr(dateStr: string): string {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f1e8] text-[#082f3a]">
        Vérification…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f1e8] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-[#082f3a]">Tarifs par période</h1>
          <div className="flex items-center gap-3">
            <a href="/admin/tarifs" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Paramètres
            </a>
            <a href="/admin/calendrier" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Calendrier
            </a>
            <a href="/admin/reservations" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Réservations
            </a>
            <button type="button" onClick={handleLogout} className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-3xl bg-white p-6 shadow">
          <label className="mb-2 block text-sm font-semibold text-[#082f3a]">Villa</label>
          <select
            value={villaSlug}
            onChange={(e) => setVillaSlug(e.target.value)}
            className="w-full rounded-xl border border-[#eadfce] px-4 py-3 text-[#082f3a] outline-none focus:border-[#082f3a]"
          >
            {villas.map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* Synchronisation iCal */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-bold text-[#082f3a]">
            Synchronisation des calendriers (iCal)
          </h2>
          <p className="mb-4 text-sm text-[#8a755d]">
            Colle ici les liens iCal de tes plateformes pour cette villa. Les dates
            réservées ailleurs se bloqueront automatiquement sur ton site.
          </p>
          <div className="grid gap-4">
            <label className="text-sm font-semibold text-[#082f3a]">
              Lien iCal Airbnb
              <input type="url" value={icalAirbnb} onChange={(e) => setIcalAirbnb(e.target.value)} placeholder="https://www.airbnb.fr/calendar/ical/..." className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
            <label className="text-sm font-semibold text-[#082f3a]">
              Lien iCal Booking
              <input type="url" value={icalBooking} onChange={(e) => setIcalBooking(e.target.value)} placeholder="https://admin.booking.com/hotel/hoteladmin/ical..." className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
            <label className="text-sm font-semibold text-[#082f3a]">
              Lien iCal Abritel / VRBO
              <input type="url" value={icalAbritel} onChange={(e) => setIcalAbritel(e.target.value)} placeholder="http://www.abritel.fr/icalendar/..." className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
          </div>
          <button type="button" onClick={saveIcal} disabled={icalSaving} className="mt-4 rounded-full bg-[#082f3a] px-8 py-3 font-semibold text-white transition hover:bg-[#0d4757] disabled:opacity-40">
            {icalSaving ? "…" : "Enregistrer les liens iCal"}
          </button>
          {icalMessage && <p className="mt-3 text-sm font-semibold text-[#082f3a]">{icalMessage}</p>}
        </div>

        <div className="mb-6 rounded-3xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-[#082f3a]">Ajouter une période</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#082f3a]">
              Date de début
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
            <label className="text-sm font-semibold text-[#082f3a]">
              Date de fin
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
            <label className="text-sm font-semibold text-[#082f3a]">
              Prix par nuit (€)
              <input type="number" step="any" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ex. 380" className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
            <label className="text-sm font-semibold text-[#082f3a]">
              Remise semaine (%) — dès 7 nuits
              <input type="number" step="any" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Ex. 10 (vide si aucune)" className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
            <label className="text-sm font-semibold text-[#082f3a]">
              Nombre de nuits minimum
              <input type="number" min="1" value={minNights} onChange={(e) => setMinNights(e.target.value)} placeholder="Ex. 7" className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
            <div className="hidden sm:block" />
            <label className="text-sm font-semibold text-[#082f3a]">
              Jour d'arrivée imposé
              <select value={arrivalDay} onChange={(e) => setArrivalDay(e.target.value)} className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]">
                {JOURS.map((j) => (
                  <option key={j.value} value={j.value}>{j.label}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-[#082f3a]">
              Jour de départ imposé
              <select value={departureDay} onChange={(e) => setDepartureDay(e.target.value)} className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]">
                {JOURS.map((j) => (
                  <option key={j.value} value={j.value}>{j.label}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-[#082f3a] sm:col-span-2">
              Nom de la période (facultatif)
              <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Ex. Haute saison, Vacances de Noël…" className="mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]" />
            </label>
          </div>

          <button type="button" onClick={handleAdd} disabled={loading} className="mt-4 rounded-full bg-[#082f3a] px-8 py-3 font-semibold text-white transition hover:bg-[#0d4757] disabled:opacity-40">
            {loading ? "…" : "Ajouter cette période"}
          </button>

          {message && <p className="mt-4 text-sm font-semibold text-[#082f3a]">{message}</p>}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-[#082f3a]">
            Périodes définies pour cette villa
          </h2>
          {periods.length === 0 ? (
            <p className="text-[#8a755d]">
              Aucune période définie. Sans période, les dates concernées afficheront « nous consulter ».
            </p>
          ) : (
            <ul className="space-y-3">
              {periods.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#eadfce] px-4 py-3">
                  <div>
                    <p className="font-semibold text-[#082f3a]">
                      Du {formatFr(p.start_date)} au {formatFr(p.end_date)}
                      {p.label ? ` — ${p.label}` : ""}
                    </p>
                    <p className="text-sm text-[#8a755d]">
                      {p.price_per_night.toFixed(2)} € / nuit
                      {p.weekly_discount_percent > 0
                        ? ` · remise semaine ${p.weekly_discount_percent}%`
                        : ""}
                      {` · min. ${p.min_nights ?? 1} nuit${(p.min_nights ?? 1) > 1 ? "s" : ""}`}
                      {p.arrival_day && p.arrival_day !== "tous" ? ` · arrivée ${jourLabel(p.arrival_day)}` : ""}
                      {p.departure_day && p.departure_day !== "tous" ? ` · départ ${jourLabel(p.departure_day)}` : ""}
                    </p>
                  </div>
                  <button type="button" onClick={() => handleDelete(p.id)} disabled={loading} className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-40">
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}