import { motion } from "framer-motion";
import logoMark from "../../imagenes/balto.png";

const BADGE = "Gestión inteligente";
const TITLE = "Menos tareas repetitivas, más control para tu negocio.";
const DESCRIPTION =
  "Balto centraliza tu información comercial y administrativa para que puedas trabajar con datos claros, procesos ordenados y decisiones más simples.";

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function TestimonialsSection({ config = {} }) {
  const badge = getValue(config?.testimonials_badge, BADGE);
  const title = getValue(config?.testimonials_title, TITLE);
  const description = getValue(config?.testimonials_description, DESCRIPTION);

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-white py-14 sm:py-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#eef4fb] to-transparent" />
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="absolute -right-10 top-8 hidden h-52 w-52 object-contain opacity-[0.10] saturate-150 lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--balto-action)] to-transparent" />
            <span className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[var(--balto-action)] sm:text-sm">
              {badge}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[var(--balto-midnight)] sm:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}