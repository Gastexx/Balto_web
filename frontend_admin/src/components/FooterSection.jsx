import SectionCard from "./admin/editor/SectionCard";
import Input from "./admin/editor/Input";
import Button from "./admin/editor/Button";

const FOOTER_CONFIG_KEYS = [
  { key: "footer_brand_title", label: "Título Footer" },
  { key: "footer_brand_subtitle", label: "Subtítulo marca Footer" },
  { key: "footer_description", label: "Descripción Footer" },
  { key: "footer_product_title", label: "Título columna producto" },
  { key: "footer_contact_title", label: "Título columna contacto" },
  { key: "footer_email", label: "Email" },
  { key: "footer_phone", label: "Teléfono" },
  { key: "footer_address", label: "Dirección" },
  { key: "footer_country", label: "País" },
  { key: "footer_newsletter_placeholder", label: "Placeholder newsletter" },
  { key: "footer_newsletter_button", label: "Texto botón newsletter" },
  { key: "footer_privacy_text", label: "Texto privacidad" },
  { key: "footer_terms_text", label: "Texto términos" },
  { key: "footer_copyright", label: "Copyright" },
  { key: "footer_whatsapp", label: "WhatsApp" },
  { key: "footer_facebook", label: "Facebook" },
  { key: "footer_instagram", label: "Instagram" },
  { key: "footer_linkedin", label: "LinkedIn" },
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

export default function FooterSection({
  config,
  updateConfigValue,
  footerProductLinks,
  updateFooterProductLink,
  addFooterProductLink,
  removeFooterProductLink,
  footerLegalLinks,
  updateFooterLegalLink,
  addFooterLegalLink,
  removeFooterLegalLink,
  saveConfigSection,
  savingConfig,
}) {
  return (
    <SectionCard
      title="Footer"
      subtitle="Textos, contacto y links del footer."
      actions={
        <Button
          onClick={() =>
            saveConfigSection(FOOTER_CONFIG_KEYS, [
              {
                clave: "footer_product_links",
                valor: JSON.stringify(footerProductLinks),
                tipo: "json",
              },
              {
                clave: "footer_legal_links",
                valor: JSON.stringify(footerLegalLinks),
                tipo: "json",
              },
            ])
          }
          disabled={savingConfig}
        >
          {savingConfig ? "Guardando..." : "Guardar Footer"}
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FOOTER_CONFIG_KEYS.map((field) => {
            const isLongText = field.key === "footer_description";

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

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-700">
                Links de producto
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Editá los links de producto del footer.
              </p>
            </div>

            <Button variant="secondary" onClick={addFooterProductLink}>
              Agregar link
            </Button>
          </div>

          <div className="space-y-4">
            {footerProductLinks.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_1fr_auto]"
              >
                <Input
                  label={`Texto link #${index + 1}`}
                  value={item.label ?? ""}
                  onChange={(value) =>
                    updateFooterProductLink(index, "label", value)
                  }
                />

                <Input
                  label={`Href link #${index + 1}`}
                  value={item.href ?? ""}
                  onChange={(value) =>
                    updateFooterProductLink(index, "href", value)
                  }
                />

                <div className="flex items-end">
                  <Button
                    variant="secondary"
                    onClick={() => removeFooterProductLink(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}

            {footerProductLinks.length === 0 ? (
              <p className="text-sm text-slate-500">No hay links cargados.</p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-slate-700">
                Links legales
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Editá los links de privacidad y términos.
              </p>
            </div>

            <Button variant="secondary" onClick={addFooterLegalLink}>
              Agregar link
            </Button>
          </div>

          <div className="space-y-4">
            {footerLegalLinks.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_1fr_auto]"
              >
                <Input
                  label={`Texto link #${index + 1}`}
                  value={item.label ?? ""}
                  onChange={(value) =>
                    updateFooterLegalLink(index, "label", value)
                  }
                />

                <Input
                  label={`Href link #${index + 1}`}
                  value={item.href ?? ""}
                  onChange={(value) =>
                    updateFooterLegalLink(index, "href", value)
                  }
                />

                <div className="flex items-end">
                  <Button
                    variant="secondary"
                    onClick={() => removeFooterLegalLink(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}

            {footerLegalLinks.length === 0 ? (
              <p className="text-sm text-slate-500">
                No hay links legales cargados.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}