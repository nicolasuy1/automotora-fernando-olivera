import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "../lib/whatsapp.js";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappHref()}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.55 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-5 right-5 z-50 flex min-h-14 items-center gap-3 rounded-full border border-sport bg-sport px-5 text-sm font-black uppercase tracking-[0.16em] text-white shadow-glow sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Hablar ahora</span>
    </motion.a>
  );
}
