import { useState, useEffect } from "react";
import { Save, X, Plus, Trash2, AlertCircle, Loader2 } from "lucide-react";
import {
  getVehicleById,
  createVehicle,
  updateVehicle,
  getDefaultVehicle,
  CATEGORIES,
  VEHICLE_TYPES,
  STATUS_OPTIONS,
  FUEL_OPTIONS,
  TRANSMISSION_OPTIONS,
  VISUAL_TYPES,
} from "../../services/vehicleService.js";
import ImageUploader from "./ImageUploader.jsx";

const SECTION_CLASS = "rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl";

export default function AdminVehicleForm({ vehicleId, onSave, onCancel }) {
  const isEditing = Boolean(vehicleId);
  const [form, setForm] = useState(getDefaultVehicle());
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [highlightInput, setHighlightInput] = useState("");
  const [equipmentInput, setEquipmentInput] = useState("");

  useEffect(() => {
    async function loadVehicle() {
      if (vehicleId) {
        try {
          const data = await getVehicleById(vehicleId);
          if (data) setForm(data);
        } catch (error) {
          console.error("Error loading vehicle:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setForm(getDefaultVehicle());
        setLoading(false);
      }
    }
    loadVehicle();
  }, [vehicleId]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      // Ensure main image is the first of gallery if not set
      const main_image_url = form.gallery_urls && form.gallery_urls.length > 0 
        ? form.gallery_urls[0] 
        : form.main_image_url;

      const payload = { ...form, main_image_url };

      if (isEditing) {
        await updateVehicle(vehicleId, payload);
      } else {
        await createVehicle(payload);
      }
      onSave();
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert(`Error al guardar: ${error.message || "Verificá la conexión con Supabase."}`);
    } finally {
      setSaving(false);
    }
  }

  function addHighlight() {
    if (!highlightInput.trim()) return;
    handleChange("highlights", [...(form.highlights || []), highlightInput.trim()]);
    setHighlightInput("");
  }

  function addEquipment() {
    if (!equipmentInput.trim()) return;
    handleChange("equipment", [...(form.equipment || []), equipmentInput.trim()]);
    setEquipmentInput("");
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sport" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            {isEditing ? "Editar Unidad" : "Nueva Unidad"}
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-1">
            {isEditing ? `ID: ${vehicleId}` : "Completá los datos del vehículo"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold text-white/60 transition hover:text-white disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-sport px-8 py-3 text-xs font-black uppercase tracking-widest text-white shadow-glow transition hover:brightness-110 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isEditing ? "Guardar Cambios" : "Publicar Ahora"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          {/* Photos Section - THE MOST IMPORTANT NOW */}
          <div className={SECTION_CLASS}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Fotos del Vehículo</h2>
              <span className="rounded-full bg-sport/10 px-3 py-1 text-[10px] font-black text-sport uppercase">Máx 20 fotos</span>
            </div>
            <ImageUploader 
              images={form.gallery_urls || []} 
              onImagesChange={(urls) => handleChange("gallery_urls", urls)} 
            />
          </div>

          {/* Basic Data */}
          <div className={SECTION_CLASS}>
            <h2 className="mb-6 text-xl font-black text-white uppercase tracking-tight">Especificaciones Técnicas</h2>
            <div className="grid gap-6">
              <Field label="Título Comercial (Marca y Modelo)">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Ej: Chevrolet Cruze LTZ RS"
                  className={INPUT_CLASS}
                  required
                />
              </Field>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Marca">
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => handleChange("brand", e.target.value)}
                    placeholder="Chevrolet"
                    className={INPUT_CLASS}
                    required
                  />
                </Field>
                <Field label="Modelo">
                  <input
                    type="text"
                    value={form.model}
                    onChange={(e) => handleChange("model", e.target.value)}
                    placeholder="Cruze LTZ RS"
                    className={INPUT_CLASS}
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <Field label="Año">
                  <input
                    type="number"
                    value={form.year || ""}
                    onChange={(e) => handleChange("year", parseInt(e.target.value) || "")}
                    className={INPUT_CLASS}
                    required
                  />
                </Field>
                <Field label="Categoría">
                  <select
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={INPUT_CLASS}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Tipo de Cuerpo">
                  <select
                    value={form.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className={INPUT_CLASS}
                  >
                    {VEHICLE_TYPES.filter((t) => t.id !== "todos").map((t) => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <Field label="Kilómetros">
                  <input
                    type="number"
                    value={form.mileage || ""}
                    onChange={(e) => handleChange("mileage", parseInt(e.target.value) || null)}
                    placeholder="85000"
                    className={INPUT_CLASS}
                  />
                </Field>
                <Field label="Combustible">
                  <select
                    value={form.fuel}
                    onChange={(e) => handleChange("fuel", e.target.value)}
                    className={INPUT_CLASS}
                  >
                    {FUEL_OPTIONS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Transmisión">
                  <select
                    value={form.transmission}
                    onChange={(e) => handleChange("transmission", e.target.value)}
                    className={INPUT_CLASS}
                  >
                    {TRANSMISSION_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status & Price */}
        <div className="space-y-8">
          <div className={SECTION_CLASS}>
            <h2 className="mb-6 text-xl font-black text-white uppercase tracking-tight">Comercialización</h2>
            <div className="space-y-6">
              <Field label="Precio en USD">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-black">$</span>
                  <input
                    type="number"
                    value={form.price_usd || ""}
                    onChange={(e) => handleChange("price_usd", parseInt(e.target.value) || null)}
                    placeholder="13990"
                    className={INPUT_CLASS + " pl-8"}
                  />
                </div>
              </Field>

              <div className="space-y-3 rounded-2xl bg-white/5 p-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.price_visible}
                    onChange={(e) => handleChange("price_visible", e.target.checked)}
                    className="h-5 w-5 rounded-lg border-white/10 bg-white/10 text-sport accent-sport"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Mostrar Precio</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={form.ask_price}
                    onChange={(e) => handleChange("ask_price", e.target.checked)}
                    className="h-5 w-5 rounded-lg border-white/10 bg-white/10 text-sport accent-sport"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Botón "Consultar"</span>
                </label>
              </div>

              <Field label="Estado de Venta">
                <select
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className={INPUT_CLASS}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </Field>

              <label className="flex items-center gap-3 cursor-pointer group p-4 rounded-2xl border border-champagne/20 bg-champagne/5">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  className="h-5 w-5 rounded-lg border-white/10 bg-white/10 text-sport accent-sport"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-champagne">Destacar en Inicio</p>
                  <p className="text-[10px] text-champagne/60 mt-0.5">Aparecerá en la sección principal de la web</p>
                </div>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className={SECTION_CLASS}>
            <h2 className="mb-6 text-xl font-black text-white uppercase tracking-tight">Descripción</h2>
            <div className="space-y-6">
              <Field label="Descripción">
                <textarea
                  value={form.short_description}
                  onChange={(e) => handleChange("short_description", e.target.value)}
                  placeholder="Ej: Camioneta en excelente estado, único dueño..."
                  rows={4}
                  className={`${INPUT_CLASS} resize-y min-h-[120px] overflow-y-auto`}
                />
              </Field>
              <Field label="Visual en Catálogo">
                <select
                  value={form.visual_type}
                  onChange={(e) => handleChange("visual_type", e.target.value)}
                  className={INPUT_CLASS}
                >
                  {VISUAL_TYPES.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const INPUT_CLASS =
  "w-full rounded-xl border border-white/10 bg-[#1a1a1c] px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-sport/50 focus:ring-1 focus:ring-sport/20 backdrop-blur-md appearance-none [&>option]:bg-[#1a1a1c] [&>option]:text-white";

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">
        {label}
      </label>
      {children}
    </div>
  );
}
