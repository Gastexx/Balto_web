// Utilidades compartidas por el editor de planes (LandingEditor + PlansEditor).
// Los ids de sistema coinciden con la columna `planes_saas.sistema`.

export const PLAN_SYSTEMS = [
  {
    id: "servicios",
    label: "BALTO Servicios",
    shortLabel: "Servicios",
  },
  {
    id: "comercio",
    label: "BALTO Comercio",
    shortLabel: "Comercio",
  },
];

export const DEFAULT_PLAN_SYSTEM = PLAN_SYSTEMS[0].id;

export const PLAN_NOTE_MAX_LENGTH = 80;

export function isValidPlanSystem(value) {
  return PLAN_SYSTEMS.some((system) => system.id === value);
}

export function getPlanSystemLabel(systemId) {
  return PLAN_SYSTEMS.find((system) => system.id === systemId)?.label ?? "";
}

/**
 * Usa el campo explícito `sistema`. Solo si falta (datos previos a la
 * migración) se deduce por el nombre; al guardar queda persistido.
 */
export function resolvePlanSystem(plan) {
  const explicit = String(plan?.sistema ?? "")
    .trim()
    .toLowerCase();

  if (isValidPlanSystem(explicit)) return explicit;

  return String(plan?.nombre ?? "")
    .toLowerCase()
    .includes("comercio")
    ? "comercio"
    : DEFAULT_PLAN_SYSTEM;
}

/**
 * "95000" | "95.000" | "$95.000/mes" | "95000,5" → { amount: "95.000", numeric: true }
 * Cualquier otro texto se devuelve sin tocar con numeric: false.
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

let localKeyCounter = 0;

export function createLocalKey() {
  localKeyCounter += 1;
  return `local-${Date.now()}-${localKeyCounter}`;
}

function toIncluyeArray(value) {
  if (Array.isArray(value)) return value.map((item) => String(item ?? ""));

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

/** Plan tal como lo maneja el editor. */
export function normalizeEditorPlan(plan, index = 0) {
  const numericId = Number(plan?.id);

  return {
    // `key` identifica la tarjeta en el editor; `id` es el id real de la base
    // (null para planes nuevos todavía no guardados).
    key: Number.isInteger(numericId) && numericId > 0 ? `db-${numericId}` : createLocalKey(),
    id: Number.isInteger(numericId) && numericId > 0 ? numericId : null,
    sistema: resolvePlanSystem(plan),
    nombre: plan?.nombre ?? "",
    precio: plan?.precio ?? "",
    descripcion: plan?.descripcion ?? "",
    nota: plan?.nota ?? "",
    incluye: toIncluyeArray(plan?.incluye),
    destacado: Boolean(Number(plan?.destacado ?? 0)),
    orden: Number(plan?.orden ?? index + 1) || index + 1,
  };
}

export function createEmptyPlan(sistema, orden) {
  return {
    key: createLocalKey(),
    id: null,
    sistema,
    nombre: "",
    precio: "",
    descripcion: "",
    nota: "",
    incluye: [],
    destacado: false,
    orden,
  };
}

export function sortPlansByOrder(plans) {
  return plans
    .map((plan, index) => ({ plan, index }))
    .sort((a, b) => (Number(a.plan.orden) || 0) - (Number(b.plan.orden) || 0) || a.index - b.index)
    .map(({ plan }) => plan);
}

/** Payload que se envía a `admin_planes_guardar` para un sistema. */
export function buildSavePayload(sistema, plans) {
  const items = sortPlansByOrder(plans.filter((plan) => plan.sistema === sistema)).map(
    (plan, index) => {
      const price = formatArgentinePrice(plan.precio);

      const item = {
        sistema,
        nombre: String(plan.nombre ?? "").trim(),
        precio: price.numeric ? price.amount : String(plan.precio ?? "").trim(),
        descripcion: String(plan.descripcion ?? "").trim(),
        nota: String(plan.nota ?? "").trim(),
        incluye: (Array.isArray(plan.incluye) ? plan.incluye : [])
          .map((value) => String(value ?? "").trim())
          .filter(Boolean)
          .join("\n"),
        destacado: plan.destacado ? 1 : 0,
        orden: index + 1,
      };

      if (plan.id) item.id = plan.id;

      return item;
    },
  );

  return { sistema, items };
}

/** Firma comparable para detectar cambios sin guardar en una categoría. */
export function getSystemSnapshot(sistema, plans) {
  return JSON.stringify(buildSavePayload(sistema, plans).items);
}

export function validatePlans(sistema, plans) {
  const items = plans.filter((plan) => plan.sistema === sistema);
  const names = new Set();

  for (const plan of items) {
    const name = String(plan.nombre ?? "").trim();

    if (!name) return "Todos los planes deben tener nombre.";
    if (!String(plan.precio ?? "").trim()) return `El plan "${name}" debe tener precio.`;
    if (String(plan.nota ?? "").trim().length > PLAN_NOTE_MAX_LENGTH) {
      return `La nota del plan "${name}" supera los ${PLAN_NOTE_MAX_LENGTH} caracteres.`;
    }

    const normalizedName = name.toLowerCase();
    if (names.has(normalizedName)) {
      return `Hay dos planes llamados "${name}" en ${getPlanSystemLabel(sistema)}.`;
    }
    names.add(normalizedName);
  }

  return "";
}
