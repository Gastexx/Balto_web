export const HEADER_CONTENT = {
  brandTitle: "Balto",
  brandSubtitle: "sistema contable",
  ctaText: "suscribirse",
  ctaLink: "#pricing",
  menu: [
    { label: "Inicio", href: "#inicio" },
    { label: "Beneficios", href: "#features" },
    { label: "Planes", href: "#pricing" },
    { label: "Opiniones", href: "#testimonials" },
    { label: "Contacto", href: "#contacto" },
  ],
};

export const HERO_CONTENT = {
  badge: "Gestión contable moderna para empresas y estudios",
  title: "Centralizá ventas, compras y reportes en un solo sistema.",
  description:
    "Balto simplifica tu operación diaria con módulos claros, reportes útiles y una experiencia rápida para equipos que necesitan orden y control real.",
  primaryCtaText: "Ver planes",
  primaryCtaLink: "#pricing",
  secondaryCtaText: "Explorar beneficios",
  secondaryCtaLink: "#features",
  highlights: [
    "Implementación simple",
    "Reportes en tiempo real",
    "Datos organizados y seguros",
  ],
};

export const FEATURES_CONTENT = {
  badge: "Beneficios",
  title: "Diseñado para que trabajar sea más simple.",
  description:
    "Una interfaz prolija, rápida y preparada para crecer con tu operación sin complicar tu día a día.",
  items: [
    {
      icon: "LayoutDashboard",
      title: "Panel simple y claros",
      text: "Accedé a la información más importante sin perder tiempo entre pantallas innecesarias.",
    },
    {
      icon: "ReceiptText",
      title: "Ventas y compras ordenadas",
      text: "Registrá movimientos con reglas claras y mantené una estructura coherente en todo el sistema.",
    },
    {
      icon: "Users",
      title: "Clientes y proveedoressd",
      text: "Centralizá relaciones comerciales y encontrá rápido cada dato cuando lo necesitás.",
    },
    {
      icon: "FileBarChart2",
      title: "Reportes útiles",
      text: "Visualizá resultados, seguimiento mensual y datos clave para tomar decisiones con respaldo.",
    },
  ],
};

// Sistemas / pestañas de la sección de planes. El valor `id` coincide con la
// columna `planes_saas.sistema` de la base de datos.
export const PLAN_SYSTEMS = [
  { id: "servicios", label: "BALTO Servicios", shortLabel: "Servicios" },
  { id: "comercio", label: "BALTO Comercio", shortLabel: "Comercio" },
];

