import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../imagenes/Balto_Blanco.png";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Beneficios", href: "#features" },
  { label: "Planes", href: "#pricing" },
  { label: "Opiniones", href: "#testimonials" },
  { label: "Contacto", href: "#contacto" },
];

const BRAND_TITLE = "Balto";
const BRAND_SUBTITLE = "";
const CTA_TEXT = "Inicio sesión";
const CTA_LINK = "https://app.balto.com.ar";

export function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (mobileMenuOpen) {
        setShowHeader(true);
        setLastScroll(currentScroll);
        return;
      }

      if (currentScroll > lastScroll && currentScroll > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[26px] border border-white/70 bg-white/[0.88] shadow-[0_18px_60px_rgba(10,37,64,0.10)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.90),rgba(255,255,255,0.64))]" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-[rgba(0,85,187,0.10)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-8 h-px w-44 bg-gradient-to-r from-transparent via-[rgba(0,85,187,0.30)] to-transparent" />

          <div className="relative flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5 lg:px-6">
            <a
              href="#inicio"
              onClick={closeMobileMenu}
              className="group flex min-w-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--balto-midnight)] p-2 shadow-[0_14px_30px_rgba(10,37,64,0.24)] transition duration-300 group-hover:-translate-y-0.5">
                <img
                  src={logo}
                  alt="Balto"
                  className="h-auto max-h-6 w-auto object-contain"
                />
              </div>

              <div className="min-w-0 leading-tight">
                <div className="truncate text-base font-semibold leading-none tracking-[-0.045em] text-[var(--balto-midnight)] sm:text-lg">
                  {BRAND_TITLE}
                </div>
                {BRAND_SUBTITLE ? (
                  <div className="mt-1 hidden truncate text-xs font-normal leading-none tracking-[-0.01em] text-slate-500 sm:block">
                    {BRAND_SUBTITLE}
                  </div>
                ) : null}
              </div>
            </a>

            <nav className="hidden items-center gap-1 rounded-2xl border border-slate-200/70 bg-white/[0.55] p-1 md:flex">
              {NAV_LINKS.map((item, index) => (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href}
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:bg-white hover:text-[var(--balto-action)] hover:shadow-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={CTA_LINK}
                onClick={closeMobileMenu}
                className="hidden items-center justify-center rounded-2xl bg-[var(--balto-action)] px-4 py-2.5 text-sm font-medium text-white shadow-[0_16px_34px_rgba(0,85,187,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(0,85,187,0.30)] sm:inline-flex"
              >
                {CTA_TEXT}
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-[var(--balto-midnight)] shadow-[0_12px_28px_rgba(10,37,64,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(0,85,187,0.25)] hover:text-[var(--balto-action)] md:hidden"
                aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          <div
            className={`relative grid transition-all duration-300 md:hidden ${
              mobileMenuOpen
                ? "grid-rows-[1fr] border-t border-slate-200/70 opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <nav className="flex flex-col gap-2 px-4 pb-4 pt-2">
                {NAV_LINKS.map((item, index) => (
                  <a
                    key={`${item.label}-mobile-${index}`}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/[0.72] px-4 py-3 text-sm font-semibold text-[var(--balto-midnight)] shadow-[0_10px_26px_rgba(10,37,64,0.06)] transition duration-200 hover:border-[rgba(0,85,187,0.24)] hover:bg-white hover:text-[var(--balto-action)]"
                  >
                    {item.label}
                    <span className="h-2 w-2 rounded-full bg-[var(--balto-action)] opacity-60" />
                  </a>
                ))}

                <a
                  href={CTA_LINK}
                  onClick={closeMobileMenu}
                  className="mt-1 inline-flex items-center justify-center rounded-2xl bg-[var(--balto-action)] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(0,85,187,0.22)] transition duration-300 hover:-translate-y-0.5"
                >
                  {CTA_TEXT}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
