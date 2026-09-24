import { Pacifico } from "next/font/google";
import {
  ArchFrameIcon,
  ArrowRightIcon,
  CalendarIcon,
  CoffeeCupIcon,
  LeafSprigIcon,
  MapPinIcon,
} from "@/components/icons";
import { days, formatDateRangeLabel } from "@/data/days";
import { siteConfig } from "@/config/site";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export function Hero() {
  const dateRangeLabel = formatDateRangeLabel(days);

  return (
    <section id="top" className="relative overflow-hidden bg-purple-dark px-4 pt-16 pb-16 text-white sm:px-6 sm:pt-20 sm:pb-24">
      {/* Espaço para a foto do banner — coloque o arquivo em /public/images e
          aponte siteConfig.heroImageUrl para ele. Sem imagem, usa este
          gradiente no estilo pôr do sol como fallback. */}
      <div className="absolute inset-0">
        {siteConfig.heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagem de banner em tela cheia, sem next/image
          <img src={siteConfig.heroImageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 100%, #FFC400 0%, #C2439A 22%, #8312DE 42%, #521285 68%, #2A0F52 100%)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-dark/75 via-purple-dark/55 to-purple-dark/90" />
      </div>

      <div className="relative mx-auto max-w-xl text-center">
        <div className="relative mx-auto flex min-h-[230px] max-w-md flex-col items-center justify-center px-8 pb-6 sm:min-h-[260px]">
          <ArchFrameIcon className="pointer-events-none absolute inset-0 h-full w-full text-yellow/45" />
          <LeafSprigIcon className="pointer-events-none absolute bottom-2 left-2 h-9 w-12 text-yellow/40 sm:left-4" />
          <LeafSprigIcon className="pointer-events-none absolute bottom-2 right-2 h-9 w-12 -scale-x-100 text-yellow/40 sm:right-4" />

          <p className="relative text-sm font-semibold text-white/90">
            Biodental no <span className="font-extrabold">{siteConfig.eventName}</span>
          </p>
          <p className="relative mt-1 text-[11px] font-bold tracking-[0.35em] text-yellow/85">
            APRESENTA
          </p>

          <h1
            className={`${pacifico.className} relative mt-3 text-4xl leading-tight text-yellow [text-shadow:0_0_18px_rgba(255,196,0,0.5)] sm:text-5xl`}
          >
            Cafezim,
            <br />
            Prosa <CoffeeCupIcon className="inline h-8 w-8 -translate-y-1 sm:h-9 sm:w-9" /> &amp; Endo
          </h1>
        </div>

        <p className="text-lg font-semibold text-white/90">
          Rodas de conversa + hands-on
          <br className="sm:hidden" /> com professores convidados
        </p>

        <div className="mt-8 flex flex-col items-center gap-5">
          <a
            href="#seletor-de-dias"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-yellow/70 bg-ink px-8 text-sm font-bold tracking-wide text-yellow transition-colors hover:bg-black"
          >
            VER PROGRAMAÇÃO <ArrowRightIcon className="h-4 w-4" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/90">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <CalendarIcon className="h-4 w-4" /> {dateRangeLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <MapPinIcon className="h-4 w-4" /> {siteConfig.standName}
            </span>
          </div>

          <p className="text-xs text-white/55">Grupos reduzidos • Vagas limitadas</p>
        </div>
      </div>
    </section>
  );
}
