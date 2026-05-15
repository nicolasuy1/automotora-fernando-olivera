import SectionReveal from "./SectionReveal.jsx";

const brands = ["Volkswagen", "Chevrolet", "Renault", "Fiat", "Honda", "Ford", "Yumbo", "Baccio"];

export default function BrandStrip() {
  return (
    <SectionReveal className="py-6">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <p className="mb-5 text-center text-xs font-black uppercase tracking-[0.26em] text-white/[0.42]">
          Stock diverso, oportunidades reales y marcas de alta demanda
        </p>
        <div className="mask-fade overflow-hidden rounded-md border border-white/10 bg-white/[0.025] py-4">
          <div className="flex min-w-max animate-[slide_36s_linear_infinite] gap-4 text-sm font-black uppercase tracking-[0.24em] text-white/[0.46] sm:text-base">
            {[...brands, ...brands].map((brand, index) => (
              <span
                key={`${brand}-${index}`}
                className="rounded-full border border-white/10 bg-black/25 px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
