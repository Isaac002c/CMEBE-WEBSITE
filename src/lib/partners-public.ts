import { prisma } from "@/lib/db";

// DTO público do associado/parceiro: apenas o que pode aparecer no site.
export type PublicPartner = {
  id: string;
  institutionName: string;
  partnerType: string;
  businessSegment: string | null;
  city: string;
  state: string;
  description: string;
  services: string;
  phone: string; // usado só para montar o link de WhatsApp/contato
  website: string | null;
};

/**
 * Lista pública de associados. Um parceiro só aparece quando:
 *  - status === APPROVED
 *  - active === true   (não desativado pelo admin)
 */
export async function getPublicPartners(): Promise<PublicPartner[]> {
  const rows = await prisma.partner.findMany({
    where: { status: "APPROVED", active: true },
    select: {
      id: true,
      institutionName: true,
      partnerType: true,
      businessSegment: true,
      city: true,
      state: true,
      description: true,
      services: true,
      phone: true,
      website: true,
    },
    orderBy: [{ reviewedAt: "desc" }, { createdAt: "desc" }],
  });

  return rows.map((row) => ({
    ...row,
    website: row.website && row.website.trim() ? row.website.trim() : null,
  }));
}
