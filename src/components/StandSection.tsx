import { siteConfig } from "@/config/site";

export function StandSection() {
  return (
    <section id="cobe-2026" className="bg-cream px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="w-full max-w-xs overflow-hidden rounded-2xl shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element -- arte de divulgação, sem next/image */}
          <img
            src="/images/stand-map.webp"
            alt="Mapa de acesso: entrada até o stand da Biodental no COBE 2026"
            className="h-full w-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-extrabold" style={{ color: "#d91f33" }}>
          Nós vemos lá
        </h2>

        <div style={{ color: "#521285" }}>
          <p className="font-semibold">{siteConfig.eventName}</p>
          <p>{siteConfig.city}</p>
          <p>{siteConfig.standName}</p>
        </div>
      </div>
    </section>
  );
}
