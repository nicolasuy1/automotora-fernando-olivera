import FeaturedVehicleSection from "../components/FeaturedVehicleSection.jsx";
import Financing from "../components/Financing.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import LocalPresence from "../components/LocalPresence.jsx";
import Metrics from "../components/Metrics.jsx";
import ProcessSteps from "../components/ProcessSteps.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVehicleSection />
      <Metrics />
      <Financing />
      <ProcessSteps />
      <LocalPresence />
      <Footer />
    </>
  );
}
