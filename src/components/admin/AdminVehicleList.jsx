import { useState, useEffect } from "react";
import { 
  Trash2, 
  Edit2, 
  Star, 
  Eye, 
  EyeOff, 
  Copy, 
  CheckCircle2, 
  Loader2, 
  Search,
  Package
} from "lucide-react";
import { 
  getAllVehicles, 
  deleteVehicle, 
  markAsSold, 
  toggleFeatured, 
  togglePublished, 
  duplicateVehicle 
} from "../../services/vehicleService.js";
import { formatVehicleTitle, formatCategory } from "../../lib/formatters.js";

export default function AdminVehicleList({ onEdit, onRefresh }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    setLoading(true);
    try {
      const data = await getAllVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Error loading vehicles:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(vehicle) {
    if (!confirm(`¿Seguro que querés borrar este vehículo? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteVehicle(vehicle.id);
      loadVehicles();
      if (onRefresh) onRefresh();
    } catch (error) {
      alert("Error al eliminar.");
    }
  }

  async function handleMarkAsSold(vehicle) {
    if (vehicle.status !== "sold") {
      if (!confirm("¿Querés marcar este vehículo como vendido? Dejará de mostrarse como disponible.")) return;
    }
    try {
      await markAsSold(vehicle.id);
      loadVehicles();
      if (onRefresh) onRefresh();
    } catch (error) {
      alert("Error al marcar como vendido.");
    }
  }

  async function handleTogglePublished(vehicle) {
    if (vehicle.status === "available") {
      if (!confirm("¿Querés ocultar este vehículo del catálogo público? Podrás volver a publicarlo después.")) return;
    }
    try {
      await togglePublished(vehicle.id);
      loadVehicles();
      if (onRefresh) onRefresh();
    } catch (error) {
      alert("Error al cambiar la visibilidad.");
    }
  }

  async function handleToggleFeatured(vehicle) {
    try {
      await toggleFeatured(vehicle.id);
      loadVehicles();
      if (onRefresh) onRefresh();
    } catch (error) {
      alert("Error al cambiar destacado.");
    }
  }

  async function handleDuplicate(vehicle) {
    try {
      await duplicateVehicle(vehicle.id);
      loadVehicles();
      if (onRefresh) onRefresh();
    } catch (error) {
      alert("Error al duplicar.");
    }
  }

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || v.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sport" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Inventario de vehículos</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-1">
            {filteredVehicles.length} {filteredVehicles.length === 1 ? "unidad cargada" : "unidades cargadas"} en el sistema
          </p>
        </div>

        <div className="flex flex-col xs:flex-row flex-1 max-w-md gap-3 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-sport/50 transition-all placeholder:text-white/20"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold text-white/70 outline-none focus:border-sport/50 transition-all"
          >
            <option value="all" className="bg-[#0a0a0c]">Todos</option>
            <option value="available" className="bg-[#0a0a0c]">Disponibles</option>
            <option value="sold" className="bg-[#0a0a0c]">Vendidos</option>
            <option value="reserved" className="bg-[#0a0a0c]">Reservados</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredVehicles.map((vehicle) => (
          <div 
            key={vehicle.id}
            className="group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] hover:border-white/20"
          >
            {/* Thumbnail - Much larger on mobile to identify the car */}
            <div className="h-48 w-full sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-2xl bg-carbon relative">
              <img 
                src={vehicle.main_image_url || "/images/backgrounds/showroom-premium.jpeg"} 
                alt={vehicle.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Highlight indicator on mobile visual */}
              {vehicle.featured && (
                <div className="absolute top-2 left-2 sm:hidden rounded-full bg-[#0a0a0c]/80 p-1.5 backdrop-blur-md border border-champagne/30">
                  <Star className="h-3.5 w-3.5 text-champagne fill-champagne" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-1">
                <h3 className="text-xl sm:text-lg font-black text-white uppercase tracking-tight leading-tight sm:truncate">
                  {formatVehicleTitle(vehicle.title)}
                </h3>
                {vehicle.featured && <Star className="hidden sm:block h-4 w-4 shrink-0 text-champagne fill-champagne" />}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <span className="bg-white/5 px-2 py-0.5 rounded-md">{vehicle.year}</span>
                <span className="bg-white/5 px-2 py-0.5 rounded-md">{vehicle.brand}</span>
                <span className="bg-white/5 px-2 py-0.5 rounded-md text-white/50">{formatCategory(vehicle.category || vehicle.type)}</span>
                <span className="text-white/60 font-black">USD {vehicle.price_usd?.toLocaleString() || "---"}</span>
              </div>
            </div>

            {/* Status */}
            <div className="absolute top-6 right-6 sm:relative sm:top-0 sm:right-0">
              <StatusBadge status={vehicle.status} />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-4 sm:border-0 sm:pt-0">
              <ActionButton 
                icon={Edit2} 
                label="Editar vehículo" 
                tooltipText="Editar vehículo"
                ariaLabel="Editar vehículo"
                onClick={() => onEdit(vehicle.id)} 
                colorStyles="bg-white/5 border-white/10 text-white/40 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400"
              />
              <ActionButton 
                icon={CheckCircle2} 
                label="Marcar como vendido" 
                tooltipText="Marcar como vendido"
                ariaLabel="Marcar como vendido"
                onClick={() => handleMarkAsSold(vehicle)} 
                colorStyles={vehicle.status === "sold" 
                  ? "bg-sport/20 border-sport/40 text-sport" 
                  : "bg-white/5 border-white/10 text-white/40 hover:bg-sport/10 hover:border-sport/30 hover:text-sport"}
                active={vehicle.status === "sold"}
              />
              <ActionButton 
                icon={Star} 
                label="Destacar en inicio" 
                tooltipText={vehicle.featured ? "Quitar destacado" : "Destacar en inicio"}
                ariaLabel="Destacar en inicio"
                onClick={() => handleToggleFeatured(vehicle)} 
                colorStyles={vehicle.featured
                  ? "bg-champagne/20 border-champagne/40 text-champagne"
                  : "bg-white/5 border-white/10 text-white/40 hover:bg-champagne/10 hover:border-champagne/30 hover:text-champagne"}
                active={vehicle.featured}
              />
              <ActionButton 
                icon={vehicle.status === "available" ? Eye : EyeOff} 
                label={vehicle.status === "available" ? "Ocultar del catálogo" : "Mostrar en catálogo"} 
                tooltipText={vehicle.status === "available" ? "Ocultar del catálogo" : "Mostrar en catálogo"}
                ariaLabel={vehicle.status === "available" ? "Ocultar del catálogo" : "Mostrar en catálogo"}
                onClick={() => handleTogglePublished(vehicle)} 
                colorStyles={vehicle.status !== "available"
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                  : "bg-white/5 border-white/10 text-white/40 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400"}
              />
              <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
              <ActionButton 
                icon={Copy} 
                label="Duplicar vehículo" 
                tooltipText="Duplicar vehículo"
                ariaLabel="Duplicar vehículo"
                onClick={() => handleDuplicate(vehicle)} 
                colorStyles="bg-white/5 border-white/10 text-white/40 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400"
              />
              <ActionButton 
                icon={Trash2} 
                label="Borrar vehículo" 
                tooltipText="Borrar vehículo"
                ariaLabel="Borrar vehículo"
                onClick={() => handleDelete(vehicle)} 
                colorStyles="bg-white/5 border-white/10 text-white/40 hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-500"
              />
            </div>
          </div>
        ))}

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/[0.01]">
            <Package className="mx-auto h-12 w-12 text-white/10 mb-4 animate-pulse" />
            <p className="text-sm font-black uppercase tracking-widest text-white/20">No se encontraron unidades</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    available: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    reserved: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    sold: "border-sport/30 bg-sport/10 text-sport",
    hidden: "border-gray-500/30 bg-gray-500/10 text-gray-400",
  };

  const labels = {
    available: "Disponible",
    reserved: "Reservado",
    sold: "Vendido",
    hidden: "Oculto",
  };

  return (
    <span className={`shrink-0 rounded-xl border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${styles[status] || styles.reserved}`}>
      {labels[status] || status}
    </span>
  );
}

function ActionButton({ icon: Icon, label, tooltipText, onClick, colorStyles, active, ariaLabel }) {
  return (
    <div className="relative group/tooltip">
      <button
        onClick={onClick}
        title={label}
        aria-label={ariaLabel}
        className={`grid h-10 w-10 place-items-center rounded-xl border transition-all duration-300 active:scale-95 ${colorStyles}`}
      >
        <Icon className={`h-4 w-4 ${active ? 'fill-current' : ''}`} />
      </button>
      
      {/* Premium CSS Tooltip (Hover) */}
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg border border-white/10 bg-black/90 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-white opacity-0 transition-all duration-200 group-hover/tooltip:opacity-100 whitespace-nowrap shadow-xl scale-95 group-hover/tooltip:scale-100">
        {tooltipText}
      </span>
    </div>
  );
}
