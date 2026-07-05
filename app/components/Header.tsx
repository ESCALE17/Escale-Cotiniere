export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-8 py-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/85 px-6 py-4 shadow-lg backdrop-blur">
        <div className="text-lg font-bold tracking-wide text-[#082f3a]">
          Escale à La Cotinière
        </div>

        <div className="hidden gap-8 text-sm font-semibold text-[#082f3a] md:flex">
          <a href="#collection">Notre Collection</a>
          <a href="#cotiniere">La Cotinière</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </header>
  );
}