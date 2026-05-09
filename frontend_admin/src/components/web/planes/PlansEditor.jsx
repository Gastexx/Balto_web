import { Check, Plus, Save, Trash2 } from "lucide-react";
import SectionCard from "../../admin/ui/SectionCard";
import Input from "../../admin/ui/Input";
import Button from "../../admin/ui/Button";
import logoWhite from "../../../imagenes/Balto_Blanco.png";
import logoMark from "../../../imagenes/balto.png";

function PlanPreview({ plan, index }) {
  const featured = index === 1 || /pro|premium|empresa/i.test(plan?.nombre || "");
  const incluye = Array.isArray(plan?.incluye)
    ? plan.incluye.filter((item) => String(item ?? "").trim())
    : [];

  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[28px] border p-6 transition duration-300 hover:-translate-y-1 ${
        featured
          ? "border-[var(--balto-action)]/50 bg-gradient-to-b from-[rgba(0,85,187,0.28)] via-[rgba(7,18,36,0.96)] to-[rgba(3,8,18,1)] shadow-[0_0_0_1px_rgba(0,85,187,0.10),0_30px_80px_rgba(0,85,187,0.20)]"
          : "border-white/10 bg-white/[0.045] shadow-[0_20px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      }`}
    >
      {featured && (
        <div className="absolute left-1/2 top-4 -translate-x-1/2">
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
            Recomendado
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_25%,transparent_78%,rgba(255,255,255,0.03))]" />

      <div className="relative z-10 flex h-full flex-col pt-4">
        <span
          className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
            featured
              ? "bg-white/10 text-white"
              : "bg-[var(--balto-action)]/10 text-[var(--balto-action)]"
          }`}
        >
          Plan {index + 1}
        </span>

        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          {plan?.nombre || "Sin nombre"}
        </h3>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5">
          <div className="text-3xl font-semibold tracking-tight text-white">
            {plan?.precio || "Precio"}
          </div>
          <p className="mt-2 text-sm text-white/[0.45]">Vista previa del plan.</p>
        </div>

        <ul className="mt-6 space-y-3">
          {incluye.length > 0 ? (
            incluye.slice(0, 5).map((item, itemIndex) => (
              <li key={`${item}-${itemIndex}`} className="flex gap-3 text-sm leading-6 text-white/70">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--balto-action)]/20 text-[var(--balto-action)]">
                  <Check size={13} />
                </span>
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="text-sm leading-6 text-white/[0.45]">Sin ítems cargados.</li>
          )}
        </ul>
      </div>
    </article>
  );
}

export default function PlansEditor({
  plans,
  updatePlan,
  updatePlanIncluye,
  addPlanIncluye,
  removePlanIncluye,
  addPlan,
  removePlan,
  savePlans,
  savingPlans,
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Planes"
        subtitle="Cargá nombre, precio, orden e ítems incluidos. El estilo replica las tarjetas de pricing del frontend público."
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
                {savingPlans ? "Guardando..." : "Guardar planes"}
              </span>
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          {plans.map((item, index) => (
            <article
              key={item.id ?? index}
              className="group relative overflow-hidden rounded-[28px] border border-[var(--balto-border,#d8e0ec)]/80 bg-white/[0.07]2 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 sm:p-5"
            >
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 object-contain opacity-[0.035] transition duration-300 group-hover:opacity-[0.055]"
              />

              <div className="relative mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex items-center rounded-full bg-[var(--balto-action)]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--balto-action)]">
                    Plan #{index + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--balto-midnight,#0a2540)]">
                    {item.nombre || "Nuevo plan"}
                  </h3>
                </div>

                <Button variant="danger" onClick={() => removePlan(index)}>
                  <span className="inline-flex items-center gap-2">
                    <Trash2 size={15} />
                    Eliminar
                  </span>
                </Button>
              </div>

              <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
                <Input
                  label="Nombre"
                  value={item.nombre ?? ""}
                  onChange={(value) => updatePlan(index, "nombre", value)}
                  placeholder="Ej: Profesional"
                />

                <Input
                  label="Precio"
                  value={item.precio ?? ""}
                  onChange={(value) => updatePlan(index, "precio", value)}
                  placeholder="Ej: $24.900/mes"
                />

                <Input
                  label="Orden"
                  value={item.orden ?? index + 1}
                  onChange={(value) => updatePlan(index, "orden", value)}
                  placeholder="Ej: 2"
                />

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

                    <Button variant="secondary" onClick={() => addPlanIncluye(index)}>
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
                          onChange={(value) =>
                            updatePlanIncluye(index, incIndex, value)
                          }
                          placeholder="Ej: Reportes mensuales"
                        />

                        <div className="flex items-end">
                          <Button
                            variant="secondary"
                            onClick={() => removePlanIncluye(index, incIndex)}
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
          ))}

          {plans.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[var(--balto-border,#d8e0ec)] bg-white/[0.07]0 p-6 text-center">
              <p className="text-sm text-[var(--balto-muted,#5b6472)]">
                No hay planes cargados todavía.
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
            Vista previa
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            Así se sienten los planes en la web pública
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
            Esta previsualización mantiene el lenguaje visual oscuro del pricing original de Balto.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {plans.length > 0 ? (
              plans.slice(0, 3).map((plan, index) => (
                <PlanPreview key={plan.id ?? index} plan={plan} index={index} />
              ))
            ) : (
              <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 text-sm text-white/50 lg:col-span-3">
                Agregá planes para ver la previsualización.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
