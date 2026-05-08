export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

  const styles =
    variant === "secondary"
      ? "border border-[var(--balto-border,#d8e0ec)] bg-white/80 text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:bg-white"
      : variant === "danger"
      ? "border border-red-100 bg-red-50 text-red-700 hover:-translate-y-0.5 hover:bg-red-100"
      : "bg-[var(--balto-action,#0055BB)] text-white shadow-[0_14px_30px_rgba(0,85,187,0.22)] hover:-translate-y-0.5 hover:opacity-95";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
