import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./Button.jsx";

const frames = [
  { eyebrow: "Decisión", text: "No es solo un vehículo" },
  { eyebrow: "Momento", text: "Es el momento en que decidís avanzar" },
  { eyebrow: "Oportunidad", text: "La oportunidad aparece y se mueve rápido" },
  { eyebrow: "Acción", text: "Elegí el tuyo hoy", cta: true },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] } },
};

export default function ScrollStorytelling() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(140,231,243,.08),transparent_24%),radial-gradient(circle_at_76%_50%,rgba(225,29,72,.15),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid gap-4 lg:grid-cols-4"
        >
          {frames.map((frame, index) => (
            <motion.div
              key={frame.text}
              variants={item}
              className={`relative min-h-[280px] overflow-hidden rounded-md border border-white/10 bg-white/[0.035] p-6 shadow-soft backdrop-blur-xl ${
                index === 3 ? "lg:col-span-1" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-sport/[0.08]" />
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sport/15 blur-3xl" />
              <div className="relative flex h-full flex-col justify-between">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-champagne">{frame.eyebrow}</p>
                <div>
                  <span className="mb-5 block h-px w-16 bg-premium-line" />
                  <h2 className="text-3xl font-black leading-[0.95] text-white lg:text-4xl">{frame.text}</h2>
                  {frame.cta ? (
                    <div className="mt-8">
                      <Button href="/catalogo" icon={ArrowRight}>Ver catálogo</Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
