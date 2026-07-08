export type PricingPeriod = {
  start_date: string; // "2026-07-01"
  end_date: string;   // "2026-08-31"
  price_per_night: number;
  weekly_discount_percent: number;
  min_nights?: number;
  arrival_day?: string;
  departure_day?: string;
};

export type PeriodStayResult = {
  nights: number;
  stayPriceBeforeDiscount: number; // somme des nuits sans remise
  discount: number;                // total de la remise appliquée
  stayPrice: number;               // prix des nuits après remise
  hasMissingNights: boolean;       // au moins une nuit sans tarif défini
};

const JOUR_INDEX: Record<string, number> = {
  dimanche: 0,
  lundi: 1,
  mardi: 2,
  mercredi: 3,
  jeudi: 4,
  vendredi: 5,
  samedi: 6,
};

const JOUR_LABEL: Record<number, string> = {
  0: "dimanche",
  1: "lundi",
  2: "mardi",
  3: "mercredi",
  4: "jeudi",
  5: "vendredi",
  6: "samedi",
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
 * Renvoie l'index du jour de la semaine (0=dimanche … 6=samedi) d'une date "yyyy-mm-dd".
 */
function dayOfWeek(dateStr: string): number {
  return new Date(dateStr + "T00:00:00").getDay();
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

/**
 * Vérifie que le séjour respecte les règles (durée minimum + jours d'arrivée/départ)
 * de la période dans laquelle il tombe.
 *
 * On se base sur la période qui contient la nuit d'ARRIVÉE (c'est elle qui
 * fixe les règles du séjour).
 *
 * Renvoie { ok: true } si tout va bien, sinon { ok: false, message: "..." }.
 */
export function checkStayRules(
  arrival: string,
  departure: string,
  periods: PricingPeriod[]
): { ok: boolean; message?: string } {
  if (!arrival || !departure || arrival >= departure) {
    return { ok: true }; // dates invalides gérées ailleurs
  }

  // Nombre de nuits
  let nights = 0;
  let current = arrival;
  while (current < departure) {
    nights++;
    current = nextDay(current);
  }

  // Période de référence = celle qui contient la nuit d'arrivée
  const period = findPeriod(arrival, periods);
  if (!period) {
    return { ok: true }; // pas de période : cas "nous consulter" géré ailleurs
  }

  const minNights = period.min_nights ?? 1;
  const arrivalDay = period.arrival_day ?? "tous";
  const departureDay = period.departure_day ?? "tous";

  // Règle 1 : durée minimum
  if (nights < minNights) {
    return {
      ok: false,
      message: `Cette période impose un séjour d'au moins ${minNights} nuit${minNights > 1 ? "s" : ""}.`,
    };
  }

  // Règle 2 : jour d'arrivée imposé
  if (arrivalDay !== "tous") {
    const attendu = JOUR_INDEX[arrivalDay];
    if (dayOfWeek(arrival) !== attendu) {
      return {
        ok: false,
        message: `Pour cette période, l'arrivée doit se faire un ${arrivalDay}.`,
      };
    }
  }

  // Règle 3 : jour de départ imposé
  if (departureDay !== "tous") {
    const attendu = JOUR_INDEX[departureDay];
    if (dayOfWeek(departure) !== attendu) {
      return {
        ok: false,
        message: `Pour cette période, le départ doit se faire un ${departureDay}.`,
      };
    }
  }

  return { ok: true };
}