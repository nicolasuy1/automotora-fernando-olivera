import { useState, useEffect } from "react";
import { Car, Eye, Package, ShoppingCart, Star, TrendingUp, Loader2 } from "lucide-react";
import { getDashboardStats } from "../../services/vehicleService.js";

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

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Panel General</h1>
        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Estado actual del inventario</p>
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
                  alt={vehicle.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-white uppercase">{vehicle.title}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1">
                  {vehicle.brand} · {vehicle.year} · {vehicle.category}
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
