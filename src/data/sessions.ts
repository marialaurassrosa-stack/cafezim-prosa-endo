import type { SessionDef } from "@/types";

/**
 * PLACEHOLDER DATA — temas, descrições e vagas fictícios para demonstrar a
 * programação e o fluxo de inscrição. Edite livremente: adicione, remova ou
 * altere sessões aqui. Cada `id` deve ser único (sugestão de padrão:
 * `{eventCode}_{dia}_{horario}_{tema}`), pois ele é usado como chave estável
 * no banco de inscrições.
 *
 * `capacity` controla o número de vagas; `status` pode ser sobrescrito
 * manualmente para "sold_out" (esgotado), "cancelled" (cancelado) ou
 * "hidden" (oculto da programação) independente da contagem de inscritos.
 */
export const sessions: SessionDef[] = [
  // ---------- DIA 01 ----------
  {
    id: "COBE26_D1_0930_MOLARES",
    dayId: "day1",
    startTime: "09:30",
    endTime: "10:10",
    activityType: "roda_de_conversa",
    title: "Molares quentes,\nmentes frias",
    speakerId: "speaker-1",
    shortDescription:
      "Uma conversa prática sobre estratégias de diagnóstico, tomada de decisão e condução de casos clínicos desafiadores.",
    fullDescription:
      "Uma conversa prática sobre estratégias de diagnóstico, tomada de decisão e condução de casos clínicos desafiadores em molares com quadros agudos.",
    highlights: [
      "Diagnóstico diferencial em dor aguda",
      "Tomada de decisão sob pressão",
      "Casos reais trazidos pelo grupo",
    ],
    capacity: 8,
    status: "active",
  },
  {
    id: "COBE26_D1_0930_CASOCLINICO",
    dayId: "day1",
    startTime: "09:30",
    endTime: "10:15",
    activityType: "caso_clinico",
    title: "Caso clínico:\ndecisão sob pressão",
    speakerId: "speaker-5",
    shortDescription:
      "Discussão em grupo pequeno de um caso complexo, do diagnóstico ao plano de tratamento final.",
    fullDescription:
      "Discussão em grupo pequeno de um caso complexo, do diagnóstico ao plano de tratamento final. Traga suas próprias dúvidas para o debate.",
    highlights: [
      "Análise radiográfica em grupo",
      "Alternativas de tratamento",
      "Perguntas e respostas abertas",
    ],
    capacity: 8,
    status: "active",
  },
  {
    id: "COBE26_D1_1100_ULTRASSOM",
    dayId: "day1",
    startTime: "11:00",
    endTime: "11:45",
    activityType: "demonstracao",
    title: "Ultrassom em Endodontia:\nquando e como usar",
    speakerId: "speaker-2",
    shortDescription:
      "Demonstração prática do uso do ultrassom em diferentes etapas do tratamento endodôntico.",
    fullDescription:
      "Demonstração prática do uso do ultrassom em diferentes etapas do tratamento endodôntico, da localização de canais à remoção de obstruções.",
    highlights: [
      "Seleção de pontas por situação clínica",
      "Ajustes de potência",
      "Erros comuns e como evitá-los",
    ],
    capacity: 10,
    status: "active",
  },
  {
    id: "COBE26_D1_1400_BIOCERA",
    dayId: "day1",
    startTime: "14:00",
    endTime: "15:00",
    activityType: "hands_on",
    title: "Biocerâmicos\nna prática",
    speakerId: "speaker-3",
    shortDescription:
      "Mão na massa com cimentos biocerâmicos: manipulação, indicações e técnica de obturação.",
    fullDescription:
      "Atividade hands-on para manipular cimentos biocerâmicos, discutir indicações clínicas e treinar a técnica de obturação passo a passo.",
    highlights: [
      "Manipulação do material",
      "Indicações e contraindicações",
      "Prática em modelo",
    ],
    capacity: 6,
    status: "active",
  },

  // ---------- DIA 02 ----------
  {
    id: "COBE26_D2_1000_IRRIGACAO",
    dayId: "day2",
    startTime: "10:00",
    endTime: "10:40",
    activityType: "roda_de_conversa",
    title: "Irrigação na Endodontia:\nprotocolos que funcionam",
    speakerId: "speaker-4",
    shortDescription:
      "Troca de experiências sobre protocolos de irrigação que realmente fazem diferença no resultado clínico.",
    fullDescription:
      "Troca de experiências sobre protocolos de irrigação, ativação e soluções, com foco no que realmente muda o resultado clínico no dia a dia.",
    highlights: [
      "Escolha de soluções irrigadoras",
      "Métodos de ativação",
      "Protocolos para casos infectados",
    ],
    capacity: 8,
    status: "active",
  },
  {
    id: "COBE26_D2_1130_RETRATAMENTO",
    dayId: "day2",
    startTime: "11:30",
    endTime: "12:15",
    activityType: "caso_clinico",
    title: "Retratamento:\nquando vale a pena tentar",
    speakerId: "speaker-1",
    shortDescription:
      "Critérios práticos para decidir entre retratamento, cirurgia parapical ou exodontia.",
    fullDescription:
      "Critérios práticos para decidir entre retratamento não cirúrgico, cirurgia parapical ou exodontia, com casos reais para discussão em grupo.",
    highlights: [
      "Critérios de prognóstico",
      "Casos limítrofes",
      "Conversa aberta com o professor",
    ],
    capacity: 10,
    status: "active",
  },
  {
    id: "COBE26_D2_1500_INSTRUMENTACAO",
    dayId: "day2",
    startTime: "15:00",
    endTime: "16:00",
    activityType: "roda_hands_on",
    title: "Instrumentação reciprocante\nna prática",
    speakerId: "speaker-5",
    shortDescription:
      "Roda de conversa seguida de prática com sistemas reciprocantes em blocos de treino.",
    fullDescription:
      "Começamos com uma roda de conversa sobre a lógica dos sistemas reciprocantes e seguimos para a prática em blocos de treino.",
    highlights: [
      "Lógica do movimento recíproco",
      "Prática em bloco de treino",
      "Dicas para evitar fraturas",
    ],
    capacity: 6,
    status: "active",
  },

  // ---------- DIA 03 ----------
  {
    id: "COBE26_D3_0930_DIAGNOSTICO",
    dayId: "day3",
    startTime: "09:30",
    endTime: "10:10",
    activityType: "roda_de_conversa",
    title: "Diagnóstico diferencial\nem dor orofacial",
    speakerId: "speaker-2",
    shortDescription:
      "Uma prosa sobre como diferenciar dor de origem endodôntica de outras causas orofaciais.",
    fullDescription:
      "Uma prosa sobre como diferenciar dor de origem endodôntica de outras causas orofaciais, evitando tratamentos desnecessários.",
    highlights: [
      "Sinais de alerta",
      "Testes clínicos úteis",
      "Quando encaminhar",
    ],
    capacity: 8,
    status: "active",
  },
  {
    id: "COBE26_D3_1100_OBTURACAO",
    dayId: "day3",
    startTime: "11:00",
    endTime: "12:00",
    activityType: "hands_on",
    title: "Técnicas de obturação:\nalém do convencional",
    speakerId: "speaker-3",
    shortDescription:
      "Prática guiada com técnicas de obturação alternativas à condensação lateral clássica.",
    fullDescription:
      "Prática guiada com técnicas de obturação alternativas à condensação lateral clássica, discutindo vantagens e limitações de cada uma.",
    highlights: [
      "Comparação entre técnicas",
      "Prática em modelo",
      "Perguntas livres",
    ],
    capacity: 6,
    status: "active",
  },
  {
    id: "COBE26_D3_1400_TRAUMA",
    dayId: "day3",
    startTime: "14:00",
    endTime: "14:40",
    activityType: "demonstracao",
    title: "Traumatismo dentoalveolar:\nconduta na urgência",
    speakerId: "speaker-4",
    shortDescription:
      "Demonstração objetiva da conduta nos primeiros atendimentos de traumatismo dentoalveolar.",
    fullDescription:
      "Demonstração objetiva da conduta nos primeiros atendimentos de traumatismo dentoalveolar, do acolhimento ao plano de acompanhamento.",
    highlights: [
      "Protocolo de urgência",
      "Reimplante e contenção",
      "Acompanhamento pós-trauma",
    ],
    // Capacidade baixa de propósito neste exemplo, para demonstrar o
    // fluxo de "vagas esgotadas" / lista de espera.
    capacity: 1,
    status: "active",
  },
];

export function getSessionById(id: string): SessionDef | undefined {
  return sessions.find((s) => s.id === id);
}
