import { useEffect, useState } from "react";
import BASE_URL from "./config/config";
import "./App.css";
import { Header } from "./components/web/Header";
import { HeroSection } from "./components/web/HeroSection";
import { FeaturesSection } from "./components/web/FeaturesSection";
import { PricingSection } from "./components/web/PricingSection";
import { TestimonialsSection } from "./components/web/TestimonialsSection";
import { Footer } from "./components/web/Footer";
import { PRICING_CONTENT } from "./components/web/staticContent";

function normalizeHomePlans(payload) {
  const data = payload?.data ?? payload ?? {};

  if (Array.isArray(data?.plans)) return data.plans;
  if (Array.isArray(data?.planes)) return data.planes;
  if (Array.isArray(payload?.plans)) return payload.plans;
  if (Array.isArray(payload?.planes)) return payload.planes;

  return [];
}

export default function App() {
  const [plans, setPlans] = useState(PRICING_CONTENT.fallbackPlans);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let active = true;

    const fetchPlans = async () => {
      try {
        const url = `${BASE_URL}?action=web_home_obtener`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const text = await res.text();
        const json = text ? JSON.parse(text) : {};

        if (!res.ok || json?.exito === false) {
          throw new Error(json?.mensaje || `Error HTTP ${res.status}`);
        }

        const apiPlans = normalizeHomePlans(json);

        if (active && apiPlans.length > 0) {
          setPlans(apiPlans);
        }
      } catch (error) {
        console.error("Error cargando planes:", error);
      }
    };

    fetchPlans();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--balto-bg)] text-[var(--balto-ink)]">
      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection plans={plans} />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
