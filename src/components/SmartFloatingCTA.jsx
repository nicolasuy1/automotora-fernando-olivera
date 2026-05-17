import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { handleInternalNavigation } from "../lib/navigation.js";
import { whatsappHref } from "../lib/whatsapp.js";
import WhatsAppIcon from "./icons/WhatsAppIcon.jsx";

const sections = [
  { id: "inicio", text: "Ver catálogo", href: "/catalogo", icon: ArrowRight },
  {
    id: "vehiculos",
    text: "Consultar ahora",
    href: whatsappHref(),
    icon: WhatsAppIcon,
  },
  { id: "financiacion", text: "Ver opciones", href: "/financiacion", icon: ArrowRight },
  {
    id: "contacto",
    text: "Hablar ahora",
    href: whatsappHref("Hola Fernando, vi la web y quiero consultar por vehículos disponibles."),
    icon: WhatsAppIcon,
  },
];

export default function SmartFloatingCTA() {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    function updateActiveSection() {
      const midpoint = window.innerHeight * 0.48;
      let current = sections[0];
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= midpoint) {
          current = section;
        }
      }
      setActive(current);
    }

    updateActiveSection();
    const frame = window.requestAnimationFrame(updateActiveSection);
    const timer = window.setTimeout(updateActiveSection, 250);
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  const Icon = active.icon;

  return (
    <motion.a
      href={active.href}
      onClick={(event) => handleInternalNavigation(event, active.href)}
      initial={{ opacity: 0, x: "-50%", y: 18, scale: 0.96 }}
      animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
      transition={{ delay: 0.7, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, x: "-50%" }}
      whileTap={{ scale: 0.98, x: "-50%" }}
      className="cta-pulse premium-button fixed bottom-6 left-1/2 z-[100] flex min-h-12 w-[90%] max-w-xs -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-sport bg-sport px-6 text-xs font-black uppercase tracking-[0.14em] text-white shadow-glow sm:bottom-8 sm:max-w-[16rem] sm:px-8"
    >
      <span className="relative z-10 flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span>{active.text}</span>
      </span>
    </motion.a>
  );
}
