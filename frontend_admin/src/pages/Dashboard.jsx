import AdminLayout from "../components/admin/layout/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, BarChart3, Globe, ShieldCheck } from "lucide-react";
import logoMark from "../assets/balto.png";

export default function Dashboard() {
  const admin = JSON.parse(localStorage.getItem("balto_admin") || "{}");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <section className="balto-glass-card balto-animate-up relative overflow-hidden rounded-[32px] px-6 py-8 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.10),transparent_34%)]" />
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[var(--balto-action)]/8 blur-[110px]" />
          <img
            src={logoMark}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 top-8 hidden h-72 w-72 object-contain opacity-[0.035] md:block"
          />

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--balto-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--balto-action)] shadow-sm backdrop-blur-md">
              <BadgeCheck size={16} />
              Acceso administrativo
            </span>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.035em] text-[var(--balto-midnight)] lg:text-5xl">
              Bienvenido, {admin?.nombre || "Admin"}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--balto-muted)]">
              Desde este panel podés administrar los planes que se muestran en la web pública de Balto, manteniendo la misma identidad visual minimalista.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/admin/landing/planes"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--balto-action)] px-5 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(0,85,187,0.22)] transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Editar planes
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://panel.balto.com.ar/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--balto-border)] bg-white/80 px-5 py-3.5 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:bg-white"
              >
                Ver web pública
              </a>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: Globe,
              title: "Balto Web",
              text: "La administración actual se enfoca en los planes publicados.",
            },
            {
              icon: BarChart3,
              title: "Datos desde DB",
              text: "Los planes se cargan y guardan contra el backend configurado.",
            },
            {
              icon: ShieldCheck,
              title: "Secciones fijas",
              text: "Header, Hero, Features, Testimonios y Footer quedan en el frontend público.",
            },
          ].map(({ icon: Icon, title, text }, index) => (
            <article
              key={title}
              className="balto-soft-card balto-animate-up group relative overflow-hidden rounded-[28px] p-6 transition duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -right-7 h-24 w-24 object-contain opacity-[0.035] transition duration-300 group-hover:opacity-[0.06]"
              />

              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--balto-action)]/10 text-[var(--balto-action)]">
                <Icon size={20} />
              </div>

              <h3 className="relative text-lg font-semibold tracking-tight text-[var(--balto-midnight)]">
                {title}
              </h3>
              <p className="relative mt-3 text-sm leading-6 text-[var(--balto-muted)]">
                {text}
              </p>
            </article>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
}
