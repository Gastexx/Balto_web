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
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="text-sm font-medium text-[var(--balto-action)]">
            Beneficios
          </span>

          <h2 className="mt-3 text-3xl font-semibold text-[var(--balto-midnight)] sm:text-4xl">
            Diseñado para que trabajar sea más simple.
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--balto-muted)]">
            Una interfaz prolija, rápida y preparada para crecer con tu operación
            sin complicar tu día a día.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={`${title}-${index}`}
              variants={fadeUp}
              className="rounded-3xl border border-[var(--balto-border)] bg-white p-6 shadow-sm"
            >
              <div className="inline-flex rounded-2xl bg-[var(--balto-soft)] p-3 text-[var(--balto-action)]">
                <Icon size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[var(--balto-midnight)]">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[var(--balto-muted)]">
                {text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}