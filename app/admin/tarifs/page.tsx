"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { authFetch } from "@/app/lib/authFetch";

type Setting = {
  key: string;
  value: number;
  label: string;
};

export default function AdminTarifsPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
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

  useEffect(() => {
    if (!authChecked) return;
    authFetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const list: Setting[] = data.settings ?? [];
        setSettings(list);
        const initialDrafts: Record<string, string> = {};
        list.forEach((s) => {
          initialDrafts[s.key] = String(s.value);
        });
        setDrafts(initialDrafts);
      })
      .finally(() => setLoading(false));
  }, [authChecked]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  async function handleSave(key: string) {
    setSavingKey(key);
    setMessage("");
    const value = drafts[key];

    const res = await authFetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });

    setSavingKey(null);

    if (!res.ok) {
      setMessage("Erreur lors de l'enregistrement.");
      return;
    }

    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value: Number(value) } : s))
    );
    setMessage("Paramètre enregistré.");
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
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-[#082f3a]">
            Tarifs et paramètres
          </h1>
          <div className="flex items-center gap-3">
            <a href="/admin/calendrier" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Calendrier
            </a>
            <a href="/admin/reservations" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Réservations
            </a>
            <a href="/admin/tarifs-periodes" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Tarifs par période
            </a>
            <a href="/admin/coup-de-coeur" className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Coups de coeur
            </a>
            <button type="button" onClick={handleLogout} className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">
              Se déconnecter
            </button>
          </div>
        </div>

        {message && (
          <p className="mb-6 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
            {message}
          </p>
        )}

        {loading ? (
          <p className="text-[#8a755d]">Chargement…</p>
        ) : (
          <div className="rounded-3xl bg-white p-6 shadow">
            <p className="mb-6 text-sm text-[#8a755d]">
              Modifie une valeur puis clique sur « Enregistrer ». Les nouveaux
              montants s'appliquent immédiatement aux futures réservations.
            </p>
            <div className="space-y-5">
              {settings.map((s) => (
                <div
                  key={s.key}
                  className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eadfce] pb-5 last:border-b-0 last:pb-0"
                >
                  <label className="flex-1 text-[#082f3a]">{s.label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      value={drafts[s.key] ?? ""}
                      onChange={(e) =>
                        setDrafts((prev) => ({ ...prev, [s.key]: e.target.value }))
                      }
                      className="w-32 rounded-xl border border-[#eadfce] px-4 py-2 text-right text-[#082f3a] outline-none focus:border-[#082f3a]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSave(s.key)}
                      disabled={
                        savingKey === s.key ||
                        drafts[s.key] === String(s.value)
                      }
                      className="rounded-full bg-[#082f3a] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d4757] disabled:opacity-30"
                    >
                      {savingKey === s.key ? "…" : "Enregistrer"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}