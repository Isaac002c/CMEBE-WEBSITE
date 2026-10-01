import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/session";

// Resumo do usuário atual para a navbar (client). Não expõe dados sensíveis.
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: { name: user.name, role: user.role },
  });
}
