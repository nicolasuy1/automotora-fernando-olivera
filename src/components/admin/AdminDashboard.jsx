import { Car, Eye, Package, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { getDashboardStats } from "../../services/vehicleService.js";

export default function AdminDashboard({ onNavigate }) {
  const stats = getDashboardStats();

  const cards = [
    { icon: Package, label: "Total vehículos", value: stats.total, color: "text-white" },
    { icon: Eye, label: "Publicados", value: stats.published, color: "text-emerald-400" },
    { icon: ShoppingCart, label: "Vendidos", value: stats.sold, color: "text-sport" },
    { icon: Car, label: "Borradores", value: stats.draft, color: "text-amber-400" },
    { icon: TrendingUp, label: "Ocultos", value: stats.hidden, color: "text-gray-400" },
    { icon: Star, label: "Destacados", value: stats.featured, color: "text-champagne" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-black text-white">Dashboard</h1>

      {/* Stats grid */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-white/20"
          >
            <div className="mb-4 flex items-center justify-between">
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{label}</span>
            </div>
            <p className={`text-4xl font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Recent vehicles */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black text-white">Últimos cargados</h2>
          <button
            onClick={() => onNavigate("vehicles")}
            className="text-xs font-black uppercase tracking-[0.16em] text-sport transition hover:text-white"
          >
            Ver todos →
          </button>
        </div>
        <div className="grid gap-3">
          {stats.recent.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:bg-white/[0.05]"
            >
              <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-carbon">
                <img
                  src={vehicle.mainImageUrl || "/images/backgrounds/showroom-premium.jpeg"}
                  alt={vehicle.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-black text-white">{vehicle.title}</p>
                <p className="text-xs text-white/40">
                  {vehicle.brand} · {vehicle.year}
                </p>
              </div>
              <StatusBadge status={vehicle.status} />
              <button
                onClick={() => onNavigate("vehicle-form", vehicle.id)}
                className="shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/60 transition hover:text-white"
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
    published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    draft: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    sold: "border-sport/30 bg-sport/10 text-sport",
    hidden: "border-gray-500/30 bg-gray-500/10 text-gray-400",
  };

  const labels = {
    published: "Publicado",
    draft: "Borrador",
    sold: "Vendido",
    hidden: "Oculto",
  };

  return (
    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${styles[status] || styles.draft}`}>
      {labels[status] || status}
    </span>
  );
}
