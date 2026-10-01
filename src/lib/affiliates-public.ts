import { prisma } from "@/lib/db";

// DTO público: SOMENTE campos não sensíveis. Nunca expõe e-mail, telefone,
// senha, consentimentos, observações administrativas, etc.
export type PublicAffiliate = {
  id: string;
  name: string;
  ministerialRole: string;
  city: string;
  state: string;
  church: string | null; // apenas se o usuário autorizou a exibição pública
  membershipNumber: string | null;
};

/**
 * Lista pública de filiados. Um perfil só aparece quando:
 *  - status === APPROVED
 *  - publicVisible === true   (autorização do MASTER)
 *  - consentPublicDisplay === true (consentimento do próprio usuário — LGPD)
 */
export async function getPublicAffiliates(): Promise<PublicAffiliate[]> {
  const rows = await prisma.affiliateProfile.findMany({
    where: {
      status: "APPROVED",
      publicVisible: true,
      consentPublicDisplay: true,
    },
    select: {
      id: true,
      ministerialRole: true,
      city: true,
      state: true,
      church: true,
      consentPublicDisplay: true,
      membershipNumber: true,
      user: { select: { name: true } },
    },
    orderBy: [{ reviewedAt: "desc" }, { createdAt: "desc" }],
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.user.name,
    ministerialRole: row.ministerialRole,
    city: row.city,
    state: row.state,
    church: row.consentPublicDisplay ? row.church : null,
    membershipNumber: row.membershipNumber,
  }));
}
