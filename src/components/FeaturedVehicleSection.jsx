import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button.jsx";
import SectionReveal from "./SectionReveal.jsx";
import VehicleVisual from "./VehicleVisual.jsx";
import { getFeaturedVehicles } from "../services/vehicleService.js";
import { handleInternalNavigation } from "../lib/navigation.js";
import { vehicleWhatsappHref } from "../lib/whatsapp.js";

export default function FeaturedVehicleSection() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(500);

  // Measure card width dynamically based on viewport size to match CSS
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardWidth(500);
      } else if (width >= 640) {
        setCardWidth(450);
      } else {
        setCardWidth(width * 0.85); // 85vw
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await getFeaturedVehicles(10);
        setFeatured(data);
        // Start in the middle copy to enable seamless backward & forward loops
        setCurrentIndex(data.length);
      } catch (error) {
        console.error("Error loading featured vehicles:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (featured.length === 0 || paused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4500); // Pass a slide every 4.5 seconds

    return () => clearInterval(interval);
  }, [featured, paused]);

  const handleAnimationComplete = () => {
    const N = featured.length;
    if (N === 0) return;

    if (currentIndex >= 2 * N) {
      // Reached the end of the middle copy, jump back to first copy seamlessly
      setIsJumping(true);
      setCurrentIndex(currentIndex - N);
    } else if (currentIndex < N) {
      // Reached the beginning of the middle copy, jump forward to second copy seamlessly
      setIsJumping(true);
      setCurrentIndex(currentIndex + N);
    }
  };

  // Reset jumping state on the next animation frame
  useEffect(() => {
    if (isJumping) {
      const raf = requestAnimationFrame(() => {
        setIsJumping(false);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isJumping]);

  const scroll = (direction) => {
    if (isJumping) return;
    setPaused(true);
    if (direction === 'left') {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sport" />
      </div>
    );
  }

  if (featured.length === 0) return null;

  // Triple the array to create identical boundary zones for seamless wrapping
  const displayItems = [...featured, ...featured, ...featured];

  return (
    <SectionReveal id="vehiculos" className="relative overflow-hidden bg-ink py-20">
      {/* Background Decor */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(225,29,72,0.05),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sport">Showroom</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.95] text-white sm:text-6xl">
              Unidades <span className="text-white/40">Destacadas.</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-white/40 transition hover:border-sport hover:text-white active:scale-95"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 text-white/40 transition hover:border-sport hover:text-white active:scale-95"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div 
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="relative w-full overflow-hidden pb-12"
        >
          <motion.div 
            animate={{ x: -currentIndex * (cardWidth + 24) }}
            transition={isJumping ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22 }}
            onAnimationComplete={handleAnimationComplete}
            className="flex gap-6"
          >
            {displayItems.map((vehicle, index) => (
              <div 
                key={`${vehicle.id}-${index}`}
                className="shrink-0"
                style={{ width: `${cardWidth}px` }}
              >
                <article className="premium-surface group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 hover:border-sport/30 hover:bg-white/[0.04]">
                  <a
                    href={`/catalogo/${vehicle.slug}`}
                    onClick={(event) => handleInternalNavigation(event, `/catalogo/${vehicle.slug}`)}
                    className="block"
                  >
                    <VehicleVisual
                      type={vehicle.visual_type}
                      name={vehicle.title}
                      image={vehicle.main_image_url}
                      imageAlt={vehicle.brand + " " + vehicle.model}
                      className="h-[300px] rounded-3xl"
                    />
                  </a>
                  
                  <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sport">
                        {vehicle.brand} · {vehicle.year}
                      </p>
                      <h3 className="mt-2 truncate text-2xl font-black text-white uppercase tracking-tight group-hover:text-sport transition-colors">
                        {vehicle.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold text-white/60">
                          {vehicle.price_visible && vehicle.price_usd ? `USD ${vehicle.price_usd.toLocaleString()}` : "Consultar precio"}
                        </span>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold text-white/60">
                          {vehicle.fuel}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <a
                        href={vehicleWhatsappHref(vehicle)}
                        className="grid h-12 w-12 place-items-center rounded-2xl bg-sport text-white shadow-glow transition hover:scale-105"
                        aria-label="WhatsApp"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </a>
                      <a
                        href={`/catalogo/${vehicle.slug}`}
                        onClick={(event) => handleInternalNavigation(event, `/catalogo/${vehicle.slug}`)}
                        className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button href="/catalogo" variant="secondary" className="px-12">
            Explorar catálogo completo
          </Button>
        </div>
      </div>
    </SectionReveal>
  );
}
