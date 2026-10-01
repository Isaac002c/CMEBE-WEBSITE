export const institution = {
  shortName: "CMEBE",
  fullName: "Conselho de Ministros Evangélicos do Brasil e do Exterior",
  slogan: "Tudo pelo Reino",
  foundedAt: "1º de maio de 2024",
  president: "Pr. José Carlos Domingos",
  address:
    "Estrada de Sepetiba nº 5236, Sepetiba, Rio de Janeiro - RJ, Brasil, CEP 23545-003",
  phone: "(21) 96441-8167",
  whatsappNumber: "5521964418167",
  cnpj: "55.500.596/0001-80",
  instagram: "cmebeoficial",
  instagramUrl: "https://www.instagram.com/cmebeoficial/",
  logo: "/cmebe-logo.jpeg",
} as const;

export const ministerialFunctions = [
  "Pastores",
  "Presbíteros",
  "Diáconos",
  "Evangelistas",
  "Missionários",
  "Obreiros",
  "Educadores religiosos",
  "Ministros de música",
  "Professores de ensino religioso",
  "Empreendedores e líderes cristãos",
] as const;

// Páginas institucionais prioritárias (rotas reais).
export const quickLinks = [
  { label: "Sobre", href: "/sobre" },
  { label: "Agenda", href: "/agenda" },
  { label: "Diretoria", href: "/sobre#diretoria" },
  { label: "Credenciais e Estatuto", href: "/credenciais" },
  { label: "Empreendedor CMEBE", href: "/empreendedores" },
  { label: "Contato", href: "/contato" },
] as const;

// Link para a área comercial (rota própria), destacado na navegação.
export const beneficiosLink = {
  label: "CMEBE Benefícios",
  href: "/beneficios",
} as const;

// Área pública de associados/parceiros aprovados (rota própria).
export const associadosLink = {
  label: "Associados",
  href: "/associados",
} as const;
