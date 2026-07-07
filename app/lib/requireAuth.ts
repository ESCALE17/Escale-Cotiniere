import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Vérifie que la requête provient d'un administrateur connecté.
 * Renvoie true si le jeton d'authentification (envoyé par le navigateur)
 * correspond à un utilisateur valide, false sinon.
 *
 * Le navigateur doit envoyer l'en-tête : Authorization: Bearer <token>
 */
export async function isAuthenticated(request: Request): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token) return false;

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.getUser(token);
    return !error && !!data.user;
  } catch {
    return false;
  }
}