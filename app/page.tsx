import Hero from "./components/Hero";
import Collection from "./components/Collection";
import CotiniereSection from "./components/CotiniereSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Collection />
      <CotiniereSection />
      <ContactSection />
    </main>
  );
}