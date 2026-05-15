import { useState } from "react";
import {
  Copy,
  Eye,
  EyeOff,
  Pencil,
  ShoppingCart,
  Star,
  StarOff,
  Trash2,
  Undo2,
} from "lucide-react";
import {
  getAllVehicles,
  deleteVehicle,
  markAsSold,
  toggleFeatured,
  togglePublished,
  duplicateVehicle,
  updateVehicle,
} from "../../services/vehicleService.js";

export default function AdminVehicleList({ onEdit, onRefresh }) {
  const [filter, setFilter] = useState("all");
  const vehicles = getAllVehicles();

  const filtered =
    filter === "all"
      ? vehicles
      : vehicles.filter((v) => {
          if (filter === "featured") return v.featured;
          return v.status === filter;
        });

  function handleDelete(id, title) {
    if (window.confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) {
      deleteVehicle(id);
      onRefresh();
    }
  }

  function handleAction(fn, id) {
    fn(id);
    onRefresh();
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-black text-white">Vehículos</h1>
        <p className="text-sm text-white/40">{filtered.length} de {vehicles.length}</p>
      </div>

      {/* Status filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { id: "all", label: "Todos" },
          { id: "published", label: "Publicados" },
          { id: "draft", label: "Borradores" },
          { id: "sold", label: "Vendidos" },
          { id: "hidden", label: "Ocultos" },
          { id: "featured", label: "Destacados" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
              filter === tab.id
                ? "border-sport bg-sport/15 text-sport"
                : "border-white/10 text-white/50 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Vehicle list */}
      <div className="grid gap-3">
        {filtered.map((vehicle) => (
          <div
            key={vehicle.id}
            className="group rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-white/15 hover:bg-white/[0.04]"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Image */}
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-carbon">
                <img
                  src={vehicle.mainImageUrl || "/images/backgrounds/showroom-premium.jpeg"}
                  alt={vehicle.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-lg font-black text-white">{vehicle.title || "Sin título"}</h3>
                  {vehicle.featured && (
                    <Star className="h-4 w-4 shrink-0 fill-champagne text-champagne" />
                  )}
                </div>
                <p className="mt-1 text-sm text-white/40">
                  {vehicle.brand} · {vehicle.model} · {vehicle.year} · {vehicle.type}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusBadge status={vehicle.status} />
                  <span className="text-sm font-bold text-white/60">
                    {vehicle.priceVisible && vehicle.priceUsd
                      ? `USD ${vehicle.priceUsd.toLocaleString()}`
                      : "Consultar"}
                  </span>
                  {vehicle.acceptsTrade && (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-white/50">
                      Permuta
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-1.5 sm:flex-nowrap">
                <ActionButton
                  icon={Pencil}
                  label="Editar"
                  onClick={() => onEdit(vehicle.id)}
                />
                <ActionButton
                  icon={Copy}
                  label="Duplicar"
                  onClick={() => handleAction(duplicateVehicle, vehicle.id)}
                />
                <ActionButton
                  icon={vehicle.featured ? StarOff : Star}
                  label={vehicle.featured ? "Quitar dest." : "Destacar"}
                  onClick={() => handleAction(toggleFeatured, vehicle.id)}
                  className={vehicle.featured ? "text-champagne border-champagne/30" : ""}
                />
                {vehicle.status === "sold" ? (
                  <ActionButton
                    icon={Undo2}
                    label="Reactivar"
                    onClick={() => {
                      updateVehicle(vehicle.id, { status: "published" });
                      onRefresh();
                    }}
                  />
                ) : (
                  <ActionButton
                    icon={ShoppingCart}
                    label="Vendido"
                    onClick={() => handleAction(markAsSold, vehicle.id)}
                    className="text-sport"
                  />
                )}
                <ActionButton
                  icon={vehicle.status === "published" ? EyeOff : Eye}
                  label={vehicle.status === "published" ? "Ocultar" : "Publicar"}
                  onClick={() => handleAction(togglePublished, vehicle.id)}
                />
                <ActionButton
                  icon={Trash2}
                  label="Eliminar"
                  onClick={() => handleDelete(vehicle.id, vehicle.title)}
                  className="text-red-400 hover:!border-red-500/40 hover:!bg-red-500/10"
                />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-12 text-center">
            <p className="text-lg font-black text-white/60">No hay vehículos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/50 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white ${className}`}
    >
      <Icon className="h-4 w-4" />
    </button>
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
