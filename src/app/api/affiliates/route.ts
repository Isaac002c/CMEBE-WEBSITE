import { NextResponse } from "next/server";

import { getPublicAffiliates } from "@/lib/affiliates-public";

// Sempre dados frescos do banco (lista pública de filiados aprovados/visíveis).
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const affiliates = await getPublicAffiliates();
    return NextResponse.json({ affiliates });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível carregar os filiados." },
      { status: 500 },
    );
  }
}
