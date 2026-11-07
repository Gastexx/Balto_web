import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Briefcase,
  Check,
  Layers,
  Plus,
  Save,
  Star,
  Store,
  Trash2,
} from "lucide-react";
import SectionCard from "../../admin/ui/SectionCard";
import Input from "../../admin/ui/Input";
import Button from "../../admin/ui/Button";
import logoWhite from "../../../imagenes/Balto_Blanco.png";
import logoMark from "../../../imagenes/balto.png";
import { PLAN_NOTE_MAX_LENGTH, formatArgentinePrice } from "./planUtils";

const SYSTEM_ICONS = {
  servicios: Briefcase,
  comercio: Store,
};

// Misma distribución de columnas que PricingSection en la web pública
// (con un breakpoint más, porque el panel tiene la barra lateral).
function getPreviewGridClass(count) {
  if (count <= 1) return "mx-auto max-w-md grid-cols-1";
  if (count === 2) return "mx-auto max-w-5xl grid-cols-1 md:grid-cols-2";
  if (count === 3) return "mx-auto max-w-xl grid-cols-1 xl:max-w-none xl:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3";
}

// Igual que en la web: la tarjeta comparte 4 filas (encabezado, precio,
// incluye, botón) con sus vecinas para que queden alineadas.
const CARD_SUBGRID = "row-span-4 grid gap-y-0 [grid-template-rows:subgrid]";

