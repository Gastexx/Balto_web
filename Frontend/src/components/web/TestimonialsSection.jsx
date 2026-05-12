import { motion } from "framer-motion";
import { MessageSquareQuote, Star, Quote } from "lucide-react";
import logoMark from "../../imagenes/balto.png";

const BADGE = "Opiniones";
const TITLE = "Equipos que ya trabajan con más claridad.";
const DESCRIPTION =
  "Una propuesta pensada para simplificar la operación real, no para sumar complejidad.";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Laura Gómez",
    role: "Contadora",
    quote:
      "Balto nos permitió ordenar la operación de varios clientes desde un único lugar. La curva de aprendizaje es casi nula.",
  },
  {
    id: 2,
    name: "Martín Ríos",
    role: "Dueño de PyME",
    quote:
      "Antes perdíamos horas buscando datos entre planillas. Ahora todo está en un sistema y los reportes salen solos.",
  },
  {
    id: 3,
    name: "Sofía Herrera",
    role: "Administradora",
    quote:
      "Lo que más valoro es la claridad de la interfaz. Cualquier persona del equipo puede usarlo sin capacitación especial.",
  },
];

function normalizeTestimonial(item, index = 0) {
  return {
    id: item?.id ?? index,
    name: item?.nombre ?? item?.name ?? "Cliente",
    role: item?.rol ?? item?.cargo ?? item?.role ?? "Usuario",
    quote:
      item?.cita ??
      item?.texto ??
      item?.quote ??
      item?.descripcion ??
      "Testimonio no disponible.",
  };
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

function getInitials(name = "C") {
  return String(name)
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}

function StarsRow() {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4 fill-[var(--balto-action)] text-[var(--balto-action)]"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials = TESTIMONIALS, config = {} }) {
  const sourceTestimonials =
    Array.isArray(testimonials) && testimonials.length > 0
      ? testimonials
      : TESTIMONIALS;

  const normalizedTestimonials = Array.isArray(sourceTestimonials)
    ? sourceTestimonials.map((item, index) => normalizeTestimonial(item, index))
    : [];

  const badge = config?.testimonials_badge?.valor || BADGE;
  const title = config?.testimonials_title?.valor || TITLE;
  const description = config?.testimonials_description?.valor || DESCRIPTION;

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-[#ffffff] py-20 sm:py-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#eef4fb] to-transparent" />
        <div className="absolute right-[-5rem] top-24 h-80 w-80 rounded-full bg-[rgba(0,85,187,0.20)] blur-[120px]" />
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="absolute -right-16 top-10 hidden h-72 w-72 object-contain opacity-[0.14] saturate-150 lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--balto-action)] to-transparent opacity-100" />
            <span className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[var(--balto-action)] sm:text-sm">
              {badge}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[var(--balto-midnight)] sm:text-5xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {normalizedTestimonials.length > 0 ? (
            normalizedTestimonials.map((item) => (
              <motion.article
                key={item.id}
                variants={fadeUp}
                className="group relative flex h-full flex-col overflow-hidden rounded-[30px] border border-[rgba(10,37,64,0.16)] bg-[#fbfdff] p-7 shadow-[0_22px_68px_rgba(10,37,64,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(0,85,187,0.46)] hover:shadow-[0_28px_82px_rgba(10,37,64,0.20)]"
              >
                <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,85,187,0.60)] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />


                <div className="relative mb-5 flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,85,187,0.20)] text-[var(--balto-action)] ring-1 ring-[rgba(0,85,187,0.22)]">
                    <Quote className="h-5 w-5" />
                  </div>

                  <StarsRow />
                </div>

                <p className="relative flex-1 text-[15px] leading-7 text-slate-700 sm:text-base">
                  “{item.quote}”
                </p>

                <div className="relative mt-6 flex items-center gap-4 border-t border-slate-200 pt-5">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--balto-midnight)] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(10,37,64,0.18)]">
                    <img
                      src={logoMark}
                      alt=""
                      aria-hidden="true"
                      className="absolute h-8 w-8 object-contain opacity-[0.28]"
                    />
                    <span className="relative">{getInitials(item.name)}</span>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[var(--balto-midnight)]">
                      {item.name}
                    </p>
                    <p className="truncate text-sm text-slate-600">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="relative overflow-hidden rounded-[30px] border border-dashed border-slate-400 bg-[#fbfdff] px-6 py-12 text-center shadow-[0_22px_68px_rgba(10,37,64,0.12)] backdrop-blur-xl">
                <img
                  src={logoMark}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -bottom-10 h-32 w-32 object-contain opacity-[0.14] saturate-150"
                />

                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,85,187,0.20)] text-[var(--balto-action)] ring-1 ring-[rgba(0,85,187,0.22)]">
                  <MessageSquareQuote className="h-6 w-6" />
                </div>

                <h3 className="relative mt-4 text-lg font-semibold text-[var(--balto-midnight)]">
                  Aún no hay testimonios cargados
                </h3>

                <p className="relative mt-2 text-base text-slate-700">
                  Todavía no hay testimonios disponibles para mostrar en esta
                  sección.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
