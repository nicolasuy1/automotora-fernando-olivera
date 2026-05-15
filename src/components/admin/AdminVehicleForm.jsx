import { useState, useEffect } from "react";
import { Save, X, Plus, Trash2, ImageIcon } from "lucide-react";
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

const SECTION_CLASS = "rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6";

export default function AdminVehicleForm({ vehicleId, onSave, onCancel }) {
  const isEditing = Boolean(vehicleId);
  const [form, setForm] = useState(getDefaultVehicle());
  const [highlightInput, setHighlightInput] = useState("");
  const [equipmentInput, setEquipmentInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  useEffect(() => {
    if (vehicleId) {
      const existing = getVehicleById(vehicleId);
      if (existing) setForm(existing);
    } else {
      setForm(getDefaultVehicle());
    }
  }, [vehicleId]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title && form.brand && form.model) {
      form.title = `${form.brand} ${form.model}`;
    }

    if (isEditing) {
      updateVehicle(vehicleId, form);
    } else {
      createVehicle(form);
    }
    onSave();
  }

  function addHighlight() {
    if (!highlightInput.trim()) return;
    handleChange("highlights", [...(form.highlights || []), highlightInput.trim()]);
    setHighlightInput("");
  }

  function removeHighlight(index) {
    handleChange(
      "highlights",
      (form.highlights || []).filter((_, i) => i !== index)
    );
  }

  function addEquipment() {
    if (!equipmentInput.trim()) return;
    handleChange("equipment", [...(form.equipment || []), equipmentInput.trim()]);
    setEquipmentInput("");
  }

  function removeEquipment(index) {
    handleChange(
      "equipment",
      (form.equipment || []).filter((_, i) => i !== index)
    );
  }

  function addGalleryUrl() {
    if (!galleryInput.trim()) return;
    handleChange("galleryUrls", [...(form.galleryUrls || []), galleryInput.trim()]);
    setGalleryInput("");
  }

  function removeGalleryUrl(index) {
    handleChange(
      "galleryUrls",
      (form.galleryUrls || []).filter((_, i) => i !== index)
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-black text-white">
          {isEditing ? "Editar vehículo" : "Nuevo vehículo"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/60 transition hover:text-white"
          >
            <X className="h-4 w-4" />
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg border border-sport bg-sport px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white shadow-glow transition hover:brightness-110"
          >
            <Save className="h-4 w-4" />
            {isEditing ? "Guardar cambios" : "Crear vehículo"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left column */}
        <div className="grid gap-6">
          {/* Basic data */}
          <div className={SECTION_CLASS}>
            <h2 className="mb-5 text-lg font-black text-white">Datos básicos</h2>
            <div className="grid gap-4">
              <Field label="Título comercial" placeholder="Ej: Chevrolet Cruze LTZ RS">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Chevrolet Cruze LTZ RS"
                  className={INPUT_CLASS}
                  required
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
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
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Año">
                  <input
                    type="number"
                    value={form.year || ""}
                    onChange={(e) => handleChange("year", parseInt(e.target.value) || "")}
                    className={INPUT_CLASS}
                    required
                  />
                </Field>
                <Field label="Tipo">
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
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
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
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Color">
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    placeholder="Negro"
                    className={INPUT_CLASS}
                  />
                </Field>
                <Field label="Motor">
                  <input
                    type="text"
                    value={form.engine}
                    onChange={(e) => handleChange("engine", e.target.value)}
                    placeholder="1.8 Turbo"
                    className={INPUT_CLASS}
                  />
                </Field>
                <Field label="Puertas">
                  <input
                    type="number"
                    value={form.doors || ""}
                    onChange={(e) => handleChange("doors", parseInt(e.target.value) || null)}
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={SECTION_CLASS}>
            <h2 className="mb-5 text-lg font-black text-white">Contenido comercial</h2>
            <div className="grid gap-4">
              <Field label="Descripción corta">
                <textarea
                  value={form.shortDescription}
                  onChange={(e) => handleChange("shortDescription", e.target.value)}
                  placeholder="Una o dos frases que describan el vehículo..."
                  rows={2}
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label="Descripción larga (opcional)">
                <textarea
                  value={form.longDescription}
                  onChange={(e) => handleChange("longDescription", e.target.value)}
                  placeholder="Descripción más detallada para la ficha..."
                  rows={4}
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label="Badge">
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => handleChange("badge", e.target.value)}
                  placeholder="Ej: Gama superior, Pick-up fuerte, etc."
                  className={INPUT_CLASS}
                />
              </Field>

              {/* Highlights */}
              <Field label="Puntos destacados">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addHighlight(); } }}
                    placeholder="Agregar punto y Enter"
                    className={INPUT_CLASS + " flex-1"}
                  />
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {form.highlights && form.highlights.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.highlights.map((h, i) => (
                      <span key={i} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/70">
                        {h}
                        <button type="button" onClick={() => removeHighlight(i)} className="text-white/30 hover:text-white">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </Field>

              {/* Equipment */}
              <Field label="Equipamiento (opcional)">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={equipmentInput}
                    onChange={(e) => setEquipmentInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addEquipment(); } }}
                    placeholder="Agregar equipo y Enter"
                    className={INPUT_CLASS + " flex-1"}
                  />
                  <button
                    type="button"
                    onClick={addEquipment}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {form.equipment && form.equipment.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.equipment.map((eq, i) => (
                      <span key={i} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/70">
                        {eq}
                        <button type="button" onClick={() => removeEquipment(i)} className="text-white/30 hover:text-white">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </Field>

              <Field label="Notas internas (no se ven en la web)">
                <textarea
                  value={form.internalNotes}
                  onChange={(e) => handleChange("internalNotes", e.target.value)}
                  placeholder="Notas privadas..."
                  rows={2}
                  className={INPUT_CLASS}
                />
              </Field>
            </div>
          </div>

          {/* Images */}
          <div className={SECTION_CLASS}>
            <h2 className="mb-5 text-lg font-black text-white">Imágenes</h2>
            <div className="grid gap-4">
              <Field label="Imagen principal (URL)">
                <input
                  type="url"
                  value={form.mainImageUrl}
                  onChange={(e) => handleChange("mainImageUrl", e.target.value)}
                  placeholder="https://..."
                  className={INPUT_CLASS}
                />
              </Field>

              {/* Preview */}
              {form.mainImageUrl && (
                <div className="h-40 overflow-hidden rounded-xl border border-white/10 bg-carbon">
                  <img src={form.mainImageUrl} alt="Vista previa" className="h-full w-full object-cover" />
                </div>
              )}

              <Field label="Alt text de la imagen">
                <input
                  type="text"
                  value={form.imageAlt}
                  onChange={(e) => handleChange("imageAlt", e.target.value)}
                  placeholder="Descripción de la imagen para accesibilidad"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Tipo visual">
                <select
                  value={form.visual}
                  onChange={(e) => handleChange("visual", e.target.value)}
                  className={INPUT_CLASS}
                >
                  {VISUAL_TYPES.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </Field>

              {/* Gallery */}
              <Field label="Galería (URLs adicionales)">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addGalleryUrl(); } }}
                    placeholder="https://... y Enter"
                    className={INPUT_CLASS + " flex-1"}
                  />
                  <button
                    type="button"
                    onClick={addGalleryUrl}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {form.galleryUrls && form.galleryUrls.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {form.galleryUrls.map((url, i) => (
                      <div key={i} className="group relative h-20 overflow-hidden rounded-lg border border-white/10 bg-carbon">
                        <img src={url} alt={`Galería ${i + 1}`} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryUrl(i)}
                          className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/70 text-white/60 opacity-0 transition group-hover:opacity-100 hover:text-red-400"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Field>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="grid gap-6 self-start lg:sticky lg:top-36">
          {/* Price */}
          <div className={SECTION_CLASS}>
            <h2 className="mb-5 text-lg font-black text-white">Precio</h2>
            <div className="grid gap-4">
              <Field label="Precio en USD">
                <input
                  type="number"
                  value={form.priceUsd || ""}
                  onChange={(e) => handleChange("priceUsd", parseInt(e.target.value) || null)}
                  placeholder="13990"
                  className={INPUT_CLASS}
                />
              </Field>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.priceVisible}
                  onChange={(e) => handleChange("priceVisible", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-sport accent-sport"
                />
                <span className="text-sm text-white/70">Mostrar precio en la web</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.askPrice}
                  onChange={(e) => handleChange("askPrice", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-sport accent-sport"
                />
                <span className="text-sm text-white/70">Mostrar "Consultar precio"</span>
              </label>
            </div>
          </div>

          {/* Financing */}
          <div className={SECTION_CLASS}>
            <h2 className="mb-5 text-lg font-black text-white">Financiación</h2>
            <div className="grid gap-4">
              <Field label="Texto de financiación">
                <input
                  type="text"
                  value={form.financingText}
                  onChange={(e) => handleChange("financingText", e.target.value)}
                  placeholder="Financiación flexible"
                  className={INPUT_CLASS}
                />
              </Field>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.acceptsTrade}
                  onChange={(e) => handleChange("acceptsTrade", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-sport accent-sport"
                />
                <span className="text-sm text-white/70">Acepta permuta</span>
              </label>
            </div>
          </div>

          {/* Status */}
          <div className={SECTION_CLASS}>
            <h2 className="mb-5 text-lg font-black text-white">Estado</h2>
            <div className="grid gap-4">
              <Field label="Estado de publicación">
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
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => handleChange("featured", e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-sport accent-sport"
                />
                <span className="text-sm text-white/70">Destacar en la home</span>
              </label>
            </div>
          </div>

          {/* Save buttons */}
          <div className="grid gap-3">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-sport bg-sport py-3 text-sm font-black uppercase tracking-[0.14em] text-white shadow-glow transition hover:brightness-110"
            >
              <Save className="h-4 w-4" />
              {isEditing ? "Guardar cambios" : "Crear vehículo"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-bold text-white/60 transition hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

const INPUT_CLASS =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-sport/50 focus:ring-1 focus:ring-sport/30";

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-white/50">
        {label}
      </label>
      {children}
    </div>
  );
}
