import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { handleInternalNavigation } from "../lib/navigation.js";
import { whatsappHref } from "../lib/whatsapp.js";
import WhatsAppIcon from "./icons/WhatsAppIcon.jsx";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Financiación", href: "/financiacion" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-5"
    >
      <nav
        className={`pointer-events-auto mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border px-3 pl-4 transition-all duration-500 sm:h-[4.5rem] sm:px-4 ${
          scrolled
            ? "border-white/12 bg-ink/[0.78] shadow-soft backdrop-blur-2xl"
            : "border-white/10 bg-black/[0.38] shadow-[0_18px_70px_rgba(0,0,0,.28)] backdrop-blur-xl"
        }`}
      >
        <a href="/" onClick={(event) => handleInternalNavigation(event, "/")} className="group flex items-center gap-3">
          <img
            src="/logo-fernando-olivera.jpeg"
            alt="Fernando Olivera"
            width="44"
            height="44"
            className="h-10 w-10 rounded-full border border-sport/50 object-cover shadow-glow"
          />
          <span className="leading-none">
            <span className="block text-xs font-black uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.24em]">Fernando Olivera</span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-steel sm:text-[10px]">
              Vehículos
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleInternalNavigation(event, link.href)}
              className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/[0.62] transition hover:bg-white/[0.07] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={whatsappHref()}
          className="premium-button hidden items-center gap-2 rounded-full border border-sport bg-sport px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-white shadow-glow sm:flex"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Consultar
        </a>

        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-black/[0.95] px-3 shadow-soft backdrop-blur-2xl lg:hidden"
      >
        <div className="mx-auto grid max-w-7xl gap-2 py-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                handleInternalNavigation(event, link.href);
                setOpen(false);
              }}
              className="rounded-2xl border border-white/10 bg-carbon px-4 py-4 text-sm font-black uppercase tracking-[0.22em] text-white/[0.82]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappHref()}
            className="premium-button mt-2 flex items-center justify-center gap-2 rounded-2xl border border-sport bg-sport px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-glow"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Consultar
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
