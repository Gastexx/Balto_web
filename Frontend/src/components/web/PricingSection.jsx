import { motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";

const WHATSAPP_NUMBER = "5493564672341";

function getWhatsAppPlanLink(planName = "") {
  const planText = planName ? ` Quería consultar por el plan ${planName}.` : "";
  const message = encodeURIComponent(
    `Hola, vengo desde el sitio web de Balto.${planText} Me interesa conocer más sobre el sistema y sus planes. ¿Podrían brindarme más información?`
  );

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

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
          return pick(item, ["texto", "titulo", "nombre", "descripcion"], "").trim();
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
    period: pick(plan, ["periodo", "period", "frecuencia", "billing_period"], "/mes"),
    currency: pick(plan, ["moneda", "currency", "simbolo_moneda"], "$"),
    description: pick(plan, ["descripcion", "description", "texto"], ""),
    features: toFeatureArray(plan?.incluye),
    featured: Boolean(
      Number(pick(plan, ["destacado", "featured", "recomendado", "recommended"], 0))
    ),
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

  const badge = config?.pricing_badge?.valor ?? config?.pricing_badge ?? "Planes";

  const title =
    config?.pricing_title?.valor ??
    config?.pricing_title ??
    "Elegí el plan ideal para tu negocio";

  const description =
    config?.pricing_description?.valor ??
    config?.pricing_description ??
    "Opciones pensadas para acompañar desde los primeros pasos hasta operaciones más exigentes.";

  const plansGridClass =
    normalizedPlans.length === 1
      ? "mx-auto max-w-md grid-cols-1"
      : normalizedPlans.length === 2
      ? "mx-auto max-w-5xl grid-cols-1 md:grid-cols-2"
      : "lg:grid-cols-3";

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-[#04070d] py-24 text-[var(--balto-midnight)] sm:py-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,85,187,0.18),transparent_32%),radial-gradient(circle_at_bottom,rgba(0,85,187,0.10),transparent_34%)]" />
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(0,85,187,0.14)] blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[rgba(0,85,187,0.10)] blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-60 w-60 rounded-full bg-[rgba(255,255,255,0.04)] blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.30)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.30)_1px,transparent_1px)] [background-size:44px_44px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--balto-action)] to-transparent opacity-90" />

            <span className="text-[13px] font-semibold uppercase tracking-[0.32em] text-[var(--balto-action)] sm:text-sm">
              {badge}
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-5 text-[15px] leading-7 text-white/[0.65] sm:text-base">
            {description}
          </p>
        </motion.div>

        <motion.div
          className={`mt-16 grid gap-20 ${plansGridClass}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {normalizedPlans.length > 0 ? (
            normalizedPlans.map((plan, index) => {
              const featured =
                plan.featured || index === 1 || /pro|premium|empresa/i.test(plan.name);

              return (
                <motion.article
                  key={plan.id ?? plan.name}
                  variants={fadeUp}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border p-7 transition duration-300 hover:-translate-y-2 sm:p-8 ${
                    featured
                      ? "z-10 border-2 border-[rgba(0,85,187,0.78)] bg-[#f8fbff] shadow-[0_34px_96px_rgba(0,85,187,0.30),0_0_0_9px_rgba(0,85,187,0.075)] ring-1 ring-white/90"
                      : "border-[rgba(10,37,64,0.16)] bg-[#fbfdff] shadow-[0_24px_72px_rgba(10,37,64,0.15)] hover:border-[rgba(0,85,187,0.44)] hover:shadow-[0_30px_88px_rgba(10,37,64,0.20)]"
                  }`}
                >
                  {featured && (
                    <>
                      <div className="pointer-events-none absolute inset-0 z-0 rounded-[32px] bg-[linear-gradient(135deg,rgba(0,85,187,0.86),rgba(255,255,255,0)_34%,rgba(0,85,187,0.48))]" />
                      <div className="pointer-events-none absolute inset-[1.5px] z-[1] rounded-[30px] bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_100%)]" />
                      <div className="absolute inset-x-10 top-0 z-[4] h-[3px] rounded-b-full bg-[var(--balto-action)]" />
                      <div className="absolute left-0 top-10 z-[4] h-36 w-2 rounded-r-full bg-[var(--balto-action)] shadow-[0_12px_26px_rgba(0,85,187,0.30)]" />
                      <div className="pointer-events-none absolute -right-14 -top-14 z-[2] h-40 w-40 rounded-full bg-[rgba(0,85,187,0.13)] blur-2xl" />
                      <div className="pointer-events-none absolute -bottom-16 left-8 z-[2] h-36 w-36 rounded-full bg-[rgba(0,85,187,0.08)] blur-2xl" />

                      <div className="absolute right-6 top-6 z-20">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,85,187,0.22)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-[var(--balto-action)] shadow-[0_14px_30px_rgba(10,37,64,0.16)] backdrop-blur">
                          <Star size={13} className="fill-[var(--balto-action)]" />
                          Recomendado
                        </span>
                      </div>
                    </>
                  )}

                  <div
                    className={`pointer-events-none absolute inset-0 rounded-[32px] ${
                      featured
                        ? "z-[2] bg-[linear-gradient(180deg,rgba(0,85,187,0.045),transparent_34%,transparent_76%,rgba(0,85,187,0.05))]"
                        : "bg-[linear-gradient(180deg,rgba(255,255,255,0.92),transparent_28%,transparent_76%,rgba(0,85,187,0.07))]"
                    }`}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="min-h-[174px] sm:min-h-[186px]">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
                          featured
                            ? "bg-[rgba(0,85,187,0.18)] text-[var(--balto-action)] ring-1 ring-[rgba(0,85,187,0.30)]"
                            : "bg-slate-100 text-slate-700 ring-1 ring-slate-300/90"
                        }`}
                      >
                        Plan {index + 1}
                      </span>

                      <h3
                        className={`mt-5 font-semibold tracking-tight text-[var(--balto-midnight)] ${
                          featured ? "text-3xl" : "text-2xl"
                        }`}
                      >
                        {plan.name}
                      </h3>

                      <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-700">
                        {plan.description ||
                          "Solución preparada para mejorar tu operación diaria."}
                      </p>
                    </div>

                    <div
                      className={`mt-0 rounded-[24px] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${
                        featured
                          ? "border-[rgba(0,85,187,0.38)] bg-[linear-gradient(180deg,#ffffff_0%,#eef6ff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_18px_38px_rgba(0,85,187,0.14)]"
                          : "border-[rgba(0,85,187,0.24)] bg-[rgba(0,85,187,0.10)]"
                      }`}
                    >
                      {plan.price ? (
                        <>
                          <div className="flex flex-wrap items-end gap-2">
                            <span className="text-4xl font-semibold tracking-tight text-[var(--balto-midnight)] sm:text-5xl">
                              {plan.currency}
                              {plan.price}
                            </span>

                            <span className="pb-1.5 text-sm text-slate-700">
                              {plan.period}
                            </span>
                          </div>

                          <p className="mt-3 text-sm text-slate-700">
                            Facturación mensual.
                          </p>
                        </>
                      ) : (
                        <div className="text-sm text-slate-600">
                          Consultar precio
                        </div>
                      )}
                    </div>

                    <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-[rgba(10,37,64,0.26)] to-transparent" />

                    <div className="mt-7 flex-1">
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
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
                                      ? "border-[rgba(0,85,187,0.34)] bg-[var(--balto-action)] text-white"
                                      : "border-[rgba(0,85,187,0.34)] bg-[rgba(0,85,187,0.18)] text-[var(--balto-action)]"
                                  }`}
                                >
                                  <Icon size={13} strokeWidth={2.4} />
                                </span>

                                <span className="text-sm leading-6 text-slate-700">
                                  {feature}
                                </span>
                              </li>
                            );
                          })
                        ) : (
                          <li className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgba(0,85,187,0.38)] bg-[rgba(0,85,187,0.16)] text-[var(--balto-action)]">
                              <Check size={13} strokeWidth={2.4} />
                            </span>

                            <span className="text-sm leading-6 text-slate-700">
                              Consultá las funcionalidades incluidas.
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>

                    <a
                      href={getWhatsAppPlanLink(plan.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Consultar por WhatsApp el plan ${plan.name}`}
                      className={`mt-9 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium transition duration-300 ${
                        featured
                          ? "bg-[var(--balto-action)] text-white shadow-[0_18px_40px_rgba(0,85,187,0.28)] hover:-translate-y-0.5 hover:bg-[var(--balto-midnight)]"
                          : "border border-[rgba(0,85,187,0.34)] bg-white text-[var(--balto-action)] shadow-[0_14px_34px_rgba(10,37,64,0.14)] hover:-translate-y-0.5 hover:border-[var(--balto-action)] hover:bg-[var(--balto-action)] hover:text-white"
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
            <div className="col-span-full rounded-[30px] border border-[rgba(10,37,64,0.16)] bg-white p-10 text-center text-sm text-slate-700 shadow-[0_24px_72px_rgba(10,37,64,0.14)]">
              No hay planes disponibles.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}