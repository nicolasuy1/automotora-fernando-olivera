import { Instagram, MapPin, Phone, Clock } from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-black pt-20 pb-32 lg:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Brand and Description */}
          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sport shadow-glow">
                <img 
                  src="https://res.cloudinary.com/dvbkp3ml7/image/upload/v1778864022/logo-fernando_y2z3p7.png" 
                  alt="FO Logo" 
                  className="h-8 w-8 object-contain brightness-0 invert" 
                />
              </div>
              <div className="text-white">
                <p className="text-lg font-black uppercase tracking-tighter leading-none">Fernando Olivera</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-white/40">Vehículos</p>
              </div>
            </div>
            <p className="mt-8 text-sm leading-7 text-white/50">
              Compra, venta y permuta de autos, camionetas y motos. Financiación flexible, entrega coordinada y atención personalizada en Ciudad del Plata.
            </p>
          </div>

          {/* Contact and Hours */}
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sport mb-8">Contacto</p>
              <ul className="space-y-5">
                <li>
                  <a href="https://wa.me/59892557747" className="group flex items-center gap-3 text-sm text-white/70 transition hover:text-white">
                    <div className="text-sport group-hover:scale-110 transition-transform">
                      <WhatsAppIcon />
                    </div>
                    <span>WhatsApp: +598 92 557 747</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+59892557747" className="group flex items-center gap-3 text-sm text-white/70 transition hover:text-white">
                    <Phone className="h-4 w-4 text-sport" />
                    <span>Llamar directo</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="mt-0.5 h-4 w-4 text-sport shrink-0" />
                  <span>Ruta 1 km 24, Ciudad del Plata, San José</span>
                </li>
                <li>
                  <a href="https://instagram.com/automotora_fernando_olivera_" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-white/70 transition hover:text-white">
                    <Instagram className="h-4 w-4 text-sport" />
                    <span>@automotora_fernando_olivera_</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sport mb-8">Horario</p>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-sport" />
                  <span>Lun a Vie: <strong className="text-white">09:00 – 19:00</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4" />
                  <span>Sábados: <strong className="text-white">09:00 – 14:00</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-4" />
                  <span>Domingos: <span className="opacity-60 italic font-medium">Cerrado</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Improved Contrast */}
        <div className="mt-20 border-t border-white/10 pt-10 text-center lg:text-left">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              © {currentYear} Fernando Olivera Vehículos · <span className="text-white/60">Ciudad del Plata, Uruguay.</span>
            </p>
            <div className="flex justify-center gap-8 lg:justify-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors cursor-default">Legales</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors cursor-default">Privacidad</span>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED MOBILE BAR - Centered and Premium */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-5 lg:hidden">
        <a 
          href="https://wa.me/59892557747"
          className="flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-sport py-5 text-xs font-black uppercase tracking-[0.25em] text-white shadow-glow"
        >
          <WhatsAppIcon />
          Hablar por WhatsApp
        </a>
      </div>
    </footer>
  );
}
