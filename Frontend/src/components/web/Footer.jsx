import logo from "../../imagenes/Balto_Blanco.png";

const BRAND = "BALTO";
const SUBTITLE = "Sistema contable y administrativo";
const DESCRIPTION = "Una solución orientada a orden, control y crecimiento.";
const EMAIL = "demo@balto.com";
const PHONE = "+54 9 3564 67-2341";
const ADDRESS = "Argentina";
const COPYRIGHT = "© 2026 Balto. Todos los derechos reservados.";

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
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden bg-[#04070d] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,85,187,0.12),transparent_30%)]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[var(--balto-action)]/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="absolute -right-16 top-8 hidden h-80 w-80 object-contain opacity-[0.025] lg:block"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-xl bg-white/5 p-2 backdrop-blur">
              <img src={logo} alt="Balto" className="h-6 object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">
                {BRAND}
              </p>
              <p className="text-xs text-white/50">{SUBTITLE}</p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
            {DESCRIPTION}
          </p>

          <div className="mt-6 flex items-center gap-5">
            <div
              onClick={() =>
                window.open("https://wa.me/5493564672341", "_blank")
              }
              className="cursor-pointer text-white/60 text-xl transition hover:text-[var(--balto-action)] hover:scale-110"
              title="WhatsApp"
              aria-label="Abrir WhatsApp de Balto"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </div>

            <div
              onClick={() =>
                window.open(
                  "https://www.instagram.com/baltosistemas?igsh=MXd3cXNqNXo1ODR2bg==",
                  "_blank"
                )
              }
              className="cursor-pointer text-white/60 text-xl transition hover:text-[var(--balto-action)] hover:scale-110"
              title="Instagram"
              aria-label="Abrir Instagram de Balto"
            >
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
        </div>

        {/* PRODUCTO */}
        <div>
          <h4 className="text-sm font-semibold text-white">Producto</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {PRODUCT_LINKS.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACTO */}
        <div>
          <h4 className="text-sm font-semibold text-white">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>{EMAIL}</li>
            <li>{PHONE}</li>
            <li>{ADDRESS}</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
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

          <div className="flex gap-5">
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
    </footer>
  );
}
