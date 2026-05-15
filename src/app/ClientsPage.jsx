import Footer from "../components/Footer.jsx";
import PageHero from "../components/PageHero.jsx";
import Testimonials from "../components/Testimonials.jsx";
import LocalPresence from "../components/LocalPresence.jsx";

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clientes y entregas"
        title="La confianza se construye con entregas reales."
        text="Comentarios, entregas y experiencias de personas que eligieron avanzar con atención directa y opciones claras."
      />
      <Testimonials />
      <LocalPresence />
      <Footer />
    </>
  );
}
