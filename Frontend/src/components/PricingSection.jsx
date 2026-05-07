import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, Star } from "lucide-react";
import logoWhite from "../assets/Balto_Blanco.png";

function pick(obj, keys, fallback = "") {
  if (!obj || typeof obj !== "object") return fallback;

  for (const key of keys) {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return fallback;
}

function toFeatureArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim();

        if (item && typeof item === "object") {
          return pick(
            item,
            ["texto", "titulo", "nombre", "descripcion"],
            ""
          ).trim();
        }

        return "";
      })
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizePrice(value) {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value === "number") return String(value);
  return String(value).trim();
}

function normalizePlan(plan, index = 0) {
  return {
    id: pick(plan, ["id", "id_plan"], index),
    name: pick(plan, ["nombre", "name", "titulo"], `Plan ${index + 1}`),
    order: Number(pick(plan, ["orden"], index + 1)),
    price: normalizePrice(
      pick(plan, ["precio", "price", "valor", "monto", "importe"], "")
    ),
    period: pick(
      plan,
      ["periodo", "period", "frecuencia", "billing_period"],
      "/mes"
    ),
    currency: pick(plan, ["moneda", "currency", "simbolo_moneda"], "$"),
    description: pick(plan, ["descripcion", "description", "texto"], ""),
    features: toFeatureArray(plan?.incluye),
  };
}

function getFeatureIcon() {
  return Check;
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
    y: 28,
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

export function PricingSection({ plans = [], config = {} }) {
  const normalizedPlans = Array.isArray(plans)
    ? plans
        .map((plan, index) => normalizePlan(plan, index))
        .sort((a, b) => a.order - b.order)
    : [];

  const badge =
    config?.pricing_badge?.valor ?? config?.pricing_badge ?? "Planes";

  const title =
    config?.pricing_title?.valor ??
    config?.pricing_title ??
    "Elegí el plan ideal para tu negocio";

  const description =
    config?.pricing_description?.valor ??
    config?.pricing_description ??
    "Opciones pensadas para acompañar desde los primeros pasos hasta operaciones más exigentes.";

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#04070d] py-24"
    >
      {/* FONDO CON CAPAS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,85,187,0.16),transparent_30%),radial-gradient(circle_at_bottom,rgba(0,85,187,0.10),transparent_30%)]" />
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--balto-action)]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[var(--balto-action)]/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-52 w-52 rounded-full bg-cyan-400/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />


      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ENCABEZADO */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--balto-action)]/25 bg-[var(--balto-action)]/10 px-4 py-1.5 text-sm font-medium text-[var(--balto-action)] backdrop-blur-md">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
              <img
                src={logoWhite}
                alt=""
                aria-hidden="true"
                className="h-3.5 w-3.5 object-contain opacity-90"
              />
            </span>
            <Sparkles size={14} />
            {badge}
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/65 sm:text-base">
            {description}
          </p>
        </motion.div>

        {/* TARJETAS */}
        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {normalizedPlans.length > 0 ? (
            normalizedPlans.map((plan, index) => {
              const featured =
                index === 1 || /pro|premium|empresa/i.test(plan.name);

              return (
                <motion.article
                  key={plan.id ?? plan.name}
                  variants={fadeUp}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[30px] border p-8 transition duration-300 hover:-translate-y-2 ${
                    featured
                      ? "border-[var(--balto-action)]/50 bg-gradient-to-b from-[rgba(0,85,187,0.28)] via-[rgba(7,18,36,0.96)] to-[rgba(3,8,18,1)] shadow-[0_0_0_1px_rgba(0,85,187,0.10),0_30px_80px_rgba(0,85,187,0.22)]"
                      : "border-white/10 bg-white/[0.045] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                  }`}
                >


                  {/* GLOW CENTRAL */}
                  {featured && (
                    <>
                      <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-[var(--balto-action)]/20 blur-3xl" />
                      <div className="pointer-events-none absolute -bottom-12 left-1/2 h-28 w-40 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

                      <div className="absolute left-1/2 top-4 -translate-x-1/2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                          <Star size={12} className="fill-white" />
                          Recomendado
                        </span>
                      </div>
                    </>
                  )}

                  {/* BRILLO DE BORDE */}
                  <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_22%,transparent_78%,rgba(255,255,255,0.03))]" />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
                            featured
                              ? "bg-white/10 text-white"
                              : "bg-[var(--balto-action)]/10 text-[var(--balto-action)]"
                          }`}
                        >

                          Plan {index + 1}
                        </span>

                        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                          {plan.name}
                        </h3>

                        <p className="mt-3 min-h-[48px] text-sm leading-6 text-white/60">
                          {plan.description || "Solución preparada para mejorar tu operación diaria."}
                        </p>
                      </div>
                    </div>

                    {/* PRECIO */}
                    <div
                      className={`mt-8 rounded-[24px] border p-5 ${
                        featured
                          ? "border-white/10 bg-black/20"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      {plan.price ? (
                        <>
                          <div className="flex items-end gap-2">
                            <span className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                              {plan.currency}
                              {plan.price}
                            </span>

                            <span className="pb-1.5 text-sm text-white/60">
                              {plan.period}
                            </span>
                          </div>

                          <p className="mt-3 text-sm text-white/45">
                            Facturación mensual.
                          </p>
                        </>
                      ) : (
                        <div className="text-sm text-white/60">
                          Consultar precio
                        </div>
                      )}
                    </div>

                    {/* DIVIDER */}
                    <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                    {/* FEATURES */}
                    <div className="mt-7 flex-1">
                      <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                        Incluye
                      </p>

                      <ul className="space-y-3.5">
                        {plan.features.length > 0 ? (
                          plan.features.map((feature, featureIndex) => {
                            const Icon = getFeatureIcon();

                            return (
                              <li
                                key={`${plan.name}-${featureIndex}`}
                                className="flex items-center gap-3"
                              >
                                <span
                                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                    featured
                                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                                      : "border-[var(--balto-action)]/20 bg-[var(--balto-action)]/10 text-[var(--balto-action)]"
                                  }`}
                                >
                                  <Icon size={13} strokeWidth={2.4} />
                                </span>

                                <span className="text-sm leading-6 text-white/78">
                                  {feature}
                                </span>
                              </li>
                            );
                          })
                        ) : (
                          <li className="flex items-center gap-3">
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--balto-action)]/20 bg-[var(--balto-action)]/10 text-[var(--balto-action)]">
                              <Check size={13} strokeWidth={2.4} />
                            </span>

                            <span className="text-sm leading-6 text-white/78">
                              Consultá las funcionalidades incluidas.
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* BOTON */}
                    <a
                      href="#contacto"
                      className={`mt-9 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium transition ${
                        featured
                          ? "bg-white text-[#071224] shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:opacity-90"
                          : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      Consultar plan
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </motion.article>
              );
            })
          ) : (
            <div className="col-span-full rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-white/60">
              No hay planes disponibles.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
