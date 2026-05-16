import { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadVehicleImage } from "../../services/vehicleService";

export default function ImageUploader({ images, onImagesChange, maxImages = 20 }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    if (images.length + files.length > maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas.`);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map(file => uploadVehicleImage(file));
      const newUrls = await Promise.all(uploadPromises);
      onImagesChange([...images, ...newUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error al subir imágenes. Verificá que el bucket 'vehicle-images' sea público en Supabase.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index) {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {/* Current Images */}
        {images.map((url, index) => (
          <div key={index} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <img src={url} alt={`Imagen ${index + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-white/60 opacity-0 transition-opacity group-hover:opacity-100 hover:text-sport"
            >
              <X className="h-4 w-4" />
            </button>
            {index === 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-sport py-0.5 text-center text-[8px] font-black uppercase tracking-widest text-white">
                Principal
              </div>
            )}
          </div>
        ))}

        {/* Upload Button */}
        {images.length < maxImages && (
          <label className={`relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] transition hover:border-sport/50 hover:bg-white/[0.04] ${uploading ? 'pointer-events-none' : ''}`}>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-sport" />
                <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/40">Subiendo...</span>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 text-white/20" />
                <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/40">Subir fotos</span>
              </>
            )}
          </label>
        )}
      </div>
      <p className="text-[10px] uppercase tracking-widest text-white/30">
        Hasta {maxImages} fotos. La primera será la imagen principal.
      </p>
    </div>
  );
}