export const PRICING_CONTENT = {
  badge: "Planes",
  title: "Opciones simples para cada etapa.",
  description:
    "Empezá con una base sólida y escalá cuando tu operación lo necesite.",
  // Respaldo usado solo si la API no responde. Los datos reales se
  // administran desde el panel (action admin_planes_guardar).
  fallbackPlans: [
    {
      id: "fallback-servicios-1",
      sistema: "servicios",
      nombre: "Servicios Profesionales",
      precio: "95.000",
      descripcion:
        "Orientado a profesionales que venden su tiempo o conocimiento.",
      incluye: [
        "Clientes y proveedores",
        "Facturación electrónica vinculada con ARCA",
        "Registro de ingresos y egresos",
        "Presupuestos y seguimiento de trabajos",
        "Cuentas corrientes y saldos",
        "Cobros por medio de pago, cheques y eCheqs",
        "Flujo de caja y control financiero",
        "Historial, filtros y reportes",
      ],
      destacado: 0,
      orden: 1,
      activo: 1,
    },
    {
      id: "fallback-servicios-2",
      sistema: "servicios",
      nombre: "Servicios con Insumos",
      precio: "130.000",
      descripcion:
        "Orientado a negocios que trabajan con materiales o equipos de trabajadores.",
      incluye: [
        "Todo lo del plan Servicios Profesionales",
        "Materiales e insumos con control de stock",
        "Compras a proveedores que actualizan el stock",
        "Asignación de trabajadores a cada servicio",
        "Costo y ganancia por trabajo u obra",
      ],
      destacado: 0,
      orden: 2,
      activo: 1,
    },
    {
      id: "fallback-servicios-3",
      sistema: "servicios",
      nombre: "Servicios con Venta",
      precio: "180.000",
      nota: "Combina BALTO Servicios y BALTO Comercio.",
      descripcion:
        "Orientado a negocios que realizan trabajos y además venden productos.",
      incluye: [
        "Todo lo del plan Servicios con Insumos",
        "Catálogo de productos con precio de venta",
        "Stock de productos separado de los insumos",
        "Venta de mostrador sin abrir un trabajo",
        "Servicios y productos en un mismo comprobante",
        "Ganancia separada por servicios y productos",
      ],
      destacado: 0,
      orden: 3,
      activo: 1,
    },
    {
      id: "fallback-comercio-1",
      sistema: "comercio",
      nombre: "BALTO Comercio",
      precio: "160.000",
      descripcion:
        "Gestión comercial completa para centralizar ventas, compras, stock, facturación y finanzas.",
      incluye: [
        "Gestión completa de ventas y compras",
        "Facturación electrónica vinculada con ARCA",
        "Notas de crédito y registro de movimientos",
        "Control de stock, productos e inventario",
        "Administración de clientes y proveedores",
        "Cuentas corrientes y seguimiento de saldos",
        "Gestión y seguimiento de cheques y eCheqs",
        "Presupuestos y seguimiento comercial",
        "Flujo de caja y análisis financiero",
        "Gestión completa de medios de pago",
        "Reportes, métricas e historial de movimientos",
        "Control integral administrativo y financiero",
      ],
      destacado: 0,
      orden: 1,
      activo: 1,
    },
    {
      id: "fallback-comercio-2",
      sistema: "comercio",
      nombre: "BALTO Comercio Pro",
      precio: "195.000",
      descripcion:
        "Para comercios que también venden online o manejan muchos productos.",
      incluye: [
        "Todo lo incluido en BALTO Comercio",
        "Integración y sincronización con Tienda Nube",
        "Productos, ventas y stock conectados con la tienda online",
        "Generación de códigos de barras para productos",
        "Asociación de códigos de barras existentes",
        "Lectura de códigos para agilizar ventas, compras y stock",
        "Gestión centralizada del comercio físico y online",
      ],
      destacado: 0,
      orden: 2,
      activo: 1,
    },
  ],
};

export const TESTIMONIALS_CONTENT = {
  badge: "Opiniones",
  title: "Equipos que ya trabajan con más claridad.",
  description:
    "Una propuesta pensada para simplificar la operación real, no para sumar complejidad.",
  items: [
    {
      id: 10,
      name: "Lucía Herreracx",
      role: "Usuario",
      quote:
        "Logramos ordenar procesos que antes hacíamos de forma manual. La interfaz es clara y el equipo se adaptó muy rápido.ds",
    },
    {
      id: 11,
      name: "Mariano Lópeze",
      role: "Usuario",
      quote:
        "Lo mejor fue tener una visión más limpia del negocio. Los reportes y la navegación ayudan mucho a trabajar mejor.",
    },
    {
      id: 12,
      name: "Valeria Gómez",
      role: "Usuario",
      quote:
        "Pasamos de planillas dispersas a un sistema con más coherencia. Ahorramos tiempo y tenemos mejor control diario.",
    },
  ],
};

export const FOOTER_CONTENT = {
  brand: "BALTO",
  subtitle: "Sistema contable y administrativo",
  description:
    "Soluciones inteligentes para la gestión contable, administrativa y financiera de tu empresa.",
  productTitle: "Producto",
  contactTitle: "Contacto",
  email: "contacto@balto.com",
  phone: "+54 9 3564 000000",
  address: "San Francisco, Córdoba, Argentina",
  copyright: "© 2026 Balto. Un producto de 3devs.solution",
  productLinks: [
    { label: "Beneficiosds", href: "#features" },
    { label: "Planes", href: "#pricing" },
    { label: "Opiniones", href: "#testimonials" },
  ],
  legalLinks: [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
  ],
};
