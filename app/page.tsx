import Header from "./components/Header";
import Hero from "./components/Hero";
import Collection from "./components/Collection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Collection />
      </main>
    </>
  );
}