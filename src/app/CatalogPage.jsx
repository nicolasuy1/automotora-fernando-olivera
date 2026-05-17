import VehicleCatalog from "../components/VehicleCatalog.jsx";
import Footer from "../components/Footer.jsx";
import PageHero from "../components/PageHero.jsx";
import Button from "../components/Button.jsx";
import { whatsappHref } from "../lib/whatsapp.js";
import WhatsAppIcon from "../components/icons/WhatsAppIcon.jsx";

export default function CatalogPage() {
  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Autos, camionetas y motos disponibles."
        text="El stock se mueve rápido. Filtrá por tipo, revisá opciones y consultá disponibilidad directa por WhatsApp."
      >
        <Button href={whatsappHref()} icon={WhatsAppIcon}>Consultar disponibilidad</Button>
      </PageHero>
      <VehicleCatalog />
      <Footer />
    </>
  );
}
