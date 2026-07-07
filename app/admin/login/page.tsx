"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    router.push("/admin/calendrier");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f1e8] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-2xl font-bold text-[#082f3a]">
          Espace administrateur
        </h1>

        <label className="mb-2 block text-sm font-semibold text-[#082f3a]">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-xl border border-[#eadfce] px-4 py-3 text-[#082f3a] outline-none focus:border-[#082f3a]"
          placeholder="vous@exemple.fr"
        />

        <label className="mb-2 block text-sm font-semibold text-[#082f3a]">
          Mot de passe
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
          className="mb-6 w-full rounded-xl border border-[#eadfce] px-4 py-3 text-[#082f3a] outline-none focus:border-[#082f3a]"
          placeholder="••••••••"
        />

        {error && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading || !email || !password}
          className="w-full rounded-full bg-[#082f3a] px-8 py-4 font-semibold text-white transition hover:bg-[#0d4757] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </div>
    </div>
  );
}