import logoMark from "../../../imagenes/balto.png";

export default function SectionCard({ title, subtitle, children, actions }) {
  return (
    <section className="balto-soft-card relative overflow-hidden rounded-[30px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.08),transparent_30%)]" />
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 object-contain opacity-[0.035]"
      />

      <div className="relative border-b border-[var(--balto-border,#d8e0ec)]/70 px-6 py-5 sm:px-7">
        <span className="inline-flex items-center rounded-full border border-[var(--balto-border,#d8e0ec)] bg-white/[0.07]5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--balto-action,#0055BB)]">
          Balto Admin
        </span>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[var(--balto-midnight,#0a2540)]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm font-normal leading-6 text-[var(--balto-muted,#5b6472)]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative px-5 py-6 sm:px-7">{children}</div>

      {actions && (
        <div className="relative flex flex-col gap-3 border-t border-[var(--balto-border,#d8e0ec)]/70 bg-white/[0.45] px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          {actions}
        </div>
      )}
    </section>
  );
}
