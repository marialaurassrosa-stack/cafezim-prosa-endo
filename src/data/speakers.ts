import type { Speaker } from "@/types";

/**
 * PLACEHOLDER DATA — nomes, credenciais e biografias fictícios apenas para
 * demonstrar o layout e o fluxo de seleção. Substitua cada campo pelos dados
 * reais dos professores convidados antes de publicar. `photoUrl: null` faz o
 * card usar o avatar com iniciais; troque por um caminho em /public quando a
 * foto oficial (tratada em roxo/P&B) estiver disponível.
 */
export const speakers: Speaker[] = [
  {
    id: "speaker-1",
    name: "Prof. Nome Sobrenome 1",
    credentials: "Especialista em Endodontia (placeholder)",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental. Este texto é um espaço reservado e não representa informações reais.",
    photoUrl: null,
    isPlaceholder: true,
  },
  {
    id: "speaker-2",
    name: "Profa. Nome Sobrenome 2",
    credentials: "Mestre e Doutora em Endodontia (placeholder)",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental. Este texto é um espaço reservado e não representa informações reais.",
    photoUrl: null,
    isPlaceholder: true,
  },
  {
    id: "speaker-3",
    name: "Prof. Nome Sobrenome 3",
    credentials: "Especialista em Endodontia (placeholder)",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental. Este texto é um espaço reservado e não representa informações reais.",
    photoUrl: null,
    isPlaceholder: true,
  },
  {
    id: "speaker-4",
    name: "Profa. Nome Sobrenome 4",
    credentials: "Doutora em Endodontia (placeholder)",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental. Este texto é um espaço reservado e não representa informações reais.",
    photoUrl: null,
    isPlaceholder: true,
  },
  {
    id: "speaker-5",
    name: "Prof. Nome Sobrenome 5",
    credentials: "Especialista em Endodontia (placeholder)",
    institution: "Instituição a confirmar",
    bio: "Biografia a ser fornecida pela Biodental. Este texto é um espaço reservado e não representa informações reais.",
    photoUrl: null,
    isPlaceholder: true,
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}
