import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { requireUserApi } from "@/lib/rbac";
import { accountUpdateSchema, flattenZodErrors } from "@/lib/validation";

// Atualiza os PRÓPRIOS dados de conta (nome, e-mail, telefone). Nunca papel.
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

  const parsed = accountUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Verifique os campos.", fields: flattenZodErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.email !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing && existing.id !== user.id) {
      return NextResponse.json(
        { error: "E-mail já em uso.", fields: { email: "E-mail já cadastrado." } },
        { status: 409 },
      );
    }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name: data.name, email: data.email, phone: data.phone },
  });

  return NextResponse.json({ ok: true, message: "Dados atualizados." });
}
