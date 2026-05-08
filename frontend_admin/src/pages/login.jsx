import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, ShieldCheck, User, Sparkles } from "lucide-react";
import API from "../api/api";
import logoWhite from "../assets/Balto_Blanco.png";
import logoMark from "../assets/balto.png";

export default function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post(
        "?action=login_admin",
        { usuario, password },
        { withCredentials: true }
      );

      if (res?.data?.exito) {
        localStorage.setItem("balto_admin", JSON.stringify(res.data.admin));
        navigate("/admin/dashboard");
      } else {
        alert(res?.data?.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("ERROR LOGIN:", error);
      alert(
        error?.response?.data?.mensaje ||
          error?.message ||
          "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="balto-page-bg min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-48px)] max-w-7xl items-center justify-center">
        <img
          src={logoMark}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-14 hidden h-80 w-80 object-contain opacity-[0.035] lg:block"
        />

        <section className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="balto-animate-up hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--balto-border)] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--balto-midnight)]/5">
                <Sparkles size={14} className="text-[var(--balto-action)]" />
              </span>
              <span className="text-sm font-medium text-[var(--balto-action)]">
                Gestión interna Balto
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-[var(--balto-midnight)] xl:text-6xl">
              Administrá la web con una experiencia limpia y moderna.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--balto-muted)]">
              Panel privado para mantener los planes publicados actualizados, respetando la estética minimalista de Balto.
            </p>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {["Acceso seguro", "Diseño Balto", "Planes editables"].map((item) => (
                <div
                  key={item}
                  className="balto-soft-card relative overflow-hidden rounded-[24px] p-5 text-center transition duration-300 hover:-translate-y-1"
                >
                  <img
                    src={logoMark}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 -right-5 h-20 w-20 object-contain opacity-[0.035]"
                  />
                  <div className="relative mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--balto-action)]/10 text-[var(--balto-action)]">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="relative text-sm font-medium text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="balto-animate-up mx-auto w-full max-w-md">
            <div className="balto-glass-card relative overflow-hidden rounded-[32px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.10),transparent_34%)]" />
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 object-contain opacity-[0.045]"
              />

              <div className="relative px-8 pb-5 pt-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--balto-midnight)] p-3 shadow-[0_16px_40px_rgba(10,37,64,0.28)]">
                  <img src={logoWhite} alt="Balto" className="h-auto max-h-8 w-auto object-contain" />
                </div>

                <span className="inline-flex items-center rounded-full border border-[var(--balto-border)] bg-white/[0.07]0 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--balto-action)]">
                  Panel privado
                </span>

                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--balto-midnight)]">
                  Iniciar sesión
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--balto-muted)]">
                  Ingresá con tu usuario administrador.
                </p>
              </div>

              <form onSubmit={handleLogin} className="relative px-8 pb-8">
                <label className="balto-floating-label mb-4 block">
                  <span>Usuario</span>
                  <div className="relative">
                    <User
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="admin"
                      className="w-full rounded-2xl border border-[var(--balto-border)] bg-white/80 px-4 pb-3 pr-11 text-sm outline-none transition focus:border-[var(--balto-action)] focus:bg-white focus:ring-4 focus:ring-[var(--balto-action)]/10"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                    />
                  </div>
                </label>

                <label className="balto-floating-label mb-6 block">
                  <span>Contraseña</span>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-[var(--balto-border)] bg-white/80 px-4 pb-3 pr-11 text-sm outline-none transition focus:border-[var(--balto-action)] focus:bg-white focus:ring-4 focus:ring-[var(--balto-action)]/10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--balto-action)] px-5 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(0,85,187,0.22)] transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
