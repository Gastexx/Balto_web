import { motion } from "framer-motion";
import {
  FileBarChart2,
  LayoutDashboard,
  ReceiptText,
  Users,
  ShieldCheck,
  BarChart3,
  Briefcase,
  Wallet,
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

function resolveIcon(iconName, index = 0) {
  const icons = {
    LayoutDashboard,
    ReceiptText,
    Users,
    FileBarChart2,
    ShieldCheck,
    BarChart3,
    Briefcase,
    Wallet,
  };

  if (iconName && icons[iconName]) return icons[iconName];

  const fallbackIcons = [
    LayoutDashboard,
    ReceiptText,
    Users,
    FileBarChart2,
  ];

  return fallbackIcons[index % fallbackIcons.length];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function FeaturesSection({ features }) {
  const fallbackFeatures = [
    {
      icon: LayoutDashboard,
      title: "Panel simple y claro",
      text: "Accedé a la información más importante sin perder tiempo entre pantallas innecesarias.",
    },
    {
      icon: ReceiptText,
      title: "Ventas y compras ordenadas",
      text: "Registrá movimientos con reglas claras y mantené una estructura coherente en todo el sistema.",
    },
    {
      icon: Users,
      title: "Clientes y proveedores",
      text: "Centralizá relaciones comerciales y encontrá rápido cada dato cuando lo necesitás.",
    },
    {
      icon: FileBarChart2,
      title: "Reportes útiles",
      text: "Visualizá resultados, seguimiento mensual y datos clave para tomar decisiones con respaldo.",
    },
  ];

  const items =
    Array.isArray(features) && features.length > 0
      ? features.map((item, index) => ({
          icon: resolveIcon(
            getValue(item?.icono || item?.icon || item?.icon_name, ""),
            index
          ),
          title: getValue(item?.titulo || item?.title, `Beneficio ${index + 1}`),
          text: getValue(item?.texto, "Descripción no disponible."),
        }))
      : fallbackFeatures;

  return (
    <section id="features" className="relative isolate overflow-hidden bg-[#ffffff] py-20 sm:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#eef4fb] to-transparent" />
        <div className="absolute right-[-5rem] top-24 h-80 w-80 rounded-full bg-[rgba(0,85,187,0.20)] blur-[120px]" />
        <div className="absolute -left-28 bottom-0 h-80 w-80 rounded-full bg-[rgba(10,37,64,0.14)] blur-[120px]" />
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="absolute -left-16 bottom-8 hidden h-72 w-72 object-contain opacity-[0.14] saturate-150 lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto  text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--balto-action)] to-transparent opacity-100" />
            <span className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[var(--balto-action)] sm:text-sm">
              Beneficios
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[var(--balto-midnight)] sm:text-5xl">
            Diseñado para que trabajar sea más simple.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
            Tecnología simple, rápida y adaptable para impulsar el crecimiento de tu comercio.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={`${title}-${index}`}
              variants={fadeUp}
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[30px] border border-[rgba(10,37,64,0.16)] bg-[#fbfdff] p-6 shadow-[0_22px_68px_rgba(10,37,64,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(0,85,187,0.46)] hover:shadow-[0_28px_82px_rgba(10,37,64,0.20)]"
            >
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,85,187,0.62)] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-9 -bottom-11 h-32 w-32 object-contain opacity-[0.11] saturate-150 transition duration-300 group-hover:opacity-[0.20]"
              />

              <div className="relative inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[rgba(0,85,187,0.17)] p-3 text-[var(--balto-action)] ring-1 ring-[rgba(0,85,187,0.22)] transition duration-300 group-hover:scale-105 group-hover:bg-[var(--balto-action)] group-hover:text-white">
                <Icon size={23} strokeWidth={2.05} />
              </div>

              <h3 className="relative mt-6 text-lg font-semibold tracking-[-0.02em] text-[var(--balto-midnight)]">
                {title}
              </h3>

              <p className="relative mt-3 text-sm leading-6 text-slate-700">
                {text}
              </p>

              <div className="relative mt-auto pt-6">
                <span className="inline-flex h-1.5 w-10 rounded-full bg-[rgba(0,85,187,0.45)] transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--balto-action)]" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
