import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "./Button.jsx";
import SectionReveal from "./SectionReveal.jsx";
import { whatsappHref } from "../lib/whatsapp.js";
import WhatsAppIcon from "./icons/WhatsAppIcon.jsx";

const headline = "No tener todo el dinero hoy no tiene por qué frenarte.";
const bullets = [
  "Financiación por banco",
  "Financiación por la casa: entrega + título + prenda",
  "Cuotas adaptadas a tu situación",
  "Opciones de permuta disponibles",
];

export default function Financing() {
  return (
    <SectionReveal id="financiacion" className="relative px-5 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sport/5 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-10 rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-soft sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-sport">Financiación</p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-normal text-white sm:text-5xl"
          >
            {headline}
          </motion.h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/[0.68]">
            Consultá opciones de financiación bancaria, financiación por la casa y permuta según tu situación.
          </p>
          <div className="mt-8 grid gap-3">
            {bullets.map((bullet, index) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + index * 0.08 }}
                className="flex items-center gap-3 text-white/[0.78]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sport text-white">
                  <Check className="h-4 w-4" />
                </span>
                {bullet}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass flex flex-col justify-between rounded-2xl p-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/[0.44]">Consulta rápida</p>
            <p className="mt-4 text-4xl font-black text-white">Hoy podés avanzar.</p>
            <p className="mt-5 leading-7 text-white/[0.62]">
              Contanos qué vehículo te interesa, cuánto podés entregar y armamos una opción concreta.
            </p>
          </div>
          <motion.div
            animate={{ boxShadow: ["0 0 0 rgba(225,29,72,0)", "0 0 38px rgba(225,29,72,.34)", "0 0 0 rgba(225,29,72,0)"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="mt-8 rounded-full"
          >
            <Button
              href={whatsappHref("Hola Fernando, quiero ver opciones de financiación.")}
              icon={WhatsAppIcon}
              className="w-full"
            >
              Consultar financiación
            </Button>
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
}
