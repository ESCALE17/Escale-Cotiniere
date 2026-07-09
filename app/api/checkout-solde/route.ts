import { NextResponse } from "next/server";
import { generateBalancePayment } from "@/app/lib/solde";

export async function POST(request: Request) {
  const { id } = (await request.json()) as { id: string };
  if (!id) {
    return NextResponse.json({ error: "Reservation manquante." }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const result = await generateBalancePayment(id, origin);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ url: result.url });
}
