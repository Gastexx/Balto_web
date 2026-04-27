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

export default function TestimonialsSection({
  testimonials,
  updateTestimonial,
  addTestimonial,
  removeTestimonial,
  saveTestimonials,
  savingTestimonials,
}) {
  return (
    <SectionCard
      title="Testimonials"
      subtitle="Opiniones de clientes."
      actions={
        <div className="flex gap-3">
          <Button variant="secondary" onClick={addTestimonial}>
            Agregar testimonio
          </Button>

          <Button onClick={saveTestimonials} disabled={savingTestimonials}>
            {savingTestimonials ? "Guardando..." : "Guardar Testimonials"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {testimonials.map((item, index) => (
          <div
            key={item.id ?? index}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-700">
                Testimonio #{index + 1}
              </h3>

              <Button
                variant="secondary"
                onClick={() => removeTestimonial(index)}
              >
                Eliminar
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Nombre"
                value={item.nombre ?? ""}
                onChange={(value) =>
                  updateTestimonial(index, "nombre", value)
                }
              />

              <Input
                label="Rol"
                value={item.rol ?? ""}
                onChange={(value) =>
                  updateTestimonial(index, "rol", value)
                }
              />

              <Input
                label="Orden"
                value={item.orden ?? index + 1}
                onChange={(value) =>
                  updateTestimonial(index, "orden", value)
                }
              />

              <div className="flex items-end">
                <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={Number(item.activo ?? 1) === 1}
                    onChange={(e) =>
                      updateTestimonial(
                        index,
                        "activo",
                        e.target.checked ? 1 : 0
                      )
                    }
                  />
                  Activo
                </label>
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Texto"
                  value={item.texto ?? ""}
                  onChange={(value) =>
                    updateTestimonial(index, "texto", value)
                  }
                  rows={4}
                />
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 ? (
          <p className="text-sm text-slate-500">
            No hay testimonios cargados.
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}