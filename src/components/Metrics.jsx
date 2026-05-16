import { motion } from "framer-motion";
import { CarFront, MessageCircle, RefreshCw, WalletCards } from "lucide-react";
import SectionReveal from "./SectionReveal.jsx";

const metrics = [
  { icon: WalletCards, title: "Financiación flexible", text: "Opciones por banco o por la casa, adaptadas a cada situación." },
  { icon: RefreshCw, title: "Permuta", text: "Tomamos tu auto o moto como parte de pago." },
  { icon: CarFront, title: "Stock variado", text: "Autos, camionetas y motos en constante movimiento." },
  { icon: MessageCircle, title: "Atención directa", text: "Hablás con Fernando por WhatsApp, sin intermediarios." },
];

export default function Metrics() {
  return (
    <SectionReveal className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-champagne">Por qué elegirnos</p>
        <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">Confianza que se nota.</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(({ icon: Icon, title, text }, index) => (
          <motion.div
            key={title}
            className="premium-surface group rounded-2xl p-6 transition hover:border-sport/45 hover:shadow-glow"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.58 }}
            whileHover={{ y: -5 }}
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-sport/30 bg-sport/10 text-sport transition group-hover:bg-sport group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-lg font-black text-white">{title}</p>
            <p className="mt-2 text-sm leading-6 text-white/[0.58]">{text}</p>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
