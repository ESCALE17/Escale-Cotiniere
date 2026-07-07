export type BlockedPeriod = {
  start_date: string; // "2026-08-10"
  end_date: string;   // "2026-08-17"
  reason?: string | null;
};

/**
 * Transforme une date en chaîne "AAAA-MM-JJ" (sans décalage horaire).
 */
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Renvoie true si le séjour demandé (arrival → departure) chevauche
 * au moins une période bloquée.
 * On considère qu'un séjour occupe les nuits de arrival (incluse)
 * jusqu'à departure (exclue, jour du départ = libre).
 */
export function rangeOverlapsBlocked(
  arrival: string,
  departure: string,
  blocked: BlockedPeriod[]
): boolean {
  return blocked.some((period) => {
    // Chevauchement si : arrivée < fin_bloquée ET départ > début_bloqué
    return arrival < period.end_date && departure > period.start_date;
  });
}

/**
 * Construit la liste de toutes les dates individuelles bloquées,
 * pour les griser une par une dans le calendrier.
 */
export function expandBlockedDates(blocked: BlockedPeriod[]): Date[] {
  const dates: Date[] = [];
  blocked.forEach((period) => {
    const start = new Date(period.start_date + "T00:00:00");
    const end = new Date(period.end_date + "T00:00:00");
    for (
      let d = new Date(start);
      d < end;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d));
    }
  });
  return dates;
}