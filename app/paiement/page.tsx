"use client";

export default function PaiementPage() {
  async function handlePayment() {
    const response = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] px-8 py-20">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-5xl font-bold text-[#082f3a]">
          Paiement sécurisé
        </h1>

        <div className="rounded-3xl bg-white p-10 shadow-xl">
          <p className="mb-6 text-lg text-slate-700">
            Vous allez être redirigé vers Stripe pour régler l’acompte.
          </p>

          <button
            onClick={handlePayment}
            className="w-full rounded-full bg-[#082f3a] px-8 py-5 text-lg font-semibold text-white"
          >
            Payer mon acompte sécurisé
          </button>
        </div>
      </section>
    </main>
  );
}