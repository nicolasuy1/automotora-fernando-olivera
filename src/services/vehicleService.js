import { vehicles as initialVehicles } from "../data/vehicles.js";

const STORAGE_KEY = "fo_vehicles_data";

// Initialize data from localStorage or initial data
function getStoredVehicles() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing stored vehicles", e);
    }
  }
  return initialVehicles;
}

let currentVehicles = getStoredVehicles();

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentVehicles));
}

export const CATEGORIES = [
  { id: "automoviles", label: "Automóviles" },
  { id: "camionetas", label: "Camionetas" },
  { id: "motos", label: "Motos" },
];

export const VEHICLE_TYPES = [
  { id: "todos", label: "Todos" },
  { id: "compact", label: "Compacto" },
  { id: "sedan", label: "Sedán" },
  { id: "suv", label: "SUV" },
  { id: "pickup", label: "Camioneta" },
  { id: "moto", label: "Moto" },
];

export const STATUS_OPTIONS = [
  { id: "available", label: "Disponible" },
  { id: "reserved", label: "Reservado" },
  { id: "sold", label: "Vendido" },
];

export const FUEL_OPTIONS = ["Nafta", "Gasoil", "Híbrido", "Eléctrico"];
export const TRANSMISSION_OPTIONS = ["Manual", "Automática"];
export const VISUAL_TYPES = ["compact", "sedan", "suv", "pickup", "moto"];

export function getVehicles() {
  return [...currentVehicles];
}

export function getAllVehicles() {
  return [...currentVehicles];
}

export function getPublishedVehicles() {
  return currentVehicles.filter(v => v.status === "available" || v.status === "sold");
}

export function getFeaturedVehicles(limit = 3) {
  return currentVehicles.filter(v => v.featured).slice(0, limit);
}

export function getVehicleBySlug(slug) {
  return currentVehicles.find(v => v.slug === slug);
}

export function getVehicleById(id) {
  return currentVehicles.find(v => v.id === id);
}

export function getRelatedVehicles(currentVehicle, limit = 4) {
  if (!currentVehicle) return [];
  return currentVehicles
    .filter(v => v.id !== currentVehicle.id && v.category === currentVehicle.category)
    .slice(0, limit);
}

export function getAllBrands() {
  const brands = currentVehicles.map(v => v.brand);
  return ["Todas", ...new Set(brands)];
}

export function getDashboardStats() {
  return {
    total: currentVehicles.length,
    published: currentVehicles.filter(v => v.status === "available").length,
    sold: currentVehicles.filter(v => v.status === "sold").length,
    draft: currentVehicles.filter(v => v.status === "reserved").length,
    hidden: currentVehicles.filter(v => v.status === "hidden").length,
    featured: currentVehicles.filter(v => v.featured).length,
    recent: currentVehicles.slice(0, 5),
  };
}

export function createVehicle(data) {
  const newVehicle = {
    ...data,
    id: Date.now().toString(),
    slug: (data.title || `${data.brand}-${data.model}`).toLowerCase().replace(/ /g, "-") + "-" + Date.now().toString().slice(-4),
    createdAt: new Date().toISOString(),
  };
  currentVehicles = [newVehicle, ...currentVehicles];
  persist();
  return newVehicle;
}

export function updateVehicle(id, data) {
  currentVehicles = currentVehicles.map(v => v.id === id ? { ...v, ...data, updatedAt: new Date().toISOString() } : v);
  persist();
}

export function deleteVehicle(id) {
  currentVehicles = currentVehicles.filter(v => v.id !== id);
  persist();
}

export function markAsSold(id) {
  currentVehicles = currentVehicles.map(v => v.id === id ? { ...v, status: "sold" } : v);
  persist();
}

export function toggleFeatured(id) {
  currentVehicles = currentVehicles.map(v => v.id === id ? { ...v, featured: !v.featured } : v);
  persist();
}

export function togglePublished(id) {
  currentVehicles = currentVehicles.map(v => v.id === id ? { ...v, status: v.status === "available" ? "hidden" : "available" } : v);
  persist();
}

export function duplicateVehicle(id) {
  const original = getVehicleById(id);
  if (!original) return;
  const copy = {
    ...original,
    id: Date.now().toString(),
    title: original.title + " (Copia)",
    slug: original.slug + "-copy-" + Date.now().toString().slice(-4),
    createdAt: new Date().toISOString(),
  };
  currentVehicles = [copy, ...currentVehicles];
  persist();
  return copy;
}

export function getDefaultVehicle() {
  return {
    title: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    type: "compact",
    category: "automoviles",
    priceUsd: null,
    priceVisible: true,
    askPrice: false,
    mileage: null,
    fuel: "Nafta",
    transmission: "Manual",
    color: "",
    engine: "",
    doors: 4,
    shortDescription: "",
    longDescription: "",
    mainImageUrl: "",
    imageAlt: "",
    visual: "compact",
    featured: false,
    status: "available",
    financingText: "Financiación flexible",
    acceptsTrade: true,
    highlights: [],
    equipment: [],
    galleryUrls: [],
    badge: "",
  };
}
