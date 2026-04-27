import { useEffect, useState } from "react";
import BASE_URL from "../config/config";
import logo from "../assets/Balto_Blanco.png";

function safeJsonParse(value, fallback = []) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function normalizeConfig(rawConfig) {
  if (!rawConfig) return {};

  const result = {};

  Object.entries(rawConfig).forEach(([key, value]) => {
    if (value && typeof value === "object" && "valor" in value) {
      result[key] = value.valor ?? "";
    } else {
      result[key] = value ?? "";
    }
  });

  return result;
}

export function Header() {
  const [config, setConfig] = useState({});
  const [menu, setMenu] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchHeader = async () => {
      try {
        const res = await fetch(`${BASE_URL}?action=web_home_obtener`);
        const json = await res.json();

        if (!active) return;

        const data = json?.data ?? json ?? {};
        const normalized = normalizeConfig(data?.config ?? {});

        setConfig(normalized);
        setMenu(safeJsonParse(normalized.header_menu, []));
      } catch (error) {
        console.error("Error cargando header:", error);
      }
    };

    fetchHeader();

    return () => {
      active = false;
    };
  }, []);

  // 🔥 SCROLL LOGIC
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        // bajando
        setShowHeader(false);
      } else {
        // subiendo
        setShowHeader(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const brandTitle = config?.header_brand_title;
  const brandSubtitle = config?.header_brand_subtitle;
  const ctaText = config?.header_cta_text;
  const ctaLink = config?.header_cta_link;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white/78 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.08),transparent_30%)]" />

          <div className="relative flex items-center justify-between px-5 py-4 lg:px-6">
            <a href="#inicio" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--balto-midnight)] p-2 shadow-[0_10px_25px_rgba(10,37,64,0.22)]">
                <img
                  src={logo}
                  alt="Balto"
                  className="max-h-6 h-auto w-auto object-contain"
                />
              </div>

              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-[var(--balto-midnight)]">
                  {brandTitle}
                </div>
                <div className="text-xs font-normal text-slate-500">
                  {brandSubtitle}
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-2 md:flex">
              {menu.map((item, index) => (
                <a
                  key={`${item?.label ?? "item"}-${index}`}
                  href={item?.href || "#"}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[var(--balto-action)]/6 hover:text-[var(--balto-action)]"
                >
                  {item?.label || `Link ${index + 1}`}
                </a>
              ))}
            </nav>

            <a
              href={ctaLink || "#contacto"}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--balto-action)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(0,85,187,0.22)] transition hover:-translate-y-0.5 hover:opacity-95"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}