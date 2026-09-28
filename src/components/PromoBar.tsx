const MESSAGE = (
  <span className="flex shrink-0 items-center gap-3 px-6 text-sm font-extrabold tracking-wide text-white uppercase sm:text-base">
    <span aria-hidden="true">🎁</span>
    Participe das conversas <span className="text-yellow">e ganhe brinde</span>
    <span aria-hidden="true">🎁</span>
  </span>
);

/**
 * Faixa chamativa com scroll contínuo (marquee), fixa embaixo do banner
 * principal. O texto real fica num único span "sr-only" pra leitor de tela;
 * a faixa animada em si é decorativa (aria-hidden) e repete a mensagem duas
 * vezes lado a lado pra fechar o loop sem salto (ver @keyframes marquee).
 */
export function PromoBar() {
  return (
    <div className="overflow-hidden bg-red py-3">
      <span className="sr-only">Participe das conversas e ganhe brinde.</span>
      <div className="flex w-max animate-marquee" aria-hidden="true">
        {MESSAGE}
        {MESSAGE}
      </div>
    </div>
  );
}
