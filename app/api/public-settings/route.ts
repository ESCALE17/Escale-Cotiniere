import { NextResponse } from "next/server";
import { getSettings } from "@/app/lib/getSettings";

/**
 * Route publique : renvoie les paramètres tarifaires à jour.
 * Utilisée par les pages client du tunnel (devis, etc.) qui ne peuvent
 * pas lire Supabase directement.
 */
export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}