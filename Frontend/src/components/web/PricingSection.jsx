import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";
import { PLAN_SYSTEMS } from "./staticContent";

const WHATSAPP_NUMBER = "3564504131";

const DEFAULT_SYSTEM = PLAN_SYSTEMS[0].id;

function getSystemLabel(systemId) {
  return PLAN_SYSTEMS.find((system) => system.id === systemId)?.label ?? "";
}

function getWhatsAppPlanLink(planName = "", systemId = "") {
  const systemLabel = getSystemLabel(systemId);
  const planText = planName
    ? ` Quería consultar por el plan "${planName}"${systemLabel ? ` de ${systemLabel}` : ""}.`
    : "";
  const message = encodeURIComponent(
    `Hola, vengo desde el sitio web de Balto.${planText} Me interesa conocer más sobre el sistema y sus planes. ¿Podrían brindarme más información?`,
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
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

/**
 * Convierte el precio guardado ("95.000", "$95.000/mes", 95000, "95000,50")
 * al formato argentino ("95.000", "95.000,50"). Si el valor no es numérico
 * (p. ej. "A convenir") se devuelve tal cual con `numeric: false`.
 */
export function formatArgentinePrice(value) {
  if (value === undefined || value === null || value === "") {
    return { amount: "", numeric: false };
  }

  const raw = String(value).trim();
  const cleaned = raw
    .replace(/^\$\s*/, "")
    .replace(/\s*\/\s*mes$/i, "")
    .replace(/\s+/g, "");

  let normalized = null;

  if (/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(cleaned)) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else if (/^\d+(,\d{1,2})?$/.test(cleaned)) {
    normalized = cleaned.replace(",", ".");
  } else if (/^\d+\.\d{1,2}$/.test(cleaned)) {
    normalized = cleaned;
  }

  if (normalized === null || Number.isNaN(Number(normalized))) {
    return { amount: raw, numeric: false };
  }

  const [integerPart, decimalPart] = normalized.split(".");
  const integer = integerPart.replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const decimals = decimalPart && Number(decimalPart) > 0 ? `,${decimalPart.padEnd(2, "0")}` : "";

  return { amount: `${integer}${decimals}`, numeric: true };
}

/**
 * Categoría del plan. Usa el campo explícito `sistema` de la API; solo si
 * falta (datos anteriores a la migración) se deduce por el nombre.
 */
function resolvePlanSystem(plan) {
  const explicit = String(pick(plan, ["sistema", "system", "categoria"], ""))
    .trim()
    .toLowerCase();

  if (PLAN_SYSTEMS.some((system) => system.id === explicit)) return explicit;

  const name = String(pick(plan, ["nombre", "name", "titulo"], "")).toLowerCase();
  return name.includes("comercio") ? "comercio" : DEFAULT_SYSTEM;
}

function normalizePlan(plan, index = 0) {
  const price = formatArgentinePrice(
    pick(plan, ["precio", "price", "valor", "monto", "importe"], ""),
  );

  return {
    id: pick(plan, ["id", "id_plan"], `plan-${index}`),
    system: resolvePlanSystem(plan),
    name: pick(plan, ["nombre", "name", "titulo"], `Plan ${index + 1}`),
    order: Number(pick(plan, ["orden"], index + 1)) || index + 1,
    price: price.amount,
    priceIsNumeric: price.numeric,
    period: pick(plan, ["periodo", "period", "frecuencia", "billing_period"], "/mes"),
    currency: pick(plan, ["moneda", "currency", "simbolo_moneda"], "$"),
    description: String(pick(plan, ["descripcion", "description", "texto"], "")).trim(),
    note: String(pick(plan, ["nota", "note"], "")).trim(),
    features: toFeatureArray(plan?.incluye),
    // El destacado solo se activa si viene configurado explícitamente.
    featured: Boolean(
      Number(pick(plan, ["destacado", "featured", "recomendado", "recommended"], 0)),
    ),
  };
}

// Columnas según la cantidad de planes de la pestaña.
function getPlansGridClass(count) {
  if (count <= 1) return "mx-auto max-w-md grid-cols-1";
  if (count === 2) return "mx-auto max-w-5xl grid-cols-1 md:grid-cols-2";
  if (count === 3) return "mx-auto max-w-xl grid-cols-1 lg:max-w-none lg:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
}

// Cada tarjeta ocupa 4 filas del grid (encabezado, precio, incluye, botón) y
// las comparte con las tarjetas vecinas mediante subgrid: así los precios y
// los botones quedan alineados aunque los textos tengan distinto largo.
const CARD_SUBGRID = "row-span-4 grid gap-y-0 [grid-template-rows:subgrid]";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeOut",
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

// Iconos SVG livianos para las pestañas: sin dependencias ni imports adicionales.
function PlanSystemIcon({ systemId }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px] shrink-0"
    >
      {systemId === "servicios" ? (
        <>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
        </>
      ) : (
        <>
          <path d="M3 10 5 4h14l2 6v10H3V10Z" />
          <path d="M3 10h18M9 20v-7h6v7" />
        </>
      )}
    </svg>
  );
}

