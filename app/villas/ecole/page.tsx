import Link from "next/link";

export default function EcolePage() {
  return (
    <main className="min-h-screen bg-[#f7f1e8]">
      <section className="mx-auto max-w-6xl px-8 py-20">

        <Link
          href="/"
          className="mb-8 inline-block text-[#082f3a] hover:underline"
        >
          ← Retour à l'accueil
        </Link>

        <h1 className="mb-6 text-5xl font-bold text-[#082f3a]">
          L’École
        </h1>

        <p className="mb-10 max-w-3xl text-lg text-slate-600">
          Maison de caractère avec de beaux volumes et une vraie âme oléronaise.
        </p>

        <img
          src="/images/villas/ecole/01.jpg"
          alt="L’École"
          className="mb-10 w-full rounded-3xl shadow-xl"
        />

        <div className="text-center">
          <button className="rounded-full bg-[#082f3a] px-8 py-4 text-white transition hover:bg-[#0d4757]">
            Vérifier mes dates
          </button>
        </div>

      </section>
    </main>
  );
}