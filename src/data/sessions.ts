import type { SessionDef } from "@/types";

/**
 * Programação real, recebida da Biodental (planilha "Coffee & Learning &
 * Endo"). Temas e horários vêm da própria planilha; shortDescription,
 * fullDescription e highlights foram escritos por nós a partir do título de
 * cada tema (a planilha não trazia descrição longa) — ajuste livremente se a
 * Biodental fornecer um texto oficial.
 *
 * Dois blocos da planilha ficaram de fora de propósito: "Easy" (12h do dia
 * 2 e 11h do dia 3) e "Almoço COBE CORTESIA" (13h do dia 2) não são
 * atividades com inscrição, são pausas/intervalos. A sessão das 16h do dia 2
 * (Prof. Dr. Marco Hungaro) também ficou de fora por enquanto: na planilha
 * o tema real está marcado como "não pode divulgar" ainda.
 *
 * `capacity` controla o número de vagas; `status` pode ser sobrescrito
 * manualmente para "sold_out" (esgotado), "cancelled" (cancelado) ou
 * "hidden" (oculto da programação) independente da contagem de inscritos.
 */
export const sessions: SessionDef[] = [
  // ---------- DIA 01 (08/out) ----------
  {
    id: "COBE26_D1_1400_MOLARQUENTE",
    dayId: "day1",
    startTime: "14:00",
    endTime: "15:00",
    activityType: "roda_de_conversa",
    title: "Molar quente?\nComo manter a mente fria",
    speakerId: "anarela-bernardi",
    shortDescription:
      "Uma conversa sobre como manter a clareza de raciocínio e tomar boas decisões diante de um molar com dor aguda.",
    fullDescription:
      "Uma conversa prática sobre como manter a mente fria diante de um molar com quadro agudo — do diagnóstico à decisão de tratamento, sem perder a calma nem a qualidade técnica.",
    highlights: [
      "Diagnóstico em quadros agudos",
      "Tomada de decisão sob pressão",
      "Casos reais trazidos pelo grupo",
    ],
    capacity: 5,
    status: "active",
  },
  {
    id: "COBE26_D1_1500_BIOATIVIDADE",
    dayId: "day1",
    startTime: "15:00",
    endTime: "16:00",
    activityType: "demonstracao",
    title: "Bioatividade além do canal:\nElevação de margem",
    speakerId: "arthur-napoleao",
    shortDescription:
      "Como usar materiais bioativos para além do canal radicular, na elevação de margem cervical.",
    fullDescription:
      "Uma imersão no uso de materiais bioativos na elevação de margem cervical, discutindo indicações, técnica e o que muda no resultado a longo prazo.",
    highlights: [
      "Materiais bioativos na prática",
      "Técnica de elevação de margem",
      "Indicações e limites",
    ],
    capacity: 5,
    status: "active",
  },
  {
    id: "COBE26_D1_1600_CCONEBLUE",
    dayId: "day1",
    startTime: "16:00",
    endTime: "17:00",
    activityType: "hands_on",
    title: "CC One Blue: reciprocante\ncom eficiência e segurança",
    speakerId: "murilo-borges",
    shortDescription:
      "Uso do sistema reciprocante CC One Blue com eficiência e segurança na instrumentação.",
    fullDescription:
      "Demonstração prática do sistema reciprocante CC One Blue, discutindo protocolo de uso, eficiência de corte e segurança contra fraturas.",
    highlights: [
      "Protocolo de instrumentação",
      "Eficiência de corte",
      "Prevenção de fraturas",
    ],
    capacity: 5,
    status: "active",
  },
  {
    id: "COBE26_D1_1700_ANATOMIAS",
    dayId: "day1",
    startTime: "17:00",
    endTime: "18:00",
    activityType: "demonstracao",
    title: "Anatomias complexas:\nSistema Orodeka",
    speakerId: "danilo-shimanuko",
    shortDescription:
      "Como o Sistema Orodeka ajuda a lidar com anatomias radiculares complexas no dia a dia clínico.",
    fullDescription:
      "Demonstração do Sistema Orodeka aplicado a anatomias radiculares complexas, com foco em estratégias práticas para não perder a referência do canal.",
    highlights: [
      "Reconhecimento de anatomias complexas",
      "Uso do Sistema Orodeka",
      "Estratégias para casos difíceis",
    ],
    capacity: 5,
    status: "active",
  },

  // ---------- DIA 02 (09/out) ----------
  {
    id: "COBE26_D2_1000_ISOLAMENTO",
    dayId: "day2",
    startTime: "10:00",
    endTime: "11:00",
    activityType: "roda_de_conversa",
    title: "Isolamento:\ndesafios na endodontia",
    speakerId: "alexandre-bortoloto",
    shortDescription:
      "Uma roda de conversa sobre os principais desafios do isolamento absoluto na endodontia do dia a dia.",
    fullDescription:
      "Troca de experiências sobre os desafios mais comuns do isolamento absoluto na endodontia, e como resolvê-los sem perder tempo de cadeira.",
    highlights: [
      "Casos difíceis de isolar",
      "Soluções práticas",
      "Ganho de eficiência clínica",
    ],
    capacity: 5,
    status: "active",
  },
  {
    id: "COBE26_D2_1100_BIOATIVIDADE",
    dayId: "day2",
    startTime: "11:00",
    endTime: "12:00",
    activityType: "demonstracao",
    title: "Bioatividade além do canal:\nElevação de margem",
    speakerId: "aloisio-napoleao",
    shortDescription:
      "Mais uma conversa sobre bioatividade e elevação de margem, com outro olhar clínico sobre o tema.",
    fullDescription:
      "Continuando o tema do dia anterior, uma nova perspectiva sobre o uso de materiais bioativos na elevação de margem cervical.",
    highlights: [
      "Materiais bioativos na prática",
      "Técnica de elevação de margem",
      "Troca de experiências clínicas",
    ],
    capacity: 5,
    status: "active",
  },
  {
    id: "COBE26_D2_1200_BIOCERAMICOS",
    dayId: "day2",
    startTime: "12:00",
    endTime: "13:00",
    activityType: "hands_on",
    title: "Biocerâmicos: escolha,\ntécnica e resultado",
    speakerId: "bruno-bisi",
    shortDescription: "Como escolher o biocerâmico certo e a técnica que garante o melhor resultado.",
    fullDescription:
      "Mão na massa com cimentos biocerâmicos: como escolher o material certo, a técnica de aplicação e o que esperar do resultado final.",
    highlights: [
      "Critérios de escolha do material",
      "Técnica de aplicação",
      "Resultado esperado",
    ],
    capacity: 5,
    status: "active",
  },
  {
    id: "COBE26_D2_1400_ULTRASSOMROTINA",
    dayId: "day2",
    startTime: "14:00",
    endTime: "15:00",
    activityType: "demonstracao",
    title: "O ultrassom na rotina endodôntica:\nindicações técnicas e resultados",
    speakerId: "key-fabiano-souza",
    shortDescription:
      "Quando e como incluir o ultrassom na rotina endodôntica para melhorar os resultados.",
    fullDescription:
      "Demonstração de indicações técnicas do ultrassom na rotina endodôntica, do preparo à resolução de intercorrências, com foco nos resultados clínicos.",
    highlights: [
      "Indicações técnicas do ultrassom",
      "Ajustes e cuidados de uso",
      "Resultados clínicos esperados",
    ],
    capacity: 5,
    status: "active",
  },
  {
    id: "COBE26_D2_1500_IRRIGANTECERTO",
    dayId: "day2",
    startTime: "15:00",
    endTime: "16:00",
    activityType: "roda_de_conversa",
    title: "Irrigante certo, volume ideal:\nO que realmente faz diferença no canal?",
    speakerId: "josiane-almeida",
    shortDescription:
      "Uma conversa sobre irrigante e volume ideal: o que realmente muda o resultado da irrigação.",
    fullDescription:
      "Uma roda de conversa sobre a escolha do irrigante certo e do volume ideal, separando o que realmente faz diferença no resultado do que é só tradição.",
    highlights: [
      "Escolha do irrigante",
      "Volume ideal de irrigação",
      "O que realmente muda o resultado",
    ],
    capacity: 5,
    status: "active",
  },
  {
    id: "COBE26_D2_1700_RCONECURVATURA",
    dayId: "day2",
    startTime: "17:00",
    endTime: "18:00",
    activityType: "hands_on",
    title: "Uso do RC One em canais\ncom curvatura acentuada",
    speakerId: "eduardo-akisue",
    shortDescription: "Prática guiada do uso do RC One em canais com curvatura acentuada.",
    fullDescription:
      "Atividade prática sobre o uso do sistema RC One em canais com curvatura acentuada, discutindo protocolo e cuidados para evitar acidentes.",
    highlights: [
      "Protocolo para canais curvos",
      "Cuidados para evitar fraturas",
      "Prática guiada",
    ],
    capacity: 5,
    status: "active",
  },

  // ---------- DIA 03 (10/out) ----------
  // Vazio de propósito: a planilha atual tem 2 horários nesse dia (10h e
  // 11h/Prof. Valadão) mas nenhum dos dois tem tema definido, e o professor
  // das 10h nem tem nome ainda — ver aviso no chat sobre o que falta antes
  // de publicar qualquer sessão aqui.
];

export function getSessionById(id: string): SessionDef | undefined {
  return sessions.find((s) => s.id === id);
}
