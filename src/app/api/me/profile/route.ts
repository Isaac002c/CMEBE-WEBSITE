import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { requireUserApi } from "@/lib/rbac";
import { flattenZodErrors, updateProfileSchema } from "@/lib/validation";

// Afiliado atualiza os PRÓPRIOS dados permitidos. Nunca status, papel,
// visibilidade pública ou número de filiação (esses são server/MASTER-only).
export async function PATCH(request: Request) {
  const guard = await requireUserApi();
  if ("response" in guard) return guard.response;
  const user = guard.user;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Verifique os campos.", fields: flattenZodErrors(parsed.error) },
      { status: 422 },
    );
  }

  const profile = await prisma.affiliateProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!profile) {
    return NextResponse.json({ error: "Perfil não encontrado." }, { status: 404 });
  }

  const data = parsed.data;
  await prisma.user.update({
    where: { id: user.id },
    data: {
      name: data.name,
      phone: data.phone,
      profile: {
        update: {
          city: data.city,
          state: data.state,
          ministerialRole: data.ministerialRole,
          church: data.church,
          presentation: data.presentation || null,
          consentPublicDisplay: data.consentPublicDisplay ?? false,
        },
      },
    },
  });

  return NextResponse.json({ ok: true, message: "Dados atualizados." });
}
