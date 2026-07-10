"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { authFetch } from "@/app/lib/authFetch";

type Entry = {
  id: string;
  categorie: string;
  nom: string;
  description: string | null;
  avis: string | null;
  lien: string | null;
  code_promo: string | null;
  photo_url: string | null;
  ordre: number;
  actif: boolean;
  created_at: string;
};

type Produit = {
  id: string;
  categorie: string;
  nom: string;
  producteur: string | null;
  description: string | null;
  photo_url: string | null;
  prix_unitaire: number;
  ordre: number;
  actif: boolean;
  created_at: string;
};

// Recommandations : producteurs retirés (ils vivent dans "panier_produits").
const CATEGORIES = [
  { key: "restaurant", label: "Restaurants", max: 6 },
  { key: "velo", label: "Loueur de vélo", max: null },
  { key: "visite", label: "Visites", max: null },
] as const;

const EMPTY_ENTRY = {
  id: "",
  categorie: "restaurant",
  nom: "",
  description: "",
  avis: "",
  lien: "",
  code_promo: "",
  photo_url: "",
  ordre: "0",
  actif: true,
};

const EMPTY_PRODUIT = {
  id: "",
  categorie: "",
  nom: "",
  producteur: "",
  description: "",
  photo_url: "",
  prix_unitaire: "",
  ordre: "0",
  actif: true,
};

async function uploadPhoto(file: File): Promise<{ url?: string; error?: string }> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? "";
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/coup-de-coeur/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
  const out = await res.json();
  return res.ok ? { url: out.url } : { error: out.error ?? "envoi impossible" };
}

export default function AdminCoupDeCoeurPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [message, setMessage] = useState("");

  // --- Recommandations ---
  const [entries, setEntries] = useState<Entry[]>([]);
  const [eForm, setEForm] = useState({ ...EMPTY_ENTRY });
  const [eEditing, setEEditing] = useState(false);
  const [eSaving, setESaving] = useState(false);
  const [eUploading, setEUploading] = useState(false);

  // --- Produits du panier ---
  const [produits, setProduits] = useState<Produit[]>([]);
  const [pForm, setPForm] = useState({ ...EMPTY_PRODUIT });
  const [pEditing, setPEditing] = useState(false);
  const [pSaving, setPSaving] = useState(false);
  const [pUploading, setPUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/admin/login");
      else setAuthChecked(true);
    });
  }, [router]);

  const loadEntries = useCallback(async () => {
    const res = await authFetch("/api/coup-de-coeur");
    const data = await res.json();
    setEntries(data.entries ?? []);
  }, []);

  const loadProduits = useCallback(async () => {
    const res = await authFetch("/api/panier-produits");
    const data = await res.json();
    setProduits(data.produits ?? []);
  }, []);

  useEffect(() => {
    if (authChecked) {
      loadEntries();
      loadProduits();
    }
  }, [authChecked, loadEntries, loadProduits]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  const inputCls =
    "mt-1 w-full rounded-xl border border-[#eadfce] px-4 py-2 text-[#082f3a] outline-none focus:border-[#082f3a]";

  // ===================== RECOMMANDATIONS =====================
  function eStartAdd(categorie: string) {
    setEForm({ ...EMPTY_ENTRY, categorie });
    setEEditing(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function eStartEdit(entry: Entry) {
    setEForm({
      id: entry.id,
      categorie: entry.categorie,
      nom: entry.nom,
      description: entry.description ?? "",
      avis: entry.avis ?? "",
      lien: entry.lien ?? "",
      code_promo: entry.code_promo ?? "",
      photo_url: entry.photo_url ?? "",
      ordre: String(entry.ordre ?? 0),
      actif: entry.actif,
    });
    setEEditing(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function eCancel() {
    setEForm({ ...EMPTY_ENTRY });
    setEEditing(false);
  }
  async function eHandlePhoto(file: File) {
    setEUploading(true);
    setMessage("");
    const r = await uploadPhoto(file);
    if (r.error) setMessage("Erreur photo : " + r.error);
    else setEForm((f) => ({ ...f, photo_url: r.url ?? "" }));
    setEUploading(false);
  }
  async function eSave() {
    if (!eForm.nom.trim()) {
      setMessage("Le nom est obligatoire.");
      return;
    }
    setESaving(true);
    setMessage("");
    const res = await authFetch("/api/coup-de-coeur", {
      method: eForm.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...eForm, id: eForm.id || undefined }),
    });
    setESaving(false);
    const data = await res.json();
    if (!res.ok) {
      setMessage("Erreur : " + (data.error ?? "enregistrement impossible"));
      return;
    }
    eCancel();
    setMessage("Recommandation enregistrée.");
    loadEntries();
  }
  async function eDelete(id: string) {
    if (!confirm("Supprimer cette recommandation ?")) return;
    await authFetch("/api/coup-de-coeur", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadEntries();
  }
  async function eToggle(entry: Entry) {
    await authFetch("/api/coup-de-coeur", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, actif: !entry.actif }),
    });
    loadEntries();
  }

  // ===================== PRODUITS =====================
  function pStartAdd() {
    setPForm({ ...EMPTY_PRODUIT });
    setPEditing(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function pStartEdit(p: Produit) {
    setPForm({
      id: p.id,
      categorie: p.categorie,
      nom: p.nom,
      producteur: p.producteur ?? "",
      description: p.description ?? "",
      photo_url: p.photo_url ?? "",
      prix_unitaire: String(p.prix_unitaire ?? ""),
      ordre: String(p.ordre ?? 0),
      actif: p.actif,
    });
    setPEditing(true);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function pCancel() {
    setPForm({ ...EMPTY_PRODUIT });
    setPEditing(false);
  }
  async function pHandlePhoto(file: File) {
    setPUploading(true);
    setMessage("");
    const r = await uploadPhoto(file);
    if (r.error) setMessage("Erreur photo : " + r.error);
    else setPForm((f) => ({ ...f, photo_url: r.url ?? "" }));
    setPUploading(false);
  }
  async function pSave() {
    if (!pForm.categorie.trim() || !pForm.nom.trim()) {
      setMessage("La catégorie et le nom du produit sont obligatoires.");
      return;
    }
    setPSaving(true);
    setMessage("");
    const res = await authFetch("/api/panier-produits", {
      method: pForm.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...pForm, id: pForm.id || undefined }),
    });
    setPSaving(false);
    const data = await res.json();
    if (!res.ok) {
      setMessage("Erreur : " + (data.error ?? "enregistrement impossible"));
      return;
    }
    pCancel();
    setMessage("Produit enregistré.");
    loadProduits();
  }
  async function pDelete(id: string) {
    if (!confirm("Supprimer ce produit ?")) return;
    await authFetch("/api/panier-produits", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadProduits();
  }
  async function pToggle(p: Produit) {
    await authFetch("/api/panier-produits", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...p, prix_unitaire: p.prix_unitaire, actif: !p.actif }),
    });
    loadProduits();
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f1e8] text-[#082f3a]">
        Vérification…
      </div>
    );
  }

  // Regroupe les produits par catégorie (libre)
  const produitsParCategorie = produits.reduce<Record<string, Produit[]>>((acc, p) => {
    (acc[p.categorie] = acc[p.categorie] || []).push(p);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f7f1e8] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-[#082f3a]">Coup de cœur &amp; recommandations</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-[#082f3a] px-5 py-2 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white"
          >
            Se déconnecter
          </button>
        </div>

        {message && (
          <p className="mb-6 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#082f3a] shadow">
            {message}
          </p>
        )}

        {/* ============ ÉDITEUR RECOMMANDATION ============ */}
        {eEditing && (
          <div className="mb-8 rounded-3xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold text-[#082f3a]">
              {eForm.id ? "Modifier la recommandation" : "Nouvelle recommandation"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#082f3a]">
                Catégorie
                <select value={eForm.categorie} onChange={(e) => setEForm({ ...eForm, categorie: e.target.value })} className={inputCls}>
                  {CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-[#082f3a]">
                Ordre d'affichage
                <input type="number" value={eForm.ordre} onChange={(e) => setEForm({ ...eForm, ordre: e.target.value })} className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a] sm:col-span-2">
                Nom
                <input type="text" value={eForm.nom} onChange={(e) => setEForm({ ...eForm, nom: e.target.value })} placeholder="Ex. Le Bistrot de la Marine" className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a] sm:col-span-2">
                Description
                <textarea value={eForm.description} onChange={(e) => setEForm({ ...eForm, description: e.target.value })} rows={3} className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a] sm:col-span-2">
                Avis / recommandation
                <textarea value={eForm.avis} onChange={(e) => setEForm({ ...eForm, avis: e.target.value })} rows={2} placeholder="Votre petit mot…" className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a]">
                Lien (site, réservation)
                <input type="url" value={eForm.lien} onChange={(e) => setEForm({ ...eForm, lien: e.target.value })} placeholder="https://…" className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a]">
                Code promo (ex. vélo)
                <input type="text" value={eForm.code_promo} onChange={(e) => setEForm({ ...eForm, code_promo: e.target.value })} placeholder="Ex. ESCALE10" className={inputCls} />
              </label>

              <div className="text-sm font-semibold text-[#082f3a] sm:col-span-2">
                Photo
                <div className="mt-1 flex items-center gap-4">
                  {eForm.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={eForm.photo_url} alt="Aperçu" className="h-20 w-28 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-[#f7f1e8] text-xs text-[#8a755d]">Aucune photo</div>
                  )}
                  <div>
                    <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) eHandlePhoto(f); }} className="text-sm text-[#082f3a]" />
                    {eUploading && <p className="mt-1 text-xs text-[#8a755d]">Envoi en cours…</p>}
                    {eForm.photo_url && (
                      <button type="button" onClick={() => setEForm({ ...eForm, photo_url: "" })} className="mt-1 block text-xs font-semibold text-red-700 hover:underline">Retirer la photo</button>
                    )}
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm font-semibold text-[#082f3a] sm:col-span-2">
                <input type="checkbox" checked={eForm.actif} onChange={(e) => setEForm({ ...eForm, actif: e.target.checked })} />
                Visible sur le site
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button type="button" onClick={eSave} disabled={eSaving || eUploading} className="rounded-full bg-[#082f3a] px-8 py-3 font-semibold text-white transition hover:bg-[#0d4757] disabled:opacity-40">
                {eSaving ? "…" : "Enregistrer"}
              </button>
              <button type="button" onClick={eCancel} className="rounded-full border border-[#082f3a] px-6 py-3 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">Annuler</button>
            </div>
          </div>
        )}

        {/* ============ SECTIONS RECOMMANDATIONS ============ */}
        {CATEGORIES.map((cat) => {
          const list = entries.filter((e) => e.categorie === cat.key);
          const atMax = cat.max !== null && list.length >= cat.max;
          return (
            <div key={cat.key} className="mb-6 rounded-3xl bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-[#082f3a]">
                  {cat.label}
                  {cat.max !== null && <span className="ml-2 text-sm font-normal text-[#8a755d]">({list.length}/{cat.max})</span>}
                </h2>
                <button type="button" onClick={() => eStartAdd(cat.key)} disabled={atMax} className="rounded-full bg-[#082f3a] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d4757] disabled:opacity-40">+ Ajouter</button>
              </div>
              {atMax && <p className="mb-3 text-sm text-[#8a755d]">Maximum de {cat.max} atteint.</p>}
              {list.length === 0 ? (
                <p className="text-[#8a755d]">Aucune adresse pour l'instant.</p>
              ) : (
                <ul className="space-y-3">
                  {list.map((entry) => (
                    <li key={entry.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#eadfce] px-4 py-3">
                      <div className="flex items-center gap-3">
                        {entry.photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={entry.photo_url} alt="" className="h-12 w-16 rounded-md object-cover" />
                        ) : (
                          <div className="h-12 w-16 rounded-md bg-[#f7f1e8]" />
                        )}
                        <div>
                          <p className="font-semibold text-[#082f3a]">
                            {entry.nom}
                            {!entry.actif && <span className="ml-2 rounded bg-[#f7f1e8] px-2 py-0.5 text-xs text-[#8a755d]">masquée</span>}
                          </p>
                          {entry.description && <p className="max-w-md truncate text-sm text-[#8a755d]">{entry.description}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => eToggle(entry)} className="rounded-full border border-[#082f3a] px-3 py-1.5 text-xs font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">{entry.actif ? "Masquer" : "Afficher"}</button>
                        <button type="button" onClick={() => eStartEdit(entry)} className="rounded-full border border-[#082f3a] px-3 py-1.5 text-xs font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">Modifier</button>
                        <button type="button" onClick={() => eDelete(entry.id)} className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50">Supprimer</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

        {/* ============ SÉPARATEUR ============ */}
        <div className="mb-4 mt-10 border-t border-[#e0d6c4] pt-8">
          <h2 className="text-2xl font-bold text-[#082f3a]">Produits du panier d'accueil</h2>
          <p className="mt-1 text-sm text-[#8a755d]">
            Cognac, pineau, vin, champagne, confitures… Le prix reste masqué pour les visiteurs et servira au calcul du panier lors de la réservation.
          </p>
        </div>

        {/* ============ ÉDITEUR PRODUIT ============ */}
        {pEditing && (
          <div className="mb-8 rounded-3xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold text-[#082f3a]">{pForm.id ? "Modifier le produit" : "Nouveau produit"}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#082f3a]">
                Catégorie (libre)
                <input type="text" value={pForm.categorie} onChange={(e) => setPForm({ ...pForm, categorie: e.target.value })} placeholder="Ex. pineau, champagne, confiture" className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a]">
                Ordre d'affichage
                <input type="number" value={pForm.ordre} onChange={(e) => setPForm({ ...pForm, ordre: e.target.value })} className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a]">
                Nom du produit
                <input type="text" value={pForm.nom} onChange={(e) => setPForm({ ...pForm, nom: e.target.value })} placeholder="Ex. Pineau des Charentes blanc" className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a]">
                Producteur (facultatif)
                <input type="text" value={pForm.producteur} onChange={(e) => setPForm({ ...pForm, producteur: e.target.value })} placeholder="Ex. Domaine des Îles" className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a] sm:col-span-2">
                Description
                <textarea value={pForm.description} onChange={(e) => setPForm({ ...pForm, description: e.target.value })} rows={3} className={inputCls} />
              </label>
              <label className="text-sm font-semibold text-[#082f3a]">
                Prix unitaire (€) — masqué au public
                <input type="number" step="any" min="0" value={pForm.prix_unitaire} onChange={(e) => setPForm({ ...pForm, prix_unitaire: e.target.value })} placeholder="Ex. 14.50" className={inputCls} />
              </label>
              <div className="text-sm font-semibold text-[#082f3a] sm:col-span-2">
                Photo
                <div className="mt-1 flex items-center gap-4">
                  {pForm.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pForm.photo_url} alt="Aperçu" className="h-20 w-28 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-[#f7f1e8] text-xs text-[#8a755d]">Aucune photo</div>
                  )}
                  <div>
                    <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) pHandlePhoto(f); }} className="text-sm text-[#082f3a]" />
                    {pUploading && <p className="mt-1 text-xs text-[#8a755d]">Envoi en cours…</p>}
                    {pForm.photo_url && (
                      <button type="button" onClick={() => setPForm({ ...pForm, photo_url: "" })} className="mt-1 block text-xs font-semibold text-red-700 hover:underline">Retirer la photo</button>
                    )}
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#082f3a] sm:col-span-2">
                <input type="checkbox" checked={pForm.actif} onChange={(e) => setPForm({ ...pForm, actif: e.target.checked })} />
                Visible sur le site
              </label>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button type="button" onClick={pSave} disabled={pSaving || pUploading} className="rounded-full bg-[#082f3a] px-8 py-3 font-semibold text-white transition hover:bg-[#0d4757] disabled:opacity-40">{pSaving ? "…" : "Enregistrer"}</button>
              <button type="button" onClick={pCancel} className="rounded-full border border-[#082f3a] px-6 py-3 text-sm font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">Annuler</button>
            </div>
          </div>
        )}

        {/* ============ LISTE PRODUITS ============ */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-[#082f3a]">Vos produits</h3>
            <button type="button" onClick={pStartAdd} className="rounded-full bg-[#082f3a] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d4757]">+ Ajouter un produit</button>
          </div>
          {produits.length === 0 ? (
            <p className="text-[#8a755d]">Aucun produit pour l'instant.</p>
          ) : (
            Object.keys(produitsParCategorie).map((categorie) => (
              <div key={categorie} className="mb-5 last:mb-0">
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[#8a755d]">{categorie}</p>
                <ul className="space-y-3">
                  {produitsParCategorie[categorie].map((p) => (
                    <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#eadfce] px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.photo_url} alt="" className="h-12 w-16 rounded-md object-cover" />
                        ) : (
                          <div className="h-12 w-16 rounded-md bg-[#f7f1e8]" />
                        )}
                        <div>
                          <p className="font-semibold text-[#082f3a]">
                            {p.nom}
                            {p.producteur ? <span className="text-sm font-normal text-[#8a755d]"> — {p.producteur}</span> : null}
                            {!p.actif && <span className="ml-2 rounded bg-[#f7f1e8] px-2 py-0.5 text-xs text-[#8a755d]">masqué</span>}
                          </p>
                          <p className="text-sm text-[#8a755d]">{Number(p.prix_unitaire).toFixed(2)} € / unité (masqué au public)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => pToggle(p)} className="rounded-full border border-[#082f3a] px-3 py-1.5 text-xs font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">{p.actif ? "Masquer" : "Afficher"}</button>
                        <button type="button" onClick={() => pStartEdit(p)} className="rounded-full border border-[#082f3a] px-3 py-1.5 text-xs font-semibold text-[#082f3a] transition hover:bg-[#082f3a] hover:text-white">Modifier</button>
                        <button type="button" onClick={() => pDelete(p.id)} className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50">Supprimer</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
