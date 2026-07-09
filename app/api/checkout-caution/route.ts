import { NextResponse } from "next/server";
import { generateCautionPayment } from "@/app/lib/caution";

export async function POST(request: Request) {
  const { id, amount } = (await request.json()) as {
    id: string;
    amount?: number;
  };
  if (!id) {
    return NextResponse.json({ error: "Reservation manquante." }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const result = await generateCautionPayment(id, origin, amount);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ url: result.url });
}
