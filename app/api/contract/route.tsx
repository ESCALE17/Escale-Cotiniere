import { NextResponse } from "next/server";
import { generateContractPdfBuffer } from "@/app/lib/contract";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const villaSlug = searchParams.get("villa") || "logis";
  const clientName = searchParams.get("client") || "Client à compléter";
  const clientAddress = searchParams.get("address") || "";
  const clientPhone = searchParams.get("phone") || "";
  const arrival = searchParams.get("arrival") || "date d’arrivée";
  const departure = searchParams.get("departure") || "date de départ";
  const total = Number(searchParams.get("total") || 0);
  const deposit = Number(searchParams.get("deposit") || 0);
  const nights = Number(searchParams.get("nights") || 0);
  const pricePerNight = Number(searchParams.get("pricePerNight") || 0);
  const stayPrice = Number(searchParams.get("stayPrice") || 0);
  const cleaningFee = Number(searchParams.get("cleaningFee") || 0);
  const linenFee = Number(searchParams.get("linenFee") || 0);
  const petFee = Number(searchParams.get("petFee") || 0);
  const touristTax = Number(searchParams.get("touristTax") || 0);
  const locale = (searchParams.get("lang") || "fr") as "fr" | "en" | "de" | "es";

  const buffer = await generateContractPdfBuffer({
    villaSlug,
    clientName,
    clientAddress,
    clientPhone,
    arrival,
    departure,
    total,
    deposit,
    nights,
    pricePerNight,
    stayPrice,
    cleaningFee,
    linenFee,
    petFee,
    touristTax,
    locale,
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="contrat-${villaSlug}.pdf"`,
    },
  });
}
