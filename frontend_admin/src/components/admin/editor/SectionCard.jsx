export default function SectionCard({
  title,
  subtitle,
  children,
  actions,
}) {
  return (
    <section className="rounded-3xl border border-black/5 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-black/5 px-6 py-5">
        <h2 className="text-xl font-medium text-[var(--balto-text,#0f172a)]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm font-normal text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6">{children}</div>

      {/* Actions */}
      {actions && (
        <div className="flex justify-end border-t border-black/5 px-6 py-4">
          {actions}
        </div>
      )}
    </section>
  );
}