import type { Speaker } from "@/types";

/**
 * Nomes e fotos são reais (recebidos da Biodental). Credenciais, instituição
 * e biografia ainda NÃO foram confirmadas — mantidas como "a confirmar" de
 * propósito, para não publicar uma qualificação profissional inventada para
 * uma pessoa real. Preencha esses três campos assim que a Biodental enviar
 * o currículo de cada professor.
 *
 * `photoUrl` é o retrato principal (card/modal); `avatarUrl` é o recorte
 * redondo dedicado para miniaturas (grade de professores, cabeçalho do
 * modal) — os dois vêm do mesmo pacote de fotos da Biodental, cada um já
 * enquadrado para o seu uso.
 */
export const speakers: Speaker[] = [
  {
    id: "anarela-bernardi",
    name: "Profa. Dra. Anarela Bernardi",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/anarela-bernardi.png",
    avatarUrl: "/images/speakers/anarela-bernardi-avatar.png",
  },
  {
    id: "arthur-napoleao",
    name: "Prof. Ms. Arthur Napoleão",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/arthur-napoleao.png",
    avatarUrl: "/images/speakers/arthur-napoleao-avatar.png",
  },
  {
    id: "danilo-shimanuko",
    name: "Prof. Danilo Shimanuko",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/danilo-shimanuko.png",
    avatarUrl: "/images/speakers/danilo-shimanuko-avatar.png",
  },
  {
    id: "murilo-borges",
    name: "Prof. Dr. Murilo Borges",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/murilo-borges.png",
    avatarUrl: "/images/speakers/murilo-borges-avatar.png",
  },
  {
    id: "alexandre-bortoloto",
    name: "Dr. Alexandre Bortoloto",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/alexandre-bortoloto.png",
    avatarUrl: "/images/speakers/alexandre-bortoloto-avatar.png",
  },
  {
    id: "aloisio-napoleao",
    name: "Prof. Ms. Aloísio Napoleão",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/aloisio-napoleao.png",
    avatarUrl: "/images/speakers/aloisio-napoleao-avatar.png",
  },
  {
    id: "key-fabiano-souza",
    name: "Prof. Dr. Key Fabiano Souza",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/key-fabiano-souza.png",
    avatarUrl: "/images/speakers/key-fabiano-souza-avatar.png",
  },
  {
    id: "josiane-almeida",
    name: "Profa. Dra. Josiane Almeida",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/josiane-almeida.png",
    avatarUrl: "/images/speakers/josiane-almeida-avatar.png",
  },
  {
    id: "eduardo-akisue",
    name: "Prof. Dr. Eduardo Akisue",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/eduardo-akisue.png",
    avatarUrl: "/images/speakers/eduardo-akisue-avatar.png",
  },
  {
    id: "bruno-bisi",
    name: "Prof. Bruno Bisi",
    credentials: "Currículo a confirmar",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental.",
    photoUrl: "/images/speakers/bruno-bisi.png",
    avatarUrl: "/images/speakers/bruno-bisi-avatar.png",
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}
