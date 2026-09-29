import type { Speaker } from "@/types";

/**
 * Nomes, fotos, credenciais, instituição e biografia são reais (recebidos da
 * Biodental — bios do documento "Biografia professores.docx").
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
    credentials:
      "Doutora, Mestre e Especialista em Endodontia, Especialista em Farmacologia Clínica e Estomatologia",
    institution: "Professora de Anestesiologia e Terapêutica Medicamentosa (ZENITH e UNESC)",
    bio: "Atua na docência de Anestesiologia e Terapêutica Medicamentosa nos cursos da ZENITH e da UNESC.",
    photoUrl: "/images/speakers/anarela-bernardi.png",
    avatarUrl: "/images/speakers/bolinhas/anarela-bernardi.png",
  },
  {
    id: "arthur-napoleao",
    name: "Prof. Ms. Artur Napoleão P. de Araújo",
    credentials: "Mestre e Especialista em Dentística Restauradora, Especialista em Prótese Dentária",
    institution: "Diretor clínico do AN Dental Institute",
    bio: "Professor e coordenador de cursos de aperfeiçoamento em Odontologia Estética e de especialização em Prótese (ABO-MG e ABO Montes Claros). Autor de diversos livros e capítulos na área de odontologia estética, incluindo \"Resinas injetáveis: uma nova visão na reabilitação estética e funcional\" e \"Trincas e fraturas dentárias\", além de consultor técnico de empresas do setor.",
    photoUrl: "/images/speakers/arthur-napoleao.png",
    avatarUrl: "/images/speakers/bolinhas/arthur-napoleao.png",
  },
  {
    id: "danilo-shimanuko",
    name: "Prof. Danilo Shimabuko",
    credentials: "Especialista, Mestre e Doutor em Endodontia (FO-USP)",
    institution: "Professor Adjunto de Endodontia na FO-Unisanta (Santos)",
    bio: "Coordenador do Curso de Especialização em Endodontia da FAOA-APCD Central.",
    photoUrl: "/images/speakers/danilo-shimanuko.png",
    avatarUrl: "/images/speakers/bolinhas/danilo-shimanuko.png",
  },
  {
    id: "murilo-borges",
    name: "Prof. Dr. Murilo Borges",
    credentials: "Mestre e Especialista em Endodontia, Doutor em Odontologia",
    institution: "Professor e coordenador de cursos de Endodontia",
    bio: "Professor de graduação e coordenador de cursos de aperfeiçoamento e especialização em Endodontia. Profissional certificado pela SBEndo e speaker Bondent.",
    photoUrl: "/images/speakers/murilo-borges.png",
    avatarUrl: "/images/speakers/bolinhas/murilo-borges.png",
  },
  {
    id: "alexandre-bortoloto",
    name: "Prof. Alexandre Bortoloto",
    credentials: "Mestre em Odontologia, Especialista em Endodontia e em Radiologia",
    institution: "Consultório particular",
    bio: "Atua exclusivamente como endodontista em consultório particular há 10 anos.",
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
    credentials:
      "Mestre em Clínicas Odontológicas (ênfase em Prótese, PUC-MG), Especialista em Prótese e Dentística (ABO-MG), Doutorando em Prótese (SLM-Campinas)",
    institution: "Professor e coordenador de cursos de especialização em Prótese (ABO-MG e ABO Montes Claros)",
    bio: "Professor de Prótese e Dentística na Faculdade Arnaldo (Belo Horizonte) e na Inovatta Odontologia, além de professor assistente de imersão em laminados cerâmicos no AN Dental Institute. Autor dos livros \"Resinas injetáveis: uma nova visão na reabilitação estética e funcional\" e \"Trincas e fraturas dentárias\".",
    photoUrl: "/images/speakers/aloisio-napoleao.png",
    avatarUrl: "/images/speakers/bolinhas/aloisio-napoleao.png",
  },
  {
    id: "key-fabiano-souza",
    name: "Prof. Fabiano Souza",
    credentials:
      "Especialista (Profis-USP), Mestre em Endodontia (FOUFU-MG) e Doutor em Saúde e Desenvolvimento (UFMS)",
    institution: "Professor Titular de Endodontia e Clínica Integrada na FAODO-UFMS",
    bio: "Coordenador dos cursos de aperfeiçoamento e especialização do IOA-MS.",
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
    credentials: "Especialista, Mestre, Doutora e Pós-doutora em Endodontia",
    institution: "Professora na UNISUL e no curso de Especialização em Endodontia da ZENITH",
    bio: "Pesquisadora visitante na ACTA Amsterdã e pós-doutora em Engenharia Química. Atende exclusivamente Endodontia em consultório particular.",
    photoUrl: "/images/speakers/josiane-almeida.png",
    avatarUrl: "/images/speakers/bolinhas/josiane-almeida.png",
  },
  {
    id: "eduardo-akisue",
    name: "Prof. Dr. Eduardo Akisue",
    credentials: "Especialista, Mestre e Doutor em Endodontia (FO-USP)",
    institution: "Professor Adjunto de Endodontia na FO-Unisanta (Santos)",
    bio: "Coordenador do Curso de Especialização em Endodontia da FAOA-APCD Central.",
    photoUrl: "/images/speakers/eduardo-akisue.png",
    avatarUrl: "/images/speakers/bolinhas/eduardo-akisue.png",
  },
  {
    id: "bruno-bisi",
    name: "Prof. Bruno Bisi",
    credentials: "Especialista, Mestre e Doutor em Endodontia (USP)",
    institution: "Visiting Researcher na University of Maryland School of Dentistry",
    bio: "Graduado em Odontologia pela UMESP, com especialização, mestrado e doutorado em Endodontia pela USP.",
    photoUrl: "/images/speakers/bruno-bisi.png",
    avatarUrl: "/images/speakers/bolinhas/bruno-bisi.png",
  },
  {
    id: "valadao",
    name: "Prof. Valadão",
    credentials: "Especialista e Mestre em Endodontia (São Leopoldo Mandic) e Especialista em Radiologia",
    institution: "Consultor Técnico da Easy Bassi",
    bio: "Há 27 anos atua como Consultor Técnico da Easy Bassi. Palestrante reconhecido na área, compartilha em suas redes sociais casos clínicos, dicas de prevenção de fraturas de instrumentos e reflexões sobre a prática clínica da Endodontia.",
    photoUrl: "/images/speakers/valadao.png",
    // A bolinha original (enviada com fundo branco sólido, sem
    // transparência) foi recortada por script (flood-fill a partir das
    // bordas brancas) pra virar um PNG transparente de verdade, igual às
    // outras 10 — ver public/images/speakers/bolinhas/valadao.png.
    avatarUrl: "/images/speakers/bolinhas/valadao.png",
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}
