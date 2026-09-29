import type { Speaker } from "@/types";

/**
 * Nomes e fotos são reais (recebidos da Biodental). Credenciais, instituição
 * e biografia ainda NÃO foram confirmadas — mantidas como "a confirmar" de
 * propósito, para não publicar uma qualificação profissional inventada para
 * uma pessoa real. Preencha esses três campos assim que a Biodental enviar
 * o currículo de cada professor.
 *
 * `photoUrl` (retrato) é usado no card. `avatarUrl` é a bolinha já pronta
 * (foto recortada em círculo, enviada separada pela Biodental) usada como
 * avatar em todo lugar — grade "Quem vai sentar para prosear?" e modal do
 * professor — para a mesma imagem aparecer nos dois pontos.
 */
export const speakers: Speaker[] = [
  {
    id: "anarela-bernardi",
    name: "Profa. Dra. Anarela Bernardi",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/anarela-bernardi.png",
    avatarUrl: "/images/speakers/bolinhas/anarela-bernardi.png",
  },
  {
    id: "arthur-napoleao",
    name: "Prof. Ms. Artur Napoleão P. de Araújo",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/arthur-napoleao.png",
    avatarUrl: "/images/speakers/bolinhas/arthur-napoleao.png",
  },
  {
    id: "danilo-shimanuko",
    name: "Prof. Danilo Shimanuko",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/danilo-shimanuko.png",
    avatarUrl: "/images/speakers/bolinhas/danilo-shimanuko.png",
  },
  {
    id: "murilo-borges",
    name: "Prof. Dr. Murilo Borges",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/murilo-borges.png",
    avatarUrl: "/images/speakers/bolinhas/murilo-borges.png",
  },
  {
    id: "alexandre-bortoloto",
    name: "Prof. Alexandre Bortoloto",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/alexandre-bortoloto.png",
    // Retrato tem bem mais folga roxa acima da cabeça que a média dos outros
    // — sem o zoom, a pessoa aparece visivelmente menor/mais distante que
    // nos demais cards.
    photoOriginY: 12,
    photoZoom: 1.22,
    avatarUrl: "/images/speakers/bolinhas/alexandre-bortoloto.png",
  },
  {
    id: "aloisio-napoleao",
    name: "Prof. Ms. Aloísio Napoleão Araújo",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/aloisio-napoleao.png",
    avatarUrl: "/images/speakers/bolinhas/aloisio-napoleao.png",
  },
  {
    id: "key-fabiano-souza",
    name: "Prof. Fabiano Souza",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/key-fabiano-souza.png",
    // Mesmo caso do Alexandre: enquadramento mais afastado, com folga roxa
    // sobrando acima da cabeça — zoom traz a pessoa para o mesmo tamanho
    // aparente dos outros professores.
    photoOriginY: 10,
    photoZoom: 1.2,
    avatarUrl: "/images/speakers/bolinhas/key-fabiano-souza.png",
  },
  {
    id: "josiane-almeida",
    name: "Profa. Dra. Josiane Almeida",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/josiane-almeida.png",
    avatarUrl: "/images/speakers/bolinhas/josiane-almeida.png",
  },
  {
    id: "eduardo-akisue",
    name: "Prof. Dr. Eduardo Akisue",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/eduardo-akisue.png",
    avatarUrl: "/images/speakers/bolinhas/eduardo-akisue.png",
  },
  {
    id: "bruno-bisi",
    name: "Prof. Bruno Bisi",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/bruno-bisi.png",
    avatarUrl: "/images/speakers/bolinhas/bruno-bisi.png",
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}
