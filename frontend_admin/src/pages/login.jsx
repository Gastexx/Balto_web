import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User, Lock } from "lucide-react";
import API from "../api/api";

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

      console.log("LOGIN RESPONSE:", res?.data);

      if (res?.data?.exito) {
        localStorage.setItem("balto_admin", JSON.stringify(res.data.admin));
        navigate("/admin/dashboard");
      } else {
        alert(res?.data?.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("ERROR LOGIN:", error);
      console.log("ERROR RESPONSE:", error?.response?.data);

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
    <div className="flex min-h-screen items-center justify-center bg-[var(--balto-bg)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[var(--balto-border)] bg-white shadow-xl">
        <div className="px-8 pb-4 pt-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--balto-midnight)] text-white">
            <Shield size={26} />
          </div>

          <h1 className="text-2xl font-semibold text-[var(--balto-text)]">
            Panel Administrador
          </h1>
          <p className="mt-2 text-sm text-[var(--balto-muted)]">
            Ingresá con tu usuario
          </p>
        </div>

        <form onSubmit={handleLogin} className="px-8 pb-8">
          <label className="mb-2 block text-sm font-medium text-[var(--balto-text)]">
            Usuario
          </label>
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[var(--balto-border)] px-4 py-3">
            <User size={18} className="text-[var(--balto-muted)]" />
            <input
              type="text"
              placeholder="admin"
              className="w-full bg-transparent outline-none"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <label className="mb-2 block text-sm font-medium text-[var(--balto-text)]">
            Contraseña
          </label>
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[var(--balto-border)] px-4 py-3">
            <Lock size={18} className="text-[var(--balto-muted)]" />
            <input
              type="password"
              placeholder="********"
              className="w-full bg-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[var(--balto-action)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}