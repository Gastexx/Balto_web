import { useEffect, useState } from "react";
import BASE_URL from "../../config/config";
import logo from "../../imagenes/balto.png";

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const brandTitle = config?.header_brand_title || "Balto";
  const brandSubtitle = config?.header_brand_subtitle || "Gestión simple";
  const ctaText = config?.header_cta_text || "Contactar";
  const ctaLink = config?.header_cta_link || "#contacto";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[26px] border border-white/70 bg-white/[0.82] shadow-[0_18px_60px_rgba(10,37,64,0.10)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(255,255,255,0.58))]" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-[rgba(0,85,187,0.10)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-8 h-px w-44 bg-gradient-to-r from-transparent via-[rgba(0,85,187,0.30)] to-transparent" />

          <div className="relative flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5 lg:px-6">
            <a href="#inicio" className="group flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--balto-midnight)] p-2 shadow-[0_14px_30px_rgba(10,37,64,0.24)] transition duration-300 group-hover:-translate-y-0.5">
                <img
                  src={logo}
                  alt="Balto"
                  className="h-auto max-h-6 w-auto object-contain"
                />
              </div>

              <div className="min-w-0 leading-tight">
                <div className="truncate text-sm font-semibold tracking-tight text-[var(--balto-midnight)]">
                  {brandTitle}
                </div>
                <div className="truncate text-xs font-normal text-slate-500">
                  {brandSubtitle}
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-1 rounded-2xl border border-slate-200/70 bg-white/[0.55] p-1 md:flex">
              {menu.map((item, index) => (
                <a
                  key={`${item?.label ?? "item"}-${index}`}
                  href={item?.href || "#"}
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:bg-white hover:text-[var(--balto-action)] hover:shadow-sm"
                >
                  {item?.label || `Link ${index + 1}`}
                </a>
              ))}
            </nav>

            <a
              href={ctaLink}
              className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-[var(--balto-action)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_16px_34px_rgba(0,85,187,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(0,85,187,0.30)]"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
