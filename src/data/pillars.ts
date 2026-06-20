export type PillarIcon =
  | "handshake"
  | "heart"
  | "calendar"
  | "map"
  | "cross"
  | "graduation"
  | "sprout";

export type Pillar = {
  title: string;
  description: string;
  icon: PillarIcon;
};

export const pillars: Pillar[] = [
  {
    title: "União ministerial",
    description:
      "Uma rede de cooperação para aproximar ministros, igrejas e lideranças vocacionadas.",
    icon: "handshake",
  },
  {
    title: "Fraternidade entre lideranças",
    description:
      "Ambiente de comunhão, honra e cuidado entre homens e mulheres chamados para servir.",
    icon: "heart",
  },
  {
    title: "Encontros e projetos cristãos",
    description:
      "Promoção de iniciativas, agendas e encontros que fortaleçam a missão da igreja.",
    icon: "calendar",
  },
  {
    title: "Expansão nos municípios brasileiros",
    description:
      "Atuação organizada para ampliar a presença do CMEBE em cidades do Brasil e exterior.",
    icon: "map",
  },
  {
    title: "Educação, saúde e bem-estar social",
    description:
      "Projetos que conectam fé, serviço social, formação humana e cuidado comunitário.",
    icon: "cross",
  },
  {
    title: "Formação e especialização ministerial",
    description:
      "Cursos, capacitações e trilhas para o desenvolvimento contínuo de lideranças cristãs.",
    icon: "graduation",
  },
  {
    title: "Apoio a ministérios iniciantes",
    description:
      "Suporte institucional para vocacionados que estão estruturando sua caminhada ministerial.",
    icon: "sprout",
  },
];
