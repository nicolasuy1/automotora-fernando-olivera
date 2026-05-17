import { CheckCircle2 } from "lucide-react";
import Button from "../components/Button.jsx";
import Financing from "../components/Financing.jsx";
import Footer from "../components/Footer.jsx";
import PageHero from "../components/PageHero.jsx";
import { whatsappHref } from "../lib/whatsapp.js";
import WhatsAppIcon from "../components/icons/WhatsAppIcon.jsx";

export default function FinancingPage() {
  return (
    <>
      <PageHero
        eyebrow="Financiación y permuta"
        title="No tener todo el dinero ya no es el freno."
        text="Consultá opciones de financiación, entrega y permuta para encontrar una alternativa posible según tu situación."
      >
        <Button href={whatsappHref("Hola Fernando, quiero consultar opciones de financiación y permuta.")} icon={WhatsAppIcon}>
          Ver opciones reales
        </Button>
      </PageHero>
      <Financing />
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {["Entregá una parte y financiá el resto", "Cuotas hasta 36 meses", "Aprobación rápida y asesoramiento"].map((item) => (
            <div key={item} className="rounded-md border border-white/10 bg-white/[0.035] p-6">
              <CheckCircle2 className="mb-4 h-7 w-7 text-sport" />
              <p className="text-xl font-black text-white">{item}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
