import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { emailRegistrationReceived } from "@/lib/email";
import { hashPassword } from "@/lib/password";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { createSession } from "@/lib/session";
import { flattenZodErrors, registerSchema } from "@/lib/validation";

// Cadastro é mais raro que login: janela maior, limite menor por IP.
const REGISTER_LIMIT = 5;
const REGISTER_WINDOW_MS = 15 * 60 * 1000; // 15 min

export async function POST(request: Request) {
  const limit = rateLimit(`register:${clientKey(request)}`, REGISTER_LIMIT, REGISTER_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Verifique os campos.", fields: flattenZodErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // E-mail único (armazenado já em minúsculas pelo schema).
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    return NextResponse.json(
      { error: "Já existe uma conta com este e-mail.", fields: { email: "E-mail já cadastrado." } },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(data.password);

  // status/role/publicVisible/membershipNumber NUNCA vêm do cliente:
  // são definidos pelo servidor. Novo cadastro nasce PENDING / AFFILIATE.
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash,
      role: "AFFILIATE",
      profile: {
        create: {
          city: data.city,
          state: data.state,
          ministerialRole: data.ministerialRole,
          church: data.church,
          presentation: data.presentation || null,
          status: "PENDING",
          publicVisible: false,
          consentPrivacy: data.consentPrivacy,
          consentPublicDisplay: data.consentPublicDisplay ?? false,
        },
      },
    },
  });

  await createSession(user.id);

  // Best-effort: não bloqueia nem quebra o fluxo se o SMTP não existir.
  await emailRegistrationReceived(user.email, user.name).catch(() => {});

  return NextResponse.json(
    {
      ok: true,
      message: "Sua solicitação foi recebida e está em análise pelo CMEBE.",
      redirect: "/minha-filiacao",
    },
    { status: 201 },
  );
}
