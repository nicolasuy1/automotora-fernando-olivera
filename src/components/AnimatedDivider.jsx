import { motion } from "framer-motion";

export default function AnimatedDivider() {
  return (
    <div className="mx-auto h-px w-full max-w-7xl px-6">
      <motion.div
        className="h-px w-full bg-premium-line"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
