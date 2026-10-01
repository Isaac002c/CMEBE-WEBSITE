import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

import { prisma } from "@/lib/db";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "cmebe_session";
const TTL_HOURS = Number(process.env.AUTH_SESSION_TTL_HOURS ?? "168"); // 7 dias

function hashToken(token: string): string {
  // O token já tem 256 bits de entropia; SHA-256 basta para o índice de busca.
  return createHash("sha256").update(token).digest("hex");
}

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

/**
 * Cria uma sessão para o usuário e grava o cookie httpOnly.
 * Só pode ser chamada em Route Handlers / Server Actions (escreve cookie).
 */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + TTL_HOURS * 60 * 60 * 1000);

  await prisma.session.create({ data: { userId, tokenHash, expiresAt } });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

/** Lê o usuário atual a partir do cookie de sessão. Read-only (qualquer lugar). */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    // sessão expirada: limpa do banco
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

/** Encerra a sessão atual (logout). Apaga do banco e limpa o cookie. */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.session
      .deleteMany({ where: { tokenHash: hashToken(token) } })
      .catch(() => {});
  }
  cookieStore.delete(COOKIE_NAME);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
