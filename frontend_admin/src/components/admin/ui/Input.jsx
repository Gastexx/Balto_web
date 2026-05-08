export default function Input({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-normal text-slate-600">
        {label}
      </span>

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full rounded-2xl border border-slate-200 bg-white
          px-4 py-3 text-sm font-normal text-slate-800
          outline-none transition
          focus:border-[var(--balto-action,#0055BB)]
          focus:ring-2 focus:ring-[var(--balto-action,#0055BB)]/10
        "
      />
    </label>
  );
}