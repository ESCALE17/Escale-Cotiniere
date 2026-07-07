"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DayPicker, DateRange } from "react-day-picker";
import { fr } from "date-fns/locale/fr";
import "react-day-picker/dist/style.css";
import { supabase } from "@/app/lib/supabase";
import { authFetch } from "@/app/lib/authFetch";
import { villas } from "@/app/data/villa";
import { toDateString, expandBlockedDates } from "@/app/lib/availability";

type Blocked = {
  id: string;
  villa_slug: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  source: string;
};

export default function AdminCalendrierPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [villaSlug, setVillaSlug] = useState(villas[0]?.slug ?? "");
  const [range, setRange] = useState<DateRange | undefined>();
  const [reason, setReason] = useState("");
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        setAuthChecked(true);
      }
    });
  }, [router]);

  const loadBlocked = useCallback(async () => {
    const res = await authFetch(`/api/blocked-dates?villa=${villaSlug}`);
    const data = await res.json();
    setBlocked(data.blocked ?? []);
  }, [villaSlug]);

  useEffect(() => {
    if (authChecked) loadBlocked();
  }, [authChecked, loadBlocked]);

  async function handleAdd() {
    if (!range?.from || !range?.to) {
      setMessage("Sélectionnez une date de début et une date de fin.");
      return;
    }
    setLoading(true);
    setMessage("");

    const res = await authFetch("/api/blocked-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        villa_slug: villaSlug,
        start_date: toDateString(range.from),
        end_date: toDateString(range.to),
        reason,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setMessage("Erreur : " + (data.error ?? "impossible d'ajouter"));
      return;
    }

    setRange(undefined);
    setReason("");
    setMessage("Période bloquée ajoutée.");
    loadBlocked();
  }

  async function handleDelete(id: string) {
    setLoading(true);
    await authFetch("/api/blocked-dates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    loadBlocked();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  function formatFr(dateStr: string): string {
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#082f3a]">
            Gestion des disponibilités
          </h1>
          <div className="flex items-center gap-3">
            <a href="/admin/reservations" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Réservations
            </a>
            <a href="/admin/tarifs" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Tarifs
            </a>
            <button type="button" onClick={handleLogout} className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-3xl bg-white p-6 shadow">
          <label className="mb-2 block text-sm font-semibold text-[#082f3a]">
            Villa
          </label>
          <select
            value={villaSlug}
            onChange={(e) => {
              setVillaSlug(e.target.value);
              setRange(undefined);
            }}
            className="w-full rounded-xl border border-[#eadfce] px-4 py-3 text-[#082f3a] outline-none focus:border-[#082f3a]"
          >
            {villas.map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 rounded-3xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-[#082f3a]">
            Bloquer une période
          </h2>
          <div className="rounded-3xl border border-[#eadfce] bg-[#fbf7f0] p-4">
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              locale={fr}
              numberOfMonths={2}
              disabled={[
                { before: new Date() },
                ...expandBlockedDates(blocked),
              ]}
              modifiers={{ blocked: expandBlockedDates(blocked) }}
              modifiersClassNames={{
                blocked: "bg-red-100 text-red-400 line-through",
              }}
              classNames={{
                months: "flex flex-col gap-8 md:flex-row",
                month: "space-y-4",
                caption: "flex justify-center pb-4 text-lg font-bold text-[#082f3a]",
                table: "w-full border-collapse",
                head_cell: "w-10 text-sm font-semibold text-[#8a755d]",
                cell: "h-10 w-10 text-center text-sm",
                day: "h-10 w-10 rounded-full font-semibold text-[#082f3a] hover:bg-[#d8b66a]/30",
                day_selected: "bg-[#082f3a] text-white hover:bg-[#082f3a]",
                day_range_start: "bg-[#082f3a] text-white",
                day_range_end: "bg-[#082f3a] text-white",
                day_range_middle: "bg-[#d8b66a]/40 text-[#082f3a]",
                day_disabled: "text-gray-300 line-through",
                day_today: "border border-[#c99b4a]",
              }}
            />
          </div>

          <label className="mb-2 mt-4 block text-sm font-semibold text-[#082f3a]">
            Motif (facultatif)
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ex. Réservé Airbnb, entretien, usage personnel…"
            className="mb-4 w-full rounded-xl border border-[#eadfce] px-4 py-3 text-[#082f3a] outline-none focus:border-[#082f3a]"
          />

          <button
            type="button"
            onClick={handleAdd}
            disabled={loading}
            className="rounded-full bg-[#082f3a] px-8 py-3 font-semibold text-white transition hover:bg-[#0d4757] disabled:opacity-40"
          >
            {loading ? "…" : "Bloquer ces dates"}
          </button>

          {message && (
            <p className="mt-4 text-sm font-semibold text-[#082f3a]">
              {message}
            </p>
          )}
        </div>

        <div className="rounded-3xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-[#082f3a]">
            Périodes actuellement bloquées
          </h2>
          {blocked.length === 0 ? (
            <p className="text-[#8a755d]">Aucune période bloquée pour cette villa.</p>
          ) : (
            <ul className="space-y-3">
              {blocked.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between rounded-xl border border-[#eadfce] px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-[#082f3a]">
                      Du {formatFr(b.start_date)} au {formatFr(b.end_date)}
                    </p>
                    <p className="text-sm text-[#8a755d]">
                      {b.reason || "Sans motif"}
                      {b.source === "ical" ? " · synchro automatique" : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(b.id)}
                    disabled={loading || b.source === "ical"}
                    className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-40"
                    title={
                      b.source === "ical"
                        ? "Blocage automatique (synchro), non supprimable ici"
                        : "Supprimer ce blocage"
                    }
                  >
                    Débloquer
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