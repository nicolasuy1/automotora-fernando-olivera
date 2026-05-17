import { motion } from "framer-motion";
import { Gauge, ShieldCheck } from "lucide-react";
import { handleInternalNavigation } from "../lib/navigation.js";
import { vehicleWhatsappHref } from "../lib/whatsapp.js";
import TiltCard from "./TiltCard.jsx";
import VehicleVisual from "./VehicleVisual.jsx";
import WhatsAppIcon from "./icons/WhatsAppIcon.jsx";

const item = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
};

export default function VehicleCard({ vehicle }) {
  const displayPrice =
    (vehicle.price_visible ?? vehicle.priceVisible) && (vehicle.price_usd ?? vehicle.priceUsd)
      ? `USD ${(vehicle.price_usd || vehicle.priceUsd).toLocaleString()}`
      : "Consultar";

  const isSold = vehicle.status === "sold";

  return (
    <TiltCard
      variants={item}
      whileHover={{ y: -8 }}
      intensity={6}
      className="group premium-surface overflow-hidden rounded-3xl will-change-transform"
    >
      <a
        href={`/catalogo/${vehicle.slug}`}
        onClick={(event) => handleInternalNavigation(event, `/catalogo/${vehicle.slug}`)}
        className="block"
      >
        <div className="relative h-64 overflow-hidden bg-carbon sm:h-72">
          <motion.div className="h-full transition duration-700 group-hover:scale-105">
            <VehicleVisual
              type={vehicle.visual_type || vehicle.visual || "compact"}
              name={vehicle.title}
              image={vehicle.main_image_url || vehicle.mainImageUrl}
              imageAlt={vehicle.brand + " " + vehicle.model}
              note="Consultá disponibilidad y fotos por WhatsApp."
              className="h-full"
              hideOverlay
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/[0.14] to-transparent opacity-95" />

          {/* Sold overlay */}
          {isSold && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
              <span className="rounded-full border border-sport/60 bg-sport/90 px-5 py-2 text-sm font-black uppercase tracking-[0.2em] text-white">
                Vendido
              </span>
            </div>
          )}

          {vehicle.badge && (
            <div className="absolute right-4 top-4 z-20 rounded-full border border-champagne/20 bg-white/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-champagne backdrop-blur-xl">
              {vehicle.badge}
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/[0.48]">
              {vehicle.brand} / {vehicle.category || vehicle.type}
            </p>
            <h3 className="mt-2 text-2xl font-black leading-tight text-white">{vehicle.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-white/[0.66]">{vehicle.short_description || vehicle.shortDescription}</p>
          </div>
        </div>
      </a>

      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/[0.66]">
            {vehicle.year}
          </span>
          <span className="text-sm font-bold text-white/[0.66]">{vehicle.transmission}</span>
        </div>
        <p className="text-sm text-white/50">{(vehicle.ask_price || vehicle.askPrice) ? "Precio" : "Desde"}</p>
        <p className="text-3xl font-black text-white">{displayPrice}</p>
        {vehicle.mileage && (
          <div className="mt-4 flex items-center gap-2 text-sm text-white/[0.62]">
            <Gauge className="h-4 w-4 text-sport" />
            {vehicle.mileage.toLocaleString()} km
          </div>
        )}
        <div className="mt-3 flex items-center gap-2 text-sm font-black text-sport">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span className="truncate">{vehicle.financing_text || vehicle.financingText}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(vehicle.highlights || []).slice(0, 3).map((feature) => (
            <span key={feature} className="rounded-full bg-white/[0.07] px-3 py-1 text-[11px] font-semibold text-white/[0.62]">
              {feature}
            </span>
          ))}
        </div>
        {!isSold && (
          <a
            href={vehicleWhatsappHref(vehicle)}
            className="premium-button mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-sport bg-sport px-4 py-3 text-xs font-black uppercase tracking-[0.16em]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4" />
              Consultar por WhatsApp
            </span>
          </a>
        )}
      </div>
    </TiltCard>
  );
}
