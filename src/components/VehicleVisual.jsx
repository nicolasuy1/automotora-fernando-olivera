import { motion } from "framer-motion";

const labelMap = {
  compact: "Compacto",
  pickup: "Camioneta",
  suv: "SUV",
  sedan: "Sedán",
  moto: "Moto",
};

export default function VehicleVisual({ type = "compact", name, note, image, imageAlt, className = "", hideOverlay = false }) {
  return (
    <div className={`relative overflow-hidden bg-carbon ${className}`}>
      {/* Background Decor Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(225,29,72,.12),transparent_28%)] z-0" />

      {/* Main Image Layer */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 h-full w-full z-10"
      >
        <img
          src={image || "/images/backgrounds/showroom-premium.jpeg"}
          alt={imageAlt || `Vehículo ${name}`}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        {/* Shadow for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      </motion.div>

      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-champagne backdrop-blur-xl">
        {labelMap[type] || "Vehículo"}
      </div>

      {/* Only render text overlay when NOT used inside a card (e.g. for simple visual blocks) */}
      {!hideOverlay && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <p className="max-w-xs text-2xl font-black leading-tight text-white">{name}</p>
          {note ? <p className="mt-2 line-clamp-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/[0.52]">{note}</p> : null}
        </div>
      )}
    </div>
  );
}
