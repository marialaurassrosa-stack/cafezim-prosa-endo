import { GroupIcon, MapPinIcon } from "@/components/icons";

/**
 * Layout responsivo por viewport (não container query, como os cards da
 * programação): linha no desktop (texto à esquerda, mapa à direita) e coluna
 * no mobile (título, texto, mapa, depois os dois cartões de referência) —
 * conforme as referências visuais do pedido. A única imagem aqui é o mapa
 * (public/images/stand-map.webp); título, texto e os dois cartões são texto
 * real, não fazem parte da arte.
 */
export function StandSection() {
  return (
    <section id="cobe-2026" className="bg-cream px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-1 flex-col gap-6">
            <div>
              <h2 className="text-3xl leading-tight font-extrabold text-purple-dark">
                Encontre a <span style={{ color: "#d91f33" }}>Biodental</span> no COBE
              </h2>
              <p className="mt-4 text-ink/70">
                Estamos pertinho da entrada e de frente com a Easy. Siga o caminho roxo e venha prosear com a
                gente! 💜
              </p>
            </div>

            {/* No mobile o mapa fica aqui, entre o texto e os cartões — no
                desktop ele vira a coluna da direita (mais abaixo). */}
            <div className="overflow-hidden rounded-2xl lg:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- arte de divulgação, sem next/image */}
              <img
                src="/images/stand-map.webp"
                alt="Mapa de acesso: entrada até o stand da Biodental no COBE 2026"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 rounded-2xl bg-cream-2 p-4">
                <MapPinIcon className="h-5 w-5 shrink-0 text-purple-700" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-ink/50 uppercase">Nosso stand</p>
                  <p className="font-bold text-purple-dark">Biodental</p>
                  <p className="text-xs text-ink/60">Próximo à entrada</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl bg-cream-2 p-4">
                <GroupIcon className="h-5 w-5 shrink-0 text-purple-700" />
                <div>
                  <p className="text-xs font-semibold tracking-wide text-ink/50 uppercase">Referência</p>
                  <p className="font-bold text-purple-dark">De frente com a Easy</p>
                  <p className="text-xs text-ink/60">Dois stands Biodental</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden flex-1 self-stretch overflow-hidden rounded-2xl lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element -- arte de divulgação, sem next/image */}
            <img
              src="/images/stand-map.webp"
              alt="Mapa de acesso: entrada até o stand da Biodental no COBE 2026"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
