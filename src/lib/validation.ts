import { z } from "zod";

import { PARTNER_TYPES } from "@/lib/constants";

// UFs válidas (Brasil). "EX" = exterior, dada a atuação do CMEBE no exterior.
export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO", "EX",
] as const;

const nameField = z
  .string()
  .trim()
  .min(3, "Informe o nome completo.")
  .max(120, "Nome muito longo.");

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email("E-mail inválido.")
  .max(160, "E-mail muito longo.");

const phoneField = z
  .string()
  .trim()
  .min(8, "Telefone inválido.")
  .max(25, "Telefone inválido.");

const passwordField = z
  .string()
  .min(8, "A senha deve ter ao menos 8 caracteres.")
  .max(200, "Senha muito longa.");

const cityField = z.string().trim().min(2, "Informe a cidade.").max(80);
const stateField = z.enum(UFS, { errorMap: () => ({ message: "UF inválida." }) });
const ministerialRoleField = z
  .string()
  .trim()
  .min(2, "Informe a função ministerial.")
  .max(80);
const churchField = z
  .string()
  .trim()
  .min(2, "Informe a igreja ou ministério.")
  .max(120);
const presentationField = z
  .string()
  .trim()
  .max(1000, "Apresentação muito longa.")
  .optional()
  .or(z.literal(""));

export const registerSchema = z
  .object({
    name: nameField,
    email: emailField,
    phone: phoneField,
    password: passwordField,
    confirmPassword: z.string(),
    city: cityField,
    state: stateField,
    ministerialRole: ministerialRoleField,
    church: churchField,
    presentation: presentationField,
    consentPrivacy: z.coerce.boolean().refine((v) => v === true, {
      message: "É necessário aceitar a política de privacidade.",
    }),
    consentPublicDisplay: z.coerce.boolean().optional().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Informe a senha."),
});

// Campos que o AFILIADO pode editar. NÃO inclui status/role/visibilidade/número.
export const updateProfileSchema = z.object({
  name: nameField,
  phone: phoneField,
  city: cityField,
  state: stateField,
  ministerialRole: ministerialRoleField,
  church: churchField,
  presentation: presentationField,
  consentPublicDisplay: z.coerce.boolean().optional().default(false),
});

// Ações do MASTER
export const rejectSchema = z.object({
  reason: z.string().trim().min(3, "Informe o motivo da reprovação.").max(1000),
});

export const requestDocsSchema = z.object({
  message: z.string().trim().min(3, "Descreva os documentos solicitados.").max(1000),
});

export const visibilitySchema = z.object({
  publicVisible: z.coerce.boolean(),
});

// ---------------------------------------------------------------------------
// Associados / parceiros CMEBE
// ---------------------------------------------------------------------------

const websiteField = z
  .string()
  .trim()
  .max(200, "Endereço muito longo.")
  .optional()
  .or(z.literal(""));

const partnerNotesField = z
  .string()
  .trim()
  .max(1000, "Observações muito longas.")
  .optional()
  .or(z.literal(""));

// Campos comuns do parceiro (usados no cadastro público e na edição pelo admin).
const partnerBaseShape = {
  institutionName: z
    .string()
    .trim()
    .min(2, "Informe o nome da instituição/parceiro.")
    .max(140, "Nome muito longo."),
  responsibleName: z
    .string()
    .trim()
    .min(3, "Informe o nome do responsável.")
    .max(120, "Nome muito longo."),
  responsibleRole: z
    .string()
    .trim()
    .min(2, "Informe o cargo/função do responsável.")
    .max(80, "Cargo muito longo."),
  email: emailField,
  phone: phoneField,
  city: cityField,
  state: stateField,
  partnerType: z.enum(PARTNER_TYPES, {
    errorMap: () => ({ message: "Selecione o tipo de parceiro." }),
  }),
  businessSegment: z
    .string()
    .trim()
    .max(60, "Segmento muito longo.")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(10, "Descreva a instituição/parceiro (mín. 10 caracteres).")
    .max(1500, "Descrição muito longa."),
  services: z
    .string()
    .trim()
    .min(3, "Informe os serviços oferecidos.")
    .max(1000, "Texto muito longo."),
  website: websiteField,
  notes: partnerNotesField,
};

// Cadastro público de parceria (o parceiro NÃO escolhe status — é sempre PENDING).
export const partnerRegisterSchema = z.object({
  ...partnerBaseShape,
  consent: z.coerce.boolean().refine((v) => v === true, {
    message: "É necessário concordar para enviarmos sua solicitação.",
  }),
});

export type PartnerRegisterInput = z.infer<typeof partnerRegisterSchema>;

// Edição da própria conta (admin, afiliado, parceiro).
export const accountUpdateSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
});

// Troca de senha (exige a senha atual).
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Informe a senha atual."),
    newPassword: passwordField,
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });

// Edição dos dados básicos pelo admin (sem status/consentimento).
export const partnerEditSchema = z.object(partnerBaseShape);

// Motivo obrigatório ao recusar uma solicitação.
export const partnerRejectSchema = z.object({
  reason: z.string().trim().min(3, "Informe o motivo da recusa.").max(1000),
});

// Helper: primeira mensagem de erro de um ZodError, achatada por campo.
export function flattenZodErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_";
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
