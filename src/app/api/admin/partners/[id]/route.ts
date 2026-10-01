import { NextResponse } from "next/server";

import { recordAudit } from "@/lib/audit";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/rbac";
import {
  flattenZodErrors,
  partnerEditSchema,
  partnerRejectSchema,
} from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  // Autorização sempre no servidor: só ADMIN/MASTER passa daqui.
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;
  const admin = guard.user;

  const { id } = await context.params;

  let body: { action?: string; [k: string]: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const action = body.action;
  if (!action || typeof action !== "string") {
    return NextResponse.json({ error: "Ação não informada." }, { status: 400 });
  }

  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) {
    return NextResponse.json({ error: "Solicitação não encontrada." }, { status: 404 });
  }

  const from = partner.status;
  const now = new Date();

  switch (action) {
    case "approve": {
      await prisma.partner.update({
        where: { id },
        data: {
          status: "APPROVED",
          active: true,
          rejectionReason: null,
          reviewedById: admin.id,
          reviewedAt: now,
        },
      });
      await recordAudit({
        actorId: admin.id,
        action: "PARTNER_APPROVE",
        fromStatus: from,
        toStatus: "APPROVED",
        metadata: { partnerId: id },
      });
      return NextResponse.json({ ok: true, status: "APPROVED" });
    }

    case "reject": {
      const parsed = partnerRejectSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Motivo obrigatório.", fields: flattenZodErrors(parsed.error) },
          { status: 422 },
        );
      }
      await prisma.partner.update({
        where: { id },
        data: {
          status: "REJECTED",
          rejectionReason: parsed.data.reason,
          reviewedById: admin.id,
          reviewedAt: now,
        },
      });
      await recordAudit({
        actorId: admin.id,
        action: "PARTNER_REJECT",
        fromStatus: from,
        toStatus: "REJECTED",
        reason: parsed.data.reason,
        metadata: { partnerId: id },
      });
      return NextResponse.json({ ok: true, status: "REJECTED" });
    }

    case "negotiate": {
      await prisma.partner.update({
        where: { id },
        data: { status: "NEGOTIATING", reviewedById: admin.id, reviewedAt: now },
      });
      await recordAudit({
        actorId: admin.id,
        action: "PARTNER_NEGOTIATE",
        fromStatus: from,
        toStatus: "NEGOTIATING",
        metadata: { partnerId: id },
      });
      return NextResponse.json({ ok: true, status: "NEGOTIATING" });
    }

    case "activate":
    case "deactivate": {
      const active = action === "activate";
      await prisma.partner.update({ where: { id }, data: { active } });
      await recordAudit({
        actorId: admin.id,
        action: active ? "PARTNER_ACTIVATE" : "PARTNER_DEACTIVATE",
        metadata: { partnerId: id, active },
      });
      return NextResponse.json({ ok: true, active });
    }

    case "edit": {
      const parsed = partnerEditSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Verifique os campos.", fields: flattenZodErrors(parsed.error) },
          { status: 422 },
        );
      }
      const d = parsed.data;
      await prisma.partner.update({
        where: { id },
        data: {
          institutionName: d.institutionName,
          responsibleName: d.responsibleName,
          responsibleRole: d.responsibleRole,
          email: d.email,
          phone: d.phone,
          city: d.city,
          state: d.state,
          partnerType: d.partnerType,
          description: d.description,
          services: d.services,
          website: d.website || null,
          notes: d.notes || null,
        },
      });
      await recordAudit({
        actorId: admin.id,
        action: "PARTNER_EDIT",
        metadata: { partnerId: id },
      });
      return NextResponse.json({ ok: true });
    }

    default:
      return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
  }
}
