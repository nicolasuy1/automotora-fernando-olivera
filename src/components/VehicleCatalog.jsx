import { motion } from "framer-motion";
import { ArrowDown, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import Button from "./Button.jsx";
import SectionReveal from "./SectionReveal.jsx";
import VehicleCard from "./VehicleCard.jsx";
import { getPublishedVehicles, getAllBrands, VEHICLE_TYPES } from "../services/vehicleService.js";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const SORT_OPTIONS = [
  { id: "recent", label: "Más recientes" },
  { id: "price-asc", label: "Menor precio" },
  { id: "price-desc", label: "Mayor precio" },
  { id: "year-desc", label: "Más nuevos" },
  { id: "year-asc", label: "Más antiguos" },
];

export default function VehicleCatalog() {
  const [activeType, setActiveType] = useState("todos");
  const [activeBrand, setActiveBrand] = useState("todas");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const allVehicles = getPublishedVehicles();
  const brands = getAllBrands();

  const filteredVehicles = useMemo(() => {
    let result = allVehicles;

    // Filter by type
    if (activeType !== "todos") {
      result = result.filter((v) => v.type === activeType);
    }

    // Filter by brand
    if (activeBrand !== "todas") {
      result = result.filter((v) => v.brand === activeBrand);
    }

    // Filter by search text
    if (searchText.trim()) {
      const q = searchText.toLowerCase().trim();
      result = result.filter(
        (v) =>
          (v.title || "").toLowerCase().includes(q) ||
          (v.brand || "").toLowerCase().includes(q) ||
          (v.model || "").toLowerCase().includes(q) ||
          (v.shortDescription || "").toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => (a.priceUsd || 999999) - (b.priceUsd || 999999));
        break;
      case "price-desc":
        result = [...result].sort((a, b) => (b.priceUsd || 0) - (a.priceUsd || 0));
        break;
      case "year-desc":
        result = [...result].sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "year-asc":
        result = [...result].sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      default:
        // recent — by createdAt desc
        result = [...result].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [allVehicles, activeType, activeBrand, searchText, sortBy]);

  return (
    <SectionReveal id="vehiculos" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 pb-20 pt-12 sm:px-6 sm:pt-20 lg:px-8">
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-sport/10 blur-3xl" />

      {/* Header */}
      <div className="relative mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-champagne">Catálogo</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl">
            Autos, camionetas y motos para consultar hoy.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/[0.66]">
            El stock cambia rápido. Filtrá por tipo, revisá opciones disponibles y escribinos por WhatsApp para confirmar financiación, permuta y entrega.
          </p>
        </div>
        <Button href="/financiacion" variant="ghost" icon={Sparkles}>
          Ver opciones de financiación
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Buscar por marca, modelo o palabra clave..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full rounded-full border border-white/10 bg-white/[0.045] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-sport/50 focus:ring-1 focus:ring-sport/30"
        />
      </div>

      {/* Filters row */}
      <div className="relative mb-6 flex flex-wrap items-center gap-3">
        {/* Type filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {VEHICLE_TYPES.map((type) => {
            const active = activeType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-black uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-sport bg-sport text-white shadow-glow"
                    : "border-white/10 bg-white/[0.045] text-white/[0.62] hover:border-champagne/50 hover:text-white"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Brand filter */}
        <div className="relative">
          <select
            value={activeBrand}
            onChange={(e) => setActiveBrand(e.target.value)}
            className="h-10 appearance-none rounded-full border border-white/10 bg-white/[0.045] pl-4 pr-8 text-xs font-black uppercase tracking-[0.18em] text-white/[0.62] outline-none transition hover:border-champagne/50 hover:text-white"
          >
            <option value="todas">Todas las marcas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <ArrowDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40" />
        </div>

        {/* Sort */}
        <div className="relative ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 appearance-none rounded-full border border-white/10 bg-white/[0.045] pl-4 pr-8 text-xs font-bold text-white/[0.62] outline-none transition hover:border-champagne/50 hover:text-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <ArrowDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/40" />
        </div>
      </div>

      {/* Results count */}
      <p className="relative mb-6 text-sm text-white/[0.44]">
        {filteredVehicles.length} {filteredVehicles.length === 1 ? "vehículo encontrado" : "vehículos encontrados"}
      </p>

      {/* Grid */}
      {filteredVehicles.length > 0 ? (
        <motion.div
          key={`${activeType}-${activeBrand}-${sortBy}`}
          className="relative grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </motion.div>
      ) : (
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-12 text-center">
          <p className="text-xl font-black text-white">No se encontraron vehículos</p>
          <p className="mt-3 text-sm text-white/[0.58]">
            Probá cambiando los filtros o consultá disponibilidad directa por WhatsApp.
          </p>
        </div>
      )}
    </SectionReveal>
  );
}
