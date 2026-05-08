// Configuración central del backend.
// Podés dejar la URL apuntando a la carpeta /routes o directamente a /routes/api.php.
// El frontend normaliza automáticamente la URL final para llamar siempre al api.php.

const RAW_BASE_URL = "https://panel.balto.com.ar/api/routes/api.php";

function removeTrailingSlashes(value) {
  return String(value || "").replace(/\/+$/, "");
}

export const API_BASE_URL = (() => {
  const cleanUrl = removeTrailingSlashes(RAW_BASE_URL);

  if (cleanUrl.endsWith("/api.php")) {
    return cleanUrl;
  }

  return `${cleanUrl}/api.php`;
})();

export function apiUrl(action) {
  const separator = API_BASE_URL.includes("?") ? "&" : "?";
  return `${API_BASE_URL}${separator}action=${encodeURIComponent(action)}`;
}

export default API_BASE_URL;

// Local usando router central:
// const RAW_BASE_URL = "http://localhost:3001/routes";
// Resultado automático: http://localhost:3001/routes/api.php

// Local apuntando directo al archivo:
// const RAW_BASE_URL = "http://localhost:3001/routes/api.php";

// Producción:
// const RAW_BASE_URL = "https://baltoadmin.3devsnet.com/api/routes";
// Resultado automático: https://baltoadmin.3devsnet.com/api/routes/api.php
