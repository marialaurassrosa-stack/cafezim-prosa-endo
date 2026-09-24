/**
 * Central place for every "who/where/when" fact about the event that isn't
 * tied to a specific session. Edit this file instead of hunting through
 * components. Anything marked TODO must be filled in by the Biodental team
 * before launch — we deliberately avoid inventing official information.
 */
export const siteConfig = {
  projectName: "Cafezim, Prosa & Endo",
  brand: "Biodental Produtos",
  eventCode: "COBE26",
  eventName: "COBE 2026",
  eventFullName: "Congresso Brasileiro de Endodontia",
  city: "Belo Horizonte",
  standName: "Stand Biodental",
  // TODO: preencher com o número/localização do estande assim que divulgado pela organização do COBE.
  standNumber: null as string | null,

  // TODO: coloque a foto do banner em /public/images/hero-bg.jpg e aponte o
  // caminho aqui (ex.: "/images/hero-bg.jpg"). Enquanto for `null`, o Hero usa
  // um gradiente ilustrado no lugar da foto.
  heroImageUrl: null as string | null,

  // TODO: confirmar/atualizar estes links oficiais antes de publicar.
  links: {
    biodentalSite: "#",
    instagram: "#",
    privacyPolicy: "/politica-de-privacidade",
    contact: "#",
  },

  registrationEmailFrom: "contato@biodentalprodutos.com.br",
} as const;
