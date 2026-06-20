export type AffiliateStatus = "Filiado ativo";

export type Affiliate = {
  id: string;
  name: string;
  role: string;
  city: string;
  state: string;
  church: string;
  membershipNumber: string;
  status: AffiliateStatus;
  initials: string;
};

export const affiliates: Affiliate[] = [
  {
    id: "1",
    name: "Filiado Exemplo 01",
    role: "Pastor",
    city: "Rio de Janeiro",
    state: "RJ",
    church: "Igreja Exemplo do Reino",
    membershipNumber: "CMEBE-2024-001",
    status: "Filiado ativo",
    initials: "FE",
  },
  {
    id: "2",
    name: "Filiada Exemplo 02",
    role: "Missionária",
    city: "Niterói",
    state: "RJ",
    church: "Ministério Exemplo de Missões",
    membershipNumber: "CMEBE-2024-002",
    status: "Filiado ativo",
    initials: "FE",
  },
  {
    id: "3",
    name: "Liderança Exemplo 03",
    role: "Presbítero",
    city: "São Paulo",
    state: "SP",
    church: "Comunidade Cristã Exemplo",
    membershipNumber: "CMEBE-2024-003",
    status: "Filiado ativo",
    initials: "LE",
  },
  {
    id: "4",
    name: "Ministro Exemplo 04",
    role: "Evangelista",
    city: "Belo Horizonte",
    state: "MG",
    church: "Igreja Batista Exemplo",
    membershipNumber: "CMEBE-2024-004",
    status: "Filiado ativo",
    initials: "ME",
  },
  {
    id: "5",
    name: "Educadora Exemplo 05",
    role: "Educadora religiosa",
    city: "Salvador",
    state: "BA",
    church: "Escola Bíblica Exemplo",
    membershipNumber: "CMEBE-2024-005",
    status: "Filiado ativo",
    initials: "EE",
  },
  {
    id: "6",
    name: "Obreiro Exemplo 06",
    role: "Ministro de música",
    city: "Curitiba",
    state: "PR",
    church: "Ministério de Louvor Exemplo",
    membershipNumber: "CMEBE-2024-006",
    status: "Filiado ativo",
    initials: "OE",
  },
];

export const affiliateBenefits = [
  "Reconhecimento institucional",
  "Credencial ministerial",
  "Certificação",
  "Capacitação cristã",
  "Participação em encontros e projetos",
  "Rede de apoio ministerial",
  "Validação pública da filiação",
];
