import { motion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import logoMark from "../assets/balto.png";

function getValue(field, fallback = "") {
  if (field == null) return fallback;
  if (typeof field === "string" || typeof field === "number") return field;
  if (typeof field === "object") {
    if ("valor" in field) return field.valor ?? fallback;
    if ("value" in field) return field.value ?? fallback;
  }
  return fallback;
}

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HeroSection({ config }) {
  const badge = getValue(
    config?.hero_badge ?? config?.badge,
    "Gestión contable moderna para empresas y estudios"
  );

  const titulo = getValue(
    config?.hero_titulo ?? config?.titulo,
    "Centralizá ventas, compras y reportes en un solo sistema."
  );

  const subtitulo = getValue(
    config?.hero_subtitulo ?? config?.subtitulo,
    "Balto simplifica tu operación diaria con módulos claros, reportes útiles y una experiencia rápida para equipos que necesitan orden y control real."
  );

  const ctaPrimarioTexto = getValue(
    config?.hero_cta_primario_texto ?? config?.cta_primario_texto,
    "Ver planes"
  );

  const ctaPrimarioLink = getValue(
    config?.hero_cta_primario_link ?? config?.cta_primario_link,
    "#pricing"
  );

  const ctaSecundarioTexto = getValue(
    config?.hero_cta_secundario_texto ?? config?.cta_secundario_texto,
    "Explorar beneficios"
  );

  const ctaSecundarioLink = getValue(
    config?.hero_cta_secundario_link ?? config?.cta_secundario_link,
    "#features"
  );

  const highlights = [
    { icon: BadgeCheck, text: "Implementación simple" },
    { icon: BarChart3, text: "Reportes en tiempo real" },
    { icon: ShieldCheck, text: "Datos organizados y seguros" },
  ];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#f7f9fc] py-20 sm:py-24 lg:py-28"
    >
      {/* FONDO SUAVE */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(10,37,64,0.05),transparent_34%)]" />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[var(--balto-action)]/8 blur-[120px]" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-slate-300/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#0A2540_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* LOGO SUTIL COMO MARCA DE AGUA */}
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="absolute -right-12 top-28 hidden h-72 w-72 object-contain opacity-[0.035] sm:block lg:right-10 lg:h-96 lg:w-96"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--balto-border)] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--balto-midnight)]/5">
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 object-contain opacity-90"
              />
            </span>

            <span className="text-sm font-medium text-[var(--balto-action)]">
              {badge}
            </span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-[var(--balto-midnight)] sm:text-5xl lg:text-6xl">
            {titulo}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--balto-muted)] sm:text-lg">
            {subtitulo}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={ctaPrimarioLink}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--balto-action)] px-5 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(0,85,187,0.22)] transition hover:-translate-y-0.5 hover:opacity-95"
            >
              {ctaPrimarioTexto}
              <ArrowRight size={16} />
            </a>

            <a
              href={ctaSecundarioLink}
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--balto-border)] bg-white/80 px-5 py-3.5 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:bg-white"
            >
              {ctaSecundarioTexto}
            </a>
          </div>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-5 text-center shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur-md transition hover:-translate-y-1"
            >
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 -bottom-7 h-20 w-20 object-contain opacity-[0.035] transition duration-300 group-hover:opacity-[0.06]"
              />

              <div className="relative mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--balto-action)]/10 text-[var(--balto-action)]">
                <Icon size={19} strokeWidth={2.1} />
              </div>

              <p className="relative text-sm font-medium leading-6 text-slate-700">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
