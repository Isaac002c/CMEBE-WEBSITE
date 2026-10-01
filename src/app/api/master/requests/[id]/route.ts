import { NextResponse } from "next/server";

import { recordAudit } from "@/lib/audit";
import { prisma } from "@/lib/db";
import {
  emailApproved,
  emailDocumentsRequested,
  emailRejected,
  emailSuspended,
} from "@/lib/email";
import { generateMembershipNumber } from "@/lib/membership";
import { requireMasterApi } from "@/lib/rbac";
import {
  flattenZodErrors,
  rejectSchema,
  requestDocsSchema,
  visibilitySchema,
} from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  // 1) Autorização SEMPRE no servidor. Só MASTER passa daqui.
  const guard = await requireMasterApi();
  if ("response" in guard) return guard.response;
  const master = guard.user;

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

  const profile = await prisma.affiliateProfile.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
  if (!profile) {
    return NextResponse.json({ error: "Solicitação não encontrada." }, { status: 404 });
  }

  const from = profile.status;
  const targetUserId = profile.user.id;
  const targetUser = profile.user;
  const now = new Date();

  switch (action) {
    case "approve": {
      const membershipNumber =
        profile.membershipNumber ?? (await generateMembershipNumber());
      await prisma.affiliateProfile.update({
        where: { id },
        data: {
          status: "APPROVED",
          rejectionReason: null,
          membershipNumber,
          reviewedById: master.id,
          reviewedAt: now,
        },
      });
      await recordAudit({
        actorId: master.id,
        action: "APPROVE",
        targetUserId,
        fromStatus: from,
        toStatus: "APPROVED",
        metadata: { membershipNumber },
      });
      await emailApproved(targetUser.email, targetUser.name, membershipNumber).catch(() => {});
      return NextResponse.json({ ok: true, status: "APPROVED", membershipNumber });
    }

    case "reject": {
      const parsed = rejectSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Motivo obrigatório.", fields: flattenZodErrors(parsed.error) },
          { status: 422 },
        );
      }
      await prisma.affiliateProfile.update({
        where: { id },
        data: {
          status: "REJECTED",
          rejectionReason: parsed.data.reason,
          publicVisible: false, // reprovado nunca aparece publicamente
          reviewedById: master.id,
          reviewedAt: now,
        },
      });
      await recordAudit({
        actorId: master.id,
        action: "REJECT",
        targetUserId,
        fromStatus: from,
        toStatus: "REJECTED",
        reason: parsed.data.reason,
      });
      await emailRejected(targetUser.email, targetUser.name, parsed.data.reason).catch(() => {});
      return NextResponse.json({ ok: true, status: "REJECTED" });
    }

    case "request-docs": {
      const parsed = requestDocsSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Mensagem obrigatória.", fields: flattenZodErrors(parsed.error) },
          { status: 422 },
        );
      }
      await prisma.$transaction([
        prisma.affiliateProfile.update({
          where: { id },
          data: { status: "DOCUMENTS_REQUESTED" },
        }),
        prisma.documentRequest.create({
          data: { profileId: id, message: parsed.data.message },
        }),
      ]);
      await recordAudit({
        actorId: master.id,
        action: "REQUEST_DOCS",
        targetUserId,
        fromStatus: from,
        toStatus: "DOCUMENTS_REQUESTED",
        reason: parsed.data.message,
      });
      await emailDocumentsRequested(targetUser.email, targetUser.name, parsed.data.message).catch(() => {});
      return NextResponse.json({ ok: true, status: "DOCUMENTS_REQUESTED" });
    }

    case "under-review": {
      await prisma.affiliateProfile.update({
        where: { id },
        data: { status: "UNDER_REVIEW" },
      });
      await recordAudit({
        actorId: master.id,
        action: "SET_UNDER_REVIEW",
        targetUserId,
        fromStatus: from,
        toStatus: "UNDER_REVIEW",
      });
      return NextResponse.json({ ok: true, status: "UNDER_REVIEW" });
    }

    case "suspend": {
      await prisma.affiliateProfile.update({
        where: { id },
        data: { status: "SUSPENDED", publicVisible: false },
      });
      await recordAudit({
        actorId: master.id,
        action: "SUSPEND",
        targetUserId,
        fromStatus: from,
        toStatus: "SUSPENDED",
      });
      await emailSuspended(targetUser.email, targetUser.name).catch(() => {});
      return NextResponse.json({ ok: true, status: "SUSPENDED" });
    }

    case "reactivate": {
      await prisma.affiliateProfile.update({
        where: { id },
        data: { status: "APPROVED", reviewedById: master.id, reviewedAt: now },
      });
      await recordAudit({
        actorId: master.id,
        action: "REACTIVATE",
        targetUserId,
        fromStatus: from,
        toStatus: "APPROVED",
      });
      return NextResponse.json({ ok: true, status: "APPROVED" });
    }

    case "visibility": {
      const parsed = visibilitySchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "Valor inválido." }, { status: 422 });
      }
      // Só é possível tornar público um perfil APROVADO.
      if (parsed.data.publicVisible && profile.status !== "APPROVED") {
        return NextResponse.json(
          { error: "Apenas perfis aprovados podem ser exibidos publicamente." },
          { status: 409 },
        );
      }
      await prisma.affiliateProfile.update({
        where: { id },
        data: { publicVisible: parsed.data.publicVisible },
      });
      await recordAudit({
        actorId: master.id,
        action: "SET_VISIBILITY",
        targetUserId,
        metadata: { publicVisible: parsed.data.publicVisible },
      });
      return NextResponse.json({ ok: true, publicVisible: parsed.data.publicVisible });
    }

    default:
      return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
  }
}