// Indicador informativo de las notas de los planes.
function PlanNoteIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[16px] w-[16px]"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlanSystemTabs({ activeSystem, onChange, idPrefix }) {
  const handleKeyDown = (event, index) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = PLAN_SYSTEMS[(index + direction + PLAN_SYSTEMS.length) % PLAN_SYSTEMS.length];

    onChange(next.id);
    document.getElementById(`${idPrefix}-tab-${next.id}`)?.focus();
  };

  return (
    <div className="mt-10 flex justify-center">
      <div
        role="tablist"
        aria-label="Sistemas BALTO"
        className="inline-flex max-w-full items-stretch gap-7 border-b border-white/15 sm:gap-12"
      >
        {PLAN_SYSTEMS.map((system, index) => {
          const isActive = system.id === activeSystem;

          return (
            <button
              key={system.id}
              id={`${idPrefix}-tab-${system.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(system.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`relative -mb-px inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap px-1 pb-3 pt-2 text-sm font-medium tracking-[0.01em] outline-none transition-colors duration-200 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--balto-action)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070d] sm:text-[15px] ${
                isActive ? "text-white" : "text-white/55 hover:text-white/85"
              }`}
            >
              <PlanSystemIcon systemId={system.id} />
              <span>{system.shortLabel}</span>
              {isActive && (
                <motion.span
                  layoutId={`${idPrefix}-indicator`}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[var(--balto-action)]"
                  transition={{ type: "spring", stiffness: 430, damping: 38 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlanCard({ plan, index }) {
  const { featured } = plan;

  return (
    <motion.article
      variants={fadeUp}
      className={`group relative ${CARD_SUBGRID} overflow-hidden rounded-[32px] border p-5 transition duration-300 hover:-translate-y-2 sm:p-6 ${
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
        </>
      )}

      <div
        className={`pointer-events-none absolute inset-0 rounded-[32px] ${
          featured
            ? "z-[2] bg-[linear-gradient(180deg,rgba(0,85,187,0.045),transparent_34%,transparent_76%,rgba(0,85,187,0.05))]"
            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.92),transparent_28%,transparent_76%,rgba(0,85,187,0.07))]"
        }`}
      />

      <div className={`relative z-10 ${CARD_SUBGRID}`}>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
                featured
                  ? "bg-[rgba(0,85,187,0.18)] text-[var(--balto-action)] ring-1 ring-[rgba(0,85,187,0.30)]"
                  : "bg-slate-100 text-slate-700 ring-1 ring-slate-300/90"
              }`}
            >
              Plan {index + 1}
            </span>

            {featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,85,187,0.22)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--balto-action)] shadow-[0_14px_30px_rgba(10,37,64,0.16)]">
                <Star size={12} className="fill-[var(--balto-action)]" />
                Recomendado
              </span>
            )}
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[var(--balto-midnight)]">
            {plan.name}
          </h3>

          {plan.description && (
            <p className="mt-3 text-sm leading-6 text-slate-700">{plan.description}</p>
          )}
        </div>

        <div
          className={`mt-6 rounded-[24px] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${
            featured
              ? "border-[rgba(0,85,187,0.38)] bg-[linear-gradient(180deg,#ffffff_0%,#eef6ff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_18px_38px_rgba(0,85,187,0.14)]"
              : "border-[rgba(0,85,187,0.24)] bg-[rgba(0,85,187,0.10)]"
          }`}
        >
          {plan.price ? (
            <>
              <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                <span className="text-4xl font-semibold tracking-tight text-[var(--balto-midnight)] sm:text-5xl">
                  {plan.priceIsNumeric ? plan.currency : ""}
                  {plan.price}
                </span>

                {plan.priceIsNumeric && (
                  <span className="pb-1.5 text-sm text-slate-700">{plan.period}</span>
                )}
              </div>

              <p className="mt-3 text-sm text-slate-700">Facturación mensual.</p>
            </>
          ) : (
            <div className="text-sm text-slate-600">Consultar precio</div>
          )}
        </div>

        <div>
          <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-[rgba(10,37,64,0.26)] to-transparent" />

          <div className="mt-7">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              Incluye
            </p>

            <ul className="space-y-3.5">
              {(plan.features.length > 0
                ? plan.features
                : ["Consultá las funcionalidades incluidas."]
              ).map((feature, featureIndex) => (
                <li key={`${plan.id}-${featureIndex}`} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      featured
                        ? "border-[rgba(0,85,187,0.34)] bg-[var(--balto-action)] text-white"
                        : "border-[rgba(0,85,187,0.34)] bg-[rgba(0,85,187,0.18)] text-[var(--balto-action)]"
                    }`}
                  >
                    <Check size={13} strokeWidth={2.4} />
                  </span>

                  <span className="text-sm leading-6 text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            {plan.note && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[var(--balto-midnight)] px-4 py-3.5 text-sm leading-6 text-white shadow-[0_14px_30px_rgba(10,37,64,0.18)]">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/90">
                  <PlanNoteIcon />
                </span>
                <span>{plan.note}</span>
              </div>
            )}
          </div>
        </div>

        <a
          href={getWhatsAppPlanLink(plan.name, plan.system)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por WhatsApp el plan ${plan.name}`}
          className={`mt-9 inline-flex w-full self-end items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium transition duration-300 ${
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
}

export function PricingSection({ plans = [], config = {} }) {
  const idPrefix = `pricing-${useId().replace(/:/g, "")}`;
  const [activeSystem, setActiveSystem] = useState(DEFAULT_SYSTEM);

  const plansBySystem = useMemo(() => {
    const grouped = Object.fromEntries(PLAN_SYSTEMS.map((system) => [system.id, []]));

    (Array.isArray(plans) ? plans : []).forEach((plan, index) => {
      const normalized = normalizePlan(plan, index);
      grouped[normalized.system]?.push(normalized);
    });

    Object.values(grouped).forEach((list) => list.sort((a, b) => a.order - b.order));

    return grouped;
  }, [plans]);

  const visiblePlans = plansBySystem[activeSystem] ?? [];

  const badge = config?.pricing_badge?.valor ?? config?.pricing_badge ?? "Planes";

  const title =
    config?.pricing_title?.valor ?? config?.pricing_title ?? "Elegí el plan ideal para tu negocio";

  const description =
    config?.pricing_description?.valor ??
    config?.pricing_description ??
    "Opciones pensadas para acompañar desde los primeros pasos hasta operaciones más exigentes.";

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

          <PlanSystemTabs
            activeSystem={activeSystem}
            onChange={setActiveSystem}
            idPrefix={idPrefix}
          />
        </motion.div>

        <div
          id={`${idPrefix}-panel`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${activeSystem}`}
          className="mt-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSystem}
              className={`grid gap-8 lg:gap-10 ${getPlansGridClass(visiblePlans.length)}`}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
            >
              {visiblePlans.length > 0 ? (
                visiblePlans.map((plan, index) => (
                  <PlanCard key={plan.id} plan={plan} index={index} />
                ))
              ) : (
                <motion.div
                  variants={fadeUp}
                  className="col-span-full rounded-[30px] border border-[rgba(10,37,64,0.16)] bg-white p-10 text-center text-sm text-slate-700 shadow-[0_24px_72px_rgba(10,37,64,0.14)]"
                >
                  No hay planes disponibles para {getSystemLabel(activeSystem)}.
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
