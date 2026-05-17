import Lenis from "lenis";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import PageHero from "./components/PageHero.jsx";
import SmartFloatingCTA from "./components/SmartFloatingCTA.jsx";
import Button from "./components/Button.jsx";
import { isAuthenticated, checkSession } from "./services/authService";

const HomePage = lazy(() => import("./app/HomePage.jsx"));
const CatalogPage = lazy(() => import("./app/CatalogPage.jsx"));
const VehicleDetailPage = lazy(() => import("./app/VehicleDetailPage.jsx"));
const FinancingPage = lazy(() => import("./app/FinancingPage.jsx"));
const ContactPage = lazy(() => import("./app/ContactPage.jsx"));
const AdminPage = lazy(() => import("./app/AdminPage.jsx"));
const AdminLoginPage = lazy(() => import("./app/AdminLoginPage.jsx"));

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const updatePathname = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", updatePathname);
    return () => window.removeEventListener("popstate", updatePathname);
  }, []);

  return pathname;
}

function NotFoundPage() {
  return (
    <PageHero
      eyebrow="Ruta no encontrada"
      title="Esta sección todavía no está disponible."
      text="Volvé al inicio o abrí el catálogo para ver vehículos disponibles."
    >
      <Button href="/">Volver al inicio</Button>
    </PageHero>
  );
}

export default function App() {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/admin");
  const [isAuthorized, setIsAuthorized] = useState(isAuthenticated());

  useEffect(() => {
    async function verify() {
      const active = await checkSession();
      setIsAuthorized(active);
    }
    verify();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (prefersReducedMotion || isMobile) return undefined;

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    let frame;

    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    const timeout = window.setTimeout(scrollToHash, 120);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  const page = useMemo(() => {
    if (pathname === "/") return <HomePage />;
    if (pathname === "/catalogo") return <CatalogPage />;
    if (pathname.startsWith("/catalogo/")) {
      return <VehicleDetailPage slug={pathname.replace("/catalogo/", "")} />;
    }
    if (pathname === "/financiacion") return <FinancingPage />;
    if (pathname === "/contacto") return <ContactPage />;
    
    // Admin route logic
    if (isAdminPath) {
      if (isAuthorized) {
        return <AdminPage onLogout={() => setIsAuthorized(false)} />;
      } else {
        return <AdminLoginPage onLogin={() => setIsAuthorized(true)} />;
      }
    }

    return <NotFoundPage />;
  }, [pathname, isAuthorized, isAdminPath]);

  return (
    <>
      <main className="min-h-screen overflow-hidden bg-ink text-white">
        {!isAdminPath && <Navbar />}
        <Suspense fallback={<div className="min-h-screen bg-ink" />}>{page}</Suspense>
      </main>
      {!isAdminPath && <SmartFloatingCTA />}
    </>
  );
}
