import type { AppSettings } from "@/app/lib/getSettings";

export type { AppSettings };

/**
 * Valeurs par défaut utilisées côté client le temps que les vrais
 * paramètres soient chargés via /api/public-settings.
 */
export const defaultSettings: AppSettings = {
  depositRate: 0.4,
  cleaningFee: 200,
  petFee: 100,
  linenFeePerPerson: 14,
  touristTaxPerAdultPerNight: 3.3,
};