import { useState, useEffect, useMemo } from "react";
import { Filter, Search, Loader2 } from "lucide-react";
import VehicleCard from "./VehicleCard.jsx";
import { 
  getPublishedVehicles, 
  getAllBrands, 
  VEHICLE_TYPES 
} from "../services/vehicleService.js";

export default function VehicleCatalog() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("todos");
  const [activeBrand, setActiveBrand] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPublishedVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Error loading catalog:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const brands = useMemo(() => {
    const b = vehicles.map(v => v.brand);
    return ["Todas", ...new Set(b)];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesType = activeType === "todos" || v.type === activeType;
      const matchesBrand = activeBrand === "Todas" || v.brand === activeBrand;
      const matchesSearch = 
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesBrand && matchesSearch;
    });
  }, [vehicles, activeType, activeBrand, searchTerm]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-sport" />
        <p className="text-xs font-black uppercase tracking-widest text-white/30">Cargando inventario real...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Filters Bar */}
      <div className="sticky top-[4.5rem] z-30 -mx-5 bg-ink/80 px-5 py-4 backdrop-blur-xl sm:top-[5rem] sm:mx-0 sm:rounded-3xl sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:pb-0">
            {VEHICLE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`shrink-0 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeType === type.id
                    ? "bg-sport text-white shadow-glow"
                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1 sm:min-w-[240px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
              <input
                type="text"
                placeholder="Buscar por marca o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-xs text-white outline-none focus:border-sport/50"
              />
            </div>

            {/* Brand Filter */}
            <div className="relative flex items-center">
              <Filter className="absolute left-3 h-3 w-3 text-white/20" />
              <select
                value={activeBrand}
                onChange={(e) => setActiveBrand(e.target.value)}
                className="appearance-none rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-8 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-sport/50"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand} className="bg-ink">{brand}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 py-32 text-center">
          <p className="text-sm font-black uppercase tracking-widest text-white/20">No se encontraron unidades con esos filtros</p>
          <button 
            onClick={() => { setActiveType("todos"); setActiveBrand("Todas"); setSearchTerm(""); }}
            className="mt-4 text-[10px] font-black uppercase tracking-widest text-sport hover:text-white"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
