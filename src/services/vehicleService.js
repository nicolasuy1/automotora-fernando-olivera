import { supabase } from "../lib/supabase";

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

// --- DATABASE OPERATIONS ---

export async function getVehicles() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getAllVehicles() {
  return getVehicles();
}

export async function getPublishedVehicles() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .in('status', ['available', 'sold'])
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getFeaturedVehicles(limit = 3) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('featured', true)
    .eq('status', 'available')
    .limit(limit)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getVehicleBySlug(slug) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getVehicleById(id) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getRelatedVehicles(currentVehicle, limit = 4) {
  if (!currentVehicle) return [];
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .neq('id', currentVehicle.id)
    .eq('category', currentVehicle.category)
    .eq('status', 'available')
    .limit(limit);
  
  if (error) throw error;
  return data;
}

export async function getAllBrands() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('brand');
  
  if (error) throw error;
  const brands = data.map(v => v.brand);
  return ["Todas", ...new Set(brands)];
}

export async function createVehicle(data) {
  const slug = (data.title || `${data.brand}-${data.model}`).toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "") + "-" + Math.random().toString(36).slice(-4);

  const { data: result, error } = await supabase
    .from('vehicles')
    .insert([{ ...data, slug }])
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function updateVehicle(id, data) {
  const { error } = await supabase
    .from('vehicles')
    .update(data)
    .eq('id', id);
  
  if (error) throw error;
}

export async function deleteVehicle(id) {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function markAsSold(id) {
  const { error } = await supabase
    .from('vehicles')
    .update({ status: 'sold' })
    .eq('id', id);
  
  if (error) throw error;
}

export async function toggleFeatured(id) {
  const vehicle = await getVehicleById(id);
  const { error } = await supabase
    .from('vehicles')
    .update({ featured: !vehicle.featured })
    .eq('id', id);
  
  if (error) throw error;
}

export async function togglePublished(id) {
  const vehicle = await getVehicleById(id);
  const newStatus = vehicle.status === 'available' ? 'hidden' : 'available';
  const { error } = await supabase
    .from('vehicles')
    .update({ status: newStatus })
    .eq('id', id);
  
  if (error) throw error;
}

export async function duplicateVehicle(id) {
  const original = await getVehicleById(id);
  if (!original) return;
  
  const { id: oldId, created_at, slug: oldSlug, ...dataToCopy } = original;
  const newSlug = (original.title + " Copia").toLowerCase().replace(/ /g, "-") + "-" + Math.random().toString(36).slice(-4);
  
  const { data, error } = await supabase
    .from('vehicles')
    .insert([{ ...dataToCopy, title: original.title + " (Copia)", slug: newSlug }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// --- STORAGE OPERATIONS ---

export async function uploadVehicleImage(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).slice(-10)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('vehicle-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('vehicle-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// --- DASHBOARD STATS ---

export async function getDashboardStats() {
  const { data: vehicles, error } = await supabase.from('vehicles').select('*');
  if (error) throw error;

  return {
    total: vehicles.length,
    published: vehicles.filter(v => v.status === "available").length,
    sold: vehicles.filter(v => v.status === "sold").length,
    draft: vehicles.filter(v => v.status === "reserved").length,
    hidden: vehicles.filter(v => v.status === "hidden").length,
    featured: vehicles.filter(v => v.featured).length,
    recent: vehicles.slice(0, 5),
  };
}

export function getDefaultVehicle() {
  return {
    title: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    type: "compact",
    category: "automoviles",
    price_usd: null,
    price_visible: true,
    ask_price: false,
    mileage: null,
    fuel: "Nafta",
    transmission: "Manual",
    color: "",
    engine: "",
    doors: 4,
    short_description: "",
    long_description: "",
    main_image_url: "",
    visual_type: "compact",
    featured: false,
    status: "available",
    financing_text: "Financiación flexible",
    accepts_trade: true,
    highlights: [],
    equipment: [],
    gallery_urls: [],
    badge: "",
  };
}
