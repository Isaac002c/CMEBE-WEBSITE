// Conteúdo institucional da área CMEBE Benefícios (parcerias comerciais).
// Textos aprovados pela instituição — não inventar dados, números ou promessas.

// Responsável pela área de parcerias e 1º Vice-Presidente do CMEBE.
export const partnership = {
  responsavel: "Pr. Gerson Martins",
  role: "1º Vice-Presidente – CMEBE · Responsável pelo CMEBE Benefícios",
  phone: "(21) 96441-8167",
  whatsappNumber: "5521964418167",
  // Caminho da foto real do responsável. Enquanto o arquivo não existir,
  // o componente FounderPortrait exibe um espaço institucional sóbrio.
  photo: "/images/Vice/vice_presidente.jpeg",
} as const;

export type LeadItem = {
  title: string;
  description?: string;
};

// Seção "Formas de divulgação"
export const formasDivulgacao: LeadItem[] = [
  { title: "Divulgação de produtos e serviços" },
  { title: "Benefícios especiais para associados, familiares e amigos" },
  { title: "Divulgação estratégica nos canais digitais do CMEBE" },
  { title: "Participação no Cartão Parceiro de Descontos CMEBE" },
  { title: "Presença em ações e campanhas institucionais do CMEBE Benefícios" },
];

// Seção "Alcance da rede" — apenas dados informados pela instituição.
export const alcanceRede = [
  {
    destaque: "≈ 2.000",
    titulo: "Aproximadamente 2.000 pessoas",
    descricao: "Pessoas alcançadas pela rede de relacionamento do CMEBE.",
  },
  {
    destaque: null,
    titulo: "Público cristão selecionado",
    descricao: "Comunidade com identidade e valores em comum.",
  },
  {
    destaque: null,
    titulo: "Rede de relacionamento ministerial e familiar",
    descricao: "Conexões construídas no ministério e entre famílias.",
  },
] as const;

// Seção "Por que se tornar um parceiro CMEBE?"
export const vantagensEmpresa: LeadItem[] = [
  { title: "Divulgação contínua para público segmentado" },
  { title: "Fortalecimento institucional da marca" },
  { title: "Ampliação das oportunidades de vendas" },
  { title: "Associação a uma rede de relacionamento cristã ativa" },
  { title: "Presença em ações e campanhas do CMEBE Benefícios" },
];

// Seção "Investimento" — valores e prazos informados pela instituição.
export const investimento = {
  contrato: "Contrato de parceria com duração de 1 ano.",
  inicio: "01/06/2026",
  renovacao: "Mediante interesse entre as partes.",
  valorMensal: "R$ 30,00",
  plano: "12 cotas (plano anual)",
  totalAnual: "R$ 360,00",
} as const;

// Segmentos para o formulário de interesse (lista auxiliar, não exaustiva).
export const segmentos = [
  "Alimentação",
  "Saúde e bem-estar",
  "Educação",
  "Moda e vestuário",
  "Serviços profissionais",
  "Tecnologia",
  "Construção e reforma",
  "Beleza e estética",
  "Comércio varejista",
  "Outro",
] as const;

export type FaqItem = {
  question: string;
  answer: string;
};

// FAQ — respostas objetivas, sem prometer resultados garantidos.
export const faq: FaqItem[] = [
  {
    question: "Quem pode ser parceiro do CMEBE Benefícios?",
    answer:
      "Empresas de produtos ou serviços que desejam ampliar sua visibilidade e oferecer benefícios à rede do CMEBE — associados, familiares e amigos.",
  },
  {
    question: "Quanto custa a parceria?",
    answer:
      "A participação é de R$ 30,00 por mês, em um plano anual de 12 cotas, totalizando R$ 360,00 no ano.",
  },
  {
    question: "Qual é a duração do contrato?",
    answer:
      "O contrato de parceria tem duração de 1 ano, com início previsto para 01/06/2026 e renovação mediante interesse entre as partes.",
  },
  {
    question: "Como minha empresa será divulgada?",
    answer:
      "Por meio da divulgação de produtos e serviços nos canais digitais do CMEBE, da participação no Cartão Parceiro de Descontos e da presença em ações e campanhas institucionais do CMEBE Benefícios.",
  },
  {
    question: "O que é o Cartão Parceiro de Descontos?",
    answer:
      "É o benefício que conecta empresas parceiras a associados, familiares e amigos da rede, facilitando o acesso a condições especiais e fortalecendo as relações comerciais dentro da comunidade.",
  },
  {
    question: "Posso oferecer descontos exclusivos para associados?",
    answer:
      "Sim. A empresa parceira pode oferecer benefícios e descontos especiais para associados, familiares e amigos do CMEBE.",
  },
  {
    question: "Como faço para participar?",
    answer:
      "Preencha o formulário de interesse nesta página ou fale diretamente pelo WhatsApp. Nossa equipe entrará em contato para apresentar os próximos passos da parceria.",
  },
];
