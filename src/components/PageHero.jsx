import { motion } from "framer-motion";

export default function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(225,29,72,.18),transparent_30%),radial-gradient(circle_at_20%_40%,rgba(140,231,243,.08),transparent_24%),linear-gradient(180deg,#050505,#0B0B0B)]" />
      <div className="speed-lines absolute inset-0 opacity-[0.10]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-black uppercase tracking-[0.3em] text-champagne"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-5xl text-balance text-5xl font-black leading-[0.92] tracking-normal text-white sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-lg leading-8 text-white/[0.68]"
        >
          {text}
        </motion.p>
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
