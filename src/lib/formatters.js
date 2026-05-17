/**
 * Utility helper functions for professional text formatting across the application.
 */

const ACRONYMS = new Set([
  "XLT", "LTZ", "GTI", "SUV", "4X4", "ABS", "ESP",
  "GA", "GLX", "GL", "SLX", "SE", "SEL", "RS", "ST",
  "V6", "V8", "TDI", "GLI", "WD", "AWD", "FWD", "4WD"
]);

/**
 * Capitalizes a vehicle title propritarily, preserving acronyms and model codes.
 * E.g. "volkswagen gol g7 extra full" -> "Volkswagen Gol G7 Extra Full"
 * E.g. "suzuki dzire GA extra full" -> "Suzuki Dzire GA Extra Full"
 */
export function formatVehicleTitle(title) {
  if (!title) return "";
  
  return title
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return "";
      
      // Strip punctuation to check for acronym matching (e.g. "GTI," -> "GTI")
      const clean = word.toUpperCase().replace(/[^A-Z0-9]/g, "");
      
      if (ACRONYMS.has(clean)) {
        return word.toUpperCase();
      }
      
      // If it contains numbers and letters mixed (like G7, 16V, 2.5), preserve capitalization
      if (/[0-9]/.test(word) && /[a-zA-Z]/.test(word)) {
        return word.toUpperCase();
      }
      
      // Capitalize first letter, lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Translates low-level database category keys into user-friendly, capitalized category labels.
 */
export function formatCategory(category) {
  if (!category) return "";
  
  const translations = {
    automoviles: "Automóviles",
    camionetas: "Camionetas",
    suv: "SUV",
    utilitarios: "Utilitarios",
    motos: "Motos",
    otros: "Otros"
  };
  
  const key = category.toLowerCase().trim();
  return translations[key] || category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
}
