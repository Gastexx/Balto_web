import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/admin/layout/AdminLayout";
import PlansEditor from "../components/web/planes/PlansEditor";
import { apiUrl } from "../config/config";

const ENDPOINTS = {
  load: "web_home_obtener",
  savePlans: "admin_planes_guardar",
};

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

  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [savingPlans, setSavingPlans] = useState(false);

  const loadUrl = useMemo(() => apiUrl(ENDPOINTS.load), []);

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
        console.error("Error cargando planes:", error);
        alert("No se pudieron cargar los planes.");
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

      const res = await fetch(apiUrl(ENDPOINTS.savePlans), {
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

      alert("Planes guardados correctamente.");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al guardar planes.");
    } finally {
      setSavingPlans(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <div className="h-8 w-72 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-40 animate-pulse rounded-3xl bg-slate-200" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-medium text-[var(--balto-text,#0f172a)]">
            Editor de Planes
          </h1>
          <p className="mt-2 text-sm font-normal text-slate-500">
            Las demás secciones de la web quedaron fijas. Desde acá solamente modificás los planes que se muestran desde la base de datos.
          </p>
        </div>

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
