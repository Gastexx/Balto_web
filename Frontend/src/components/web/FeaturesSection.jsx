import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ReceiptText,
  Users,
  FileBarChart2,
} from "lucide-react";
import logoMark from "../../imagenes/balto.png";

const FEATURES = [
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="absolute -left-16 bottom-0 hidden h-72 w-72 object-contain opacity-[0.025] lg:block"
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--balto-border)] bg-white px-4 py-2 shadow-sm">
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
          {FEATURES.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={`${title}-${index}`}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-[var(--balto-border)] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -bottom-10 h-28 w-28 object-contain opacity-[0.025] transition duration-300 group-hover:opacity-[0.055]"
              />

              <div className="relative inline-flex rounded-2xl bg-[var(--balto-soft)] p-3 text-[var(--balto-action)]">
                <Icon size={22} />
              </div>

              <h3 className="relative mt-5 text-lg font-semibold text-[var(--balto-midnight)]">
                {title}
              </h3>

              <p className="relative mt-3 text-sm leading-6 text-[var(--balto-muted)]">
                {text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
