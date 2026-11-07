import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/admin/layout/AdminLayout";
import PlansEditor from "../components/web/planes/PlansEditor";
import BASE_URL from "../config/config";
import { BadgeCheck } from "lucide-react";
import logoMark from "../imagenes/balto.png";
import { useToast } from "../components/Global/ToastContext";
import {
  DEFAULT_PLAN_SYSTEM,
  PLAN_SYSTEMS,
  buildSavePayload,
  createEmptyPlan,
  getPlanSystemLabel,
  getSystemSnapshot,
  normalizeEditorPlan,
  sortPlansByOrder,
  validatePlans,
} from "../components/web/planes/planUtils";

const ENDPOINTS = {
  load: "web_home_obtener",
  savePlans: "admin_planes_guardar",
};

function buildApiUrl(action, params = {}) {
  const base = BASE_URL.replace(/\/$/, "");
  const query = new URLSearchParams({ action, ...params });

  return `${base}/api.php?${query.toString()}`;
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
  // Todos los planes (ambas categorías). Cada uno lleva `sistema`.
  const [plans, setPlans] = useState([]);
  const [activeSystem, setActiveSystem] = useState(DEFAULT_PLAN_SYSTEM);
  // Última versión guardada de cada categoría, para detectar cambios pendientes.
  const [savedSnapshots, setSavedSnapshots] = useState({});
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

        const loaded = Array.isArray(data.plans)
          ? data.plans.map((item, index) => normalizeEditorPlan(item, index))
          : [];

        setPlans(loaded);
        setSavedSnapshots(
          Object.fromEntries(
            PLAN_SYSTEMS.map((system) => [system.id, getSystemSnapshot(system.id, loaded)])
          )
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadUrl]);

  // Planes de la pestaña activa, en el orden configurado.
  const systemPlans = useMemo(
    () => sortPlansByOrder(plans.filter((plan) => plan.sistema === activeSystem)),
    [plans, activeSystem]
  );

  const dirtySystems = useMemo(
    () =>
      Object.fromEntries(
        PLAN_SYSTEMS.map((system) => [
          system.id,
          savedSnapshots[system.id] !== undefined &&
            getSystemSnapshot(system.id, plans) !== savedSnapshots[system.id],
        ])
      ),
    [plans, savedSnapshots]
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        PLAN_SYSTEMS.map((system) => [
          system.id,
          plans.filter((plan) => plan.sistema === system.id).length,
        ])
      ),
    [plans]
  );

  // Todas las operaciones identifican el plan por `key`, nunca por posición,
  // para no afectar planes de la otra categoría.
  const updatePlanByKey = useCallback((key, updater) => {
    setPlans((prev) => prev.map((plan) => (plan.key === key ? updater(plan) : plan)));
  }, []);

  const updatePlan = (key, field, value) => {
    updatePlanByKey(key, (plan) => ({ ...plan, [field]: value }));
  };

  const updatePlanIncluye = (key, incluyeIndex, value) => {
    updatePlanByKey(key, (plan) => {
      const nuevoIncluye = Array.isArray(plan.incluye) ? [...plan.incluye] : [];
      nuevoIncluye[incluyeIndex] = value;

      return { ...plan, incluye: nuevoIncluye };
    });
  };

  const addPlanIncluye = (key) => {
    showToast("Ítem agregado correctamente.", "exito");
    updatePlanByKey(key, (plan) => ({
      ...plan,
      incluye: [...(Array.isArray(plan.incluye) ? plan.incluye : []), ""],
    }));
  };

  const removePlanIncluye = (key, incluyeIndex) => {
    showToast("Ítem eliminado correctamente.", "exito");
    updatePlanByKey(key, (plan) => ({
      ...plan,
      incluye: (Array.isArray(plan.incluye) ? plan.incluye : []).filter(
        (_, idx) => idx !== incluyeIndex
      ),
    }));
  };

  const addPlan = () => {
    showToast("Plan agregado correctamente.", "exito");
    setPlans((prev) => {
      const sameSystem = prev.filter((plan) => plan.sistema === activeSystem);
      const nextOrder =
        sameSystem.reduce((max, plan) => Math.max(max, Number(plan.orden) || 0), 0) + 1;

      return [...prev, createEmptyPlan(activeSystem, nextOrder)];
    });
  };

  const removePlan = (key) => {
    showToast("Plan eliminado. Guardá los cambios para confirmarlo.", "exito");
    setPlans((prev) => prev.filter((plan) => plan.key !== key));
  };

  // Mueve un plan dentro de su categoría y renumera el orden (1..n).
  const movePlan = (key, direction) => {
    setPlans((prev) => {
      const ordered = sortPlansByOrder(prev.filter((plan) => plan.sistema === activeSystem));
      const from = ordered.findIndex((plan) => plan.key === key);
      const to = from + direction;

      if (from < 0 || to < 0 || to >= ordered.length) return prev;

      const reordered = [...ordered];
      [reordered[from], reordered[to]] = [reordered[to], reordered[from]];

      const newOrder = Object.fromEntries(reordered.map((plan, index) => [plan.key, index + 1]));

      return prev.map((plan) =>
        newOrder[plan.key] !== undefined ? { ...plan, orden: newOrder[plan.key] } : plan
      );
    });
  };

  const savePlans = async () => {
    const sistema = activeSystem;
    const validationError = validatePlans(sistema, plans);

    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    try {
      setSavingPlans(true);

      const res = await fetch(buildApiUrl(ENDPOINTS.savePlans), {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(buildSavePayload(sistema, plans)),
      });

      let json = {};
      try {
        json = await res.json();
      } catch (parseError) {
        throw new Error("La API no devolvió una respuesta válida.");
      }

      if (!res.ok || !json?.exito) {
        throw new Error(
          json?.mensaje || json?.error || "No se pudieron guardar los planes."
        );
      }

      if (Array.isArray(json?.data)) {
        // Se reemplazan solo los planes de la categoría guardada; los cambios
        // pendientes de la otra pestaña se conservan.
        const savedPlans = json.data
          .map((item, index) => normalizeEditorPlan(item, index))
          .filter((plan) => plan.sistema === sistema);

        setPlans((prev) => [
          ...prev.filter((plan) => plan.sistema !== sistema),
          ...savedPlans,
        ]);
        setSavedSnapshots((snapshots) => ({
          ...snapshots,
          [sistema]: getSystemSnapshot(sistema, savedPlans),
        }));
      } else {
        setSavedSnapshots((snapshots) => ({
          ...snapshots,
          [sistema]: getSystemSnapshot(sistema, plans),
        }));
      }

      showToast(`Planes de ${getPlanSystemLabel(sistema)} guardados correctamente.`, "exito");
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
              Las demás secciones de la web quedaron fijas. Desde acá modificás los planes de BALTO Servicios y BALTO Comercio que se muestran desde la base de datos. Cada pestaña se guarda por separado.
            </p>
          </div>
        </section>

        <PlansEditor
          systems={PLAN_SYSTEMS}
          activeSystem={activeSystem}
          onChangeSystem={setActiveSystem}
          counts={counts}
          dirtySystems={dirtySystems}
          plans={systemPlans}
          movePlan={movePlan}
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