function SystemTabs({ systems, activeSystem, onChange, counts, dirtySystems }) {
  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        aria-label="Sistemas BALTO"
        className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--balto-border,#d8e0ec)] bg-white/80 p-1 shadow-[0_10px_28px_rgba(15,23,42,0.06)] backdrop-blur-md"
      >
        {systems.map((system) => {
          const isActive = system.id === activeSystem;
          const Icon = SYSTEM_ICONS[system.id] ?? Layers;

          return (
            <button
              key={system.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(system.id)}
              className={`relative inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 sm:px-5 ${
                isActive
                  ? "bg-[var(--balto-action,#0055BB)] text-white shadow-[0_10px_24px_rgba(0,85,187,0.28)]"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-[var(--balto-midnight,#0a2540)]"
              }`}
            >
              <Icon size={15} />
              <span className="sm:hidden">{system.shortLabel}</span>
              <span className="hidden sm:inline">{system.label}</span>
              <span
                className={`rounded-full px-1.5 text-[11px] leading-5 ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {counts?.[system.id] ?? 0}
              </span>
              {dirtySystems?.[system.id] && (
                <span
                  className={`h-2 w-2 rounded-full ${isActive ? "bg-amber-300" : "bg-amber-500"}`}
                  title="Cambios sin guardar"
                  aria-label="Cambios sin guardar"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder = "", rows = 2 }) {
  return (
    <label className="balto-floating-label block">
      <span>{label}</span>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-2xl border border-[var(--balto-border,#d8e0ec)] bg-white/[0.88] px-4 pb-3 pt-7 text-sm font-normal leading-6 text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.04)] outline-none transition duration-200 placeholder:text-slate-300 focus:border-[var(--balto-action,#0055BB)] focus:bg-white focus:ring-4 focus:ring-[var(--balto-action,#0055BB)]/10"
      />
    </label>
  );
}

// Réplica de la tarjeta de PricingSection (web pública).
function PlanPreview({ plan, index }) {
  const featured = Boolean(plan?.destacado);
  const price = formatArgentinePrice(plan?.precio);
  const incluye = Array.isArray(plan?.incluye)
    ? plan.incluye.filter((item) => String(item ?? "").trim())
    : [];
  const description = String(plan?.descripcion ?? "").trim();
  const note = String(plan?.nota ?? "").trim();

  return (
    <article
      className={`relative ${CARD_SUBGRID} overflow-hidden rounded-[32px] border p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${
        featured
          ? "border-2 border-[rgba(0,85,187,0.78)] bg-[#f8fbff] shadow-[0_34px_96px_rgba(0,85,187,0.30),0_0_0_9px_rgba(0,85,187,0.075)]"
          : "border-[rgba(10,37,64,0.16)] bg-[#fbfdff] shadow-[0_24px_72px_rgba(10,37,64,0.15)]"
      }`}
    >
      {featured && (
        <>
          <div className="absolute inset-x-10 top-0 h-[3px] rounded-b-full bg-[var(--balto-action)]" />
          <div className="absolute left-0 top-10 h-36 w-2 rounded-r-full bg-[var(--balto-action)]" />
        </>
      )}

      <div className={`relative z-10 ${CARD_SUBGRID}`}>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
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
            {plan?.nombre || "Sin nombre"}
          </h3>

          {description && <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>}
        </div>

        <div
          className={`mt-6 rounded-[24px] border p-5 ${
            featured
              ? "border-[rgba(0,85,187,0.38)] bg-[linear-gradient(180deg,#ffffff_0%,#eef6ff_100%)]"
              : "border-[rgba(0,85,187,0.24)] bg-[rgba(0,85,187,0.10)]"
          }`}
        >
          {price.amount ? (
            <>
              <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                <span className="text-3xl font-semibold tracking-tight text-[var(--balto-midnight)] 2xl:text-4xl">
                  {price.numeric ? "$" : ""}
                  {price.amount}
                </span>
                {price.numeric && <span className="pb-1.5 text-sm text-slate-700">/mes</span>}
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

            <ul className="space-y-3">
              {incluye.length > 0 ? (
                incluye.map((item, itemIndex) => (
                  <li key={`${itemIndex}-${item}`} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[rgba(0,85,187,0.34)] ${
                        featured
                          ? "bg-[var(--balto-action)] text-white"
                          : "bg-[rgba(0,85,187,0.18)] text-[var(--balto-action)]"
                      }`}
                    >
                      <Check size={13} strokeWidth={2.4} />
                    </span>
                    <span className="text-sm leading-6 text-slate-700">{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm leading-6 text-slate-500">Sin ítems cargados.</li>
              )}
            </ul>

            {note && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[var(--balto-midnight)] px-4 py-3.5 text-sm leading-6 text-white">
                <Layers size={16} className="mt-1 shrink-0 text-[#8db8ff]" />
                <span>{note}</span>
              </div>
            )}
          </div>
        </div>

        <span
          className={`mt-9 inline-flex w-full self-end items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium ${
            featured
              ? "bg-[var(--balto-action)] text-white"
              : "border border-[rgba(0,85,187,0.34)] bg-white text-[var(--balto-action)]"
          }`}
        >
          Consultar plan
          <ArrowRight size={15} />
        </span>
      </div>
    </article>
  );
}

export default function PlansEditor({
  systems,
  activeSystem,
  onChangeSystem,
  counts,
  dirtySystems,
  plans,
  updatePlan,
  updatePlanIncluye,
  addPlanIncluye,
  removePlanIncluye,
  addPlan,
  removePlan,
  movePlan,
  savePlans,
  savingPlans,
}) {
  const activeLabel = systems.find((system) => system.id === activeSystem)?.label ?? "";
  const otherDirty = systems.filter(
    (system) => system.id !== activeSystem && dirtySystems?.[system.id],
  );

  return (
    <div className="space-y-6">
      <SystemTabs
        systems={systems}
        activeSystem={activeSystem}
        onChange={onChangeSystem}
        counts={counts}
        dirtySystems={dirtySystems}
      />

      {otherDirty.length > 0 && (
        <p className="text-center text-xs text-amber-700">
          Tenés cambios sin guardar en {otherDirty.map((system) => system.label).join(", ")}. Cada
          pestaña se guarda por separado.
        </p>
      )}

      <div key={activeSystem} className="balto-animate-up space-y-6">
        <SectionCard
          title={`Planes · ${activeLabel}`}
          subtitle={`Cargá nombre, precio, descripción, orden e ítems incluidos de ${activeLabel}. Al guardar solo se modifican los planes de esta pestaña.`}
          actions={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={addPlan}>
                <span className="inline-flex items-center gap-2">
                  <Plus size={16} />
                  Agregar plan
                </span>
              </Button>

              <Button onClick={savePlans} disabled={savingPlans}>
                <span className="inline-flex items-center gap-2">
                  <Save size={16} />
                  {savingPlans ? "Guardando..." : `Guardar ${activeLabel}`}
                </span>
              </Button>
            </div>
          }
        >
          <div className="space-y-5">
            {plans.map((item, index) => {
              const price = formatArgentinePrice(item.precio);
              const noteLength = String(item.nota ?? "").length;

              return (
                <article
                  key={item.key}
                  className="group relative overflow-hidden rounded-[28px] border border-[var(--balto-border,#d8e0ec)]/80 bg-white/70 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:bg-white/90 sm:p-5"
                >
                  <img
                    src={logoMark}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 object-contain opacity-[0.035] transition duration-300 group-hover:opacity-[0.055]"
                  />

                  <div className="relative mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-[var(--balto-action)]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--balto-action)]">
                          Plan #{index + 1}
                        </span>
                        {!item.id && (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-amber-700">
                            Nuevo
                          </span>
                        )}
                        {item.destacado && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--balto-action)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                            <Star size={11} className="fill-white" />
                            Destacado
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 truncate text-lg font-semibold tracking-tight text-[var(--balto-midnight,#0a2540)]">
                        {item.nombre || "Nuevo plan"}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => movePlan(item.key, -1)}
                        disabled={index === 0}
                        className="px-3"
                      >
                        <span className="inline-flex items-center gap-1.5" title="Subir">
                          <ArrowUp size={15} />
                          <span className="sr-only">Subir</span>
                        </span>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => movePlan(item.key, 1)}
                        disabled={index === plans.length - 1}
                        className="px-3"
                      >
                        <span className="inline-flex items-center gap-1.5" title="Bajar">
                          <ArrowDown size={15} />
                          <span className="sr-only">Bajar</span>
                        </span>
                      </Button>
                      <Button variant="danger" onClick={() => removePlan(item.key)}>
                        <span className="inline-flex items-center gap-2">
                          <Trash2 size={15} />
                          Eliminar
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Input
                      label="Nombre"
                      value={item.nombre ?? ""}
                      onChange={(value) => updatePlan(item.key, "nombre", value)}
                      placeholder="Ej: Servicios Profesionales"
                    />

                    <div>
                      <Input
                        label="Precio mensual ($)"
                        value={item.precio ?? ""}
                        onChange={(value) => updatePlan(item.key, "precio", value)}
                        placeholder="Ej: 95.000"
                      />
                      <p className="mt-1.5 px-1 text-xs text-[var(--balto-muted,#5b6472)]">
                        {price.amount
                          ? price.numeric
                            ? `Se muestra como $${price.amount}/mes`
                            : "Texto libre: se muestra tal cual."
                          : "Ingresá el importe sin signos."}
                      </p>
                    </div>

                    <Input
                      label="Orden"
                      type="number"
                      value={item.orden ?? index + 1}
                      onChange={(value) => updatePlan(item.key, "orden", value)}
                      placeholder="Ej: 2"
                    />

                    <div className="md:col-span-2">
                      <TextArea
                        label="Descripción"
                        value={item.descripcion ?? ""}
                        onChange={(value) => updatePlan(item.key, "descripcion", value)}
                        placeholder="Ej: Orientado a profesionales que venden su tiempo o conocimiento."
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <Input
                          label={`Nota destacada (opcional · ${noteLength}/${PLAN_NOTE_MAX_LENGTH})`}
                          value={item.nota ?? ""}
                          onChange={(value) =>
                            updatePlan(item.key, "nota", value.slice(0, PLAN_NOTE_MAX_LENGTH))
                          }
                          placeholder="Ej: Combina Servicios y Comercio."
                        />
                      </div>

                      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[var(--balto-border,#d8e0ec)] bg-white/[0.88] px-4 py-3 text-sm text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
                        <input
                          type="checkbox"
                          checked={Boolean(item.destacado)}
                          onChange={(e) => updatePlan(item.key, "destacado", e.target.checked)}
                          className="h-4 w-4 accent-[var(--balto-action,#0055BB)]"
                        />
                        Destacar como recomendado
                      </label>
                    </div>

                    <div className="md:col-span-3 rounded-[24px] border border-[var(--balto-border,#d8e0ec)] bg-white/80 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="text-sm font-semibold tracking-tight text-[var(--balto-midnight,#0a2540)]">
                            Incluye
                          </h4>
                          <p className="mt-1 text-xs leading-5 text-[var(--balto-muted,#5b6472)]">
                            Agregá los ítems que se mostrarán debajo del precio.
                          </p>
                        </div>

                        <Button variant="secondary" onClick={() => addPlanIncluye(item.key)}>
                          <span className="inline-flex items-center gap-2">
                            <Plus size={15} />
                            Agregar ítem
                          </span>
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {(item.incluye ?? []).map((inc, incIndex) => (
                          <div
                            key={incIndex}
                            className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]"
                          >
                            <Input
                              label={`Ítem #${incIndex + 1}`}
                              value={inc ?? ""}
                              onChange={(value) => updatePlanIncluye(item.key, incIndex, value)}
                              placeholder="Ej: Reportes mensuales"
                            />

                            <div className="flex items-end">
                              <Button
                                variant="secondary"
                                onClick={() => removePlanIncluye(item.key, incIndex)}
                                className="w-full md:w-auto"
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        ))}

                        {(item.incluye ?? []).length === 0 ? (
                          <div className="rounded-2xl border border-dashed border-[var(--balto-border,#d8e0ec)] bg-slate-50/80 p-4 text-sm text-[var(--balto-muted,#5b6472)]">
                            No hay ítems cargados para este plan.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {plans.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-[var(--balto-border,#d8e0ec)] bg-white/70 p-6 text-center">
                <p className="text-sm text-[var(--balto-muted,#5b6472)]">
                  No hay planes cargados en {activeLabel} todavía.
                </p>
              </div>
            ) : null}
          </div>
        </SectionCard>

        <section className="relative overflow-hidden rounded-[32px] bg-[#04070d] p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.30)] sm:p-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,85,187,0.18),transparent_32%)]" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[var(--balto-action)]/10 blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
            <img
              src={logoWhite}
              alt=""
              aria-hidden="true"
              className="absolute -right-16 top-8 hidden h-80 w-80 object-contain opacity-[0.025] lg:block"
            />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
              Vista previa · {activeLabel}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Así se ven los planes en la web pública
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
              Misma tarjeta, orden y distribución que la pestaña {activeLabel} del sitio. Incluye
              los cambios todavía no guardados.
            </p>

            <div className={`mt-8 grid gap-6 ${getPreviewGridClass(plans.length)}`}>
              {plans.length > 0 ? (
                plans.map((plan, index) => <PlanPreview key={plan.key} plan={plan} index={index} />)
              ) : (
                <div className="col-span-full rounded-[24px] border border-white/10 bg-white/[0.045] p-6 text-sm text-white/50">
                  Agregá planes para ver la previsualización.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
