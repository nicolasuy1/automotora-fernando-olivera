import { motion } from "framer-motion";
import { Clock3, FileCheck2, ShieldCheck } from "lucide-react";
import SectionReveal from "./SectionReveal.jsx";

const reasons = [
  { icon: Clock3, title: "Proceso rápido", text: "Menos espera, más claridad. Te damos pasos concretos para avanzar." },
  { icon: ShieldCheck, title: "Compra con confianza", text: "Vehículos seleccionados y condiciones conversadas antes de decidir." },
  { icon: FileCheck2, title: "Opciones reales", text: "Financiación bancaria, por la casa y permutas para abrir más puertas." },
];

export default function WhyChoose() {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-sport">Por qué elegirnos</p>
          <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-5xl">
            La oportunidad correcta, explicada de forma simple.
          </h2>
          <p className="mt-5 leading-8 text-white/[0.62]">
            Fernando Olivera Vehículos combina trato directo, financiación accesible y atención local para que comprar se sienta claro desde el primer mensaje.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.09 }}
              whileHover={{ y: -7, scale: 1.015 }}
              className="rounded-md border border-white/10 bg-white/[0.035] p-5 transition hover:border-sport/50 hover:shadow-glow"
            >
              <Icon className="h-7 w-7 text-sport" />
              <h3 className="mt-6 text-lg font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/[0.58]">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
