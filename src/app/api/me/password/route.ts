import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { requireUserApi } from "@/lib/rbac";
import { flattenZodErrors, passwordChangeSchema } from "@/lib/validation";

// Troca de senha do próprio usuário (exige a senha atual).
export async function POST(request: Request) {
  const guard = await requireUserApi();
  if ("response" in guard) return guard.response;
  const user = guard.user;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = passwordChangeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Verifique os campos.", fields: flattenZodErrors(parsed.error) },
      { status: 422 },
    );
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  const valid = await verifyPassword(parsed.data.currentPassword, dbUser.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Senha atual incorreta.", fields: { currentPassword: "Senha atual incorreta." } },
      { status: 422 },
    );
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return NextResponse.json({ ok: true, message: "Senha alterada com sucesso." });
}
