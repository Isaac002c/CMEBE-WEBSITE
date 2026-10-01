import { prisma } from "@/lib/db";

export type AuditAction =
  | "APPROVE"
  | "REJECT"
  | "REQUEST_DOCS"
  | "SUSPEND"
  | "REACTIVATE"
  | "SET_VISIBILITY"
  | "SET_UNDER_REVIEW"
  // Ações sobre associados/parceiros (painel do ADMIN):
  | "PARTNER_APPROVE"
  | "PARTNER_REJECT"
  | "PARTNER_NEGOTIATE"
  | "PARTNER_ACTIVATE"
  | "PARTNER_DEACTIVATE"
  | "PARTNER_EDIT";

export type AuditInput = {
  actorId: string;
  action: AuditAction;
  targetUserId?: string;
  fromStatus?: string | null;
  toStatus?: string | null;
  reason?: string | null;
  metadata?: Record<string, unknown>;
};

/** Registra uma ação administrativa para fins de auditoria. */
export async function recordAudit(input: AuditInput): Promise<void> {
  await prisma.auditLog.create({
    data: {
      actorId: input.actorId,
      action: input.action,
      targetUserId: input.targetUserId ?? null,
      fromStatus: input.fromStatus ?? null,
      toStatus: input.toStatus ?? null,
      reason: input.reason ?? null,
      metadata: input.metadata ? JSON.stringify(input.metadata) : null,
    },
  });
}
