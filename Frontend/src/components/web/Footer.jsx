import { useMemo } from "react";
import logo from "../../imagenes/balto.png";

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

  const phone =
    config?.footer_phone?.valor || "+54 9 3564 67-2341";

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
                  {brand}
                </p>
                <p className="text-xs text-white/50">
                  {subtitle}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/[0.62]">
              {description}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  window.open("https://wa.me/5493564672341", "_blank")
                }
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
            <h4 className="text-sm font-semibold text-white">
              Producto
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-white/[0.62]">
              {productLinks.map((link) => (
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
            <h4 className="text-sm font-semibold text-white">
              Contacto
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-white/[0.62]">
              <li>
                <a className="transition hover:text-white" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href={`tel:${phone.replace(/\s/g, "")}`}>
                  {phone}
                </a>
              </li>
              <li>{address}</li>
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
            <p>{copyright}</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
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
