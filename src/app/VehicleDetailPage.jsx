import { ArrowLeft, Gauge, MessageCircle, ShieldCheck } from "lucide-react";
import Button from "../components/Button.jsx";
import Footer from "../components/Footer.jsx";
import PageHero from "../components/PageHero.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import VehicleVisual from "../components/VehicleVisual.jsx";
import { getVehicleBySlug, getRelatedVehicles } from "../services/vehicleService.js";
import { handleInternalNavigation } from "../lib/navigation.js";
import { vehicleWhatsappHref } from "../lib/whatsapp.js";

export default function VehicleDetailPage({ slug }) {
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return (
      <>
        <PageHero
          eyebrow="Vehículo no encontrado"
          title="Esta unidad ya pudo haber salido."
          text="El stock cambia rápido. Volvé al catálogo para ver oportunidades disponibles."
        >
          <Button href="/catalogo" icon={ArrowLeft}>Volver al catálogo</Button>
        </PageHero>
        <Footer />
      </>
    );
  }

  const isSold = vehicle.status === "sold";
  const related = getRelatedVehicles(vehicle);
  const displayPrice =
    vehicle.priceVisible && vehicle.priceUsd
      ? `USD ${vehicle.priceUsd.toLocaleString()}`
      : "Consultar";

  return (
    <>
      <PageHero
        eyebrow={`${vehicle.brand} / ${vehicle.year}`}
        title={vehicle.title}
        text={vehicle.shortDescription}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          {isSold ? (
            <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sport/60 bg-sport/20 px-5 text-xs font-black uppercase tracking-[0.16em] text-sport">
              Vendido
            </span>
          ) : (
            <Button href={vehicleWhatsappHref(vehicle)} icon={MessageCircle}>Consultar esta unidad</Button>
          )}
          <Button href="/catalogo" variant="secondary" icon={ArrowLeft}>Volver al catálogo</Button>
        </div>
      </PageHero>

      <section className="relative mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[1.18fr_0.82fr] lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-4 shadow-soft">
          <div className="relative h-[520px] overflow-hidden rounded-2xl">
            <VehicleVisual
              type={vehicle.visual}
              name={vehicle.title}
              image={vehicle.mainImageUrl}
              imageAlt={vehicle.imageAlt}
              note="Consultá disponibilidad, financiación y más fotos por WhatsApp."
              className="h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            {isSold && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                <span className="rounded-full border border-sport/60 bg-sport/90 px-6 py-3 text-lg font-black uppercase tracking-[0.2em] text-white">
                  Vendido
                </span>
              </div>
            )}
          </div>
          {vehicle.galleryUrls && vehicle.galleryUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {vehicle.galleryUrls.map((url, index) => (
                <div key={index} className="h-28 overflow-hidden rounded-xl border border-white/10 bg-white/[0.035]">
                  <VehicleVisual
                    type={vehicle.visual}
                    name={index === 0 ? vehicle.brand : vehicle.model}
                    image={url}
                    imageAlt={`${vehicle.title} vista ${index + 1}`}
                    note={`Vista ${index + 1}`}
                    className="h-full [&_svg]:h-10 [&_svg]:w-10 [&_p]:text-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-soft backdrop-blur-xl lg:sticky lg:top-24">
          <p className="text-sm text-white/50">{vehicle.askPrice ? "Precio" : "Desde"}</p>
          <p className="mt-1 text-5xl font-black text-white">{displayPrice}</p>
          <div className="mt-6 grid gap-3">
            {[
              ["Año", vehicle.year],
              ["Kilómetros", vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : "Consultar"],
              ["Transmisión", vehicle.transmission],
              ["Combustible", vehicle.fuel],
              vehicle.color ? ["Color", vehicle.color] : null,
              vehicle.engine ? ["Motor", vehicle.engine] : null,
              vehicle.doors ? ["Puertas", vehicle.doors] : null,
            ]
              .filter(Boolean)
              .map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-white/10 py-3">
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-white/[0.42]">{label}</span>
                  <span className="font-black text-white">{value}</span>
                </div>
              ))}
          </div>
          <div className="mt-6 rounded-2xl border border-sport/25 bg-sport/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-sport">
              <ShieldCheck className="h-5 w-5" />
              <p className="font-black">{vehicle.financingText}</p>
            </div>
            <p className="text-sm leading-6 text-white/[0.66]">
              {vehicle.acceptsTrade
                ? "Aceptamos permuta y evaluamos opciones reales según tu situación."
                : "Consultá opciones de financiación para esta unidad."}
            </p>
          </div>
          {vehicle.highlights && vehicle.highlights.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {vehicle.highlights.map((highlight) => (
                <span key={highlight} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-white/[0.68]">
                  {highlight}
                </span>
              ))}
            </div>
          )}
          {vehicle.longDescription && (
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-sm leading-7 text-white/[0.62]">{vehicle.longDescription}</p>
            </div>
          )}
          {!isSold && (
            <Button href={vehicleWhatsappHref(vehicle)} icon={MessageCircle} className="mt-7 w-full">
              Consultar por WhatsApp
            </Button>
          )}
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-sport">Relacionados</p>
              <h2 className="mt-3 text-4xl font-black text-white">Más oportunidades</h2>
            </div>
            <a
              href="/catalogo"
              onClick={(event) => handleInternalNavigation(event, "/catalogo")}
              className="hidden text-xs font-black uppercase tracking-[0.22em] text-white/[0.6] transition hover:text-white sm:block"
            >
              Ver catálogo
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <VehicleCard key={item.id} vehicle={item} />
            ))}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
