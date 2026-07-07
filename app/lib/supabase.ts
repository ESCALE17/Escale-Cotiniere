import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL manquant dans .env.local");
}

/**
 * Client public : utilisable côté navigateur et côté serveur.
 * Utilise la clé publique (publishable). Ne contient AUCUN secret.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey ?? "");