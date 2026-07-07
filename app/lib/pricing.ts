import { getVillaBySlug } from "@/app/data/villa";
import { settings as defaultSettings } from "@/app/data/settings";
import type { AppSettings } from "@/app/lib/getSettings";
import {
  computeStayFromPeriods,
  type PricingPeriod,
} from "@/app/lib/periodPricing";

export type PricingInput = {
  villaSlug: string | null | undefined;
  arrival: string | null | undefined; // format yyyy-mm-dd
  departure: string | null | undefined; // format yyyy-mm-dd
  adults: number;
  children: number;
  babies: number;
  pet: boolean;
};

export type PricingResult = {
  villa: ReturnType<typeof getVillaBySlug>;
  nights: number;
  travelers: number;
  capacityExceeded: boolean;
  pricePerNight: number;      // tarif moyen par nuit (indicatif)
  stayPrice: number;          // prix des nuits après remise
  weeklyDiscount: number;     // montant de la remise semaine
  cleaningFee: number;
  linenFee: number;
  petFee: number;
  touristTax: number;
  total: number;
  deposit: number;
  balance: number;
  needsQuote: boolean;        // true si des nuits n'ont aucun tarif défini
};

/**
 * Calcule le prix d'un séjour.
 * - `settings` : paramètres (ménage, draps, etc.), depuis Supabase.
 * - `periods`  : périodes tarifaires de la villa, depuis Supabase.
 *
 * Si `periods` est fourni et couvre le séjour, le prix des nuits est calculé
 * période par période (avec remise semaine dès 7 nuits). Si des nuits ne sont
 * couvertes par aucune période, `needsQuote` passe à true (« nous consulter »).
 *
 * Si `periods` est vide/non fourni, on retombe sur le tarif de base de la
 * villa (villa.pricePerNight) — comportement d'origine, filet de sécurité.
 */
export function computePricing(
  input: PricingInput,
  settings: AppSettings = defaultSettings,
  periods: PricingPeriod[] = []
): PricingResult {
  const villa = getVillaBySlug(input.villaSlug ?? undefined);

  const nights =
    input.arrival && input.departure
      ? Math.max(
          0,
          Math.ceil(
            (new Date(input.departure).getTime() -
              new Date(input.arrival).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const travelers = input.adults + input.children;
  const capacityExceeded = villa ? travelers > villa.maxTravelers : false;

  let stayPrice = 0;
  let weeklyDiscount = 0;
  let needsQuote = false;
  let pricePerNight = villa?.pricePerNight ?? 0;

  if (periods.length > 0 && input.arrival && input.departure) {
    // Calcul par périodes tarifaires
    const stay = computeStayFromPeriods(
      input.arrival,
      input.departure,
      periods
    );
    stayPrice = stay.stayPrice;
    weeklyDiscount = stay.discount;
    needsQuote = stay.hasMissingNights;
    pricePerNight =
      stay.nights > 0
        ? Math.round((stay.stayPriceBeforeDiscount / stay.nights) * 100) / 100
        : 0;
  } else {
    // Filet de sécurité : tarif de base de la villa
    stayPrice = nights * pricePerNight;
  }

  const cleaningFee = nights > 0 ? settings.cleaningFee : 0;
  const linenFee = travelers * settings.linenFeePerPerson;
  const petFee = input.pet ? settings.petFee : 0;
  const touristTax =
    input.adults * nights * settings.touristTaxPerAdultPerNight;

  const total =
    capacityExceeded || needsQuote
      ? 0
      : stayPrice + cleaningFee + linenFee + petFee;

  const deposit = Math.round(total * settings.depositRate * 100) / 100;
  const balance = Math.round((total - deposit) * 100) / 100;

  return {
    villa,
    nights,
    travelers,
    capacityExceeded,
    pricePerNight,
    stayPrice,
    weeklyDiscount,
    cleaningFee,
    linenFee,
    petFee,
    touristTax,
    total,
    deposit,
    balance,
    needsQuote,
  };
}