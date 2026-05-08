import { motion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import logoMark from "../../imagenes/balto.png";

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
      className="relative isolate overflow-hidden bg-[#f7f9fc] pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.10),transparent_33%),radial-gradient(circle_at_bottom_right,rgba(10,37,64,0.07),transparent_34%)]" />
        <div className="absolute left-[-6rem] top-0 h-96 w-96 rounded-full bg-[rgba(0,85,187,0.10)] blur-[130px]" />
        <div className="absolute right-[-4rem] top-28 h-80 w-80 rounded-full bg-[rgba(10,37,64,0.08)] blur-[125px]" />
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(10,37,64,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(10,37,64,0.55)_1px,transparent_1px)] [background-size:44px_44px]" />
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-28 hidden h-[420px] w-[420px] -translate-x-1/2 object-contain opacity-[0.022] lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/[0.82] px-3 py-2 shadow-[0_10px_30px_rgba(10,37,64,0.07)] backdrop-blur-xl sm:px-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--balto-midnight)] shadow-sm">
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 object-contain opacity-95"
              />
            </span>

            <span className="text-sm font-medium text-[var(--balto-action)]">
              {badge}
            </span>
          </div>

          <h1 className="mx-auto mt-7 max-w-5xl text-4xl font-semibold tracking-[-0.045em] text-[var(--balto-midnight)] sm:text-5xl lg:text-7xl">
            {titulo}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--balto-muted)] sm:text-lg">
            {subtitulo}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={ctaPrimarioLink}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--balto-action)] px-5 py-3.5 text-sm font-medium text-white shadow-[0_18px_44px_rgba(0,85,187,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,85,187,0.32)]"
            >
              {ctaPrimarioTexto}
              <ArrowRight size={16} className="transition duration-300 group-hover:translate-x-0.5" />
            </a>

            <a
              href={ctaSecundarioLink}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white/[0.82] px-5 py-3.5 text-sm font-medium text-slate-700 shadow-[0_12px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--balto-midnight)]"
            >
              {ctaSecundarioTexto}
            </a>
          </div>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-3">
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
              className="group relative overflow-hidden rounded-[26px] border border-white/80 bg-white/[0.76] p-5 text-center shadow-[0_16px_42px_rgba(15,23,42,0.07)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,85,187,0.35)] to-transparent" />
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-9 -right-8 h-28 w-28 object-contain opacity-[0.025] transition duration-300 group-hover:opacity-[0.055]"
              />

              <div className="relative mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,85,187,0.09)] text-[var(--balto-action)] ring-1 ring-[rgba(0,85,187,0.08)] transition duration-300 group-hover:scale-105">
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
