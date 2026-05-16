import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "./Button.jsx";
import SectionReveal from "./SectionReveal.jsx";
import VehicleVisual from "./VehicleVisual.jsx";
import { getFeaturedVehicles } from "../services/vehicleService.js";
import { handleInternalNavigation } from "../lib/navigation.js";
import { vehicleWhatsappHref } from "../lib/whatsapp.js";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function FeaturedVehicleSection() {
  const featured = getFeaturedVehicles(3);

  return (
    <SectionReveal id="vehiculos" className="relative overflow-hidden px-5 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(225,29,72,.14),transparent_34%),linear-gradient(180deg,#0B0B0B,#101012)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-champagne">Vehículos destacados</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] text-white sm:text-6xl">
              Vehículos destacados para consultar hoy.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/[0.62] lg:justify-self-end">
            Oportunidades seleccionadas con financiación, permuta y atención directa por WhatsApp.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {featured.map((vehicle, index) => (
            <motion.article
              key={vehicle.id}
              variants={item}
              whileHover={{ y: -8 }}
              className={`premium-surface group relative overflow-hidden rounded-3xl p-4 ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <a
                href={`/catalogo/${vehicle.slug}`}
                onClick={(event) => handleInternalNavigation(event, `/catalogo/${vehicle.slug}`)}
                className="block"
              >
                <VehicleVisual
                  type={vehicle.visual}
                  name={vehicle.title}
                  image={vehicle.mainImageUrl}
                  imageAlt={vehicle.imageAlt}
                  note="Consultá disponibilidad y financiación."
                  className={`${index === 0 ? "h-[390px]" : "h-[270px]"} rounded-2xl`}
                />
              </a>
              <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-champagne">
                    {vehicle.brand} / {vehicle.year}
                  </p>
                  <h3 className="mt-2 text-3xl font-black leading-tight text-white">{vehicle.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/[0.62]">{vehicle.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      vehicle.priceVisible && vehicle.priceUsd ? `USD ${vehicle.priceUsd.toLocaleString()}` : "Consultar precio",
                      vehicle.financingText,
                      vehicle.acceptsTrade ? "Permuta" : null,
                    ]
                      .filter(Boolean)
                      .map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-[11px] font-bold text-white/[0.65]">
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={vehicleWhatsappHref(vehicle)}
                    className="premium-button grid h-12 w-12 place-items-center rounded-full border border-sport bg-sport text-white shadow-glow"
                    aria-label={`Consultar ${vehicle.title}`}
                  >
                    <MessageCircle className="relative z-10 h-5 w-5" />
                  </a>
                  <a
                    href={`/catalogo/${vehicle.slug}`}
                    onClick={(event) => handleInternalNavigation(event, `/catalogo/${vehicle.slug}`)}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/[0.72] transition hover:border-champagne/40 hover:text-white"
                    aria-label={`Ver ficha de ${vehicle.title}`}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <Button href="/catalogo" icon={ArrowRight} variant="secondary">Ver catálogo completo</Button>
        </div>
      </div>
    </SectionReveal>
  );
}
