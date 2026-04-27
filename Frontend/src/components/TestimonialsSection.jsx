import { motion } from "framer-motion";
import { MessageSquareQuote, Star, Quote } from "lucide-react";

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

/* ANIMACIONES */
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

export function TestimonialsSection({ testimonials = [], config = {} }) {
  const normalizedTestimonials = Array.isArray(testimonials)
    ? testimonials.map((item, index) => normalizeTestimonial(item, index))
    : [];

  const badge = config?.testimonials_badge?.valor || "Opiniones";
  const title =
    config?.testimonials_title?.valor ||
    "Equipos que ya trabajan con más claridad.";
  const description =
    config?.testimonials_description?.valor ||
    "Una propuesta pensada para simplificar la operación real, no para sumar complejidad.";

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--balto-border)] bg-white px-4 py-2 shadow-sm">
            <MessageSquareQuote className="h-4 w-4 text-[var(--balto-action)]" />
            <span className="text-sm font-medium text-[var(--balto-action)]">
              {badge}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--balto-midnight)] sm:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--balto-muted)] sm:text-lg">
            {description}
          </p>
        </motion.div>

        {/* CARDS */}
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
                className="group relative flex h-full flex-col rounded-3xl border border-[var(--balto-border)] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* ICONO DECORATIVO */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--balto-action)]/10">
                    <Quote className="h-5 w-5 text-[var(--balto-action)]" />
                  </div>

                  <StarsRow />
                </div>

                {/* TEXTO */}
                <p className="flex-1 text-[15px] leading-7 text-slate-700 sm:text-base">
                  “{item.quote}”
                </p>

                {/* FOOTER */}
                <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--balto-midnight)] text-sm font-semibold text-white shadow-sm">
                    {getInitials(item.name)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[var(--balto-midnight)]">
                      {item.name}
                    </p>
                    <p className="truncate text-sm text-[var(--balto-muted)]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="rounded-3xl border border-dashed border-[var(--balto-border)] bg-white px-6 py-12 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--balto-action)]/10">
                  <MessageSquareQuote className="h-6 w-6 text-[var(--balto-action)]" />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-[var(--balto-midnight)]">
                  Aún no hay testimonios cargados
                </h3>

                <p className="mt-2 text-base text-[var(--balto-muted)]">
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