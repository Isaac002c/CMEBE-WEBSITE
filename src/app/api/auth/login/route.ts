import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { createSession } from "@/lib/session";
import { loginSchema } from "@/lib/validation";

// Limite generoso: não atrapalha o uso normal, contém brute-force por IP.
const LOGIN_LIMIT = 10;
const LOGIN_WINDOW_MS = 5 * 60 * 1000; // 5 min

// Hash "dummy" válido (senha aleatória) só para igualar o tempo de resposta
// quando o e-mail não existe, evitando enumeração por timing.
const DUMMY_HASH =
  "scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$" +
  "Pp3m0m4i2cE6q3o0nE0o3o5n3o8s9o1u2v3w4x5y6z7A8B9C0D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3a4b5c6d7e8f9g0h==";

export async function POST(request: Request) {
  const limit = rateLimit(`login:${clientKey(request)}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
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

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Informe e-mail e senha." }, { status: 422 });
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  // Mensagem genérica em ambos os casos (sem revelar se o e-mail existe).
  const generic = NextResponse.json(
    { error: "Credenciais inválidas." },
    { status: 401 },
  );

  if (!user) {
    await verifyPassword(password, DUMMY_HASH); // equaliza timing
    return generic;
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return generic;

  await createSession(user.id);

  const redirectByRole: Record<string, string> = {
    MASTER: "/master",
    ADMIN: "/admin",
  };

  return NextResponse.json({
    ok: true,
    redirect: redirectByRole[user.role] ?? "/minha-filiacao",
  });
}
