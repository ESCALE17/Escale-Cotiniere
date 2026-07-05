import Link from "next/link";
import Stripe from "stripe";
import { computePricing } from "@/app/lib/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type SearchParams = { [key: string]: string | string[] | undefined };

function getParam(searchParams: SearchParams, key: string): string {
  const value = searchParams[key];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const sessionId = getParam(params, "session_id");

  if (!sessionId) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="mb-6 text-4xl font-bold text-[#082f3a]">
            Aucune confirmation trouvée
          </h1>
          <p className="mb-8 text-lg text-slate-700">
            Nous n’avons pas retrouvé de paiement associé à cette page. Si
            vous venez de régler un acompte et que vous voyez ce message,
            contactez-nous directement — votre paiement peut malgré tout avoir
            été enregistré chez Stripe.
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
          >
            Retour à l’accueil
          </Link>
        </section>
      </main>
    );
  }

  let session: Stripe.Checkout.Session | null = null;
  let fetchError = false;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    fetchError = true;
  }

  const paid = session?.payment_status === "paid";

  if (fetchError || !session || !paid) {
    return (
      <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
        <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="mb-6 text-4xl font-bold text-[#082f3a]">
            Paiement non confirmé
          </h1>
          <p className="mb-8 text-lg text-slate-700">
            {fetchError
              ? "Nous n’avons pas pu vérifier ce paiement pour le moment."
              : "Ce paiement n’a pas encore été validé (annulé ou toujours en attente)."}{" "}
            Si vous pensez qu’il s’agit d’une erreur, contactez-nous en
            précisant la référence ci-dessous.
          </p>
          <p className="mb-8 rounded-xl bg-[#f7f1e8] p-4 font-mono text-sm text-slate-600">
            Référence : {sessionId}
          </p>
          <Link
            href="/"
            className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
          >
            Retour à l’accueil
          </Link>
        </section>
      </main>
    );
  }

  const villaSlug = getParam(params, "villa");
  const arrival = getParam(params, "arrival");
  const departure = getParam(params, "departure");
  const adults = Number(getParam(params, "adults") || 0);
  const children = Number(getParam(params, "children") || 0);
  const babies = Number(getParam(params, "babies") || 0);
  const pet = getParam(params, "pet");
  const nom = getParam(params, "nom");
  const prenom = getParam(params, "prenom");

  const pricing = computePricing({
    villaSlug,
    arrival,
    departure,
    adults,
    children,
    babies,
    pet: pet === "oui",
  });

  const amountPaid = (session.amount_total ?? 0) / 100;
  const clientName = `${prenom} ${nom}`.trim() || "Client";

  const contractUrl = `/api/contract?villa=${encodeURIComponent(
    villaSlug
  )}&client=${encodeURIComponent(clientName)}&arrival=${encodeURIComponent(
    arrival
  )}&departure=${encodeURIComponent(departure)}&total=${pricing.total}&deposit=${pricing.deposit}`;

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="mb-6 text-5xl font-bold text-[#082f3a]">
          Paiement confirmé
        </h1>

        <p className="mb-8 text-lg text-slate-700">
          Merci {prenom || ""}, votre acompte de{" "}
          <strong>{amountPaid.toFixed(2)} €</strong> a bien été enregistré
          pour « {pricing.villa?.name ?? villaSlug} ».
        </p>

        <div className="mb-8 space-y-3 rounded-2xl bg-[#f7f1e8] p-6 text-slate-700">
          <p>
            <strong>Séjour :</strong> du {arrival} au {departure}
          </p>
          <p>
            <strong>Total du séjour :</strong> {pricing.total.toFixed(2)} €
          </p>
          <p>
            <strong>Solde restant, à régler à J-30 :</strong>{" "}
            {pricing.balance.toFixed(2)} €
          </p>
        </div>

        <a
          href={contractUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-full bg-[#082f3a] px-8 py-4 text-white"
        >
          Télécharger mon contrat de location (PDF)
        </a>
      </section>
    </main>
  );
}
