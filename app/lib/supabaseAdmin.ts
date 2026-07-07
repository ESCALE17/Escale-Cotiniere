import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL manquant dans .env.local");
}

/**
 * Client administrateur : à utiliser UNIQUEMENT côté serveur
 * (routes API dans app/api/...). Utilise la clé secrète.
 * Ne JAMAIS importer ce fichier dans un composant "use client".
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey ?? "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);