/**
 * Vehicle Service — Capa de datos centralizada
 *
 * Usa localStorage como persistencia temporal.
 * Preparado para migrar a Supabase cambiando solo este archivo.
 *
 * Todas las funciones devuelven datos directamente (sync por ahora).
 * Cuando se conecte Supabase, se pueden convertir a async.
 */

const STORAGE_KEY = "fo_vehicles";
const INITIALIZED_KEY = "fo_vehicles_initialized";

// ─── Seed Data ──────────────────────────────────────────────────────────────────
const showroomImage = "/images/backgrounds/showroom-premium.jpeg";

const SEED_VEHICLES = [
  {
    id: "cruze-ltz-rs-2015",
    slug: "chevrolet-cruze-ltz-rs-2015",
    title: "Chevrolet Cruze LTZ RS",
    brand: "Chevrolet",
    model: "Cruze LTZ RS",
    year: 2015,
    category: "sedán",
    type: "autos",
    priceUsd: 13990,
    priceVisible: true,
    askPrice: false,
    mileage: null,
    fuel: "Nafta",
    transmission: "Automática",
    color: "",
    engine: "",
    doors: 4,
    shortDescription:
      "Sedán elegante, cómodo y con equipamiento superior. Una oportunidad para subir de nivel sin perder opciones de financiación.",
    longDescription: "",
    highlights: ["Techo solar", "Arranque por botón", "Interior moderno", "Confort premium"],
    equipment: [],
    financingText: "Financiación hasta en 36 cuotas",
    acceptsTrade: true,
    status: "published",
    featured: true,
    mainImageUrl: showroomImage,
    galleryUrls: [showroomImage, showroomImage, showroomImage],
    imageAlt: "Sedán elegante en showroom oscuro con luces premium",
    internalNotes: "",
    visual: "sedan",
    badge: "Gama superior",
    createdAt: "2026-05-01T12:00:00Z",
    updatedAt: "2026-05-01T12:00:00Z",
  },
  {
    id: "ford-ranger-xlt",
    slug: "ford-ranger-xlt",
    title: "Ford Ranger XLT",
    brand: "Ford",
    model: "Ranger XLT",
    year: 2018,
    category: "utilitario",
    type: "camionetas",
    priceUsd: null,
    priceVisible: false,
    askPrice: true,
    mileage: null,
    fuel: "Diesel",
    transmission: "Manual",
    color: "",
    engine: "",
    doors: 4,
    shortDescription:
      "Camioneta robusta, preparada para trabajo, ruta y uso familiar. Ideal para quien necesita presencia, fuerza y capacidad.",
    longDescription: "",
    highlights: ["Motor diesel", "Doble cabina", "Capacidad de carga", "Uso trabajo/familia"],
    equipment: [],
    financingText: "Opciones por banco o por la casa",
    acceptsTrade: true,
    status: "published",
    featured: true,
    mainImageUrl: showroomImage,
    galleryUrls: [showroomImage, showroomImage, showroomImage],
    imageAlt: "Camioneta pick-up robusta en presentación premium",
    internalNotes: "",
    visual: "pickup",
    badge: "Pick-up fuerte",
    createdAt: "2026-05-01T12:00:00Z",
    updatedAt: "2026-05-01T12:00:00Z",
  },
  {
    id: "volkswagen-gol-g7-2018",
    slug: "volkswagen-gol-g7-2018",
    title: "Volkswagen Gol G7",
    brand: "Volkswagen",
    model: "Gol G7",
    year: 2018,
    category: "compacto",
    type: "autos",
    priceUsd: 14490,
    priceVisible: true,
    askPrice: false,
    mileage: 85000,
    fuel: "Nafta",
    transmission: "Manual",
    color: "",
    engine: "",
    doors: 4,
    shortDescription:
      "Compacto confiable, económico y perfecto para el día a día. Ideal como primer vehículo o para moverse con comodidad.",
    longDescription: "",
    highlights: ["Aire acondicionado", "Vidrios eléctricos", "Comandos en volante", "Tanque lleno"],
    equipment: [],
    financingText: "Financiación flexible por banco",
    acceptsTrade: true,
    status: "published",
    featured: true,
    mainImageUrl: showroomImage,
    galleryUrls: [showroomImage, showroomImage, showroomImage],
    imageAlt: "Auto compacto urbano presentado con iluminación de showroom",
    internalNotes: "",
    visual: "compact",
    badge: "Compacto urbano",
    createdAt: "2026-05-01T12:00:00Z",
    updatedAt: "2026-05-01T12:00:00Z",
  },
  {
    id: "fiat-strada",
    slug: "fiat-strada",
    title: "Fiat Strada",
    brand: "Fiat",
    model: "Strada",
    year: 2020,
    category: "utilitario",
    type: "camionetas",
    priceUsd: null,
    priceVisible: false,
    askPrice: true,
    mileage: null,
    fuel: "Nafta",
    transmission: "Manual",
    color: "",
    engine: "",
    doors: 2,
    shortDescription:
      "Utilitario compacto para emprendedores, reparto o uso mixto. Practicidad, bajo consumo y capacidad de trabajo.",
    longDescription: "",
    highlights: ["Caja de carga", "Bajo consumo", "Trabajo diario", "Permuta disponible"],
    equipment: [],
    financingText: "Entrega y saldo financiado",
    acceptsTrade: true,
    status: "published",
    featured: false,
    mainImageUrl: showroomImage,
    galleryUrls: [showroomImage, showroomImage, showroomImage],
    imageAlt: "Utilitario compacto para trabajo presentado en showroom",
    internalNotes: "",
    visual: "pickup",
    badge: "Trabajo y ciudad",
    createdAt: "2026-05-02T12:00:00Z",
    updatedAt: "2026-05-02T12:00:00Z",
  },
  {
    id: "honda-civic",
    slug: "honda-civic",
    title: "Honda Civic",
    brand: "Honda",
    model: "Civic",
    year: 2016,
    category: "sedán",
    type: "autos",
    priceUsd: null,
    priceVisible: false,
    askPrice: true,
    mileage: null,
    fuel: "Nafta",
    transmission: "Automática",
    color: "",
    engine: "",
    doors: 4,
    shortDescription:
      "Sedán moderno con diseño deportivo y gran confort de marcha. Una opción aspiracional dentro del stock seleccionado.",
    longDescription: "",
    highlights: ["Diseño deportivo", "Confort", "Equipamiento", "Excelente andar"],
    equipment: [],
    financingText: "Financiación flexible",
    acceptsTrade: true,
    status: "published",
    featured: false,
    mainImageUrl: showroomImage,
    galleryUrls: [showroomImage, showroomImage, showroomImage],
    imageAlt: "Sedán moderno con presencia deportiva en ambiente oscuro",
    internalNotes: "",
    visual: "sedan",
    badge: "Sedán premium",
    createdAt: "2026-05-03T12:00:00Z",
    updatedAt: "2026-05-03T12:00:00Z",
  },
  {
    id: "renault-oroch-2017",
    slug: "renault-oroch-2017",
    title: "Renault Oroch",
    brand: "Renault",
    model: "Oroch",
    year: 2017,
    category: "utilitario",
    type: "camionetas",
    priceUsd: 14490,
    priceVisible: true,
    askPrice: false,
    mileage: null,
    fuel: "Nafta",
    transmission: "Manual",
    color: "",
    engine: "",
    doors: 4,
    shortDescription:
      "Pick-up cómoda, robusta y lista para trabajo o familia. Una unidad pensada para resolver más de una necesidad.",
    longDescription: "",
    highlights: ["Robusta", "Cómoda", "Uso familiar", "Tomamos permuta"],
    equipment: [],
    financingText: "Financiación flexible",
    acceptsTrade: true,
    status: "published",
    featured: true,
    mainImageUrl: showroomImage,
    galleryUrls: [showroomImage, showroomImage, showroomImage],
    imageAlt: "Pick-up familiar versátil con iluminación profesional",
    internalNotes: "",
    visual: "pickup",
    badge: "Pick-up familiar",
    createdAt: "2026-05-03T12:00:00Z",
    updatedAt: "2026-05-03T12:00:00Z",
  },
  {
    id: "moto-yumbo",
    slug: "moto-yumbo",
    title: "Moto Yumbo",
    brand: "Yumbo",
    model: "Stock seleccionado",
    year: 2025,
    category: "moto",
    type: "motos",
    priceUsd: null,
    priceVisible: false,
    askPrice: true,
    mileage: null,
    fuel: "Nafta",
    transmission: "Manual",
    color: "",
    engine: "",
    doors: null,
    shortDescription:
      "Opciones Yumbo para movilidad diaria, trabajo y ciudad. Consultá disponibilidad actual y alternativas similares.",
    longDescription: "",
    highlights: ["Uso diario", "Opciones 0km", "Usadas seleccionadas", "Financiación"],
    equipment: [],
    financingText: "Financiación disponible",
    acceptsTrade: true,
    status: "published",
    featured: false,
    mainImageUrl: showroomImage,
    galleryUrls: [showroomImage, showroomImage, showroomImage],
    imageAlt: "Moto urbana seleccionada con estética premium",
    internalNotes: "",
    visual: "moto",
    badge: "Movilidad diaria",
    createdAt: "2026-05-04T12:00:00Z",
    updatedAt: "2026-05-04T12:00:00Z",
  },
  {
    id: "moto-baccio",
    slug: "moto-baccio",
    title: "Moto Baccio",
    brand: "Baccio",
    model: "Stock seleccionado",
    year: 2025,
    category: "moto",
    type: "motos",
    priceUsd: null,
    priceVisible: false,
    askPrice: true,
    mileage: null,
    fuel: "Nafta",
    transmission: "Manual",
    color: "",
    engine: "",
    doors: null,
    shortDescription:
      "Motos Baccio seleccionadas para quienes buscan moverse rápido, gastar menos y resolver su movilidad con financiación.",
    longDescription: "",
    highlights: ["Ciudad", "Bajo consumo", "Entrega inmediata", "Marcas reconocidas"],
    equipment: [],
    financingText: "Financiación disponible",
    acceptsTrade: true,
    status: "published",
    featured: false,
    mainImageUrl: showroomImage,
    galleryUrls: [showroomImage, showroomImage, showroomImage],
    imageAlt: "Moto Baccio urbana presentada como vehículo destacado",
    internalNotes: "",
    visual: "moto",
    badge: "Motos",
    createdAt: "2026-05-04T12:00:00Z",
    updatedAt: "2026-05-04T12:00:00Z",
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────

function generateSlug(brand, model, year) {
  return `${brand}-${model}-${year}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function generateId() {
  return `v-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function now() {
  return new Date().toISOString();
}

// ─── Storage ────────────────────────────────────────────────────────────────────

function loadVehicles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted data
  }
  return null;
}

function saveVehicles(vehicles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

function initializeIfNeeded() {
  if (localStorage.getItem(INITIALIZED_KEY)) return;
  const existing = loadVehicles();
  if (!existing || existing.length === 0) {
    saveVehicles(SEED_VEHICLES);
  }
  localStorage.setItem(INITIALIZED_KEY, "1");
}

// Auto-init on first import
initializeIfNeeded();

// ─── Public API ─────────────────────────────────────────────────────────────────

/** Get all vehicles (unfiltered, includes drafts/hidden/sold) */
export function getAllVehicles() {
  return loadVehicles() || [];
}

/** Get only published vehicles (for public catalog) */
export function getPublishedVehicles() {
  return getAllVehicles().filter((v) => v.status === "published");
}

/** Get featured published vehicles (for home) */
export function getFeaturedVehicles(limit = 4) {
  return getPublishedVehicles()
    .filter((v) => v.featured)
    .slice(0, limit);
}

/** Get a single vehicle by slug */
export function getVehicleBySlug(slug) {
  return getAllVehicles().find((v) => v.slug === slug) || null;
}

/** Get a single vehicle by id */
export function getVehicleById(id) {
  return getAllVehicles().find((v) => v.id === id) || null;
}

/** Get related vehicles (same type or category, excluding current) */
export function getRelatedVehicles(vehicle, limit = 3) {
  return getPublishedVehicles()
    .filter((v) => v.id !== vehicle.id && (v.type === vehicle.type || v.category === vehicle.category))
    .slice(0, limit);
}

/** Create a new vehicle */
export function createVehicle(data) {
  const vehicles = getAllVehicles();
  const id = generateId();
  const slug = data.slug || generateSlug(data.brand || "", data.model || "", data.year || "");

  // Ensure unique slug
  let finalSlug = slug;
  let counter = 1;
  while (vehicles.some((v) => v.slug === finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  const vehicle = {
    ...getDefaultVehicle(),
    ...data,
    id,
    slug: finalSlug,
    createdAt: now(),
    updatedAt: now(),
  };

  vehicles.unshift(vehicle);
  saveVehicles(vehicles);
  return vehicle;
}

/** Update a vehicle by id */
export function updateVehicle(id, data) {
  const vehicles = getAllVehicles();
  const index = vehicles.findIndex((v) => v.id === id);
  if (index === -1) return null;

  vehicles[index] = {
    ...vehicles[index],
    ...data,
    id, // preserve id
    updatedAt: now(),
  };

  saveVehicles(vehicles);
  return vehicles[index];
}

/** Delete a vehicle by id */
export function deleteVehicle(id) {
  const vehicles = getAllVehicles();
  const filtered = vehicles.filter((v) => v.id !== id);
  if (filtered.length === vehicles.length) return false;
  saveVehicles(filtered);
  return true;
}

/** Mark a vehicle as sold */
export function markAsSold(id) {
  return updateVehicle(id, { status: "sold" });
}

/** Toggle featured status */
export function toggleFeatured(id) {
  const vehicle = getVehicleById(id);
  if (!vehicle) return null;
  return updateVehicle(id, { featured: !vehicle.featured });
}

/** Toggle published/draft */
export function togglePublished(id) {
  const vehicle = getVehicleById(id);
  if (!vehicle) return null;
  const newStatus = vehicle.status === "published" ? "draft" : "published";
  return updateVehicle(id, { status: newStatus });
}

/** Duplicate a vehicle */
export function duplicateVehicle(id) {
  const vehicle = getVehicleById(id);
  if (!vehicle) return null;
  const { id: _id, slug: _slug, createdAt: _ca, updatedAt: _ua, ...rest } = vehicle;
  return createVehicle({
    ...rest,
    title: `${rest.title} (copia)`,
    status: "draft",
    featured: false,
  });
}

/** Get dashboard stats */
export function getDashboardStats() {
  const vehicles = getAllVehicles();
  return {
    total: vehicles.length,
    published: vehicles.filter((v) => v.status === "published").length,
    sold: vehicles.filter((v) => v.status === "sold").length,
    draft: vehicles.filter((v) => v.status === "draft").length,
    hidden: vehicles.filter((v) => v.status === "hidden").length,
    featured: vehicles.filter((v) => v.featured && v.status === "published").length,
    recent: vehicles.slice(0, 5),
  };
}

/** Reset to seed data (useful for testing) */
export function resetToSeedData() {
  saveVehicles(SEED_VEHICLES);
  return SEED_VEHICLES;
}

/** Get all unique brands from current vehicles */
export function getAllBrands() {
  const vehicles = getAllVehicles();
  return [...new Set(vehicles.map((v) => v.brand).filter(Boolean))].sort();
}

/** Default vehicle template for the create form */
export function getDefaultVehicle() {
  return {
    id: "",
    slug: "",
    title: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    category: "compacto",
    type: "autos",
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
    highlights: [],
    equipment: [],
    financingText: "Financiación flexible",
    acceptsTrade: true,
    status: "draft",
    featured: false,
    mainImageUrl: "",
    galleryUrls: [],
    imageAlt: "",
    internalNotes: "",
    visual: "compact",
    badge: "",
    createdAt: "",
    updatedAt: "",
  };
}

// ─── Constants for filters ──────────────────────────────────────────────────────

export const VEHICLE_TYPES = [
  { id: "todos", label: "Todos" },
  { id: "autos", label: "Autos" },
  { id: "camionetas", label: "Camionetas" },
  { id: "motos", label: "Motos" },
];

export const CATEGORIES = [
  { id: "compacto", label: "Compacto" },
  { id: "sedán", label: "Sedán" },
  { id: "SUV", label: "SUV" },
  { id: "utilitario", label: "Utilitario" },
  { id: "moto", label: "Moto" },
];

export const STATUS_OPTIONS = [
  { id: "published", label: "Publicado", color: "emerald" },
  { id: "draft", label: "Borrador", color: "amber" },
  { id: "sold", label: "Vendido", color: "red" },
  { id: "hidden", label: "Oculto", color: "gray" },
];

export const FUEL_OPTIONS = ["Nafta", "Diesel", "GNC", "Eléctrico", "Híbrido"];
export const TRANSMISSION_OPTIONS = ["Manual", "Automática"];
export const VISUAL_TYPES = ["compact", "sedan", "pickup", "suv", "moto"];
