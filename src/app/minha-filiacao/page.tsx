import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertTriangle, Check, Eye, EyeOff, FileText, MessageCircle } from "lucide-react";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { ProfileEditForm } from "@/components/account/ProfileEditForm";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/db";
import {
  STATUS_DESCRIPTIONS,
  STATUS_STEP,
  type AffiliationStatus,
} from "@/lib/constants";
import { getCurrentUser } from "@/lib/session";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { institution } from "@/data/institution";
import { createNoIndexMetadata } from "@/data/seo";

export const dynamic = "force-dynamic";
export const metadata = createNoIndexMetadata(
  "Minha filiação",
  "/minha-filiacao",
);

const STEPS = ["Solicitação enviada", "Em análise", "Resultado"];

export default async function MyAffiliationPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar?next=/minha-filiacao");
  if (user.role === "MASTER") redirect("/master");

  const profile = await prisma.affiliateProfile.findUnique({
    where: { userId: user.id },
    include: {
      documentRequests: { orderBy: { createdAt: "desc" } },
      user: { select: { name: true, phone: true } },
    },
  });

  if (!profile) {
    redirect("/cadastro");
  }

  const status = profile.status as AffiliationStatus;
  const step = STATUS_STEP[status] ?? 1;
  const isApproved = status === "APPROVED";

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader title="Minha filiação" email={user.email} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="cmebe-eyebrow">Olá, {user.name.split(" ")[0]}</p>
            <h1 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Acompanhe sua solicitação
            </h1>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Status atual */}
        <section className="cmebe-card mt-6 p-6">
          <p className="text-sm leading-7 text-body">{STATUS_DESCRIPTIONS[status]}</p>

          {/* Stepper */}
          <ol className="mt-6 grid grid-cols-3 gap-2">
            {STEPS.map((label, index) => {
              const reached = index + 1 <= step || (index === 0 && step >= 1);
              const done = index + 1 < step || (index === 2 && step >= 3);
              return (
                <li key={label} className="flex flex-col gap-2">
                  <div
                    className={`h-1.5 rounded-full ${reached ? "bg-brand-700" : "bg-line"}`}
                  />
                  <span className="flex items-center gap-1.5 text-xs font-medium text-body">
                    {done ? <Check className="h-3.5 w-3.5 text-brand-700" /> : null}
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Motivo de reprovação */}
        {status === "REJECTED" && profile.rejectionReason ? (
          <section className="mt-4 rounded-md border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden />
              <div>
                <h2 className="text-sm font-semibold text-red-800">Motivo da reprovação</h2>
                <p className="mt-1 text-sm leading-7 text-red-700">{profile.rejectionReason}</p>
              </div>
            </div>
          </section>
        ) : null}

        {/* Documentos solicitados */}
        {profile.documentRequests.length > 0 ? (
          <section className="cmebe-card mt-4 p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <FileText className="h-5 w-5 text-gold-600" aria-hidden />
              Documentos solicitados
            </h2>
            <ul className="mt-4 space-y-3">
              {profile.documentRequests.map((doc) => (
                <li key={doc.id} className="rounded-md border border-line bg-paper p-4">
                  <p className="text-sm leading-7 text-body">{doc.message}</p>
                  <p className="mt-1 text-xs text-muted">
                    Solicitado em {doc.createdAt.toLocaleDateString("pt-BR")}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-body">
              Envie os documentos pelo nosso WhatsApp de suporte.
            </p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Link
                href={buildWhatsappUrl("Olá, gostaria de enviar os documentos solicitados para minha filiação no CMEBE.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary h-10 px-4 text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar documentos via WhatsApp
              </Link>
              <Link href="/credenciais#documentos" className="btn btn-secondary h-10 px-4 text-sm">
                <FileText className="h-4 w-4" />
                Ver orientações
              </Link>
            </div>
          </section>
        ) : null}

        {/* Visibilidade pública */}
        <section className="cmebe-card mt-4 flex items-start gap-3 p-6">
          {isApproved && profile.publicVisible && profile.consentPublicDisplay ? (
            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
          ) : (
            <EyeOff className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden />
          )}
          <div>
            <h2 className="text-sm font-semibold text-ink">Visibilidade pública</h2>
            <p className="mt-1 text-sm leading-7 text-body">
              {isApproved && profile.publicVisible && profile.consentPublicDisplay
                ? "Seu perfil está visível na área pública de filiados."
                : !profile.consentPublicDisplay
                  ? "Seu perfil não aparece publicamente porque a exibição pública não está autorizada por você (ajuste abaixo)."
                  : "Seu perfil ainda não está visível publicamente. A exibição depende da aprovação e da autorização do conselho."}
            </p>
            {profile.membershipNumber ? (
              <p className="mt-2 text-sm">
                <span className="font-medium text-ink">Número de filiação:</span>{" "}
                {profile.membershipNumber}
              </p>
            ) : null}
          </div>
        </section>

        {/* Dados cadastrais (edição) */}
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-ink">Meus dados</h2>
          <p className="mt-1 text-sm text-body">
            Atualize seus dados permitidos. O status da filiação só pode ser
            alterado pelo conselho.
          </p>
          <div className="cmebe-card mt-4 p-6 sm:p-8">
            <ProfileEditForm
              initial={{
                name: profile.user.name,
                phone: profile.user.phone,
                city: profile.city,
                state: profile.state,
                ministerialRole: profile.ministerialRole,
                church: profile.church,
                presentation: profile.presentation ?? "",
                consentPublicDisplay: profile.consentPublicDisplay,
              }}
            />
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-muted">
          Suporte: {institution.phone}
        </p>
      </main>
    </div>
  );
}
