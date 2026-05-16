import { motion } from "framer-motion";
import { ClipboardCheck, KeyRound, Search, WalletCards } from "lucide-react";
import SectionReveal from "./SectionReveal.jsx";

const steps = [
  { icon: Search, num: "01", title: "Elegís el vehículo", text: "Mirás opciones disponibles y elegís la unidad que querés consultar." },
  { icon: WalletCards, num: "02", title: "Consultás financiación o permuta", text: "Revisamos entrega, cuotas, financiación por banco o por la casa." },
  { icon: ClipboardCheck, num: "03", title: "Coordinamos condiciones", text: "Te damos una respuesta clara y pasos concretos para avanzar." },
  { icon: KeyRound, num: "04", title: "Te lo llevás", text: "Coordinamos la entrega para que salgas manejando con todo listo." },
];

export default function ProcessSteps() {
  return (
    <SectionReveal id="como-funciona" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-sport/10 blur-3xl" />
      <div className="mb-14 max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-sport">Cómo funciona</p>
        <h2 className="mt-4 text-balance text-4xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl">
          Cuatro pasos. Una decisión más simple.
        </h2>
      </div>

      {/* Timeline line — desktop horizontal, mobile vertical */}
      <div className="relative">
        {/* Desktop horizontal line */}
        <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-sport/40 to-transparent lg:block" />
        {/* Mobile vertical line */}
        <div className="absolute bottom-8 left-[1.65rem] top-8 w-px bg-gradient-to-b from-sport/40 via-sport/20 to-transparent lg:hidden" />

        <div className="relative grid gap-6 lg:grid-cols-4 lg:gap-5">
          {steps.map(({ icon: Icon, num, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 34, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.035] p-6 pl-16 shadow-soft backdrop-blur-xl transition duration-300 hover:border-sport/50 hover:shadow-glow lg:pl-6 lg:pt-20"
            >
              {/* Step number — on the timeline */}
              <div className="absolute -left-[0.1rem] top-6 z-10 lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
                <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-sport/40 bg-ink text-sport shadow-glow transition duration-300 group-hover:border-sport group-hover:bg-sport group-hover:text-white">
                  <span className="text-lg font-black">{num}</span>
                </div>
              </div>

              {/* Icon */}
              <div className="mb-4 hidden lg:block">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-sport transition group-hover:border-sport/30">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Mobile icon — inline with step number */}
              <div className="absolute left-16 top-[1.55rem] lg:hidden">
                <Icon className="h-5 w-5 text-sport" />
              </div>

              <h3 className="mt-2 text-xl font-black text-white lg:mt-0">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/[0.58]">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
