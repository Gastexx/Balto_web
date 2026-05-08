import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, Star } from "lucide-react";
import logoWhite from "../../imagenes/balto.png";

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
      className="relative isolate overflow-hidden bg-[#04070d] py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,85,187,0.18),transparent_32%),radial-gradient(circle_at_bottom,rgba(0,85,187,0.10),transparent_34%)]" />
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(0,85,187,0.14)] blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[rgba(0,85,187,0.10)] blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-60 w-60 rounded-full bg-[rgba(255,255,255,0.04)] blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.30)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.30)_1px,transparent_1px)] [background-size:44px_44px]" />
        <img
          src={logoWhite}
          alt=""
          aria-hidden="true"
          className="absolute -right-20 top-16 hidden h-96 w-96 object-contain opacity-[0.025] lg:block"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
              <img
                src={logoWhite}
                alt=""
                aria-hidden="true"
                className="h-3.5 w-3.5 object-contain opacity-90"
              />
            </span>
            <Sparkles size={14} className="text-[var(--balto-action)]" />
            {badge}
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/[0.65] sm:text-base">
            {description}
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-7 lg:grid-cols-3"
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
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border p-7 transition duration-300 hover:-translate-y-2 sm:p-8 ${
                    featured
                      ? "border-[rgba(0,85,187,0.52)] bg-[linear-gradient(180deg,rgba(0,85,187,0.28),rgba(7,18,36,0.96)_45%,rgba(3,8,18,1))] shadow-[0_0_0_1px_rgba(0,85,187,0.14),0_34px_90px_rgba(0,85,187,0.24)]"
                      : "border-white/10 bg-white/[0.045] shadow-[0_22px_66px_rgba(0,0,0,0.34)] backdrop-blur-xl hover:bg-white/[0.065]"
                  }`}
                >
                  <img
                    src={logoWhite}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 object-contain opacity-[0.02] transition duration-300 group-hover:opacity-[0.045]"
                  />

                  {featured && (
                    <>
                      <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-[rgba(0,85,187,0.24)] blur-3xl" />
                      <div className="absolute left-1/2 top-4 -translate-x-1/2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                          <Star size={12} className="fill-white" />
                          Recomendado
                        </span>
                      </div>
                    </>
                  )}

                  <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(180deg,rgba(255,255,255,0.09),transparent_24%,transparent_78%,rgba(255,255,255,0.03))]" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className={featured ? "pt-7" : ""}>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
                          featured
                            ? "bg-white/10 text-white"
                            : "bg-white/[0.06] text-white/70 ring-1 ring-white/10"
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

                    <div className="mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                      {plan.price ? (
                        <>
                          <div className="flex flex-wrap items-end gap-2">
                            <span className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                              {plan.currency}
                              {plan.price}
                            </span>

                            <span className="pb-1.5 text-sm text-white/60">
                              {plan.period}
                            </span>
                          </div>

                          <p className="mt-3 text-sm text-white/[0.45]">
                            Facturación mensual.
                          </p>
                        </>
                      ) : (
                        <div className="text-sm text-white/60">
                          Consultar precio
                        </div>
                      )}
                    </div>

                    <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

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
                                className="flex items-start gap-3"
                              >
                                <span
                                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                    featured
                                      ? "border-white/[0.15] bg-white/10 text-white"
                                      : "border-[rgba(0,85,187,0.32)] bg-[rgba(0,85,187,0.12)] text-[var(--balto-action)]"
                                  }`}
                                >
                                  <Icon size={13} strokeWidth={2.4} />
                                </span>

                                <span className="text-sm leading-6 text-white/[0.78]">
                                  {feature}
                                </span>
                              </li>
                            );
                          })
                        ) : (
                          <li className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgba(0,85,187,0.32)] bg-[rgba(0,85,187,0.12)] text-[var(--balto-action)]">
                              <Check size={13} strokeWidth={2.4} />
                            </span>

                            <span className="text-sm leading-6 text-white/[0.78]">
                              Consultá las funcionalidades incluidas.
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>

                    <a
                      href="#contacto"
                      className={`mt-9 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium transition duration-300 ${
                        featured
                          ? "bg-white text-[#071224] shadow-[0_12px_34px_rgba(255,255,255,0.16)] hover:-translate-y-0.5 hover:opacity-90"
                          : "border border-white/10 bg-white/5 text-white hover:-translate-y-0.5 hover:bg-white/10"
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
            <div className="col-span-full rounded-[30px] border border-white/10 bg-white/[0.045] p-10 text-center text-sm text-white/60 shadow-[0_22px_66px_rgba(0,0,0,0.34)] backdrop-blur-xl">
              No hay planes disponibles.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
