import { MapPinIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function StandSection() {
  return (
    <section id="cobe-2026" className="bg-cream px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/10 text-purple-700">
          <MapPinIcon className="h-7 w-7" />
        </span>
        <h2 className="text-2xl font-extrabold text-ink">Nos encontramos no stand Biodental</h2>
        <div className="text-ink/70">
          <p className="font-semibold">{siteConfig.eventName}</p>
          <p>{siteConfig.city}</p>
          <p>
            {siteConfig.standName}
            {siteConfig.standNumber ? ` — ${siteConfig.standNumber}` : ""}
          </p>
        </div>
        {!siteConfig.standNumber && (
          <p className="text-xs text-ink/45">Número do estande a confirmar.</p>
        )}
      </div>
    </section>
  );
}
