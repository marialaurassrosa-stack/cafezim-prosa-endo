import { CoffeeCupIcon, EndoFileIcon, GroupIcon } from "@/components/icons";

const DIFFERENTIALS = [
  {
    icon: CoffeeCupIcon,
    title: "Prosa de verdade",
    text: "Conversa próxima com professores, sem clima de auditório.",
  },
  {
    icon: EndoFileIcon,
    title: "Endo na prática",
    text: "Demonstrações, casos clínicos e hands-on.",
  },
  {
    icon: GroupIcon,
    title: "Pouca gente, muita troca",
    text: "Grupos reduzidos para aproveitar melhor cada encontro.",
  },
];

export function AboutSection() {
  return (
    <section id="como-funciona" className="bg-cream-2 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
          Afinal, o que é o Cafezim, Prosa &amp; Endo?
        </h2>
        <p className="mt-4 text-ink/70">
          Café passado, Endodontia na mesa e uma boa conversa para acompanhar. Durante os três dias
          do COBE, professores convidados se encontram com pequenos grupos de profissionais e
          estudantes para discutir casos, compartilhar experiências e colocar a mão na massa.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        {DIFFERENTIALS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-purple-700">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm text-ink/65">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
