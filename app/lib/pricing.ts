import { getVillaBySlug } from "@/app/data/villa";
import { settings } from "@/app/data/settings";

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
  pricePerNight: number;
  stayPrice: number;
  cleaningFee: number;
  linenFee: number;
  petFee: number;
  touristTax: number;
  total: number;
  deposit: number;
  balance: number;
};

/**
 * Calcule le prix d'un séjour à partir des informations brutes de la
 * réservation (villa, dates, voyageurs). Toutes les pages du tunnel
 * (devis, synthèse, paiement, confirmation) utilisent cette même fonction
 * pour être certaines d'afficher exactement le même montant.
 */
export function computePricing(input: PricingInput): PricingResult {
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

  const pricePerNight = villa?.pricePerNight ?? 0;
  const stayPrice = nights * pricePerNight;
  const cleaningFee = nights > 0 ? settings.cleaningFee : 0;
  const linenFee = travelers * settings.linenFeePerPerson;
  const petFee = input.pet ? settings.petFee : 0;
  const touristTax = input.adults * nights * settings.touristTaxPerAdultPerNight;

  const total = capacityExceeded
    ? 0
    : stayPrice + cleaningFee + linenFee + petFee + touristTax;
  const deposit = Math.round(total * settings.depositRate * 100) / 100;
  const balance = Math.round((total - deposit) * 100) / 100;

  return {
    villa,
    nights,
    travelers,
    capacityExceeded,
    pricePerNight,
    stayPrice,
    cleaningFee,
    linenFee,
    petFee,
    touristTax,
    total,
    deposit,
    balance,
  };
}
