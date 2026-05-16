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
  Filter
} from "lucide-react";
import { 
  getAllVehicles, 
  deleteVehicle, 
  markAsSold, 
  toggleFeatured, 
  togglePublished, 
  duplicateVehicle 
} from "../../services/vehicleService.js";

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

  async function handleDelete(id) {
    if (!confirm("¿Seguro que querés eliminar este vehículo? Esta acción no se puede deshacer.")) return;
    try {
      await deleteVehicle(id);
      loadVehicles();
    } catch (error) {
      alert("Error al eliminar.");
    }
  }

  async function handleAction(actionFn, id) {
    try {
      await actionFn(id);
      loadVehicles();
    } catch (error) {
      alert("Error al realizar la acción.");
    }
  }

  async function handleDuplicate(id) {
    try {
      await duplicateVehicle(id);
      loadVehicles();
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
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Inventario</h1>
          <p className="text-white/40 text-xs uppercase tracking-widest mt-1">
            {filteredVehicles.length} unidades encontradas
          </p>
        </div>

        <div className="flex flex-1 max-w-md gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-sport/50 transition-all"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white/70 outline-none focus:border-sport/50 transition-all"
          >
            <option value="all">Todos</option>
            <option value="available">Disponibles</option>
            <option value="sold">Vendidos</option>
            <option value="reserved">Reservados</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredVehicles.map((vehicle) => (
          <div 
            key={vehicle.id}
            className="group relative flex flex-col sm:flex-row sm:items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.04] hover:border-white/20"
          >
            {/* Thumbnail */}
            <div className="h-24 w-full sm:w-36 shrink-0 overflow-hidden rounded-2xl bg-carbon">
              <img 
                src={vehicle.main_image_url || "/images/backgrounds/showroom-premium.jpeg"} 
                alt={vehicle.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="truncate text-lg font-black text-white uppercase tracking-tight">{vehicle.title}</h3>
                {vehicle.featured && <Star className="h-4 w-4 text-champagne fill-champagne" />}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <span>{vehicle.year}</span>
                <span>{vehicle.brand}</span>
                <span>{vehicle.category}</span>
                <span className="text-white/60">USD {vehicle.price_usd?.toLocaleString() || "---"}</span>
              </div>
            </div>

            {/* Status */}
            <StatusBadge status={vehicle.status} />

            {/* Actions */}
            <div className="flex items-center gap-2 border-t border-white/5 pt-4 sm:border-0 sm:pt-0">
              <ActionButton 
                icon={Edit2} 
                label="Editar" 
                onClick={() => onEdit(vehicle.id)} 
                color="hover:text-blue-400"
              />
              <ActionButton 
                icon={CheckCircle2} 
                label="Vendido" 
                onClick={() => handleAction(markAsSold, vehicle.id)} 
                color="hover:text-sport"
                active={vehicle.status === "sold"}
              />
              <ActionButton 
                icon={Star} 
                label="Destacar" 
                onClick={() => handleAction(toggleFeatured, vehicle.id)} 
                color="hover:text-champagne"
                active={vehicle.featured}
              />
              <ActionButton 
                icon={vehicle.status === "available" ? Eye : EyeOff} 
                label={vehicle.status === "available" ? "Ocultar" : "Mostrar"} 
                onClick={() => handleAction(togglePublished, vehicle.id)} 
                color="hover:text-emerald-400"
              />
              <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
              <ActionButton 
                icon={Copy} 
                label="Duplicar" 
                onClick={() => handleDuplicate(vehicle.id)} 
                color="hover:text-white"
              />
              <ActionButton 
                icon={Trash2} 
                label="Borrar" 
                onClick={() => handleDelete(vehicle.id)} 
                color="hover:text-red-500"
              />
            </div>
          </div>
        ))}

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-white/[0.01]">
            <Package className="mx-auto h-12 w-12 text-white/10 mb-4" />
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

function ActionButton({ icon: Icon, label, onClick, color, active }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 ${color} ${active ? 'bg-white/10 border-white/20 text-white' : 'text-white/40'}`}
    >
      <Icon className={`h-4 w-4 ${active ? 'fill-current' : ''}`} />
    </button>
  );
}
