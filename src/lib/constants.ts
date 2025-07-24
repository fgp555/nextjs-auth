// src/lib/constants.ts

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://appsystered.com";
export const apiBaseUrl = baseUrl + "/api";

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

// Información general del sitio (marca, empresa, negocio, etc.)
export const siteInfo = {
  name: "Mi Negocio",
  logoUrl: "/logo.png", // o una URL externa
  description: "Descripción general del sitio, clínica o restaurante.",
  phone: "+51 999 999 999",
  email: "contacto@minegocio.com",
  address: "Dirección del negocio, clínica o restaurante",
  type: "restaurante", // puedes usar: 'clinica', 'tienda', etc.
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.fgp555.transpaservic",
};

console.log("apiBaseUrl", apiBaseUrl);
console.log("isDevelopment", isDevelopment);
