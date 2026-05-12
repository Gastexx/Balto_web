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

export const PRICING_CONTENT = {
  badge: "Planes",
  title: "Opciones simples para cada etapa.",
  description:
    "Empezá con una base sólida y escalá cuando tu operación lo necesite.",
  fallbackPlans: [
    {
      id: 22,
      nombre: "Inicial",
      precio: "150.000",
      incluye: "Ventas y compras\nClientes y proveedores\nSoporte por email",
      destacado: 0,
      orden: 1,
      activo: 1,
    },
    {
      id: 23,
      nombre: "Profesional",
      precio: "320.000",
      incluye:
        "Todo lo del plan Inicial\nReportes y paneles\nPrioridad de soporte\nhola",
      destacado: 0,
      orden: 2,
      activo: 1,
    },
    {
      id: 24,
      nombre: "Empresa",
      precio: "470.000",
      incluye:
        "Flujos personalizados\nAcompañamiento en implementación\nEscalabilidad",
      destacado: 0,
      orden: 3,
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
