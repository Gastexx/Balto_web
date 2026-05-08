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
    <section id="features" className="relative isolate overflow-hidden bg-white py-20 sm:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f7f9fc] to-white" />
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[rgba(0,85,187,0.06)] blur-[125px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[rgba(10,37,64,0.05)] blur-[120px]" />
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="absolute -left-16 bottom-8 hidden h-72 w-72 object-contain opacity-[0.022] lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-[0_10px_30px_rgba(10,37,64,0.06)]">
            <img
              src={logoMark}
              alt=""
              aria-hidden="true"
              className="h-4 w-4 object-contain opacity-80"
            />

            <span className="text-sm font-medium text-[var(--balto-action)]">
              Beneficios
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[var(--balto-midnight)] sm:text-5xl">
            Diseñado para que trabajar sea más simple.
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--balto-muted)] sm:text-lg">
            Una interfaz prolija, rápida y preparada para crecer con tu operación
            sin complicar tu día a día.
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
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-[30px] border border-slate-200/75 bg-white p-6 shadow-[0_18px_55px_rgba(10,37,64,0.07)] transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(0,85,187,0.22)] hover:shadow-[0_24px_70px_rgba(10,37,64,0.12)]"
            >
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,85,187,0.40)] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-9 -bottom-11 h-32 w-32 object-contain opacity-[0.022] transition duration-300 group-hover:opacity-[0.06]"
              />

              <div className="relative inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[rgba(0,85,187,0.08)] p-3 text-[var(--balto-action)] ring-1 ring-[rgba(0,85,187,0.10)] transition duration-300 group-hover:scale-105 group-hover:bg-[var(--balto-action)] group-hover:text-white">
                <Icon size={23} strokeWidth={2.05} />
              </div>

              <h3 className="relative mt-6 text-lg font-semibold tracking-[-0.02em] text-[var(--balto-midnight)]">
                {title}
              </h3>

              <p className="relative mt-3 text-sm leading-6 text-[var(--balto-muted)]">
                {text}
              </p>

              <div className="relative mt-auto pt-6">
                <span className="inline-flex h-1.5 w-10 rounded-full bg-[rgba(0,85,187,0.25)] transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--balto-action)]" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
