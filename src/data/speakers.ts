import type { Speaker } from "@/types";

/**
 * Nomes e fotos são reais (recebidos da Biodental). Credenciais, instituição
 * e biografia ainda NÃO foram confirmadas — mantidas como "a confirmar" de
 * propósito, para não publicar uma qualificação profissional inventada para
 * uma pessoa real. Preencha esses três campos assim que a Biodental enviar
 * o currículo de cada professor.
 *
 * `photoUrl` é o único retrato de cada professor — usado no card, no modal e
 * recortado em círculo no avatar da grade "Quem vai sentar para prosear?"
 * (mesmo enquadramento em todo lugar, sem versões alternativas da imagem).
 */
export const speakers: Speaker[] = [
  {
    id: "anarela-bernardi",
    name: "Profa. Dra. Anarela Bernardi",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/anarela-bernardi.png",
  },
  {
    id: "arthur-napoleao",
    name: "Prof. Ms. Arthur Napoleão",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/arthur-napoleao.png",
  },
  {
    id: "danilo-shimanuko",
    name: "Prof. Danilo Shimanuko",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/danilo-shimanuko.png",
  },
  {
    id: "murilo-borges",
    name: "Prof. Dr. Murilo Borges",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/murilo-borges.png",
  },
  {
    id: "alexandre-bortoloto",
    name: "Dr. Alexandre Bortoloto",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/alexandre-bortoloto.png",
    // Retrato tem bem mais folga roxa acima da cabeça que a média dos outros
    // — sem o zoom, a pessoa aparece visivelmente menor/mais distante que
    // nos demais cards.
    photoOriginY: 12,
    photoZoom: 1.22,
  },
  {
    id: "aloisio-napoleao",
    name: "Prof. Ms. Aloísio Napoleão",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/aloisio-napoleao.png",
  },
  {
    id: "key-fabiano-souza",
    name: "Prof. Dr. Key Fabiano Souza",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/key-fabiano-souza.png",
    // Mesmo caso do Alexandre: enquadramento mais afastado, com folga roxa
    // sobrando acima da cabeça — zoom traz a pessoa para o mesmo tamanho
    // aparente dos outros professores.
    photoOriginY: 10,
    photoZoom: 1.2,
  },
  {
    id: "josiane-almeida",
    name: "Profa. Dra. Josiane Almeida",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/josiane-almeida.png",
  },
  {
    id: "eduardo-akisue",
    name: "Prof. Dr. Eduardo Akisue",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/eduardo-akisue.png",
  },
  {
    id: "bruno-bisi",
    name: "Prof. Bruno Bisi",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/bruno-bisi.png",
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}
