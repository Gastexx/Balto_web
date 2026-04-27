import { motion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";

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

export function HeroSection({ config, heroMedia }) {
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

  const panelTitulo = getValue(
    config?.hero_panel_titulo ?? config?.panel_titulo,
    "Panel general"
  );

  const panelSubtitulo = getValue(
    config?.hero_panel_subtitulo ?? config?.panel_subtitulo,
    "Resumen operativo del negocio"
  );

  const panelEstado = getValue(
    config?.hero_panel_estado ?? config?.panel_estado,
    "Sistema activo"
  );

  const beneficiosTitulo = getValue(
    config?.hero_beneficios_titulo ?? config?.beneficios_titulo,
    "Lo que resolvés con Balto"
  );

  const stats = [
    {
      label: getValue(config?.hero_stat_1_label, "Ventas del mes"),
      value: getValue(config?.hero_stat_1_value, "$ 3.480.000"),
    },
    {
      label: getValue(config?.hero_stat_2_label, "Compras cargadas"),
      value: getValue(config?.hero_stat_2_value, "124"),
    },
    {
      label: getValue(config?.hero_stat_3_label, "Clientes activos"),
      value: getValue(config?.hero_stat_3_value, "86"),
    },
    {
      label: getValue(config?.hero_stat_4_label, "Reportes emitidos"),
      value: getValue(config?.hero_stat_4_value, "18"),
    },
  ];

  const beneficios = [
    getValue(
      config?.hero_beneficio_1,
      "Seguimiento claro de movimientos, ventas y compras."
    ),
    getValue(
      config?.hero_beneficio_2,
      "Menos tiempo en tareas repetitivas y más control operativo."
    ),
    getValue(
      config?.hero_beneficio_3,
      "Información lista para tomar decisiones con rapidez."
    ),
  ].filter(Boolean);

  const highlights = [
    { icon: BadgeCheck, text: "Implementación simple" },
    { icon: BarChart3, text: "Reportes en tiempo real" },
    { icon: ShieldCheck, text: "Datos organizados y seguros" },
  ];

  const mediaUrl =
    getValue(heroMedia?.url) ||
    getValue(heroMedia?.image_url) ||
    getValue(heroMedia?.archivo) ||
    null;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#f7f9fc] py-20 sm:py-24"
    >
      {/* FONDO SUAVE */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(10,37,64,0.05),transparent_34%)]" />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[var(--balto-action)]/8 blur-[120px]" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-slate-300/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#0A2540_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        {/* COLUMNA IZQUIERDA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative"
        >


          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[var(--balto-midnight)] sm:text-5xl lg:text-6xl">
            {titulo}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--balto-muted)] sm:text-lg">
            {subtitulo}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
                className="group rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.06)] backdrop-blur-md transition hover:-translate-y-1"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--balto-action)]/10 text-[var(--balto-action)]">
                  <Icon size={18} strokeWidth={2.1} />
                </div>

                <p className="text-sm font-medium leading-6 text-slate-700">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* COLUMNA DERECHA */}
        <motion.div
          initial={{ opacity: 0, y: 46 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          {/* GLOW SUAVE */}
          <div className="pointer-events-none absolute inset-x-10 top-8 h-24 rounded-full bg-[var(--balto-action)]/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[32px] border border-[var(--balto-border)]/70 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-4 shadow-[0_30px_80px_rgba(10,37,64,0.10)]">
            <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-[var(--balto-midnight)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {/* TOP BAR */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {panelTitulo}
                  </p>
                  <p className="text-xs text-white/55">{panelSubtitulo}</p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {panelEstado}
                </span>
              </div>

{/* PREVIEW (preparado para video futuro) */}
<div className="relative h-72 w-full overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">

  {/* placeholder sutil (no negro) */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-[11px] uppercase tracking-[0.2em] text-white/25">
      Preview sistema
    </div>
  </div>

  {/* glow suave */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(0,85,187,0.15),transparent_70%)] opacity-30" />

</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}