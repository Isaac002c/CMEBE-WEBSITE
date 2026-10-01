import { NextResponse } from "next/server";

import { getCurrentUser, type SessionUser } from "@/lib/session";

type GuardResult = { user: SessionUser } | { response: NextResponse };

/** Exige usuário autenticado em rotas de API. Caso contrário, 401. */
export async function requireUserApi(): Promise<GuardResult> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      response: NextResponse.json({ error: "Não autenticado." }, { status: 401 }),
    };
  }
  return { user };
}

/** Exige papel MASTER em rotas de API. 401 se não logado, 403 se sem permissão. */
export async function requireMasterApi(): Promise<GuardResult> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      response: NextResponse.json({ error: "Não autenticado." }, { status: 401 }),
    };
  }
  if (user.role !== "MASTER") {
    return {
      response: NextResponse.json({ error: "Acesso negado." }, { status: 403 }),
    };
  }
  return { user };
}

export function isMaster(user: SessionUser | null): boolean {
  return user?.role === "MASTER";
}

/**
 * Exige papel de administração de parceiros (ADMIN = diretor administrativo, ou
 * MASTER como superusuário). 401 se não logado, 403 se sem permissão.
 */
export async function requireAdminApi(): Promise<GuardResult> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      response: NextResponse.json({ error: "Não autenticado." }, { status: 401 }),
    };
  }
  if (user.role !== "ADMIN" && user.role !== "MASTER") {
    return {
      response: NextResponse.json({ error: "Acesso negado." }, { status: 403 }),
    };
  }
  return { user };
}

export function isAdmin(user: SessionUser | null): boolean {
  return user?.role === "ADMIN" || user?.role === "MASTER";
}
