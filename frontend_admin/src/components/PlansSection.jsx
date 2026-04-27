import SectionCard from "./admin/editor/SectionCard";
import Input from "./admin/editor/Input";
import Button from "./admin/editor/Button";

export default function PlansSection({
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
    <SectionCard
      title="Planes"
      subtitle="Sección de pricing."
      actions={
        <div className="flex gap-3">
          <Button variant="secondary" onClick={addPlan}>
            Agregar plan
          </Button>

          <Button onClick={savePlans} disabled={savingPlans}>
            {savingPlans ? "Guardando..." : "Guardar Planes"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {plans.map((item, index) => (
          <div
            key={item.id ?? index}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-700">
                Plan #{index + 1}
              </h3>

              <Button variant="secondary" onClick={() => removePlan(index)}>
                Eliminar
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

              <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-700">
                      Incluye
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">
                      Agregá los ítems que se mostrarán en el plan.
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    onClick={() => addPlanIncluye(index)}
                  >
                    Agregar ítem
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
                      />

                      <div className="flex items-end">
                        <Button
                          variant="secondary"
                          onClick={() => removePlanIncluye(index, incIndex)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}

                  {(item.incluye ?? []).length === 0 ? (
                    <p className="text-sm text-slate-500">
                      No hay ítems cargados para este plan.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}

        {plans.length === 0 ? (
          <p className="text-sm text-slate-500">No hay planes cargados.</p>
        ) : null}
      </div>
    </SectionCard>
  );
}