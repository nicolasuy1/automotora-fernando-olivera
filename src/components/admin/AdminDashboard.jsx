import { useState, useEffect } from "react";
import { Car, Eye, Package, ShoppingCart, Star, TrendingUp, Loader2 } from "lucide-react";
import { getDashboardStats } from "../../services/vehicleService.js";
import { formatVehicleTitle, formatCategory } from "../../lib/formatters.js";

const CATEGORY_METADATA = {
  automoviles: { label: "Automóviles", color: "#f43f5e", bg: "bg-rose-500" },
  camionetas: { label: "Camionetas", color: "#fbbf24", bg: "bg-amber-400" },
  suv: { label: "SUV", color: "#10b981", bg: "bg-emerald-500" },
  utilitarios: { label: "Utilitarios", color: "#3b82f6", bg: "bg-blue-500" },
  otros: { label: "Otros", color: "#9ca3af", bg: "bg-gray-400" },
};

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sport" />
      </div>
    );
  }

  const cards = [
    { icon: Package, label: "Total vehículos", value: stats?.total || 0, color: "text-white" },
    { icon: Eye, label: "Publicados", value: stats?.published || 0, color: "text-emerald-400" },
    { icon: ShoppingCart, label: "Vendidos", value: stats?.sold || 0, color: "text-sport" },
    { icon: Car, label: "Reservados", value: stats?.draft || 0, color: "text-amber-400" },
    { icon: TrendingUp, label: "Ocultos", value: stats?.hidden || 0, color: "text-gray-400" },
    { icon: Star, label: "Destacados", value: stats?.featured || 0, color: "text-champagne" },
  ];

  // Process category stats
  const categoryData = Object.entries(stats?.categories || {}).map(([key, count]) => {
    const normKey = key.toLowerCase().trim();
    const meta = CATEGORY_METADATA[normKey] || {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: "#a855f7",
      bg: "bg-purple-500",
    };
    return {
      key: normKey,
      label: meta.label,
      count,
      color: meta.color,
      bg: meta.bg,
    };
  }).sort((a, b) => b.count - a.count);

  const totalCategoryVehicles = categoryData.reduce((sum, item) => sum + item.count, 0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius; // ~376.99

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Panel General</h1>
        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Estado actual del inventario de vehículos</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-white/20"
          >
            <div className="mb-4 flex items-center justify-between">
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{label}</span>
            </div>
            <p className={`text-4xl font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Category distribution visual donut chart */}
      <div className="grid gap-6 md:grid-cols-5 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
        <div className="md:col-span-3 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Distribución del Stock</h2>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Participación de inventario por categoría</p>
          </div>
          
          <div className="mt-8 space-y-3">
            {categoryData.length === 0 ? (
              <p className="text-white/40 text-xs italic">Cargando datos o sin vehículos registrados...</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-1">
                {categoryData.map((item) => {
                  const pct = totalCategoryVehicles > 0 ? ((item.count / totalCategoryVehicles) * 100).toFixed(1) : 0;
                  return (
                    <div key={item.key} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${item.bg}`} />
                        <span className="text-xs font-bold text-white/80 uppercase">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-white">{item.count} {item.count === 1 ? 'unidad' : 'unidades'}</span>
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-black text-white/40">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex items-center justify-center py-4">
          {totalCategoryVehicles > 0 ? (
            <div className="relative h-52 w-52">
              <svg viewBox="0 0 200 200" className="h-full w-full rotate-0 transition-transform duration-500">
                {/* Background track circle */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="18"
                />
                
                {/* Donut sectors */}
                {(() => {
                  let accumulatedPercent = 0;
                  return categoryData.map((item) => {
                    const pct = (item.count / totalCategoryVehicles);
                    const dashArray = `${pct * circumference} ${circumference}`;
                    const strokeOffset = -accumulatedPercent * circumference;
                    accumulatedPercent += pct;
                    
                    return (
                      <circle
                        key={item.key}
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="transparent"
                        stroke={item.color}
                        strokeWidth="18"
                        strokeDasharray={dashArray}
                        strokeDashoffset={strokeOffset}
                        transform="rotate(-90 100 100)"
                        className="transition-all duration-300 hover:stroke-[22] cursor-pointer origin-center"
                        style={{ transition: "stroke-width 0.2s" }}
                      />
                    );
                  });
                })()}

                {/* Center text values */}
                <text x="100" y="96" textAnchor="middle" className="fill-white text-3xl font-black tracking-tighter">
                  {totalCategoryVehicles}
                </text>
                <text x="100" y="116" textAnchor="middle" className="fill-white/35 text-[9px] font-black uppercase tracking-[0.25em]">
                  Unidades
                </text>
              </svg>
            </div>
          ) : (
            <div className="h-44 w-44 rounded-full border border-dashed border-white/10 flex items-center justify-center">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Sin stock</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent vehicles */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Últimas unidades</h2>
          <button
            onClick={() => onNavigate("vehicles")}
            className="text-[10px] font-black uppercase tracking-widest text-sport transition hover:text-white"
          >
            Ver catálogo completo →
          </button>
        </div>
        <div className="grid gap-4">
          {stats?.recent.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center gap-5 rounded-2xl border border-white/5 bg-white/[0.01] p-4 transition hover:bg-white/[0.03]"
            >
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-carbon">
                <img
                  src={vehicle.main_image_url || "/images/backgrounds/showroom-premium.jpeg"}
                  alt={formatVehicleTitle(vehicle.title)}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-white uppercase">{formatVehicleTitle(vehicle.title)}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1">
                  {vehicle.brand} · {vehicle.year} · {formatCategory(vehicle.category)}
                </p>
              </div>
              <StatusBadge status={vehicle.status} />
              <button
                onClick={() => onNavigate("vehicle-form", vehicle.id)}
                className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/60 transition hover:text-white"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
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
    <span className={`shrink-0 rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${styles[status] || styles.reserved}`}>
      {labels[status] || status}
    </span>
  );
}
