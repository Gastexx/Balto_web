import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ExternalLink,
  Globe,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import logoWhite from "../../../assets/Balto_Blanco.png";
import logoMark from "../../../assets/balto.png";

export default function AdminLayout({ children }) {
  const admin = JSON.parse(localStorage.getItem("balto_admin") || "{}");
  const location = useLocation();

  const [openBaltoWeb, setOpenBaltoWeb] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSidebarText, setShowSidebarText] = useState(true);

  useEffect(() => {
    let timeout;

    if (sidebarCollapsed) {
      setShowSidebarText(false);
    } else {
      timeout = setTimeout(() => {
        setShowSidebarText(true);
      }, 220);
    }

    return () => clearTimeout(timeout);
  }, [sidebarCollapsed]);

  const handleLogout = () => {
    localStorage.removeItem("balto_admin");
    window.location.href = "/";
  };

  const sections = [{ label: "Planes", href: "/admin/landing/planes" }];
  const isDashboard = location.pathname === "/admin/dashboard";
  const isLanding = location.pathname.startsWith("/admin/landing");

  const pageTitle = useMemo(() => {
    if (isDashboard) return "Dashboard";
    if (isLanding) return "Balto Web";
    return "Panel Admin";
  }, [isDashboard, isLanding]);

  return (
    <div className="balto-page-bg h-screen overflow-hidden">
      <div className="relative z-10 flex h-full p-3 sm:p-4">
        <aside
          className={`balto-dark-panel relative flex h-full shrink-0 flex-col overflow-hidden rounded-[30px] border border-white/10 shadow-[0_30px_80px_rgba(10,37,64,0.28)] transition-all duration-300 ${
            sidebarCollapsed ? "w-20" : "w-72"
          }`}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,85,187,0.22),transparent_34%)]" />
            <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[var(--balto-action)]/10 blur-[90px]" />
            <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
            <img
              src={logoWhite}
              alt=""
              aria-hidden="true"
              className="absolute -right-16 top-20 h-56 w-56 object-contain opacity-[0.025]"
            />
          </div>

          <div className="relative border-b border-white/10 px-4 py-5">
            <div className="flex items-center justify-between gap-3">
              <Link
                to="/admin/dashboard"
                className={`flex min-w-0 items-center gap-3 ${
                  sidebarCollapsed ? "w-full justify-center" : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] p-2.5 shadow-[0_14px_35px_rgba(0,0,0,0.22)] ring-1 ring-white/10">
                  <img src={logoWhite} alt="Balto" className="h-auto max-h-7 w-auto object-contain" />
                </div>

                <div
                  className={`min-w-0 overflow-hidden transition-opacity duration-150 ${
                    showSidebarText
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  {showSidebarText && !sidebarCollapsed && (
                    <>
                      <h2 className="whitespace-nowrap text-lg font-semibold tracking-tight text-white">
                        Balto Admin
                      </h2>
                      <p className="mt-1 truncate text-xs text-white/[0.55]">
                        {admin?.nombre || "Administrador"}
                      </p>
                    </>
                  )}
                </div>
              </Link>

              {!sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white/70 transition hover:bg-white/10 hover:text-white"
                  title="Cerrar panel"
                >
                  <PanelLeftClose size={18} />
                </button>
              )}
            </div>

            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="mt-4 flex w-full items-center justify-center rounded-2xl py-2 text-white/75 transition hover:bg-white/10 hover:text-white"
                title="Abrir panel"
              >
                <PanelLeftOpen size={18} />
              </button>
            )}
          </div>

          <nav className="relative flex-1 overflow-y-auto p-3">
            {!sidebarCollapsed ? (
              <div className="space-y-3">
                <Link
                  to="/admin/dashboard"
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    isDashboard
                      ? "bg-white/[0.13] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                <div className="overflow-hidden rounded-2xl bg-white/[0.055] ring-1 ring-white/5">
                  <button
                    type="button"
                    onClick={() => setOpenBaltoWeb((prev) => !prev)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                      isLanding
                        ? "bg-white/[0.13] text-white"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3 overflow-hidden">
                      <Globe size={18} className="shrink-0" />
                      <span className="whitespace-nowrap">Balto Web</span>
                    </span>

                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform duration-200 ${
                        openBaltoWeb ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openBaltoWeb ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-2 pb-2">
                      {sections.map((section) => {
                        const isActive = location.pathname === section.href;

                        return (
                          <Link
                            key={section.href}
                            to={section.href}
                            className={`block rounded-xl px-4 py-2.5 text-sm transition ${
                              isActive
                                ? "bg-white/10 text-white"
                                : "text-white/60 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {section.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Link
                  to="/admin/dashboard"
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                    isDashboard ? "bg-white/[0.12] text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                  title="Dashboard"
                >
                  <LayoutDashboard size={20} />
                </Link>

                <Link
                  to="/admin/landing/planes"
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                    isLanding ? "bg-white/[0.12] text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                  title="Balto Web - Planes"
                >
                  <Globe size={20} />
                </Link>
              </div>
            )}
          </nav>

          <div className="relative border-t border-white/10 p-3">
            <button
              onClick={handleLogout}
              className={`flex w-full items-center rounded-2xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/10 hover:text-white ${
                sidebarCollapsed ? "justify-center" : "gap-3"
              }`}
            >
              <LogOut size={18} />
              {showSidebarText && !sidebarCollapsed && (
                <span className="whitespace-nowrap">Cerrar sesión</span>
              )}
            </button>
          </div>
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col pl-3 sm:pl-4">
          <header className="balto-glass-card mb-4 flex items-center justify-between rounded-[24px] px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-[var(--balto-action)]/10 text-[var(--balto-action)] sm:flex">
                <img src={logoMark} alt="" aria-hidden="true" className="h-6 w-6 object-contain" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--balto-action)]">
                  Panel administrador
                </p>
                <h1 className="text-lg font-semibold tracking-tight text-[var(--balto-midnight)]">
                  {pageTitle}
                </h1>
              </div>
            </div>

            <a
              href="https://panel.balto.com.ar/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-2xl border border-[var(--balto-border)] bg-white/[0.07]5 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:bg-white md:inline-flex"
            >
              Ver sitio
              <ExternalLink size={15} />
            </a>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto rounded-[28px] px-1 pb-4 pr-2 sm:px-2">
            {children}
          </main>
        </section>
      </div>
    </div>
  );
}
