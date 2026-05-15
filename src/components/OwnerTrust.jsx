import { Instagram, ShieldCheck, UserRoundCheck } from "lucide-react";
import Button from "./Button.jsx";
import SectionReveal from "./SectionReveal.jsx";
import { whatsappHref } from "../lib/whatsapp.js";

export default function OwnerTrust() {
  return (
    <SectionReveal className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-sport/10 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.035] p-6 shadow-soft">
          <div className="studio-light absolute inset-0 opacity-70" />
          <div className="speed-lines absolute inset-0 opacity-20" />
          <div className="relative min-h-[440px] rounded-md border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <img
              src="/logo-fernando-olivera.jpeg"
              alt="Logo Fernando Olivera Vehículos"
              loading="lazy"
              decoding="async"
              width="64"
              height="64"
              className="h-16 w-16 rounded-md border border-sport/50 object-cover shadow-glow"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-champagne">Cara visible</p>
              <h2 className="mt-3 text-4xl font-black leading-[0.95] text-white sm:text-5xl">
                Fernando te muestra cada vehículo.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/[0.68]">
                Consultás con una persona real, que muestra vehículos, responde dudas y acompaña cada paso de la compra.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-champagne">Confianza real</p>
          <h2 className="mt-4 text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl">
            Una marca premium sin perder cercanía.
          </h2>
          <div className="mt-8 grid gap-4">
            {[
              ["Atención personalizada", "Hablás directo con Fernando para recibir opciones claras y seguimiento real."],
              ["Presencia activa en redes", "El movimiento diario del stock se puede consultar también desde Instagram."],
              ["Compra más simple", "Catálogo, financiación, permuta y WhatsApp quedan en un recorrido claro."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-md border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-3 flex items-center gap-3">
                  <UserRoundCheck className="h-5 w-5 text-sport" />
                  <h3 className="text-lg font-black text-white">{title}</h3>
                </div>
                <p className="leading-7 text-white/[0.62]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappHref()} icon={ShieldCheck}>Consultar con Fernando</Button>
            <Button href="https://www.instagram.com/automotora_fernando_olivera_/" variant="secondary" icon={Instagram}>
              Ver Instagram
            </Button>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
