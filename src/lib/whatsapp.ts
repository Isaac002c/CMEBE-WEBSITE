import { institution } from "@/data/institution";

export function buildWhatsappUrl(message: string) {
  return `https://wa.me/${institution.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

export const joinMessage =
  "Olá, tenho interesse em me filiar ao CMEBE. Gostaria de saber mais sobre os benefícios, documentação e próximos passos.";
