import { useEffect, useState } from "react";
import BASE_URL from "./config/config";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { PricingSection } from "./components/PricingSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}?action=web_home_obtener`)
      .then((res) => res.json())
      .then((json) => {
        setHomeData(json?.data || null);
      })
      .catch((error) => {
        console.error("Error cargando home:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--balto-bg)] text-[var(--balto-ink)]">
      <Header config={homeData?.config || {}} />

      <main>
        <HeroSection
          config={homeData?.config || {}}
          heroMedia={homeData?.hero_media || null}
        />

        <FeaturesSection features={homeData?.features || []} />

        <PricingSection
          plans={homeData?.plans || []}
          config={homeData?.config || {}}
        />

        <TestimonialsSection
          testimonials={homeData?.testimonials || []}
          config={homeData?.config || {}}
        />
      </main>

      <Footer config={homeData?.config || {}} />
    </div>
  );
}