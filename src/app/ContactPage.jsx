import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import Button from "../components/Button.jsx";
import Footer from "../components/Footer.jsx";
import PageHero from "../components/PageHero.jsx";
import { whatsappHref } from "../lib/whatsapp.js";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Consultá hoy por tu próximo vehículo."
        text="Escribinos por WhatsApp para consultar disponibilidad, financiación, permuta o coordinar una visita."
      >
        <Button href={whatsappHref()} icon={MessageCircle}>Hablar por WhatsApp</Button>
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {[
          [Phone, "WhatsApp", "+598 92 557 747"],
          [MapPin, "Ubicación", "Ciudad del Plata, San José"],
          [Clock, "Atención", "Consultar horarios"],
          [Instagram, "Instagram", "@automotora_fernando_olivera_"],
        ].map(([Icon, title, text]) => (
          <div key={title} className="rounded-md border border-white/10 bg-white/[0.035] p-6 shadow-soft">
            <Icon className="mb-5 h-7 w-7 text-sport" />
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/[0.44]">{title}</p>
            <p className="mt-3 text-xl font-black text-white">{text}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
        <div className="relative min-h-[360px] overflow-hidden rounded-md border border-white/10 bg-white/[0.035] p-6 shadow-soft">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(225,29,72,.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.08),transparent)]" />
          <div className="speed-lines absolute inset-0 opacity-20" />
          <div className="relative flex min-h-[310px] flex-col justify-end">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-sport">Ubicación</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white">
              Ciudad del Plata, San José. Coordiná tu visita por WhatsApp.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-white/[0.62]">
              Te esperamos para ver vehículos disponibles, consultar financiación y recibir atención personalizada.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
