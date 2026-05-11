import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import logo from "../../imagenes/Balto_Blanco.png";

const BRAND = "BALTO";
const DESCRIPTION = "Una solución orientada a orden, control y crecimiento.";
const EMAIL = "baltosistemascontables@gmail.com";
const PHONE = "+54 9 3564 67-2341";
const ADDRESS = "Argentina";
const COPYRIGHT = "© 2026 Balto. Todos los derechos reservados.";

const WHATSAPP_NUMBER = "5493564672341";
const WHATSAPP_MESSAGE =
    "Hola, vengo desde el sitio web de Balto. Me interesa conocer más sobre el sistema y sus planes. ¿Podrían brindarme más información?";

const PRODUCT_LINKS = [
  { label: "Beneficios", href: "#features" },
  { label: "Planes", href: "#pricing" },
  { label: "Opiniones", href: "#testimonials" },
];

const LEGAL_LINKS = [
  { label: "Privacidad", href: "#" },
  { label: "Términos", href: "#" },
];

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const mensaje = encodeURIComponent(WHATSAPP_MESSAGE);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`,
      "_blank"
    );
  };

  return (
    <footer
      id="contacto"
      className="relative isolate overflow-hidden bg-[#04070d] text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,85,187,0.14),transparent_34%)]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[rgba(0,85,187,0.11)] blur-[120px]" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/[0.035] blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.30)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.30)_1px,transparent_1px)] [background-size:44px_44px]" />

        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="absolute -right-16 top-8 hidden h-80 w-80 object-contain opacity-[0.025] lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[34px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.30)] backdrop-blur-xl sm:p-8 lg:grid-cols-[1.35fr_0.85fr_0.95fr] lg:p-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08] p-2 ring-1 ring-white/10 backdrop-blur">
                <img
                  src={logo}
                  alt="Balto"
                  className="h-6 object-contain"
                />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-wide text-white">
                  {BRAND}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/[0.62]">
              {DESCRIPTION}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={openWhatsApp}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-xl text-white/[0.65] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-[var(--balto-action)]"
                title="WhatsApp"
                aria-label="Abrir WhatsApp de Balto"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </button>

              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/baltosistemas?igsh=MXd3cXNqNXo1ODR2bg==",
                    "_blank"
                  )
                }
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-xl text-white/[0.65] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08] hover:text-[var(--balto-action)]"
                title="Instagram"
                aria-label="Abrir Instagram de Balto"
              >
                <i className="fa-brands fa-instagram"></i>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Producto</h4>

            <ul className="mt-5 space-y-3 text-sm text-white/[0.62]">
              {PRODUCT_LINKS.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <a
                    href={link.href}
                    className="inline-flex transition duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Contacto</h4>

            <ul className="mt-5 space-y-3 text-sm text-white/[0.62]">
              <li>
                <a
                  className="transition hover:text-white"
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
              </li>

              <li>
                <a
                  className="transition hover:text-white"
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                >
                  {PHONE}
                </a>
              </li>

              <li>{ADDRESS}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 object-contain opacity-45"
            />

            <p>{COPYRIGHT}</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Volver arriba"
        title="Volver arriba"
        className={`fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-[var(--balto-action)] text-white shadow-[0_18px_42px_rgba(0,85,187,0.32)] ring-1 ring-[rgba(255,255,255,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[var(--balto-action)] hover:shadow-[0_22px_55px_rgba(10,37,64,0.30)] focus:outline-none focus:ring-4 focus:ring-[rgba(0,85,187,0.20)] sm:bottom-7 sm:right-7 ${
          showScrollTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <ChevronUp className="h-5 w-5" strokeWidth={2.4} />
      </button>
    </footer>
  );
}