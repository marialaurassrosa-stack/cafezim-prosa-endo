import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${siteConfig.projectName}`,
  description: "Como a Biodental trata os dados coletados na inscrição do Cafezim, Prosa & Endo.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold text-ink">Política de Privacidade</h1>
          <p className="mt-2 text-sm text-ink/50">
            Válida para as inscrições do {siteConfig.projectName}, no {siteConfig.eventName}.
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/75">
            <section>
              <h2 className="text-base font-bold text-ink">1. Quais dados coletamos</h2>
              <p className="mt-2">
                Ao se inscrever em uma ou mais atividades do Cafezim, Prosa &amp; Endo, coletamos:
                nome completo, WhatsApp, e-mail, CRO (opcional), estado (opcional) e o perfil
                profissional informado (dentista, endodontista, pós-graduando, graduando ou outro).
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-ink">2. Para que usamos esses dados</h2>
              <p className="mt-2">
                Usamos esses dados exclusivamente para organizar sua participação nas atividades
                escolhidas dentro do stand Biodental durante o {siteConfig.eventName} — controle de
                vagas, lista de presença e, quando aplicável, envio de confirmação e lembretes sobre
                os encontros selecionados.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-ink">3. Com quem compartilhamos</h2>
              <p className="mt-2">
                Seus dados são tratados pela {siteConfig.brand} e não são vendidos ou compartilhados
                com terceiros para fins de marketing. Podem ser processados por prestadores de
                infraestrutura (hospedagem e banco de dados) estritamente para viabilizar o
                funcionamento deste site.
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-ink">4. Seus direitos</h2>
              <p className="mt-2">
                Você pode solicitar a qualquer momento acesso, correção ou exclusão dos seus dados,
                entrando em contato pelos canais oficiais da {siteConfig.brand}, nos termos da Lei
                Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
              </p>
            </section>
            <section>
              <h2 className="text-base font-bold text-ink">5. Retenção</h2>
              <p className="mt-2">
                Os dados de inscrição são mantidos pelo tempo necessário para a organização do
                {` ${siteConfig.eventName}`} e eventual comunicação pós-evento, podendo ser excluídos
                mediante solicitação.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
