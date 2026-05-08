import { useEffect, useState } from "react";
import logo from "../../imagenes/Balto_Blanco.png";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Beneficios", href: "#features" },
  { label: "Planes", href: "#pricing" },
  { label: "Opiniones", href: "#testimonials" },
];

const BRAND_TITLE = "Balto";
const BRAND_SUBTITLE = "Sistema contable y administrativo";
const CTA_TEXT = "Contactar";
const CTA_LINK = "#contacto";

export function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

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
                  {BRAND_TITLE}
                </div>
                <div className="text-xs font-normal text-slate-500">
                  {BRAND_SUBTITLE}
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-2 md:flex">
              {NAV_LINKS.map((item, index) => (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-[var(--balto-action)]/6 hover:text-[var(--balto-action)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={CTA_LINK}
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--balto-action)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(0,85,187,0.22)] transition hover:-translate-y-0.5 hover:opacity-95"
            >
              {CTA_TEXT}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
