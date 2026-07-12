import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

/**
 * GET /api/export-ical?villa=logis
 *
 * Génère un calendrier iCal (format .ics) des dates OCCUPÉES d'une maison,
 * à coller dans Airbnb / Booking / Abritel pour qu'ils bloquent ces dates.
 *
 * On exporte les réservations directes et les blocages manuels
 * (tout sauf source = "ical", pour ne pas renvoyer aux plateformes
 * les dates qu'elles nous ont elles-mêmes transmises → évite les boucles).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const villa = searchParams.get("villa");

  if (!villa) {
    return NextResponse.json({ error: "Paramètre villa manquant." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("blocked_dates")
    .select("villa_slug, start_date, end_date, reason, source")
    .eq("villa_slug", villa)
    .neq("source", "ical")
    .order("start_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const periods = data ?? [];

  // Formate une date "YYYY-MM-DD" en "YYYYMMDD" (format iCal DATE).
  const toICalDate = (d: string) => d.replace(/-/g, "").slice(0, 8);

  const now = new Date();
  const stamp =
    now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const lines: string[] = [];
  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//Escale a La Cotiniere//Reservations//FR");
  lines.push("CALSCALE:GREGORIAN");
  lines.push(`X-WR-CALNAME:Escale - ${villa}`);

  for (const p of periods) {
    const uid = `${villa}-${p.start_date}-${p.end_date}@escalealacotiniere.fr`;
    const summary = (p.reason && String(p.reason).trim()) || "Reserve";
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${stamp}`);
    lines.push(`DTSTART;VALUE=DATE:${toICalDate(p.start_date)}`);
    lines.push(`DTEND;VALUE=DATE:${toICalDate(p.end_date)}`);
    lines.push(`SUMMARY:${summary}`);
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  // iCal exige des fins de ligne CRLF.
  const body = lines.join("\r\n") + "\r\n";

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${villa}.ics"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}
