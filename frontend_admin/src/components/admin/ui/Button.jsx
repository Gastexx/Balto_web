export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
}) {
  const base =
    "rounded-2xl px-4 py-2.5 text-sm font-normal transition disabled:cursor-not-allowed disabled:opacity-60";

  const styles =
    variant === "secondary"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      : "bg-[var(--balto-action,#0055BB)] text-white hover:opacity-90";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles}`}
    >
      {children}
    </button>
  );
}