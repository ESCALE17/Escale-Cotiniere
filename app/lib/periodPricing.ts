export type PricingPeriod = {
  start_date: string; // "2026-07-01"
  end_date: string;   // "2026-08-31"
  price_per_night: number;
  weekly_discount_percent: number;
};

export type PeriodStayResult = {
  nights: number;
  stayPriceBeforeDiscount: number; // somme des nuits sans remise
  discount: number;                // total de la remise appliquée
  stayPrice: number;               // prix des nuits après remise
  hasMissingNights: boolean;       // au moins une nuit sans tarif défini
};

/**
 * Ajoute un jour à une date au format "yyyy-mm-dd" et renvoie le même format.
 */
function nextDay(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Trouve la période qui contient une nuit donnée (comparaison de chaînes
 * "yyyy-mm-dd", qui est fiable car ce format se trie comme du texte).
 */
function findPeriod(
  night: string,
  periods: PricingPeriod[]
): PricingPeriod | undefined {
  return periods.find((p) => night >= p.start_date && night <= p.end_date);
}

/**
 * Calcule le prix du séjour nuit par nuit à partir des périodes tarifaires.
 * - Chaque nuit prend le prix de sa période.
 * - Si le séjour fait >= 7 nuits, chaque nuit reçoit la remise de SA période.
 * - Si une nuit n'a aucune période, hasMissingNights devient true.
 */
export function computeStayFromPeriods(
  arrival: string,
  departure: string,
  periods: PricingPeriod[]
): PeriodStayResult {
  const result: PeriodStayResult = {
    nights: 0,
    stayPriceBeforeDiscount: 0,
    discount: 0,
    stayPrice: 0,
    hasMissingNights: false,
  };

  if (!arrival || !departure || arrival >= departure) {
    return result;
  }

  // Liste les nuits : de l'arrivée (incluse) au départ (exclu)
  const nights: string[] = [];
  let current = arrival;
  while (current < departure) {
    nights.push(current);
    current = nextDay(current);
  }

  result.nights = nights.length;
  const weekEligible = nights.length >= 7;

  nights.forEach((night) => {
    const period = findPeriod(night, periods);
    if (!period) {
      result.hasMissingNights = true;
      return;
    }
    const price = Number(period.price_per_night);
    result.stayPriceBeforeDiscount += price;

    if (weekEligible && period.weekly_discount_percent > 0) {
      const nightDiscount = price * (period.weekly_discount_percent / 100);
      result.discount += nightDiscount;
    }
  });

  result.stayPrice =
    Math.round((result.stayPriceBeforeDiscount - result.discount) * 100) / 100;
  result.discount = Math.round(result.discount * 100) / 100;

  return result;
}