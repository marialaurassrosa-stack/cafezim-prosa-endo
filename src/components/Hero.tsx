import { siteConfig } from "@/config/site";

/**
 * O banner é a arte oficial da Biodental (título, botão e datas já vêm
 * desenhados na própria imagem — ver siteConfig.heroImageUrl). Por isso a
 * imagem é decorativa (alt="") e o conteúdo real fica em texto
 * "sr-only" logo abaixo, para leitores de tela e SEO. Um link invisível
 * fica posicionado sobre a área do botão "VER PROGRAMAÇÃO" desenhado na
 * imagem, mantendo a navegação funcional.
 */
export function Hero() {
  return (
    <section id="top" className="relative bg-purple-dark text-white lg:bg-white lg:px-6 lg:pt-6">
      {/* No desktop (lg+) o banner ganha margem lateral/superior e cantos
          arredondados, em vez de ocupar a tela toda; no mobile continua
          edge-to-edge como antes. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden lg:mx-auto lg:max-w-6xl lg:rounded-[32px]">
        {siteConfig.heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- banner em tela cheia, sem next/image
          <img
            src={siteConfig.heroImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 100%, #FFC400 0%, #C2439A 22%, #8312DE 42%, #521285 68%, #2A0F52 100%)",
            }}
          />
        )}

        {/* Posição calibrada por pixel no arquivo atual do banner (botão
            "Ver programação e inscrever-se" desenhado na própria arte) —
            o container usa aspect-[4/3] pra bater exatamente com a
            proporção nativa da imagem (1448x1086), então essas frações não
            deslocam em nenhum tamanho de tela. Recalibrar se o banner for
            trocado por outra arte com o botão em outro lugar. */}
        <a
          href="#seletor-de-dias"
          aria-label="Ver programação"
          className="absolute top-[71%] left-[4%] h-[7%] w-[44%] rounded-full transition-colors hover:bg-white/10"
        />
      </div>

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
