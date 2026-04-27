import SectionCard from "./admin/editor/SectionCard";
import Input from "./admin/editor/Input";
import Button from "./admin/editor/Button";

const HEADER_CONFIG_KEYS = [
  { key: "header_brand_title", label: "Título marca" },
  { key: "header_brand_subtitle", label: "Subtítulo marca" },
  { key: "header_cta_text", label: "Texto botón CTA" },
  { key: "header_cta_link", label: "Link botón CTA" },
];

export default function HeaderSection({
  config,
  updateConfigValue,
  headerMenu,
  updateHeaderMenuItem,
  addHeaderMenuItem,
  removeHeaderMenuItem,
  saveConfigSection,
  savingConfig,
}) {
  return (
    <SectionCard
      title="Header"
      subtitle="Configuración del encabezado de la landing."
      actions={
        <Button
          onClick={() =>
            saveConfigSection(HEADER_CONFIG_KEYS, [
              {
                clave: "header_menu",
                valor: JSON.stringify(headerMenu),
                tipo: "json",
              },
            ])
          }
          disabled={savingConfig}
        >
          {savingConfig ? "Guardando..." : "Guardar Header"}
        </Button>
      }
    >
      {/* 🔹 CONFIG BASICA */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {HEADER_CONFIG_KEYS.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            value={config[field.key] ?? ""}
            onChange={(value) =>
              updateConfigValue(field.key, value)
            }
          />
        ))}
      </div>

      {/* 🔹 MENU */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-700">
              Menú del Header
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Links de navegación de la landing.
            </p>
          </div>

          <Button variant="secondary" onClick={addHeaderMenuItem}>
            Agregar link
          </Button>
        </div>

        <div className="space-y-4">
          {headerMenu.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <Input
                label={`Texto #${index + 1}`}
                value={item.label ?? ""}
                onChange={(value) =>
                  updateHeaderMenuItem(index, "label", value)
                }
              />

              <Input
                label={`Href #${index + 1}`}
                value={item.href ?? ""}
                onChange={(value) =>
                  updateHeaderMenuItem(index, "href", value)
                }
              />

              <div className="flex items-end">
                <Button
                  variant="secondary"
                  onClick={() => removeHeaderMenuItem(index)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}

          {headerMenu.length === 0 && (
            <p className="text-sm text-slate-500">
              No hay links cargados.
            </p>
          )}
        </div>
      </div>
    </SectionCard>
  );
}