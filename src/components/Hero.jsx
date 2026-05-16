import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { whatsappHref } from "../lib/whatsapp.js";

// Cloudinary video — transcodificado automáticamente
const VIDEO_BASE = "https://res.cloudinary.com/dvbkp3ml7/video/upload";
const VIDEO_ID = "v1778863564/0515_duxkkk";

// Desktop: calidad auto, ancho completo
const videoDesktopMp4 = `${VIDEO_BASE}/q_auto,f_mp4/${VIDEO_ID}.mp4`;
const videoDesktopWebm = `${VIDEO_BASE}/q_auto,f_webm/${VIDEO_ID}.webm`;

// Mobile: menor resolución para performance (720px de ancho)
const videoMobileMp4 = `${VIDEO_BASE}/q_auto,w_720,f_mp4/${VIDEO_ID}.mp4`;
const videoMobileWebm = `${VIDEO_BASE}/q_auto,w_720,f_webm/${VIDEO_ID}.webm`;

// Poster estático como fallback mientras carga
const posterImage = "/images/backgrounds/showroom-premium.jpeg";

const pills = ["Financiación", "Permuta", "Entrega coordinada", "Ciudad del Plata"];

export default function Hero() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 24, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 24, mass: 0.4 });
  const lightX = useTransform(smoothX, [-0.5, 0.5], [-28, 28]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay bloqueado — el poster se muestra como fallback
      });
    }
  }, [isMobile]);

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      id="inicio"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative min-h-[100svh] overflow-hidden bg-black"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        {/* Poster image — visible while video loads */}
        <img
          src={posterImage}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-0" : "opacity-100"
          } object-[50%_center] sm:object-center`}
        />

        {/* Video element */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterImage}
          onCanPlayThrough={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            /* Mobile: posición más alta para mostrar más del showroom; Desktop: vista completa */
            objectPosition: isMobile ? "50% 38%" : "center center",
          }}
        >
          {isMobile ? (
            <>
              <source src={videoMobileWebm} type="video/webm" />
              <source src={videoMobileMp4} type="video/mp4" />
            </>
          ) : (
            <>
              <source src={videoDesktopWebm} type="video/webm" />
              <source src={videoDesktopMp4} type="video/mp4" />
            </>
          )}
        </video>
      </div>

      {/* Gradient overlays — lighter on mobile to show more video */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.82)_0%,rgba(0,0,0,.48)_30%,rgba(0,0,0,.12)_60%,rgba(0,0,0,.24)_100%)] sm:bg-[linear-gradient(90deg,rgba(0,0,0,.88)_0%,rgba(0,0,0,.58)_30%,rgba(0,0,0,.18)_60%,rgba(0,0,0,.30)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.38)_0%,rgba(0,0,0,.02)_35%,rgba(11,11,11,.88)_100%)] sm:bg-[linear-gradient(180deg,rgba(0,0,0,.52)_0%,rgba(0,0,0,.05)_40%,rgba(11,11,11,.90)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_58%,rgba(225,29,72,.14),transparent_24%),radial-gradient(circle_at_58%_28%,rgba(140,231,243,.08),transparent_26%)]" />

      {/* Animated light effects */}
      <motion.div
        className="absolute right-[6%] top-[45%] h-28 w-[38vw] rounded-full bg-cyanSoft/15 blur-3xl"
        style={{ x: lightX }}
        animate={{ opacity: [0.2, 0.45, 0.22] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[2%] top-[50%] h-24 w-[32vw] rounded-full bg-sport/15 blur-3xl"
        animate={{ opacity: [0.18, 0.4, 0.2], scaleX: [0.92, 1.08, 0.95] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-28 sm:px-6 lg:px-8 lg:pb-16">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance text-5xl font-black leading-[0.9] tracking-normal text-white sm:text-6xl lg:text-7xl"
          >
            Tu próximo vehículo empieza acá
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base leading-7 text-white/[0.78] sm:text-lg sm:leading-8"
          >
            Autos, camionetas y motos con financiación flexible y atención personalizada en Ciudad del Plata.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid gap-3 sm:flex"
          >
            <Button href="/catalogo" icon={ArrowRight} className="cta-pulse">Ver catálogo</Button>
            <Button href={whatsappHref()} variant="secondary" icon={MessageCircle}>
              Hablar por WhatsApp
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.64, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/[0.68] backdrop-blur-xl"
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
