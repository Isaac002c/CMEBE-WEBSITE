// Currículo real do Curso de Capelania Cristã (Escola de Profetas / CMEBE),
// com módulos e instrutores informados pela instituição.
export type CapelaniaModule = {
  title: string;
  instructor: string;
  note?: string;
};

export const capelaniaModules: CapelaniaModule[] = [
  {
    title: "Introdução à Capelania",
    instructor: "Capl. Pr. Gerson Martins",
    note: "Coordenação",
  },
  { title: "Capelania Hospitalar", instructor: "Capl. Pr. Wágner Bezerra" },
  { title: "Capelania Social", instructor: "Instrutora Pra. Lilian" },
  {
    title: "A Psicanálise na Capelania",
    instructor: "Capl. Pra. Paula Oliveira",
    note: "O sofrimento humano",
  },
  { title: "Capelania Fúnebre", instructor: "Instrutor Pr. José Pereira" },
  { title: "Capelania Escolar", instructor: "Instrutor Pr. Alberto Carlos" },
  { title: "Capelania Empresarial", instructor: "Instrutor Pr. Anderson André" },
  { title: "Capelania Prisional", instructor: "Capl. Pr. Gerson Martins" },
];
