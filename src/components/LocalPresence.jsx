import { CalendarCheck, Clock, MapPin, MessageCircle, WalletCards } from "lucide-react";
import Button from "./Button.jsx";
import SectionReveal from "./SectionReveal.jsx";
import { whatsappHref } from "../lib/whatsapp.js";

export default function LocalPresence() {
  const items = [
    { icon: MapPin, title: "Ubicación", text: "Ruta 1 km 24, Ciudad del Plata, San José" },
    { icon: Clock, title: "Horario de atención", text: "Lun a Vie: 09:00 – 19:00 · Sáb: 09:00 – 14:00" },
    { icon: MessageCircle, title: "WhatsApp directo", text: "Consultá disponibilidad y recibí respuesta personalizada." },
    { icon: CalendarCheck, title: "Coordinación de visita", text: "Agendá para ver la unidad y resolver dudas en persona." },
    { icon: WalletCards, title: "Financiación y permuta", text: "Te asesoramos según tu entrega y situación." },
  ];

  return (
    <SectionReveal id="contacto" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-soft sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(225,29,72,.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.07),transparent)]" />
        <div className="speed-lines absolute inset-0 opacity-20" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sport">Contacto y ubicación</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl">
              Visitá nuestro showroom en Ciudad del Plata
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.68]">
              Consultá disponibilidad, financiación o permuta y coordiná una visita por WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={whatsappHref()} icon={MessageCircle} className="cta-pulse">Hablar por WhatsApp</Button>
              <Button href="/contacto" variant="secondary" icon={CalendarCheck}>Coordinar visita</Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-xl transition hover:border-sport/45 hover:bg-black/45">
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.05]">
                    <Icon className="h-4 w-4 text-sport" />
                  </div>
                  <h3 className="font-black text-white">{title}</h3>
                </div>
                <p className="text-sm leading-6 text-white/[0.62]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
