import { motion } from "framer-motion";
import { handleInternalNavigation } from "../lib/navigation.js";

const variants = {
  primary: "border-sport bg-sport text-white shadow-glow",
  secondary: "border-white/[0.15] bg-white/[0.07] text-white hover:border-sport/60",
  ghost: "border-white/10 bg-white/5 text-white hover:border-sport/60",
};

export default function Button({ children, href = "#contacto", variant = "primary", className = "", icon: Icon }) {
  return (
    <motion.a
      href={href}
      onClick={(event) => handleInternalNavigation(event, href)}
      className={`premium-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 text-xs font-black uppercase tracking-[0.16em] sm:text-sm ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {children}
      </span>
    </motion.a>
  );
}
