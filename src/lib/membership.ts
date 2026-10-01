import { prisma } from "@/lib/db";

/**
 * Gera um número de filiação único no formato CMEBE-AAAA-NNN.
 * Tenta algumas vezes para evitar colisão no campo único.
 */
export async function generateMembershipNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const base = await prisma.affiliateProfile.count({
    where: { membershipNumber: { not: null } },
  });

  for (let attempt = 0; attempt < 20; attempt++) {
    const seq = String(base + 1 + attempt).padStart(3, "0");
    const candidate = `CMEBE-${year}-${seq}`;
    const exists = await prisma.affiliateProfile.findUnique({
      where: { membershipNumber: candidate },
      select: { id: true },
    });
    if (!exists) return candidate;
  }

  // fallback improvável
  return `CMEBE-${year}-${Date.now().toString().slice(-6)}`;
}
