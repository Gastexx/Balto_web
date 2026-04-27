import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import HeaderSection from "../components/HeaderSection";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PlansSection from "../components/PlansSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FooterSection from "../components/FooterSection";
import BASE_URL from "../config/config";

const ENDPOINTS = {
  load: "web_home_obtener",
  saveConfig: "admin_config_guardar",
  saveFeatures: "admin_features_guardar",
  savePlans: "admin_planes_guardar",
  saveTestimonials: "admin_testimonials_guardar",
};

function normalizeConfig(rawConfig) {
  if (!rawConfig) return {};

  const result = {};

  Object.entries(rawConfig).forEach(([key, value]) => {
    if (value && typeof value === "object" && "valor" in value) {
      result[key] = value.valor ?? "";
    } else {
      result[key] = value ?? "";
    }
  });

  return result;
}

function safeJsonParse(value, fallback = []) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
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

  const [loading, setLoading] = useState(true);

  const [config, setConfig] = useState({});
  const [features, setFeatures] = useState([]);
  const [plans, setPlans] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [headerMenu, setHeaderMenu] = useState([]);
  const [footerProductLinks, setFooterProductLinks] = useState([]);
  const [footerLegalLinks, setFooterLegalLinks] = useState([]);

  const [savingConfig, setSavingConfig] = useState(false);
  const [savingFeatures, setSavingFeatures] = useState(false);
  const [savingPlans, setSavingPlans] = useState(false);
  const [savingTestimonials, setSavingTestimonials] = useState(false);

  const loadUrl = useMemo(() => `${BASE_URL}?action=${ENDPOINTS.load}`, []);

  useEffect(() => {
    const validSections = [
      "header",
      "hero",
      "features",
      "planes",
      "testimonials",
      "footer",
    ];

    if (!section || !validSections.includes(section)) {
      navigate("/admin/landing/header", { replace: true });
    }
  }, [section, navigate]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(loadUrl);
        const json = await res.json();

        console.log("HOME RAW JSON:", json);
        console.log("HOME DATA:", json?.data);
        console.log("CONFIG:", json?.data?.config);
        console.log("FEATURES:", json?.data?.features);
        console.log("PLANS:", json?.data?.plans);
        console.log("TESTIMONIALS:", json?.data?.testimonials);

        const data = json?.data ?? json ?? {};
        if (!active) return;

        const normalizedConfig = normalizeConfig(data.config ?? {});

        setConfig(normalizedConfig);
        setFeatures(Array.isArray(data.features) ? data.features : []);
        setPlans(
          Array.isArray(data.plans)
            ? data.plans.map((item, index) => normalizePlan(item, index))
            : []
        );
        setTestimonials(
          Array.isArray(data.testimonials) ? data.testimonials : []
        );

        setHeaderMenu(safeJsonParse(normalizedConfig.header_menu, []));
        setFooterProductLinks(
          safeJsonParse(normalizedConfig.footer_product_links, [])
        );
        setFooterLegalLinks(
          safeJsonParse(normalizedConfig.footer_legal_links, [])
        );
      } catch (error) {
        console.error("Error cargando landing:", error);
        alert("No se pudo cargar la landing.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [loadUrl]);

  const updateConfigValue = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const updateFeature = (index, field, value) => {
    setFeatures((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addFeature = () => {
    setFeatures((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        titulo: "",
        texto: "",
        orden: prev.length + 1,
        activo: 1,
      },
    ]);
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

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

  const updateTestimonial = (index, field, value) => {
    setTestimonials((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addTestimonial = () => {
    setTestimonials((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        nombre: "",
        rol: "",
        texto: "",
        orden: prev.length + 1,
        activo: 1,
      },
    ]);
  };

  const removeTestimonial = (index) => {
    setTestimonials((prev) => prev.filter((_, i) => i !== index));
  };

  const updateHeaderMenuItem = (index, field, value) => {
    setHeaderMenu((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addHeaderMenuItem = () => {
    setHeaderMenu((prev) => [...prev, { label: "", href: "#" }]);
  };

  const removeHeaderMenuItem = (index) => {
    setHeaderMenu((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFooterProductLink = (index, field, value) => {
    setFooterProductLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addFooterProductLink = () => {
    setFooterProductLinks((prev) => [...prev, { label: "", href: "#" }]);
  };

  const removeFooterProductLink = (index) => {
    setFooterProductLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFooterLegalLink = (index, field, value) => {
    setFooterLegalLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const addFooterLegalLink = () => {
    setFooterLegalLinks((prev) => [...prev, { label: "", href: "#" }]);
  };

  const removeFooterLegalLink = (index) => {
    setFooterLegalLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const saveConfigSection = async (keys, extraItems = []) => {
    try {
      setSavingConfig(true);

      const payload = {
        items: [
          ...keys.map(({ key }) => ({
            clave: key,
            valor: config[key] ?? "",
            tipo: "text",
          })),
          ...extraItems,
        ],
      };

      const res = await fetch(`${BASE_URL}?action=${ENDPOINTS.saveConfig}`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json?.exito) {
        throw new Error(json?.mensaje || "No se pudo guardar.");
      }

      alert("Sección guardada correctamente.");
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al guardar.");
    } finally {
      setSavingConfig(false);
    }
  };

  const saveFeatures = async () => {
    try {
      setSavingFeatures(true);

      const payload = {
        items: features.map((item, index) => ({
          titulo: String(item.titulo ?? "").trim(),
          texto: String(item.texto ?? "").trim(),
          orden: Number(item.orden ?? index + 1),
          activo: Number(item.activo ?? 1),
        })),
      };

      const res = await fetch(`${BASE_URL}?action=${ENDPOINTS.saveFeatures}`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!json?.exito) {
        throw new Error(json?.mensaje || "No se pudieron guardar las features.");
      }

      alert("Features guardadas correctamente.");

      const reload = await fetch(loadUrl);
      const reloadJson = await reload.json();
      const data = reloadJson?.data ?? reloadJson ?? {};
      setFeatures(Array.isArray(data.features) ? data.features : []);
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al guardar features.");
    } finally {
      setSavingFeatures(false);
    }
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

      console.log("PAYLOAD SAVE PLANS:", payload);

      const res = await fetch(`${BASE_URL}?action=${ENDPOINTS.savePlans}`, {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      console.log("RESPUESTA SAVE PLANS:", json);

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

  const saveTestimonials = async () => {
    try {
      setSavingTestimonials(true);

      const payload = {
        items: testimonials.map((item, index) => ({
          nombre: String(item.nombre ?? "").trim(),
          rol: String(item.rol ?? "").trim(),
          texto: String(item.texto ?? "").trim(),
          orden: Number(item.orden ?? index + 1),
          activo: Number(item.activo ?? 1),
        })),
      };

      const res = await fetch(
        `${BASE_URL}?action=${ENDPOINTS.saveTestimonials}`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();

      if (!json?.exito) {
        throw new Error(
          json?.mensaje || "No se pudieron guardar los testimonios."
        );
      }

      alert("Testimonios guardados correctamente.");

      const reload = await fetch(loadUrl);
      const reloadJson = await reload.json();
      const data = reloadJson?.data ?? reloadJson ?? {};

      setTestimonials(Array.isArray(data.testimonials) ? data.testimonials : []);
    } catch (error) {
      console.error(error);
      alert(error.message || "Error al guardar testimonios.");
    } finally {
      setSavingTestimonials(false);
    }
  };

  const renderCurrentSection = () => {
    if (section === "header") {
      return (
        <HeaderSection
          config={config}
          updateConfigValue={updateConfigValue}
          headerMenu={headerMenu}
          updateHeaderMenuItem={updateHeaderMenuItem}
          addHeaderMenuItem={addHeaderMenuItem}
          removeHeaderMenuItem={removeHeaderMenuItem}
          saveConfigSection={saveConfigSection}
          savingConfig={savingConfig}
        />
      );
    }

    if (section === "hero") {
      return (
        <HeroSection
          config={config}
          updateConfigValue={updateConfigValue}
          saveConfigSection={saveConfigSection}
          savingConfig={savingConfig}
        />
      );
    }

    if (section === "features") {
      return (
        <FeaturesSection
          features={features}
          updateFeature={updateFeature}
          addFeature={addFeature}
          removeFeature={removeFeature}
          saveFeatures={saveFeatures}
          savingFeatures={savingFeatures}
        />
      );
    }

    if (section === "planes") {
      return (
        <PlansSection
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
      );
    }

    if (section === "testimonials") {
      return (
        <TestimonialsSection
          testimonials={testimonials}
          updateTestimonial={updateTestimonial}
          addTestimonial={addTestimonial}
          removeTestimonial={removeTestimonial}
          saveTestimonials={saveTestimonials}
          savingTestimonials={savingTestimonials}
        />
      );
    }

    if (section === "footer") {
      return (
        <FooterSection
          config={config}
          updateConfigValue={updateConfigValue}
          footerProductLinks={footerProductLinks}
          updateFooterProductLink={updateFooterProductLink}
          addFooterProductLink={addFooterProductLink}
          removeFooterProductLink={removeFooterProductLink}
          footerLegalLinks={footerLegalLinks}
          updateFooterLegalLink={updateFooterLegalLink}
          addFooterLegalLink={addFooterLegalLink}
          removeFooterLegalLink={removeFooterLegalLink}
          saveConfigSection={saveConfigSection}
          savingConfig={savingConfig}
        />
      );
    }

    return null;
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
            Editor de Landing
          </h1>
          <p className="mt-2 text-sm font-normal text-slate-500">
            Editá el contenido público de Balto por bloques independientes.
          </p>
        </div>

        {renderCurrentSection()}
      </div>
    </AdminLayout>
  );
}