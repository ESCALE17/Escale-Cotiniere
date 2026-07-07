import { supabase } from "@/app/lib/supabase";

/**
 * Version de fetch() qui ajoute automatiquement le jeton d'authentification
 * de l'admin connecté dans l'en-tête Authorization.
 * À utiliser dans les pages admin pour tous les appels aux routes protégées.
 */
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token ?? "";

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, { ...options, headers });
}