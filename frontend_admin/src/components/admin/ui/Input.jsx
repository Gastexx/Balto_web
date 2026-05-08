export default function Input({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) {
  return (
    <label className="balto-floating-label block">
      <span>{label}</span>

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full rounded-2xl border border-[var(--balto-border,#d8e0ec)] bg-white/[0.88]
          px-4 pb-3 text-sm font-normal text-slate-800 shadow-[0_10px_28px_rgba(15,23,42,0.04)]
          outline-none transition duration-200 placeholder:text-slate-300
          focus:border-[var(--balto-action,#0055BB)]
          focus:bg-white
          focus:ring-4 focus:ring-[var(--balto-action,#0055BB)]/10
        "
      />
    </label>
  );
}
