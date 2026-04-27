import AdminLayout from "../components/admin/AdminLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const admin = JSON.parse(localStorage.getItem("balto_admin") || "{}");

  return (
    <AdminLayout>
      <div className="min-h-full">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--balto-text)]">
              Bienvenido, {admin?.nombre || "Admin"}
            </h1>
            <p className="mt-2 text-sm text-[var(--balto-muted)]">
              Desde acá vas a poder administrar el contenido público de Balto.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <Link
            to="/admin/landing"
            className="inline-flex items-center justify-center rounded-2xl bg-[var(--balto-action)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Editar landing
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-[var(--balto-border)] bg-white p-5 shadow-sm">
            <p className="text-sm text-[var(--balto-muted)]">Site config</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--balto-text)]">
              —
            </h3>
          </div>

          <div className="rounded-3xl border border-[var(--balto-border)] bg-white p-5 shadow-sm">
            <p className="text-sm text-[var(--balto-muted)]">Features</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--balto-text)]">
              —
            </h3>
          </div>

          <div className="rounded-3xl border border-[var(--balto-border)] bg-white p-5 shadow-sm">
            <p className="text-sm text-[var(--balto-muted)]">Planes</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--balto-text)]">
              —
            </h3>
          </div>

          <div className="rounded-3xl border border-[var(--balto-border)] bg-white p-5 shadow-sm">
            <p className="text-sm text-[var(--balto-muted)]">Testimonials</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--balto-text)]">
              —
            </h3>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}