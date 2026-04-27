import SectionCard from "./admin/editor/SectionCard";
import Input from "./admin/editor/Input";
import Button from "./admin/editor/Button";

const HERO_CONFIG_KEYS = [
  { key: "hero_badge", label: "Badge Hero" },
  { key: "hero_title", label: "Título Hero" },
  { key: "hero_description", label: "Descripción Hero" },
  { key: "hero_cta_primary", label: "Texto botón principal" },
  { key: "hero_cta_secondary", label: "Texto botón secundario" },
  { key: "hero_preview_title", label: "Título preview" },
  { key: "hero_preview_subtitle", label: "Subtítulo preview" },
  { key: "hero_preview_status", label: "Estado preview" },
  { key: "hero_resolve_title", label: "Título bloque resolvés" },
  { key: "hero_resolve_item_1", label: "Ítem resolvés 1" },
  { key: "hero_resolve_item_2", label: "Ítem resolvés 2" },
  { key: "hero_resolve_item_3", label: "Ítem resolvés 3" },
  { key: "hero_card_1_text", label: "Texto card 1" },
  { key: "hero_card_2_text", label: "Texto card 2" },
  { key: "hero_card_3_text", label: "Texto card 3" },
  { key: "hero_metric_1_label", label: "Métrica 1 label" },
  { key: "hero_metric_1_value", label: "Métrica 1 valor" },
  { key: "hero_metric_2_label", label: "Métrica 2 label" },
  { key: "hero_metric_2_value", label: "Métrica 2 valor" },
  { key: "hero_metric_3_label", label: "Métrica 3 label" },
  { key: "hero_metric_3_value", label: "Métrica 3 valor" },
  { key: "hero_metric_4_label", label: "Métrica 4 label" },
  { key: "hero_metric_4_value", label: "Métrica 4 valor" },
];

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

export default function HeroSection({
  config,
  updateConfigValue,
  saveConfigSection,
  savingConfig,
}) {
  return (
    <SectionCard
      title="Hero"
      subtitle="Contenido principal de impacto."
      actions={
        <Button
          onClick={() => saveConfigSection(HERO_CONFIG_KEYS)}
          disabled={savingConfig}
        >
          {savingConfig ? "Guardando..." : "Guardar Hero"}
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {HERO_CONFIG_KEYS.map((field) => {
          const isLongText =
            field.key === "hero_description" ||
            field.key === "hero_resolve_item_1" ||
            field.key === "hero_resolve_item_2" ||
            field.key === "hero_resolve_item_3";

          return (
            <div
              key={field.key}
              className={isLongText ? "md:col-span-2" : ""}
            >
              {isLongText ? (
                <Textarea
                  label={field.label}
                  value={config[field.key] ?? ""}
                  onChange={(value) => updateConfigValue(field.key, value)}
                  rows={4}
                />
              ) : (
                <Input
                  label={field.label}
                  value={config[field.key] ?? ""}
                  onChange={(value) => updateConfigValue(field.key, value)}
                />
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}