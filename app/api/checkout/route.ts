import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { amount, productName, description, clientEmail, forwardQuery } = body as {
    amount: number;
    productName: string;
    description: string;
    clientEmail?: string;
    forwardQuery: string;
  };

  if (!amount || amount <= 0) {
    return NextResponse.json(
      { error: "Montant de paiement invalide." },
      { status: 400 }
    );
  }

  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: clientEmail || undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          product_data: {
            name: productName,
            description,
          },
          unit_amount: amount,
        },
      },
    ],
    success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}&${forwardQuery}`,
    cancel_url: `${origin}/paiement?${forwardQuery}`,
  });

  return NextResponse.json({ url: session.url });
}
