import { motion } from "framer-motion";

const showroomImage = "/images/backgrounds/showroom-premium.jpeg";

const labelMap = {
  compact: "Compacto",
  pickup: "Camioneta",
  suv: "SUV",
  sedan: "Sedán",
  moto: "Moto",
};

const positionMap = {
  compact: "object-[68%_center]",
  pickup: "object-[78%_center]",
  suv: "object-[78%_center]",
  sedan: "object-[62%_center]",
  moto: "object-[72%_center]",
};

export default function VehicleVisual({ type = "compact", name, note, image = showroomImage, imageAlt, className = "", hideOverlay = false }) {
  return (
    <div className={`relative overflow-hidden bg-carbon ${className}`}>
      <motion.img
        src={image || showroomImage}
        alt={imageAlt || `Vehículo ${name}`}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full scale-110 object-cover ${positionMap[type] || positionMap.compact}`}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(225,29,72,.18),transparent_28%),radial-gradient(circle_at_42%_32%,rgba(140,231,243,.12),transparent_24%)]" />
      <motion.div
        className="absolute right-[8%] top-[48%] h-16 w-56 rounded-full bg-white/15 blur-2xl"
        animate={{ opacity: [0.24, 0.48, 0.24], x: [0, 8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-champagne backdrop-blur-xl">
        {labelMap[type] || "Vehículo"}
      </div>
      {/* Only render text overlay when NOT used inside a card */}
      {!hideOverlay && (
        <div className="absolute bottom-4 left-4 right-4">
          <p className="max-w-xs text-2xl font-black leading-tight text-white">{name}</p>
          {note ? <p className="mt-2 line-clamp-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/[0.52]">{note}</p> : null}
        </div>
      )}
    </div>
  );
}
