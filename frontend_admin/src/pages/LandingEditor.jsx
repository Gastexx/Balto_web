import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/admin/layout/AdminLayout";
import PlansEditor from "../components/web/planes/PlansEditor";
import BASE_URL from "../config/config";
import { BadgeCheck } from "lucide-react";
import logoMark from "../imagenes/balto.png";
import { useToast } from "../components/Global/ToastContext";

const ENDPOINTS = {
  load: "web_home_obtener",
  savePlans: "admin_planes_guardar",
};

function buildApiUrl(action, params = {}) {
  const base = BASE_URL.replace(/\/$/, "");
  const query = new URLSearchParams({ action, ...params });

  return `${base}/api.php?${query.toString()}`;
}

function normalizePlan(plan, index = 0) {
  let incluye = [];

  if (Array.isArray(plan?.incluye)) {
    incluye = plan.incluye;
  } else if (typeof plan?.incluye === "string") {
    incluye = plan.incluye
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return {
    id: plan?.id ?? `new-${Date.now()}-${index}`,
    nombre: plan?.nombre ?? "",
    precio: plan?.precio ?? "",
    incluye,
    orden: Number(plan?.orden ?? index + 1),
  };
}

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

export default function LandingEditor() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [savingPlans, setSavingPlans] = useState(false);

  const loadUrl = useMemo(() => buildApiUrl(ENDPOINTS.load), []);

  useEffect(() => {
    if (!section || section !== "planes") {
      navigate("/admin/landing/planes", { replace: true });
    }
  }, [section, navigate]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(loadUrl, { credentials: "include" });
        const json = await res.json();
        const data = json?.data ?? json ?? {};

        if (!active) return;

        setPlans(
          Array.isArray(data.plans)
            ? data.plans.map((item, index) => normalizePlan(item, index))
            : []
        );
      } catch (error) {
        showToast("No se pudieron cargar los planes.", "error");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [loadUrl]);

  const updatePlan = (index, field, value) => {
    setPlans((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const updatePlanIncluye = (planIndex, incluyeIndex, value) => {
    setPlans((prev) =>
      prev.map((plan, i) => {
        if (i !== planIndex) return plan;

        const nuevoIncluye = Array.isArray(plan.incluye) ? [...plan.incluye] : [];
        nuevoIncluye[incluyeIndex] = value;

        return { ...plan, incluye: nuevoIncluye };
      })
    );
  };

  const addPlanIncluye = (planIndex) => {
    showToast("Ítem agregado correctamente.", "exito");
    setPlans((prev) =>
      prev.map((plan, i) => {
        if (i !== planIndex) return plan;

        return {
          ...plan,
          incluye: [...(Array.isArray(plan.incluye) ? plan.incluye : []), ""],
        };
      })
    );
  };

  const removePlanIncluye = (planIndex, incluyeIndex) => {
    showToast("Ítem eliminado correctamente.", "exito");
    setPlans((prev) =>
      prev.map((plan, i) => {
        if (i !== planIndex) return plan;

        return {
          ...plan,
          incluye: (Array.isArray(plan.incluye) ? plan.incluye : []).filter(
            (_, idx) => idx !== incluyeIndex
          ),
        };
      })
    );
  };

  const addPlan = () => {
    showToast("Plan agregado correctamente.", "exito");
    setPlans((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        nombre: "",
        precio: "",
        incluye: [],
        orden: prev.length + 1,
      },
    ]);
  };

  const removePlan = (index) => {
    showToast("Plan eliminado correctamente.", "exito");
    setPlans((prev) => prev.filter((_, i) => i !== index));
  };

  const savePlans = async () => {
    try {
      setSavingPlans(true);

      const payload = {
        items: plans.map((item, index) => ({
          nombre: String(item.nombre ?? "").trim(),
          precio: String(item.precio ?? "").trim(),
          incluye: Array.isArray(item.incluye)
            ? item.incluye
                .map((v) => String(v ?? "").trim())
                .filter(Boolean)
                .join("\n")
            : "",
          orden: Number(item.orden ?? index + 1),
        })),
      };

      const res = await fetch(buildApiUrl(ENDPOINTS.savePlans), {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json?.exito) {
        throw new Error(
          json?.error || json?.mensaje || "No se pudieron guardar los planes."
        );
      }

      setPlans(
        Array.isArray(json?.data)
          ? json.data.map((item, index) => normalizePlan(item, index))
          : plans
      );

      showToast("Planes guardados correctamente.", "exito");
    } catch (error) {
      showToast(error.message || "Error al guardar planes.", "error");
    } finally {
      setSavingPlans(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <div className="balto-glass-card h-40 animate-pulse rounded-[30px]" />
          <div className="balto-soft-card h-52 animate-pulse rounded-[30px]" />
          <div className="balto-soft-card h-52 animate-pulse rounded-[30px]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <section className="balto-glass-card balto-animate-up relative overflow-hidden rounded-[32px] px-6 py-7 sm:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,85,187,0.10),transparent_34%)]" />
          <img
            src={logoMark}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-12 h-52 w-52 object-contain opacity-[0.035]"
          />

          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--balto-border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--balto-action)] shadow-sm backdrop-blur-md">
              <BadgeCheck size={16} />
              Balto Web
            </span>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-[var(--balto-midnight)] lg:text-5xl">
              Editor de Planes
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--balto-muted)]">
              Las demás secciones de la web quedaron fijas. Desde acá solamente modificás los planes que se muestran desde la base de datos.
            </p>
          </div>
        </section>

        <PlansEditor
          plans={plans}
          updatePlan={updatePlan}
          updatePlanIncluye={updatePlanIncluye}
          addPlanIncluye={addPlanIncluye}
          removePlanIncluye={removePlanIncluye}
          addPlan={addPlan}
          removePlan={removePlan}
          savePlans={savePlans}
          savingPlans={savingPlans}
        />
      </div>
    </AdminLayout>
  );
}
