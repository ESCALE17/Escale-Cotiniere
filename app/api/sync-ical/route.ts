import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * Parse un contenu iCal et renvoie les périodes réservées (VEVENT).
 * On extrait DTSTART et DTEND de chaque évènement.
 */
function parseIcal(icalText: string): { start: string; end: string }[] {
  const events: { start: string; end: string }[] = [];
  const lines = icalText.split(/\r?\n/);
  let start = "";
  let end = "";
  let inEvent = false;

  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      inEvent = true;
      start = "";
      end = "";
    } else if (line.startsWith("END:VEVENT")) {
      if (start && end) events.push({ start, end });
      inEvent = false;
    } else if (inEvent) {
      // DTSTART;VALUE=DATE:20260715  ou  DTSTART:20260715T140000Z
      if (line.startsWith("DTSTART")) {
        start = extractDate(line);
      } else if (line.startsWith("DTEND")) {
        end = extractDate(line);
      }
    }
  }
  return events;
}

/**
 * Extrait une date "yyyy-mm-dd" d'une ligne iCal DTSTART/DTEND.
 */
function extractDate(line: string): string {
  const value = line.split(":").pop() ?? "";
  const digits = value.replace(/[^0-9]/g, "");
  if (digits.length < 8) return "";
  const y = digits.slice(0, 4);
  const m = digits.slice(4, 6);
  const d = digits.slice(6, 8);
  return `${y}-${m}-${d}`;
}

/**
 * Récupère et parse un lien iCal. Renvoie [] en cas d'échec (lien invalide, etc.).
 */
async function fetchIcal(url: string): Promise<{ start: string; end: string }[]> {
  if (!url) return [];
  try {
    const res = await fetch(url, { headers: { "User-Agent": "EscaleCotiniere/1.0" } });
    if (!res.ok) return [];
    const text = await res.text();
    return parseIcal(text);
  } catch {
    return [];
  }
}

/**
 * Synchronise tous les calendriers iCal de toutes les villas.
 * Pour chaque lien, récupère les dates réservées et les insère dans
 * blocked_dates avec source = 'ical'.
 *
 * On efface d'abord les anciens blocages 'ical' pour repartir propre
 * (les blocages manuels et 'reservation' ne sont PAS touchés).
 */
export async function GET() {
  // Récupère les liens iCal de toutes les villas
  const { data: icals, error } = await supabaseAdmin
    .from("villas_ical")
    .select("villa_slug, ical_airbnb, ical_booking, ical_abritel");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let totalImported = 0;
  const summary: Record<string, number> = {};

  for (const row of icals ?? []) {
    const villa = row.villa_slug;
    const urls = [row.ical_airbnb, row.ical_booking, row.ical_abritel].filter(Boolean) as string[];

    // Récupère toutes les périodes réservées de cette villa (toutes plateformes)
    const allEvents: { start: string; end: string }[] = [];
    for (const url of urls) {
      const events = await fetchIcal(url);
      allEvents.push(...events);
    }

    // Supprime les anciens blocages iCal de cette villa
    await supabaseAdmin
      .from("blocked_dates")
      .delete()
      .eq("villa_slug", villa)
      .eq("source", "ical");

    // Insère les nouvelles périodes réservées
    if (allEvents.length > 0) {
      const rows = allEvents.map((ev) => ({
        villa_slug: villa,
        start_date: ev.start,
        end_date: ev.end,
        reason: "Réservé (synchro plateforme)",
        source: "ical",
      }));

      const { error: insertError } = await supabaseAdmin
        .from("blocked_dates")
        .insert(rows);

      if (!insertError) {
        totalImported += rows.length;
        summary[villa] = rows.length;
      }
    } else {
      summary[villa] = 0;
    }
  }

  return NextResponse.json({
    success: true,
    totalImported,
    summary,
    syncedAt: new Date().toISOString(),
  });
}