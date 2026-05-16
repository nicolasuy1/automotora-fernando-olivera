import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./Button.jsx";

const tags = ["Financiación", "Permuta", "Entrega coordinada", "Ciudad del Plata", "Atención Directa", "Unidades Seleccionadas"];

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] w-full overflow-hidden bg-black lg:h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-50"
          style={{ objectPosition: "50% 45%" }}
        >
          <source
            src="https://res.cloudinary.com/dvbkp3ml7/video/upload/v1778863564/0515_duxkkk.mov"
            type="video/mp4"
          />
        </video>
        {/* Smarter Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent lg:hidden" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full min-h-[95vh] flex-col justify-end px-5 pb-10 sm:px-6 lg:h-screen lg:px-8 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl pt-24 lg:pt-0"
          >
            <h1 className="text-balance text-[2.8rem] font-black leading-[0.95] tracking-tighter text-white sm:text-7xl lg:text-[10rem]">
              Tu próximo vehículo <br className="hidden sm:block" />
              <span className="text-sport">empieza acá</span>
            </h1>
            
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-xl lg:mt-8">
              Autos, camionetas y motos con financiación flexible y atención personalizada en Ciudad del Plata.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-12">
              <Button href="/catalogo" icon={ArrowRight} className="w-full sm:w-auto">
                Ver catálogo
              </Button>
              <Button
                href="https://wa.me/59892557747"
                variant="outline"
                className="w-full sm:w-auto border-white/10 hover:border-sport"
              >
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-[#25D366]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Hablar por WhatsApp
                </div>
              </Button>
            </div>
          </motion.div>

          {/* Infinite Marquee Tags */}
          <div className="mt-12 overflow-hidden border-y border-white/5 py-5 lg:mt-16">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex w-max gap-8"
            >
              {[...tags, ...tags, ...tags].map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/30"
                >
                  <span className="h-1 w-1 rounded-full bg-sport" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Desktop Visual Indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-8 opacity-40">
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="rotate-90 text-[10px] font-black uppercase tracking-[0.5em] text-white whitespace-nowrap">
          Fernando Olivera Vehículos
        </div>
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </section>
  );
}
