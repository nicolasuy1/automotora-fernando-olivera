/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        carbon: "#121214",
        sport: "#E11D48",
        wine: "#7F1028",
        steel: "#A6ADBB",
        champagne: "#E8D8B7",
        cyanSoft: "#8CE7F3",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 45px rgba(225, 29, 72, 0.24)",
        soft: "0 24px 80px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "radial-red": "radial-gradient(circle at center, rgba(225, 29, 72, 0.28), transparent 58%)",
        "premium-line": "linear-gradient(90deg, transparent, rgba(225, 29, 72, 0.75), rgba(255,255,255,0.32), transparent)",
      },
    },
  },
  plugins: [],
};
