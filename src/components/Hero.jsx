import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./Button.jsx";
import WhatsAppIcon from "./icons/WhatsAppIcon.jsx";

const tags = ["Financiación", "Permuta", "Entrega coordinada", "Ciudad del Plata", "Atención Directa", "Unidades Seleccionadas"];

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Video Background - High clarity, minimal filter */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-100 brightness-105"
          style={{ objectPosition: "50% 50%" }}
        >
          <source
            src="https://res.cloudinary.com/dvbkp3ml7/video/upload/v1778863564/0515_duxkkk.mov"
            type="video/mp4"
          />
        </video>
        
        {/* Minimal edge-only gradients for text contrast without darkening the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent lg:from-black/10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-12 sm:px-10 lg:px-20 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl pt-14"
          >
            <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-[5.2rem] xl:text-[6.2rem]">
              Tu próximo vehículo <br className="hidden lg:block" />
              <span className="text-sport">empieza acá</span>
            </h1>
            
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white sm:text-xl lg:mt-8 font-medium">
              Autos, camionetas y motos con financiación flexible y atención personalizada en Ciudad del Plata.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-10">
              <Button href="/catalogo" icon={ArrowRight} className="w-full sm:w-auto">
                Ver catálogo
              </Button>
              <Button
                href="https://wa.me/59892557747"
                variant="outline"
                className="w-full sm:w-auto border-white/40 hover:border-sport bg-black/5 backdrop-blur-md"
                icon={WhatsAppIcon}
              >
                Hablar por WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* Marquee Tags */}
          <div className="mt-12 overflow-hidden border-y border-white/5 py-4 lg:mt-16">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex w-max gap-12"
            >
              {[...tags, ...tags, ...tags].map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40"
                >
                  <span className="h-1 w-1 rounded-full bg-sport" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden 2xl:flex flex-col gap-8 opacity-20">
        <div className="h-20 w-px bg-white" />
        <div className="rotate-90 text-[10px] font-black uppercase tracking-[0.5em] text-white whitespace-nowrap">
          FO Vehículos
        </div>
        <div className="h-20 w-px bg-white" />
      </div>
    </section>
  );
}
