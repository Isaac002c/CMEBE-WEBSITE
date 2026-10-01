export type CmebeEvent = {
  id: string;
  isoDate: string;
  day: string;
  month: string;
  year: string;
  weekday: string;
  time: string;
  title: string;
  details?: string[];
  host?: string;
  direction?: string;
  speaker?: string;
  venue: string;
  address?: string;
  image?: string;
  note?: string;
  featured?: boolean;
  endsAt?: string;
  documentHref?: string;
  documentLabel?: string;
};

export const officialEvents: CmebeEvent[] = [
  {
    id: "aniversario-presidente",
    isoDate: "2026-08-06T19:00:00-03:00",
    day: "06",
    month: "AGO",
    year: "2026",
    weekday: "Quinta-feira",
    time: "19h",
    title: "Culto em Ação de Graças",
    details: ["Aniversário do Presidente Pr. José Carlos Domingos"],
    venue: "Catedral das Assembleias de Deus – Ministério Ágape",
    address: "Estrada de Sepetiba, 5.236 – Sepetiba – RJ",
  },
  {
    id: "encontro-piracicaba",
    isoDate: "2026-09-07T19:30:00-03:00",
    day: "07",
    month: "SET",
    year: "2026",
    weekday: "Segunda-feira",
    time: "19h30",
    title: "1º Encontro CMEBE – Piracicaba/SP",
    host: "Pr. Uindo Lino de Almeida (Superintendente)",
    venue: "Assembleia de Deus Primitiva",
    address: "Rua Osasco, 318 – Parque Piracicaba – Piracicaba/SP",
  },
  {
    id: "assembleia-geral-extraordinaria",
    isoDate: "2026-09-12T09:00:00-03:00",
    day: "12",
    month: "SET",
    year: "2026",
    weekday: "Sábado",
    time: "9h",
    title: "Assembleia Geral Extraordinária",
    details: [
      "Escola de Profetas CMEBE e AGE",
      "Eleição e posse da nova diretoria",
      "Tema: Belém — A Casa do Pão Vazia, Parte II (Amós 8:11-14)",
    ],
    host: "Pr. José Carlos Domingos (Presidente)",
    speaker: "Pr. José Carlos Domingos",
    venue: "Catedral das Assembleias de Deus – Ministério Ágape",
    address: "Estrada de Sepetiba, 5.236 – Sepetiba – RJ",
    image: "/images/events/escola-profetas-age-12-setembro-2026.jpg",
    note: "Concomitantemente ao evento haverá a Escola de Profetas.",
    documentHref: "/edital",
    documentLabel: "Ler edital de convocação",
  },
  {
    id: "encontro-oracao",
    isoDate: "2026-10-01T09:00:00-03:00",
    endsAt: "2026-10-02T00:00:00-03:00",
    day: "01",
    month: "OUT",
    year: "2026",
    weekday: "Quinta-feira",
    time: "9h",
    title: "Encontro de Oração da Nação — CMEBE",
    details: ["Tema: “A oração do crente estremece montes”"],
    host: "Pr. José Carlos Domingos (Presidente)",
    direction: "Pr. Paulo e Miss. Marília (Diretores de Oração CMEBE)",
    venue: "Catedral das Assembleias de Deus – Ministério Ágape",
    address: "Estrada de Sepetiba, 5.236 – Sepetiba – RJ",
    image: "/images/events/encontro-oracao-da-nacao-01-outubro-2026.jpeg",
    note: "Participe, ore e divulgue.",
    featured: true,
  },
  {
    id: "escola-profetas-piracicaba",
    isoDate: "2026-11-21T09:00:00-03:00",
    day: "21",
    month: "NOV",
    year: "2026",
    weekday: "Sábado",
    time: "9h",
    title: "Escola de Profetas CMEBE – Piracicaba/SP",
    host: "Pr. Uindo Lino de Almeida (Superintendente)",
    speaker: "Pr. José Carlos Domingos (Presidente)",
    venue: "Local a confirmar",
  },
  {
    id: "confraternizacao",
    isoDate: "2026-12-16T09:00:00-03:00",
    day: "16",
    month: "DEZ",
    year: "2026",
    weekday: "Quarta-feira",
    time: "9h",
    title: "Café de Confraternização de Fim de Ano CMEBE",
    host: "Pr. Gerson Martins",
    venue: "Espaço Martins Festas e Eventos",
    address: "Estrada Boa Esperança, nº 13 – Santa Cruz – RJ",
  },
];

export const institutionalRecess = {
  start: "20/12/2026",
  end: "20/01/2027",
  label: "Recesso institucional",
} as const;
