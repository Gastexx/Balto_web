import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LogOut,
  Globe,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const admin = JSON.parse(localStorage.getItem("balto_admin") || "{}");
  const location = useLocation();

  const [openBaltoWeb, setOpenBaltoWeb] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSidebarText, setShowSidebarText] = useState(true);

  useEffect(() => {
    let timeout;

    if (sidebarCollapsed) {
      setShowSidebarText(false);
    } else {
      timeout = setTimeout(() => {
        setShowSidebarText(true);
      }, 280);
    }

    return () => clearTimeout(timeout);
  }, [sidebarCollapsed]);

  const handleLogout = () => {
    localStorage.removeItem("balto_admin");
    window.location.href = "/";
  };

  // Las demás secciones de la web quedaron fijas en el frontend público.
  // Desde el admin solamente se administra Planes, que sigue saliendo de la DB.
  const sections = [{ label: "Planes", href: "/admin/landing/planes" }];

  const isLanding = location.pathname.startsWith("/admin/landing");

  return (
    <div className="h-screen overflow-hidden bg-[var(--balto-bg)]">
      <div className="flex h-full">
        <aside
          className={`h-screen shrink-0 flex-col overflow-x-hidden bg-[var(--balto-midnight)] text-white transition-all duration-300 ${
            sidebarCollapsed ? "w-20" : "w-72"
          } flex`}
        >
          <div className="border-b border-white/10 px-4 py-5">
            <div className="flex items-center justify-between gap-3">
              <div
                className={`flex min-w-0 items-center gap-3 ${
                  sidebarCollapsed ? "w-full justify-center" : ""
                }`}
              >
                <div
                  className={`min-w-0 overflow-hidden transition-opacity duration-150 ${
                    showSidebarText
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  {showSidebarText && (
                    <>
                      <h2 className="whitespace-nowrap text-xl font-semibold">
                        Balto Admin
                      </h2>
                      <p className="mt-1 whitespace-nowrap text-sm text-white/70">
                        {admin?.nombre || "Administrador"}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {!sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white/80 transition hover:bg-white/10"
                  title="Cerrar panel"
                >
                  <PanelLeftClose size={18} />
                </button>
              )}
            </div>

            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="mt-4 flex w-full items-center justify-center rounded-xl py-2 text-white/80 transition hover:bg-white/10"
                title="Abrir panel"
              >
                <PanelLeftOpen size={18} />
              </button>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            {!sidebarCollapsed ? (
              <div
                className="overflow-hidden rounded-2xl bg-white/5"
                onMouseEnter={() => setOpenBaltoWeb(true)}
                onMouseLeave={() => setOpenBaltoWeb(false)}
              >
                <div
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm ${
                    isLanding
                      ? "bg-white/[0.12] text-white"
                      : "text-white/[0.85] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3 overflow-hidden">
                    <Globe size={18} className="shrink-0" />
                    <span
                      className={`whitespace-nowrap transition-opacity duration-150 ${
                        showSidebarText ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      Balto Web
                    </span>
                  </span>

                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-200 ${
                      openBaltoWeb ? "rotate-180" : ""
                    }`}
                  />
                </div>

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
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {section.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <Link
                  to="/admin/landing/planes"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white/80 transition hover:bg-white/10"
                  title="Balto Web - Planes"
                >
                  <Globe size={20} />
                </Link>
              </div>
            )}
          </nav>

          <div className="border-t border-white/10 p-3">
            <button
              onClick={handleLogout}
              className={`flex w-full items-center rounded-2xl px-4 py-3 text-sm text-white/[0.85] transition hover:bg-white/10 ${
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

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
