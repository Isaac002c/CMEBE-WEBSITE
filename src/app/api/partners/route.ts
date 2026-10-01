import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { flattenZodErrors, partnerRegisterSchema } from "@/lib/validation";

// Anti-spam: cadastro público de parceria é raro por IP.
const PARTNER_LIMIT = 5;
const PARTNER_WINDOW_MS = 15 * 60 * 1000; // 15 min

export async function POST(request: Request) {
  const limit = rateLimit(`partner:${clientKey(request)}`, PARTNER_LIMIT, PARTNER_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Muitas solicitações. Aguarde alguns minutos e tente novamente." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = partnerRegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Verifique os campos.", fields: flattenZodErrors(parsed.error) },
      { status: 422 },
    );
  }

  const d = parsed.data;

  // status/active NUNCA vêm do cliente: nasce PENDING e não aparece em público.
  await prisma.partner.create({
    data: {
      institutionName: d.institutionName,
      responsibleName: d.responsibleName,
      responsibleRole: d.responsibleRole,
      email: d.email,
      phone: d.phone,
      city: d.city,
      state: d.state,
      partnerType: d.partnerType,
      businessSegment: d.businessSegment || null,
      description: d.description,
      services: d.services,
      website: d.website || null,
      notes: d.notes || null,
      status: "PENDING",
      active: true,
    },
  });

  return NextResponse.json(
    {
      ok: true,
      message:
        "Sua solicitação foi enviada com sucesso. A administração do CMEBE analisará seus dados e entrará em contato.",
    },
    { status: 201 },
  );
}
