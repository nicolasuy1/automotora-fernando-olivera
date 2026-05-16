import { useState } from "react";
import {
  BarChart3,
  Car,
  ChevronLeft,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import AdminDashboard from "../components/admin/AdminDashboard.jsx";
import AdminVehicleList from "../components/admin/AdminVehicleList.jsx";
import AdminVehicleForm from "../components/admin/AdminVehicleForm.jsx";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "vehicles", label: "Vehículos", icon: Car },
];

export default function AdminPage() {
  const [view, setView] = useState("dashboard");
  const [editingId, setEditingId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function refresh() {
    setRefreshKey((k) => k + 1);
  }

  function navigateTo(viewName, vehicleId = null) {
    setView(viewName);
    setEditingId(vehicleId);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-36 sm:pt-40 pb-20">
      {/* Solid backdrop to prevent cars from peeking through the floating main Navbar */}
      <div className="fixed inset-x-0 top-0 h-[8.5rem] z-40 bg-[#0a0a0c] sm:h-[9rem]" />

      {/* Admin header bar */}
      <div className="fixed inset-x-0 top-[4.5rem] z-50 border-b border-white/10 bg-[#0a0a0c] shadow-2xl sm:top-[5rem]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:py-2">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {/* Back to site */}
            <a
              href="/"
              className="mr-1 flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[10px] font-bold text-white/50 transition hover:text-white sm:mr-3 sm:px-3 sm:text-xs"
            >
              <ChevronLeft className="h-3 w-3" />
              <span className="hidden sm:inline">Sitio</span>
            </a>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = view === item.id || (item.id === "vehicles" && (view === "vehicle-form" || view === "vehicles"));
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition sm:px-3 sm:text-xs sm:tracking-[0.14em] ${
                    active
                      ? "bg-sport/15 text-sport"
                      : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => navigateTo("vehicle-form", null)}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-sport bg-sport px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-white shadow-glow transition hover:brightness-110 sm:text-xs sm:tracking-[0.14em]"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">Nuevo</span>
            <span className="hidden sm:inline">vehículo</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20">


        {view === "dashboard" && (
          <AdminDashboard
            key={refreshKey}
            onNavigate={navigateTo}
          />
        )}
        {view === "vehicles" && (
          <AdminVehicleList
            key={refreshKey}
            onEdit={(id) => navigateTo("vehicle-form", id)}
            onRefresh={refresh}
          />
        )}
        {view === "vehicle-form" && (
          <AdminVehicleForm
            vehicleId={editingId}
            onSave={() => {
              refresh();
              navigateTo("vehicles");
            }}
            onCancel={() => navigateTo("vehicles")}
          />
        )}
      </div>
    </div>
  );
}
