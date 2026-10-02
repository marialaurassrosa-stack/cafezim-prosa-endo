/**
 * Máximo de rodas em que uma mesma pessoa (mesmo e-mail) pode estar inscrita.
 * Se mudar aqui, mude também o `2` em supabase/migrations/0003_limit_two_sessions.sql
 * e rode o arquivo de novo no SQL Editor do Supabase.
 */
export const MAX_SESSIONS_PER_PARTICIPANT = 2;

export const SESSION_LIMIT_MESSAGE = `Cada pessoa pode participar de no máximo ${MAX_SESSIONS_PER_PARTICIPANT} rodas.`;

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

  // Banner oficial recebido da Biodental (arte pronta, com título, botão e
  // datas já desenhados na própria imagem) — uma arte retangular pro desktop
  // e uma quadrada pro mobile, trocadas via breakpoint (ver Hero.tsx).
  heroImageUrlDesktop: "/images/hero-banner-desktop.webp" as string | null,
  heroImageUrlMobile: "/images/hero-banner-mobile.webp" as string | null,

  // TODO: confirmar/atualizar estes links oficiais antes de publicar.
  links: {
    biodentalSite: "#",
    instagram: "#",
    privacyPolicy: "/politica-de-privacidade",
    contact: "#",
  },

  registrationEmailFrom: "contato@biodentalprodutos.com.br",
} as const;
