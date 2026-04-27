import SectionCard from "./admin/editor/SectionCard";
import Input from "./admin/editor/Input";
import Button from "./admin/editor/Button";

function Textarea({ label, value, onChange, rows = 4, placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-normal text-slate-600">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-800 outline-none transition focus:border-[var(--balto-action,#0055BB)] focus:ring-2 focus:ring-[var(--balto-action,#0055BB)]/10"
      />
    </label>
  );
}

export default function FeaturesSection({
  features,
  updateFeature,
  addFeature,
  removeFeature,
  saveFeatures,
  savingFeatures,
}) {
  return (
    <SectionCard
      title="Features"
      subtitle="Beneficios o características destacadas."
      actions={
        <div className="flex gap-3">
          <Button variant="secondary" onClick={addFeature}>
            Agregar feature
          </Button>

          <Button onClick={saveFeatures} disabled={savingFeatures}>
            {savingFeatures ? "Guardando..." : "Guardar Features"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {features.map((item, index) => (
          <div
            key={item.id ?? index}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-700">
                Feature #{index + 1}
              </h3>

              <Button variant="secondary" onClick={() => removeFeature(index)}>
                Eliminar
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Título"
                value={item.titulo ?? ""}
                onChange={(value) => updateFeature(index, "titulo", value)}
                placeholder="Ej: Control total"
              />

              <Input
                label="Orden"
                value={item.orden ?? index + 1}
                onChange={(value) => updateFeature(index, "orden", value)}
                placeholder="Ej: 1"
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Texto"
                  value={item.texto ?? ""}
                  onChange={(value) => updateFeature(index, "texto", value)}
                  rows={4}
                  placeholder="Ej: Gestioná ventas, stock y clientes desde un solo lugar."
                />
              </div>
            </div>
          </div>
        ))}

        {features.length === 0 ? (
          <p className="text-sm text-slate-500">No hay features cargadas.</p>
        ) : null}
      </div>
    </SectionCard>
  );
}