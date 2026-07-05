import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          product_data: {
            name: "Acompte réservation - Escale à La Cotinière",
          },
          unit_amount: 50000, // 500,00 € en centimes pour test
        },
      },
    ],
    success_url: "http://localhost:3000/confirmation",
    cancel_url: "http://localhost:3000/paiement",
  });

  return NextResponse.json({ url: session.url });
}