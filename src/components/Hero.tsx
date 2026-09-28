import { PromoBar } from "@/components/PromoBar";
import { siteConfig } from "@/config/site";

/**
 * O banner é a arte oficial da Biodental (título, botão e datas já vêm
 * desenhados na própria imagem) — uma arte retangular pro desktop e uma
 * quadrada pro mobile (proporções bem diferentes, por isso dois blocos
 * inteiros em vez de só trocar a imagem dentro do mesmo container). Por
 * isso a imagem é decorativa (alt="") e o conteúdo real fica em texto
 * "sr-only" logo abaixo, para leitores de tela e SEO. Um link invisível
 * fica posicionado sobre a área do botão desenhado em cada imagem, com
 * posição calibrada por pixel pra cada arte (ver comentários abaixo) —
 * recalibrar se qualquer uma das duas artes for trocada.
 */
export function Hero() {
  return (
    <section id="top" className="relative bg-white">
      <div className="px-4 pt-10 pb-6 text-center sm:px-6 lg:pt-14 lg:pb-8">
        <p className="text-xl font-medium text-purple-700 sm:text-2xl lg:text-3xl">
          Sente à mesa, tire suas dúvidas e
        </p>
        <p className="text-xl font-extrabold text-red sm:text-2xl lg:text-3xl">
          leve novas ideias para a clínica.
        </p>
      </div>

      {/* ===== Mobile (abaixo de lg): arte quadrada, edge-to-edge ===== */}
      <div className="relative aspect-square w-full overflow-hidden lg:hidden">
        {siteConfig.heroImageUrlMobile ? (
          // eslint-disable-next-line @next/next/no-img-element -- banner em tela cheia, sem next/image
          <img src={siteConfig.heroImageUrlMobile} alt="" className="h-full w-full object-cover" />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 100%, #FFC400 0%, #C2439A 22%, #8312DE 42%, #521285 68%, #2A0F52 100%)",
            }}
          />
        )}
        {/* Botão "CONFERIR HAND-ONS" na arte quadrada (1254x1254). */}
        <a
          href="#seletor-de-dias"
          aria-label="Ver programação"
          className="absolute top-[84.2%] left-[23.8%] h-[8%] w-[52.3%] rounded-full transition-colors hover:bg-white/10"
        />
      </div>

      {/* ===== Desktop (lg+): arte retangular, com margem e cantos
          arredondados em vez de ocupar a tela toda. max-w 50% maior que
          antes (72rem -> 108rem) a pedido — em telas menores que 108rem
          (a maioria) o banner ocupa a largura toda disponível (só o
          lg:px-6 limita), então fica proporcionalmente ainda maior. ===== */}
      <div className="relative hidden lg:block lg:px-6 lg:pb-6">
        <div className="relative aspect-[2000/556] w-full overflow-hidden lg:mx-auto lg:max-w-[108rem] lg:rounded-[32px]">
          {siteConfig.heroImageUrlDesktop ? (
            // eslint-disable-next-line @next/next/no-img-element -- banner em tela cheia, sem next/image
            <img src={siteConfig.heroImageUrlDesktop} alt="" className="h-full w-full object-cover" />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(ellipse 90% 60% at 50% 100%, #FFC400 0%, #C2439A 22%, #8312DE 42%, #521285 68%, #2A0F52 100%)",
              }}
            />
          )}
          {/* Botão "CONFERIR HAND-ONS" na arte retangular (2000x556). */}
          <a
            href="#seletor-de-dias"
            aria-label="Ver programação"
            className="absolute top-[75.2%] left-[65.2%] h-[11.5%] w-[22%] rounded-full transition-colors hover:bg-white/10"
          />
        </div>
      </div>

      <PromoBar />

      <div className="sr-only">
        <h1>Cafezim, Prosa &amp; Endo</h1>
        <p>
          Biodental no {siteConfig.eventName} apresenta: rodas de conversa e hands-on com
          professores convidados.
        </p>
        <p>{siteConfig.standName}</p>
        <a href="#seletor-de-dias">Ver programação</a>
      </div>
    </section>
  );
}
