function MessageItem({ index }: { index: number }) {
  return (
    <span
      key={index}
      className="flex shrink-0 items-center gap-3 px-6 text-sm font-extrabold tracking-wide text-white uppercase sm:text-base"
    >
      <span aria-hidden="true">🎁</span>
      Participe das conversas <span className="text-yellow">e ganhe brinde</span>
      <span aria-hidden="true">🎁</span>
    </span>
  );
}

// Uma "mensagem" sozinha é bem mais estreita que telas grandes/ultrawide —
// só duas cópias lado a lado (a técnica usual de marquee) deixava a faixa
// mostrar um vão vazio depois que as duas já tinham passado, antes do loop
// reiniciar. Repetindo bastante ANTES de duplicar, o bloco repetido fica
// garantidamente mais largo que qualquer tela realista, então a faixa nunca
// fica sem conteúdo pra mostrar enquanto anima.
const REPEAT_COUNT = 10;
const unit = Array.from({ length: REPEAT_COUNT }, (_, i) => <MessageItem key={i} index={i} />);

/**
 * Faixa chamativa com scroll contínuo (marquee) de verdade, fixa embaixo do
 * banner principal. O texto real fica num único span "sr-only" pra leitor
 * de tela; a faixa animada em si é decorativa (aria-hidden) e duplica o
 * bloco repetido uma vez pra fechar o loop sem salto (ver @keyframes
 * marquee em globals.css — desloca exatamente 50%, ou seja, a largura de
 * um bloco).
 */
export function PromoBar() {
  return (
    <div className="overflow-hidden bg-red py-3">
      <span className="sr-only">Participe das conversas e ganhe brinde.</span>
      <div className="flex w-max animate-marquee" aria-hidden="true">
        <div className="flex shrink-0">{unit}</div>
        <div className="flex shrink-0">{unit}</div>
      </div>
    </div>
  );
}
