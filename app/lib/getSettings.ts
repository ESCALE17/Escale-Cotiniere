import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { settings as fallbackSettings } from "@/app/data/settings";

export type AppSettings = {
  depositRate: number;
  cleaningFee: number;
  petFee: number;
  linenFeePerPerson: number;
  touristTaxPerAdultPerNight: number;
};

/**
 * Va chercher les paramètres dans Supabase (table app_settings).
 * Si la base est injoignable, on retombe sur les valeurs du fichier
 * settings.ts pour que le tunnel ne plante jamais.
 */
export async function getSettings(): Promise<AppSettings> {
  try {
    const { data, error } = await supabaseAdmin
      .from("app_settings")
      .select("key, value");

    if (error || !data) return fallbackSettings;

    const map: Record<string, number> = {};
    data.forEach((row) => {
      map[row.key] = Number(row.value);
    });

    return {
      depositRate: map["deposit_rate"] ?? fallbackSettings.depositRate,
      cleaningFee: map["cleaning_fee"] ?? fallbackSettings.cleaningFee,
      petFee: map["pet_fee"] ?? fallbackSettings.petFee,
      linenFeePerPerson:
        map["linen_fee_per_person"] ?? fallbackSettings.linenFeePerPerson,
      touristTaxPerAdultPerNight:
        map["tourist_tax_per_adult_per_night"] ??
        fallbackSettings.touristTaxPerAdultPerNight,
    };
  } catch {
    return fallbackSettings;
  }
}