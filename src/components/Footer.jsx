import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { whatsappHref } from "../lib/whatsapp.js";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.6fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo-fernando-olivera.jpeg"
              alt="Fernando Olivera"
              loading="lazy"
              decoding="async"
              width="48"
              height="48"
              className="h-12 w-12 rounded-full border border-sport/50 object-cover"
            />
            <div>
              <p className="font-black uppercase tracking-[0.22em] text-white">Fernando Olivera</p>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/[0.42]">Vehículos</p>
            </div>
          </div>
          <p className="mt-6 max-w-xl leading-7 text-white/[0.58]">
            Compra, venta y permuta de autos, camionetas y motos. Financiación flexible, entrega coordinada y atención personalizada en Ciudad del Plata.
          </p>
        </div>

        {/* Contact */}
        <div className="grid gap-4 text-sm text-white/[0.66]">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sport">Contacto</p>
          <a className="flex items-center gap-3 transition hover:text-white" href={whatsappHref()}>
            <MessageCircle className="h-5 w-5 shrink-0 text-sport" />
            WhatsApp: +598 92 557 747
          </a>
          <a className="flex items-center gap-3 transition hover:text-white" href="tel:+59892557747">
            <Phone className="h-5 w-5 shrink-0 text-sport" />
            Llamar ahora
          </a>
          <span className="flex items-center gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-sport" />
            Ruta 1 km 24, Ciudad del Plata, San José
          </span>
          <a
            className="flex items-center gap-3 transition hover:text-white"
            href="https://www.instagram.com/automotora_fernando_olivera_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5 shrink-0 text-sport" />
            @automotora_fernando_olivera_
          </a>
        </div>

        {/* Hours */}
        <div className="grid content-start gap-4 text-sm text-white/[0.66]">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sport">Horario</p>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-sport" />
            <div className="grid gap-1.5">
              <span>Lunes a Viernes: <strong className="text-white/[0.82]">09:00 – 19:00</strong></span>
              <span>Sábados: <strong className="text-white/[0.82]">09:00 – 14:00</strong></span>
              <span>Domingos: <strong className="text-white/[0.52]">Cerrado</strong></span>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/[0.36]">
        Fernando Olivera Vehículos · Ruta 1 km 24, Ciudad del Plata, San José.
      </div>
    </footer>
  );
}
