import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal.jsx";

const testimonials = [
  {
    quote: "Pensé que no iba a poder comprar por estar en clearing, y en una semana ya tenía el auto.",
    name: "Martín",
    place: "Montevideo",
  },
  {
    quote: "Me tomaron mi auto como parte de pago y me explicaron todo sin vueltas. Fue mucho más fácil de lo que imaginaba.",
    name: "Camila",
    place: "Canelones",
  },
  {
    quote: "Consulté por WhatsApp, me pasaron opciones reales y terminé saliendo con tanque lleno.",
    name: "Rodrigo",
    place: "San José",
  },
];

export default function Testimonials() {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-sport">Clientes y experiencias</p>
        <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-5xl">
          Confianza que se siente antes de agendar.
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.article
            key={testimonial.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass rounded-md p-6"
          >
            <p className="text-5xl font-black text-sport">“</p>
            <p className="-mt-4 text-lg leading-8 text-white/[0.76]">{testimonial.quote}</p>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="font-black text-white">— {testimonial.name}</p>
              <p className="mt-1 text-sm text-white/[0.44]">{testimonial.place}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionReveal>
  );
}
