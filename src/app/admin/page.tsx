import Link from "next/link";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";
import type { Prisma } from "@prisma/client";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { PartnerStatusBadge } from "@/components/partners/PartnerStatusBadge";
import { prisma } from "@/lib/db";
import {
  PARTNER_STATUSES,
  PARTNER_STATUS_LABELS,
  isPartnerStatus,
} from "@/lib/constants";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Painel de associados | CMEBE" };

type SearchParams = Promise<{ q?: string; status?: string }>;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar?next=/admin");
  if (user.role !== "ADMIN" && user.role !== "MASTER") redirect("/minha-filiacao");

  const { q, status } = await searchParams;
  const query = (q ?? "").trim();
  const statusFilter = status && isPartnerStatus(status) ? status : undefined;

  const grouped = await prisma.partner.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const countBy: Record<string, number> = {};
  for (const g of grouped) countBy[g.status] = g._count._all;

  const where: Prisma.PartnerWhereInput = {};
  if (statusFilter) where.status = statusFilter;
  if (query) {
    where.OR = [
      { institutionName: { contains: query, mode: "insensitive" } },
      { responsibleName: { contains: query, mode: "insensitive" } },
      { city: { contains: query, mode: "insensitive" } },
      { state: { contains: query, mode: "insensitive" } },
      { partnerType: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
    ];
  }

  const partners = await prisma.partner.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const stats = [
    { label: "Pendentes", value: countBy.PENDING ?? 0, status: "PENDING" },
    { label: "Em negociação", value: countBy.NEGOTIATING ?? 0, status: "NEGOTIATING" },
    { label: "Aprovados", value: countBy.APPROVED ?? 0, status: "APPROVED" },
    { label: "Recusados", value: countBy.REJECTED ?? 0, status: "REJECTED" },
  ];

  const dateFmt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" });

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader title="Painel de associados" email={user.email} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="cmebe-eyebrow">Administração · CMEBE Benefícios</p>
            <h1 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Solicitações de parceria
            </h1>
          </div>
          <Link href="/admin/perfil" className="btn btn-secondary h-10 px-4 text-sm">
            Meu perfil
          </Link>
        </div>

        {/* Dashboard */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={`/admin?status=${stat.status}`}
              className="cmebe-card cmebe-card-hover p-4"
            >
              <p className="text-3xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-muted">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Filtros */}
        <form method="get" className="mt-8 grid gap-3 sm:grid-cols-[1fr_220px_auto]">
          <label className="relative block">
            <span className="sr-only">Buscar</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              name="q"
              defaultValue={query}
              placeholder="Instituição, responsável, cidade, tipo ou e-mail"
              className="field pl-9"
            />
          </label>
          <select name="status" defaultValue={statusFilter ?? ""} className="field">
            <option value="">Todos os status</option>
            {PARTNER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {PARTNER_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            Filtrar
          </button>
        </form>

        {/* Lista */}
        <div className="mt-6 overflow-hidden rounded-md border border-line bg-surface">
          {partners.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted">
              Nenhuma solicitação encontrada.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {partners.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/admin/${p.id}`}
                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-paper"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{p.institutionName}</p>
                      <p className="mt-0.5 truncate text-sm text-muted">
                        {p.partnerType} · {p.city}/{p.state} · {p.responsibleName}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden text-xs text-muted sm:inline">
                        {dateFmt.format(p.createdAt)}
                      </span>
                      {!p.active && p.status === "APPROVED" ? (
                        <span className="text-xs font-medium text-zinc-500">Inativo</span>
                      ) : null}
                      <PartnerStatusBadge status={p.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
