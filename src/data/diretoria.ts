export type LeadershipMember = {
  name: string;
  role: string;
  photo: string;
};

export const leadership: LeadershipMember[] = [
  {
    name: "Pr. José Carlos Domingos",
    role: "Presidente – CMEBE",
    photo: "/images/presidente/presidente_solo.jpg",
  },
  {
    name: "Pr. Gerson Martins",
    role: "1º Vice-Presidente – CMEBE",
    photo: "/images/Vice/vice_presidente.jpeg",
  },
];

// Relação oficial informada pela instituição. Cargos não foram atribuídos aos
// demais integrantes porque não constam nos dados oficiais recebidos.
export const boardMembers = [
  "Marilene de Oliveira Domingos",
  "Alexander Ricardo da Silva",
  "Alexandro Duarte Leite",
  "Eduardo Luiz Fernandes",
  "Valdemiro Vieira da Silva",
  "Carlos Alberto Alves Rodrigues",
  "Raquel Paz Barbosa",
  "Rubens Cezar de Andrade",
  "Anderson dos Santos Andre",
  "Marcio André Boaventura de Siqueira",
  "Marcio Rogério José Catalan",
  "Marcelo Silva Tavares",
  "Wellington Ferreira de Carvalho",
  "Jesaias Vieira de Assis",
  "Leandro Araujo da Silva",
  "José Olicio Moutinho",
  "Robson Ramos Araujo",
  "Vanduir Manoel da Silva",
  "Genecy Vianna",
  "Ana Lucia Luiz da Silva",
  "Edson Fernandes Gomes",
  "Cíntia Bruno do Espírito Santo Braz",
] as const;
