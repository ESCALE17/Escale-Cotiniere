"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { authFetch } from "@/app/lib/authFetch";
import { villas } from "@/app/data/villa";

type Reservation = {
  id: string;
  villa_slug: string;
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  babies: number;
  pet: boolean;
  client_name: string | null;
  client_email: string | null;
  client_phone: string | null;
  client_address: string | null;
  total: number;
  deposit: number;
  balance: number;
  amount_paid: number;
  tourist_tax: number;
  lang: string;
  payment_status: string;
  status: string;
  notes: string | null;
  refunded_amount: number;
  refunded_at: string | null;
  balance_status: string;
  created_at: string;
};

export default function AdminReservationsPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"reservation" | "client">("reservation");
  const [showCancelled, setShowCancelled] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        setAuthChecked(true);
      }
    });
  }, [router]);

  function loadReservations() {
    authFetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data.reservations ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (!authChecked) return;
    loadReservations();
  }, [authChecked]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  async function toggleStatus(r: Reservation) {
    setSavingId(r.id);
    const newStatus = r.payment_status === "solde" ? "acompte" : "solde";
    const res = await authFetch("/api/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id, payment_status: newStatus }),
    });
    if (res.ok) {
      setReservations((prev) =>
        prev.map((x) => (x.id === r.id ? { ...x, payment_status: newStatus } : x))
      );
    }
    setSavingId(null);
  }

  async function saveNote(id: string, notes: string) {
    setSavingId(id);
    await authFetch("/api/reservations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    setSavingId(null);
  }

  async function refund(r: Reservation, amount: number): Promise<string | null> {
    setSavingId(r.id);
    const res = await authFetch("/api/refund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id, amount }),
    });
    const data = await res.json();
    setSavingId(null);
    if (!res.ok) {
      return data.error ?? "Erreur lors du remboursement.";
    }
    setReservations((prev) =>
      prev.map((x) =>
        x.id === r.id
          ? { ...x, refunded_amount: data.refunded_amount, refunded_at: new Date().toISOString() }
          : x
      )
    );
    return null;
  }

  async function cancelReservation(r: Reservation) {
    const ok = window.confirm(
      `Annuler la réservation de ${r.client_name ?? "ce client"} ? Les dates seront libérées. La réservation restera dans l'historique.`
    );
    if (!ok) return;
    setSavingId(r.id);
    const res = await authFetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id, action: "cancel" }),
    });
    if (res.ok) {
      setReservations((prev) =>
        prev.map((x) => (x.id === r.id ? { ...x, status: "cancelled" } : x))
      );
    }
    setSavingId(null);
  }

  async function reactivateReservation(r: Reservation) {
    setSavingId(r.id);
    const res = await authFetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id, action: "reactivate" }),
    });
    if (res.ok) {
      setReservations((prev) =>
        prev.map((x) => (x.id === r.id ? { ...x, status: "active" } : x))
      );
    }
    setSavingId(null);
  }

  async function demanderSolde(r: Reservation) {
    setSavingId(r.id);
    const res = await authFetch("/api/checkout-solde", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id }),
    });
    const data = await res.json();
    setSavingId(null);
    if (!res.ok) {
      window.alert(data.error || "Erreur lors de la génération du lien.");
      return;
    }
    window.alert("Demande de solde envoyée au client (copie sur votre messagerie).");
    setReservations((prev) => prev.map((x) => (x.id === r.id ? { ...x, balance_status: "requested" } : x)));
  }

  function villaName(slug: string): string {
    return villas.find((v) => v.slug === slug)?.name ?? slug;
  }

  function formatFr(dateStr: string): string {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  }

  function formatDateTime(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  const visible = reservations.filter((r) =>
    showCancelled ? true : r.status !== "cancelled"
  );

  function groupByClient(list: Reservation[]) {
    const map = new Map<string, { name: string; items: Reservation[] }>();
    list.forEach((r) => {
      const key = (r.client_email || r.client_name || "inconnu").toLowerCase();
      if (!map.has(key)) {
        map.set(key, { name: r.client_name || r.client_email || "Client", items: [] });
      }
      map.get(key)!.items.push(r);
    });
    return Array.from(map.entries()).map(([key, value]) => ({
      key,
      name: value.name,
      items: value.items,
    }));
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
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-[#082f3a]">Réservations reçues</h1>
          <div className="flex items-center gap-3">
            <a href="/admin/calendrier" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Calendrier
            </a>
            <a href="/admin/tarifs" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Tarifs
            </a>
            <button type="button" onClick={handleLogout} className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-full bg-white p-1 shadow">
            <button type="button" onClick={() => setView("reservation")} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${view === "reservation" ? "bg-[#082f3a] text-white" : "text-[#082f3a]"}`}>
              Par réservation
            </button>
            <button type="button" onClick={() => setView("client")} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${view === "client" ? "bg-[#082f3a] text-white" : "text-[#082f3a]"}`}>
              Par client
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold text-[#082f3a]">
            <input type="checkbox" checked={showCancelled} onChange={(e) => setShowCancelled(e.target.checked)} />
            Afficher les annulées
          </label>
        </div>

        {loading ? (
          <p className="text-[#8a755d]">Chargement…</p>
        ) : visible.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow">
            <p className="text-[#8a755d]">Aucune réservation à afficher.</p>
          </div>
        ) : view === "client" ? (
          <div className="space-y-8">
            {groupByClient(visible).map((group) => (
              <div key={group.key}>
                <h2 className="mb-3 text-xl font-bold text-[#082f3a]">
                  {group.name}{" "}
                  <span className="text-sm font-normal text-[#8a755d]">
                    ({group.items.length} réservation{group.items.length > 1 ? "s" : ""})
                  </span>
                </h2>
                <div className="space-y-4">
                  {group.items.map((r) => (
                    <ReservationCard key={r.id} r={r} villaName={villaName} formatFr={formatFr} formatDateTime={formatDateTime} toggleStatus={toggleStatus} saveNote={saveNote} refund={refund} cancelReservation={cancelReservation} reactivateReservation={reactivateReservation} demanderSolde={demanderSolde} savingId={savingId} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {visible.map((r) => (
              <ReservationCard key={r.id} r={r} villaName={villaName} formatFr={formatFr} formatDateTime={formatDateTime} toggleStatus={toggleStatus} saveNote={saveNote} refund={refund} cancelReservation={cancelReservation} reactivateReservation={reactivateReservation} demanderSolde={demanderSolde} savingId={savingId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReservationCard({
  r,
  villaName,
  formatFr,
  formatDateTime,
  toggleStatus,
  saveNote,
  refund,
  cancelReservation,
  reactivateReservation,
  demanderSolde,
  savingId,
}: {
  r: Reservation;
  villaName: (s: string) => string;
  formatFr: (s: string) => string;
  formatDateTime: (s: string) => string;
  toggleStatus: (r: Reservation) => void;
  saveNote: (id: string, notes: string) => void;
  refund: (r: Reservation, amount: number) => Promise<string | null>;
  cancelReservation: (r: Reservation) => void;
  reactivateReservation: (r: Reservation) => void;
  demanderSolde: (r: Reservation) => void;
  savingId: string | null;
}) {
  const [noteDraft, setNoteDraft] = useState(r.notes ?? "");
  const [refundAmount, setRefundAmount] = useState("");
  const [refundMsg, setRefundMsg] = useState("");
  const isSolde = r.payment_status === "solde";
  const isCancelled = r.status === "cancelled";
  const alreadyRefunded = Number(r.refunded_amount) || 0;
  const remaining = Math.max(0, (Number(r.amount_paid) || 0) - alreadyRefunded);

  async function handleRefund() {
    setRefundMsg("");
    const amount = Number(refundAmount);
    if (!amount || amount <= 0) {
      setRefundMsg("Saisis un montant supérieur à 0.");
      return;
    }
    const error = await refund(r, amount);
    if (error) {
      setRefundMsg(error);
    } else {
      setRefundMsg(`Remboursement de ${amount.toFixed(2)} € effectué.`);
      setRefundAmount("");
    }
  }

  return (
    <div className={`rounded-3xl bg-white p-6 shadow ${isCancelled ? "opacity-60" : ""}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#eadfce] pb-4">
        <h2 className="text-xl font-bold text-[#082f3a]">{villaName(r.villa_slug)}</h2>
        <div className="flex items-center gap-3">
          {isCancelled && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">Annulée</span>
          )}
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${isSolde ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
            {isSolde ? "Soldé" : "Acompte versé"}
          </span>
          <span className="text-sm text-[#8a755d]">{formatDateTime(r.created_at)}</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#8a755d]">Séjour</h3>
          <p className="text-[#082f3a]"><strong>Du</strong> {formatFr(r.arrival)} <strong>au</strong> {formatFr(r.departure)}</p>
          <p className="text-[#082f3a]">{r.adults} adulte(s), {r.children} enfant(s), {r.babies} bébé(s)</p>
          <p className="text-[#082f3a]">Animal : {r.pet ? "oui" : "non"}</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#8a755d]">Client</h3>
          <p className="font-semibold text-[#082f3a]">{r.client_name || "—"}</p>
          {r.client_email ? <p><a href={`mailto:${r.client_email}`} className="text-[#082f3a] underline">{r.client_email}</a></p> : null}
          {r.client_phone ? <p><a href={`tel:${r.client_phone}`} className="text-[#082f3a] underline">{r.client_phone}</a></p> : null}
          {r.client_address ? <p className="text-[#082f3a]">{r.client_address}</p> : null}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[#f7f1e8] p-4">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#8a755d]">Paiement</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          <p className="text-[#082f3a]">Total séjour : <strong>{r.total.toFixed(2)} €</strong></p>
          <p className="text-[#082f3a]">Acompte payé : <strong className="text-green-700">{r.amount_paid.toFixed(2)} €</strong></p>
          <p className="text-[#082f3a]">Solde restant dû : <strong>{r.balance.toFixed(2)} €</strong></p>
          <p className="text-[#082f3a]">Dont taxe de séjour : {r.tourist_tax.toFixed(2)} €</p>
          {alreadyRefunded > 0 && (
            <p className="text-red-700">Déjà remboursé : <strong>{alreadyRefunded.toFixed(2)} €</strong></p>
          )}
        </div>

        {!isSolde && !isCancelled && (
          <button type="button" onClick={() => toggleStatus(r)} disabled={savingId === r.id} className="mt-4 rounded-full bg-green-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-40">
            Marquer comme soldé
          </button>
        )}
        {isSolde && !isCancelled && (
          <button type="button" onClick={() => toggleStatus(r)} disabled={savingId === r.id} className="mt-4 rounded-full bg-amber-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-40">
            Repasser en « acompte »
          </button>
        )}
        {r.balance_status !== "paid" && !isCancelled && Number(r.balance) > 0 && (
          <button type="button" onClick={() => demanderSolde(r)} disabled={savingId === r.id} className="mt-3 ml-0 block rounded-full border border-[#082f3a] px-6 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white disabled:opacity-40">
            {r.balance_status === "requested" ? "Renvoyer la demande de solde" : "Demander le règlement du solde"}
          </button>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-[#eadfce] p-4">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#8a755d]">Remboursement</h3>
        <p className="mb-3 text-sm text-[#8a755d]">
          Remboursable au maximum : {remaining.toFixed(2)} € (acompte payé moins déjà remboursé).
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="number"
            step="any"
            min="0"
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
            placeholder="Montant €"
            className="w-32 rounded-xl border border-[#eadfce] px-4 py-2 text-right text-[#082f3a] outline-none focus:border-[#082f3a]"
          />
          <button type="button" onClick={handleRefund} disabled={savingId === r.id || remaining <= 0} className="rounded-full bg-[#082f3a] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d4757] disabled:opacity-40">
            {savingId === r.id ? "…" : "Rembourser"}
          </button>
        </div>
        {refundMsg && <p className="mt-2 text-sm font-semibold text-[#082f3a]">{refundMsg}</p>}
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#8a755d]">Notes</h3>
        <textarea
          value={noteDraft}
          onChange={(e) => setNoteDraft(e.target.value)}
          onBlur={() => { if (noteDraft !== (r.notes ?? "")) saveNote(r.id, noteDraft); }}
          placeholder="Note libre (caution, heure d'arrivée, rappel…). Sauvegarde automatique."
          rows={2}
          className="w-full rounded-xl border border-[#eadfce] px-4 py-3 text-[#082f3a] outline-none focus:border-[#082f3a]"
        />
      </div>

      <div className="mt-4 flex justify-end">
        {isCancelled ? (
          <button type="button" onClick={() => reactivateReservation(r)} disabled={savingId === r.id} className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white disabled:opacity-40">
            Réactiver
          </button>
        ) : (
          <button type="button" onClick={() => cancelReservation(r)} disabled={savingId === r.id} className="rounded-full border border-red-400 px-5 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-600 hover:text-white disabled:opacity-40">
            Annuler cette réservation
          </button>
        )}
      </div>
    </div>
  );
}