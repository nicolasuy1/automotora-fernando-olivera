import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Fuel, 
  Gauge, 
  Info, 
  ShieldCheck, 
  Zap,
  Loader2,
  Palette,
  DoorClosed,
  CheckCircle2,
  Compass
} from "lucide-react";
import Button from "../components/Button.jsx";
import Footer from "../components/Footer.jsx";
import SectionReveal from "../components/SectionReveal.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { getVehicleBySlug, getRelatedVehicles } from "../services/vehicleService.js";
import { handleInternalNavigation } from "../lib/navigation.js";
import { vehicleWhatsappHref } from "../lib/whatsapp.js";
import WhatsAppIcon from "../components/icons/WhatsAppIcon.jsx";
import { formatVehicleTitle, formatCategory } from "../lib/formatters.js";

export default function VehicleDetailPage({ slug }) {
  const [vehicle, setVehicle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function loadVehicle() {
      setLoading(true);
      try {
        const data = await getVehicleBySlug(slug);
        if (data) {
          setVehicle(data);
          const relatedData = await getRelatedVehicles(data);
          setRelated(relatedData);
        }
      } catch (error) {
        console.error("Error loading vehicle details:", error);
      } finally {
        setLoading(false);
      }
    }
    loadVehicle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="h-10 w-10 animate-spin text-sport" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center">
        <h1 className="text-4xl font-black text-white uppercase">Vehículo no encontrado</h1>
        <p className="mt-4 text-white/40 uppercase tracking-widest text-xs">La unidad que buscás ya no está disponible o la ruta es incorrecta.</p>
        <Button href="/catalogo" className="mt-8">Volver al catálogo</Button>
      </div>
    );
  }

  const gallery = vehicle.gallery_urls && vehicle.gallery_urls.length > 0 
    ? vehicle.gallery_urls 
    : [vehicle.main_image_url];

  return (
    <div className="bg-ink pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Navigation */}
        <a
          href="/catalogo"
          onClick={(e) => handleInternalNavigation(e, "/catalogo")}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/40 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </a>

        {/* Main Content */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-carbon shadow-2xl">
              <img
                src={gallery[activeImage]}
                alt={formatVehicleTitle(vehicle.title)}
                className="h-full w-full object-cover"
              />
              
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white/70 backdrop-blur-md transition hover:bg-sport hover:text-white"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white/70 backdrop-blur-md transition hover:bg-sport hover:text-white"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activeImage === i ? "border-sport" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-sport">
                  {formatCategory(vehicle.category)} · {vehicle.brand}
                </p>
                <h1 className="mt-3 text-4xl font-black leading-none text-white sm:text-5xl lg:text-6xl">
                  {formatVehicleTitle(vehicle.title)}
                </h1>
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="rounded-full bg-sport px-4 py-2 text-sm font-black text-white shadow-glow">
                    {vehicle.price_visible && vehicle.price_usd ? `USD ${vehicle.price_usd.toLocaleString()}` : "Consultar precio"}
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/70">
                    {vehicle.year}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-8 sm:grid-cols-3">
                <Spec icon={Gauge} label="Kilometraje" value={vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : "N/A"} />
                <Spec icon={Zap} label="Motor" value={vehicle.engine || "Consultar"} />
                <Spec icon={Fuel} label="Combustible" value={vehicle.fuel} />
                <Spec icon={Compass} label="Transmisión" value={vehicle.transmission || "Consultar"} />
                <Spec icon={Palette} label="Color" value={vehicle.color || "Consultar"} />
                <Spec icon={DoorClosed} label="Puertas" value={vehicle.doors ? `${vehicle.doors} puertas` : "Consultar"} />
              </div>

              {/* Accepts Trade (Permuta) Badge */}
              {vehicle.accepts_trade && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest leading-none">Acepta Permuta</p>
                    <p className="text-[10px] text-emerald-400/70 mt-1 uppercase">Tomamos tu vehículo actual como parte de pago</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-white/70">
                  {vehicle.long_description || vehicle.short_description}
                </p>
                
                {/* Insignias / Highlights */}
                {vehicle.highlights && vehicle.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {vehicle.highlights.map(h => (
                      <span key={h} className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80">
                        <ShieldCheck className="h-3 w-3 text-emerald-400" />
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Technical Equipment list */}
                {vehicle.equipment && vehicle.equipment.length > 0 && (
                  <div className="border-t border-white/5 pt-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-4">
                      Equipamiento Detallado
                    </h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                      {vehicle.equipment.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-white/80 uppercase tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-sport shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <Button 
                href={vehicleWhatsappHref(vehicle)} 
                icon={WhatsAppIcon} 
                className="w-full py-5 text-base cta-pulse"
              >
                Consultar por WhatsApp
              </Button>
              <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                <Info className="h-3 w-3" />
                Atención directa con Fernando Olivera
              </div>
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        {related.length > 0 && (
          <SectionReveal className="mt-24 pb-20">
            <h2 className="mb-10 text-2xl font-black text-white uppercase tracking-tight">Otras unidades relacionadas</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(v => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-sport">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
