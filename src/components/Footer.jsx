import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import { handleInternalNavigation } from "../lib/navigation.js";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-black pt-20 pb-28 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Brand and Description */}
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-lg bg-sport p-1.5">
                <img src="/logo-fo.png" alt="Logo Fernando Olivera" className="h-full w-full object-contain brightness-0 invert" />
              </div>
              <div className="text-white">
                <p className="text-sm font-black uppercase tracking-widest">Fernando Olivera</p>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Vehículos</p>
              </div>
            </div>
            <p className="mt-8 text-sm leading-7 text-white/50">
              Compra, venta y permuta de autos, camionetas y motos. Financiación flexible, entrega coordinada y atención personalizada en Ciudad del Plata.
            </p>
          </div>

          {/* Contact Info and Hours */}
          <div className="grid gap-10 sm:grid-cols-2 lg:justify-items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sport mb-6">Contacto</p>
              <ul className="space-y-4">
                <li>
                  <a href="https://wa.me/59892557747" className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white">
                    <WhatsAppIcon />
                    <span>WhatsApp: +598 92 557 747</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+59892557747" className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white">
                    <Phone className="h-4 w-4 text-sport" />
                    <span>Llamar ahora</span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-white/60">
                  <MapPin className="h-4 w-4 text-sport" />
                  <span>Ruta 1 km 24, Ciudad del Plata, San José</span>
                </li>
                <li>
                  <a href="https://instagram.com/automotora_fernando_olivera_" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white">
                    <Instagram className="h-4 w-4 text-sport" />
                    <span>@automotora_fernando_olivera_</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-sport mb-6">Horario</p>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-sport" />
                  <span>Lunes a Viernes: <strong className="text-white">09:00 – 19:00</strong></span>
                </li>
                <li className="ml-7">Sábados: <strong className="text-white">09:00 – 14:00</strong></li>
                <li className="ml-7">Domingos: <span className="opacity-40">Cerrado</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col gap-6 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-widest text-white/20">
            Fernando Olivera Vehículos · Ruta 1 KM 24, Ciudad del Plata, San José.
          </p>
          <div className="flex gap-8">
            <p className="text-[10px] uppercase tracking-widest text-white/20">
              © {currentYear} · Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>

      {/* Floating CTA Mobile Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-white/10 bg-black/90 p-4 backdrop-blur-xl lg:hidden">
        <a 
          href="https://wa.me/59892557747"
          className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-sport py-4 text-xs font-black uppercase tracking-widest text-white shadow-glow"
        >
          <WhatsAppIcon />
          Hablar ahora
        </a>
      </div>
    </footer>
  );
}
