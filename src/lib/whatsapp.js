export const WHATSAPP_NUMBER = "59892557747";

export function whatsappHref(message = "Hola Fernando, vi la web y quiero consultar por vehículos disponibles.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function vehicleWhatsappHref(vehicle) {
  const name = vehicle.title || vehicle.name || "un vehículo";
  return whatsappHref(`Hola Fernando, vi el ${name} en la web y quiero saber si sigue disponible.`);
}
