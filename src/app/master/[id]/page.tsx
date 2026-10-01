import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { MasterActions } from "@/components/master/MasterActions";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Solicitação | Painel CMEBE" };

const ACTION_LABELS: Record<string, string> = {
  APPROVE: "Aprovou a filiação",
  REJECT: "Reprovou a filiação",
  REQUEST_DOCS: "Solicitou documentos",
  SET_UNDER_REVIEW: "Marcou em análise",
  SUSPEND: "Suspendeu a filiação",
  REACTIVATE: "Reativou a filiação",
  SET_VISIBILITY: "Alterou a visibilidade pública",
};

export default async function MasterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar?next=/master");
  if (user.role !== "MASTER") redirect("/minha-filiacao");

  const { id } = await params;

  const profile = await prisma.affiliateProfile.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, phone: true, createdAt: true } },
      documentRequests: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!profile) notFound();

  const audit = await prisma.auditLog.findMany({
    where: { targetUserId: profile.user.id },
    include: { actor: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  const fields: { label: string; value: string }[] = [
    { label: "Nome", value: profile.user.name },
    { label: "E-mail", value: profile.user.email },
    { label: "Telefone", value: profile.user.phone || "—" },
    { label: "Função ministerial", value: profile.ministerialRole },
    { label: "Igreja/Ministério", value: profile.church },
    { label: "Cidade/Estado", value: `${profile.city}/${profile.state}` },
    { label: "Nº de filiação", value: profile.membershipNumber || "—" },
    { label: "Consent. privacidade", value: profile.consentPrivacy ? "Sim" : "Não" },
    { label: "Consent. exibição pública", value: profile.consentPublicDisplay ? "Sim" : "Não" },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader title="Painel do conselho" email={user.email} homeHref="/master" />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/master" className="inline-flex items-center gap-1.5 text-sm font-medium text-body transition hover:text-brand-800">
          <ArrowLeft className="h-4 w-4" />
          Voltar para a lista
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {profile.user.name}
          </h1>
          <StatusBadge status={profile.status} />
        </div>

        {/* Dados do solicitante */}
        <section className="cmebe-card mt-6 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Dados do solicitante</h2>
          <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.label} className="grid grid-cols-[150px_1fr] gap-2 border-b border-line pb-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{f.label}</dt>
                <dd className="text-sm text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          {profile.presentation ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Apresentação</p>
              <p className="mt-1 text-sm leading-7 text-body">{profile.presentation}</p>
            </div>
          ) : null}
          {profile.rejectionReason ? (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Motivo da reprovação</p>
              <p className="mt-1 text-sm leading-7 text-red-700">{profile.rejectionReason}</p>
            </div>
          ) : null}
        </section>

        {/* Ações */}
        <section className="cmebe-card mt-4 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Ações</h2>
          <p className="mt-1 text-sm text-body">
            As decisões abaixo são registradas em auditoria.
          </p>
          <div className="mt-4">
            <MasterActions
              profileId={profile.id}
              status={profile.status}
              publicVisible={profile.publicVisible}
              consentPublicDisplay={profile.consentPublicDisplay}
            />
          </div>
        </section>

        {/* Documentos solicitados */}
        {profile.documentRequests.length > 0 ? (
          <section className="cmebe-card mt-4 p-6">
            <h2 className="font-display text-lg font-semibold text-ink">Documentos solicitados</h2>
            <ul className="mt-3 space-y-2">
              {profile.documentRequests.map((doc) => (
                <li key={doc.id} className="rounded-md border border-line bg-paper p-3 text-sm text-body">
                  {doc.message}
                  <span className="mt-1 block text-xs text-muted">
                    {doc.createdAt.toLocaleString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Histórico de auditoria */}
        <section className="cmebe-card mt-4 p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Histórico de ações</h2>
          {audit.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nenhuma ação registrada ainda.</p>
          ) : (
            <ol className="mt-4 space-y-3">
              {audit.map((entry) => (
                <li key={entry.id} className="border-l-2 border-brand-200 pl-4">
                  <p className="text-sm font-medium text-ink">
                    {ACTION_LABELS[entry.action] ?? entry.action}
                  </p>
                  <p className="text-xs text-muted">
                    por {entry.actor.name} · {entry.createdAt.toLocaleString("pt-BR")}
                  </p>
                  {entry.reason ? (
                    <p className="mt-1 text-sm text-body">“{entry.reason}”</p>
                  ) : null}
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
    </div>
  );
}
