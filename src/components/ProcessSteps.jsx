import { motion } from "framer-motion";
import { ClipboardCheck, KeyRound, Search, WalletCards } from "lucide-react";
import SectionReveal from "./SectionReveal.jsx";

const steps = [
  { icon: Search, num: "01", title: "Elegís el vehículo", text: "Revisás las opciones disponibles y consultás por la unidad que te interesa." },
  { icon: WalletCards, num: "02", title: "Consultás financiación o permuta", text: "Evaluamos entrega, cuotas y la mejor alternativa según tu situación." },
  { icon: ClipboardCheck, num: "03", title: "Coordinamos condiciones", text: "Te damos una propuesta clara con pasos concretos para avanzar." },
  { icon: KeyRound, num: "04", title: "Te lo llevás", text: "Coordinamos la entrega para que salgas manejando con todo resuelto." },
];

export default function ProcessSteps() {
  return (
    <SectionReveal id="como-funciona" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute left-0 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-sport/10 blur-[100px] opacity-50" />
      
      <div className="mb-14 max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-sport">Cómo funciona</p>
        <h2 className="mt-4 text-balance text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl">
          Cuatro pasos. Una decisión más simple.
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Horizontal Line (Desktop) */}
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map(({ icon: Icon, num, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-500 hover:border-sport/40 hover:bg-white/[0.04] hover:shadow-glow"
            >
              {/* Racing Stripe Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-sport/20 group-hover:bg-sport transition-colors duration-500 rounded-l-3xl lg:left-0 lg:right-0 lg:top-0 lg:h-1 lg:w-full lg:rounded-t-3xl lg:rounded-l-none" />

              {/* Step Number & Icon Header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="relative">
                  <span className="text-4xl font-black italic tracking-tighter text-white/5 group-hover:text-sport/20 transition-colors duration-500 select-none">
                    {num}
                  </span>
                  <div className="absolute -bottom-1 left-0 h-1 w-6 bg-sport scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-sport shadow-inner group-hover:bg-sport group-hover:text-white transition-all duration-500">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-sport transition-colors duration-300">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/50 group-hover:text-white/70 transition-colors duration-300">
                {text}
              </p>

              {/* Decorative Shine */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
