import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { AdminPartnerActions } from "@/components/partners/AdminPartnerActions";
import { PartnerStatusBadge } from "@/components/partners/PartnerStatusBadge";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Detalhe do parceiro | CMEBE" };

export default async function AdminPartnerDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar?next=/admin");
  if (user.role !== "ADMIN" && user.role !== "MASTER") redirect("/minha-filiacao");

  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  const dateFmt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" });

  const rows: { label: string; value: string }[] = [
    { label: "Responsável", value: partner.responsibleName },
    { label: "Cargo/função", value: partner.responsibleRole },
    { label: "E-mail", value: partner.email },
    { label: "Telefone/WhatsApp", value: partner.phone },
    { label: "Cidade/Estado", value: `${partner.city}/${partner.state}` },
    { label: "Tipo de parceiro", value: partner.partnerType },
    { label: "Site/rede social", value: partner.website || "—" },
    { label: "Cadastrado em", value: dateFmt.format(partner.createdAt) },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader title="Painel de associados" email={user.email} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-body transition hover:text-brand-800">
          <ArrowLeft className="h-4 w-4" />
          Voltar às solicitações
        </Link>

        <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {partner.institutionName}
            </h1>
            <p className="mt-1 text-sm text-muted">{partner.partnerType}</p>
          </div>
          <PartnerStatusBadge status={partner.status} />
        </div>

        {partner.status === "REJECTED" && partner.rejectionReason ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span className="font-semibold">Motivo da recusa: </span>
            {partner.rejectionReason}
          </p>
        ) : null}

        {/* Dados */}
        <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label} className="bg-surface px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{row.label}</dt>
              <dd className="mt-1 break-words text-sm text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Descrição</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-body">{partner.description}</p>
          </div>
          <div className="rounded-md border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Serviços oferecidos</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-body">{partner.services}</p>
          </div>
        </div>

        {partner.notes ? (
          <div className="mt-4 rounded-md border border-line bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Observações</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-body">{partner.notes}</p>
          </div>
        ) : null}

        {/* Ações do admin */}
        <div className="mt-8 rounded-md border border-line bg-surface p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-ink">Ações</h2>
          <div className="mt-4">
            <AdminPartnerActions
              partner={{
                id: partner.id,
                institutionName: partner.institutionName,
                responsibleName: partner.responsibleName,
                responsibleRole: partner.responsibleRole,
                email: partner.email,
                phone: partner.phone,
                city: partner.city,
                state: partner.state,
                partnerType: partner.partnerType,
                description: partner.description,
                services: partner.services,
                website: partner.website,
                notes: partner.notes,
                status: partner.status,
                active: partner.active,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
