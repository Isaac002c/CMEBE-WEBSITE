// Valores controlados de papéis e status. Como o SQLite não tem enums no Prisma,
// estes tipos são a fonte de verdade no servidor (validados com zod).

export const ROLES = ["MASTER", "ADMIN", "REVIEWER", "SUPPORT", "AFFILIATE", "PARTNER"] as const;
export type Role = (typeof ROLES)[number];

export const AFFILIATION_STATUSES = [
  "DRAFT",
  "PENDING",
  "UNDER_REVIEW",
  "DOCUMENTS_REQUESTED",
  "APPROVED",
  "REJECTED",
  "SUSPENDED",
] as const;
export type AffiliationStatus = (typeof AFFILIATION_STATUSES)[number];

export const STATUS_LABELS: Record<AffiliationStatus, string> = {
  DRAFT: "Rascunho",
  PENDING: "Pendente de análise",
  UNDER_REVIEW: "Em análise",
  DOCUMENTS_REQUESTED: "Documentos solicitados",
  APPROVED: "Aprovado",
  REJECTED: "Reprovado",
  SUSPENDED: "Suspenso",
};

export const STATUS_DESCRIPTIONS: Record<AffiliationStatus, string> = {
  DRAFT: "Sua solicitação ainda não foi enviada.",
  PENDING: "Sua solicitação foi recebida e está aguardando análise pelo CMEBE.",
  UNDER_REVIEW: "Sua solicitação está sendo analisada pela equipe do CMEBE.",
  DOCUMENTS_REQUESTED: "O CMEBE solicitou documentos adicionais para prosseguir.",
  APPROVED: "Sua filiação foi aprovada pelo CMEBE.",
  REJECTED: "Sua solicitação de filiação não foi aprovada.",
  SUSPENDED: "Sua filiação está temporariamente suspensa.",
};

// Etapa numérica (para barra de progresso na área do afiliado).
export const STATUS_STEP: Record<AffiliationStatus, number> = {
  DRAFT: 0,
  PENDING: 1,
  UNDER_REVIEW: 2,
  DOCUMENTS_REQUESTED: 2,
  APPROVED: 3,
  REJECTED: 3,
  SUSPENDED: 3,
};

export const ROLE_LABELS: Record<Role, string> = {
  MASTER: "Master",
  ADMIN: "Administrador",
  REVIEWER: "Revisor",
  SUPPORT: "Suporte",
  AFFILIATE: "Afiliado",
  PARTNER: "Parceiro",
};

// Rótulo curto de perfil exibido na navbar quando logado.
export function shortRoleLabel(role: string): string {
  if (role === "MASTER") return "Master";
  if (role === "ADMIN") return "Admin";
  if (role === "PARTNER") return "Parceiro";
  return "Filiado";
}

// Destino da "Minha Área" conforme o papel do usuário.
export function areaHrefForRole(role: string): string {
  switch (role) {
    case "MASTER":
      return "/master";
    case "ADMIN":
      return "/admin";
    case "PARTNER":
      return "/painel";
    default:
      return "/minha-filiacao";
  }
}

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

export function isAffiliationStatus(value: string): value is AffiliationStatus {
  return (AFFILIATION_STATUSES as readonly string[]).includes(value);
}

// Único papel que pode decidir filiação nesta versão.
export function canApproveAffiliations(role: string): boolean {
  return role === "MASTER";
}

// ---------------------------------------------------------------------------
// Associados / parceiros CMEBE (aprovados pelo ADMIN — diretor administrativo).
// ---------------------------------------------------------------------------

export const PARTNER_STATUSES = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "NEGOTIATING",
] as const;
export type PartnerStatus = (typeof PARTNER_STATUSES)[number];

export const PARTNER_STATUS_LABELS: Record<PartnerStatus, string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  REJECTED: "Recusado",
  NEGOTIATING: "Em negociação",
};

export const PARTNER_TYPES = [
  "Igreja",
  "Ministério",
  "Empresa",
  "Prestador de Serviço",
  "Instituição",
  "Outro",
] as const;
export type PartnerType = (typeof PARTNER_TYPES)[number];

// Ramos/segmentos de atuação do parceiro (para filtros e exibição pública).
export const PARTNER_SEGMENTS = [
  "Tecnologia",
  "Óticas",
  "Veículos",
  "Saúde",
  "Educação",
  "Serviços",
  "Comércio",
  "Construção",
  "Jurídico",
  "Contabilidade",
  "Alimentação",
  "Outro",
] as const;
export type PartnerSegment = (typeof PARTNER_SEGMENTS)[number];

export function isPartnerStatus(value: string): value is PartnerStatus {
  return (PARTNER_STATUSES as readonly string[]).includes(value);
}

export function isPartnerType(value: string): value is PartnerType {
  return (PARTNER_TYPES as readonly string[]).includes(value);
}

// Papéis que administram os parceiros (ADMIN = Pr. Gerson; MASTER é superusuário).
export function canManagePartners(role: string): boolean {
  return role === "ADMIN" || role === "MASTER";
}
