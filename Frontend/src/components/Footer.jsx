import { useMemo } from "react";
import logo from "../assets/Balto_Blanco.png";

function parseFooterLinks(value, fallback = []) {
  if (!value) return fallback;

  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;

    if (!Array.isArray(parsed)) return fallback;

    return parsed
      .map((item) => ({
        label: String(item?.label ?? "").trim(),
        href: String(item?.href ?? "").trim(),
      }))
      .filter((item) => item.label && item.href);
  } catch {
    return fallback;
  }
}

export function Footer({ config = {} }) {
  const brand = config?.footer_brand?.valor || "BALTO";
  const subtitle =
    config?.footer_subtitle?.valor ||
    "Sistema contable y administrativo";

  const description =
    config?.footer_description?.valor ||
    "Una solución orientada a orden, control y crecimiento.";

  const email = config?.footer_email?.valor || "demo@balto.com";
  const phone = config?.footer_phone?.valor || "+54 9 3492 00-0000";
  const address = config?.footer_address?.valor || "Argentina";

  const copyright =
    config?.footer_copyright?.valor ||
    "© 2026 Balto. Todos los derechos reservados.";

  const legalLinks = useMemo(
    () =>
      parseFooterLinks(config?.footer_legal_links?.valor, [
        { label: "Privacidad", href: "#" },
        { label: "Términos", href: "#" },
      ]),
    [config]
  );

  const productLinks = useMemo(
    () =>
      parseFooterLinks(config?.footer_product_links?.valor, [
        { label: "Beneficios", href: "#features" },
        { label: "Planes", href: "#pricing" },
        { label: "Opiniones", href: "#testimonials" },
      ]),
    [config]
  );

  return (
    <footer
      id="contacto"
      className="relative overflow-hidden bg-[#04070d] text-white"
    >
      {/* FONDO CON DETALLE */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,85,187,0.12),transparent_30%)]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[var(--balto-action)]/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-xl bg-white/5 p-2 backdrop-blur">
              <img
                src={logo}
                alt="Balto"
                className="h-6 object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-white">
                {brand}
              </p>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
            {description}
          </p>

          {/* REDES */}
          <div className="mt-6 flex items-center gap-5">
            <div
              onClick={() =>
                window.open("https://wa.me/5493492000000", "_blank")
              }
              className="cursor-pointer text-white/60 text-xl transition hover:text-[var(--balto-action)] hover:scale-110"
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
            >
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
        </div>

        {/* PRODUCTO */}
        <div>
          <h4 className="text-sm font-semibold text-white">
            Producto
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {productLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACTO */}
        <div>
          <h4 className="text-sm font-semibold text-white">
            Contacto
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>{email}</li>
            <li>{phone}</li>
            <li>{address}</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{copyright}</p>

          <div className="flex gap-5">
            {legalLinks.map((link) => (
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