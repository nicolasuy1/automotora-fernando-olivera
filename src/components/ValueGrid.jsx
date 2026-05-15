import { motion } from "framer-motion";
import { Banknote, CarFront, Fuel, Handshake, KeyRound, Sparkles } from "lucide-react";
import SectionReveal from "./SectionReveal.jsx";

const benefits = [
  { icon: Handshake, title: "Tomamos tu vehículo como parte de pago", text: "Usá tu auto o moto actual para acercarte más rápido al próximo.", featured: true },
  { icon: Banknote, title: "Financiación 100% disponible", text: "Opciones bancarias y financiación por la casa según tu situación." },
  { icon: Sparkles, title: "Opciones incluso si estás en clearing", text: "Te escuchamos, revisamos alternativas y buscamos una salida posible." },
  { icon: Fuel, title: "Entrega inmediata con tanque lleno", text: "Coordinamos la entrega para que salgas manejando con todo listo.", featured: true },
  { icon: CarFront, title: "Autos, camionetas y motos", text: "Stock variado, seleccionado y en rotación constante." },
  { icon: KeyRound, title: "Asesoramiento personalizado", text: "Un proceso claro, humano y directo para decidir con confianza." },
];

const container = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

export default function ValueGrid() {
  return (
    <SectionReveal id="confianza" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-sport">Confianza inmediata</p>
        <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-5xl">
          Lo que necesitás para decidir hoy, sin vueltas.
        </h2>
      </div>
      <motion.div
        className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-90px" }}
      >
        {benefits.map(({ icon: Icon, title, text, featured }) => (
          <motion.article
            key={title}
            variants={item}
            whileHover={{ y: -8, scale: 1.018 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-soft transition duration-300 hover:border-sport/[0.55] hover:shadow-glow ${
              featured ? "sm:col-span-2" : ""
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(225,29,72,.14),transparent_34%),linear-gradient(135deg,rgba(245,215,160,.08),transparent_46%)] opacity-0 transition duration-300 group-hover:opacity-100" />
            <motion.div
              whileHover={{ rotate: -4, scale: 1.05 }}
              transition={{ duration: 0.35 }}
              className="relative mb-8 grid h-12 w-12 place-items-center rounded-full border border-sport/30 bg-sport/[0.12] text-sport"
            >
              <Icon className="h-5 w-5" />
            </motion.div>
            <h3 className="relative text-xl font-black leading-tight text-white">{title}</h3>
            <p className="relative mt-4 text-sm leading-7 text-white/[0.62]">{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </SectionReveal>
  );
}
