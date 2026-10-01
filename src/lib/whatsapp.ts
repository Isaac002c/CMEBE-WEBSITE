import { institution } from "@/data/institution";

// Monta a URL do WhatsApp para um número específico (apenas dígitos com DDI).
export function buildWhatsappUrlFor(whatsappNumber: string, message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Atalho para o WhatsApp institucional principal do CMEBE.
export function buildWhatsappUrl(message: string) {
  return buildWhatsappUrlFor(institution.whatsappNumber, message);
}

// Normaliza um telefone livre (ex.: "(21) 96441-8167") para o formato wa.me
// (dígitos com DDI). Assume Brasil (55) quando o DDI não vem informado.
// Retorna null quando não há dígitos suficientes para um número válido.
export function toWhatsappNumber(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  if (digits.startsWith("55")) return digits;
  return `55${digits}`;
}

export const joinMessage =
  "Olá, tenho interesse em me filiar ao CMEBE. Gostaria de saber mais sobre os benefícios, documentação e próximos passos.";

export const partnerMessage =
  "Olá, tenho interesse em me tornar parceiro do CMEBE Benefícios. Gostaria de conhecer os próximos passos da parceria comercial.";
