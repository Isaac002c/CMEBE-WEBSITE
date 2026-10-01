import Link from "next/link";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";
import type { Prisma } from "@prisma/client";

import { DashboardHeader } from "@/components/account/DashboardHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { prisma } from "@/lib/db";
import {
  AFFILIATION_STATUSES,
  STATUS_LABELS,
  isAffiliationStatus,
} from "@/lib/constants";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Painel do conselho | CMEBE" };

type SearchParams = Promise<{ q?: string; status?: string }>;

export default async function MasterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar?next=/master");
  if (user.role !== "MASTER") redirect("/minha-filiacao");

  const { q, status } = await searchParams;
  const query = (q ?? "").trim();
  const statusFilter = status && isAffiliationStatus(status) ? status : undefined;

  const grouped = await prisma.affiliateProfile.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const countBy: Record<string, number> = {};
  for (const g of grouped) countBy[g.status] = g._count._all;

  const where: Prisma.AffiliateProfileWhereInput = {};
  if (statusFilter) where.status = statusFilter;
  if (query) {
    where.OR = [
      { city: { contains: query } },
      { state: { contains: query } },
      { ministerialRole: { contains: query } },
      { church: { contains: query } },
      { user: { is: { name: { contains: query } } } },
      { user: { is: { email: { contains: query } } } },
    ];
  }

  const requests = await prisma.affiliateProfile.findMany({
    where,
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const stats = [
    { label: "Pendentes", value: countBy.PENDING ?? 0, status: "PENDING" },
    { label: "Em análise", value: (countBy.UNDER_REVIEW ?? 0) + (countBy.DOCUMENTS_REQUESTED ?? 0), status: "UNDER_REVIEW" },
    { label: "Aprovados", value: countBy.APPROVED ?? 0, status: "APPROVED" },
    { label: "Reprovados", value: countBy.REJECTED ?? 0, status: "REJECTED" },
    { label: "Suspensos", value: countBy.SUSPENDED ?? 0, status: "SUSPENDED" },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader title="Painel do conselho" email={user.email} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="cmebe-eyebrow">Administração CMEBE</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Solicitações de filiação
        </h1>

        {/* Dashboard */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={`/master?status=${stat.status}`}
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
              placeholder="Nome, e-mail, cidade, estado ou função"
              className="field pl-9"
            />
          </label>
          <select name="status" defaultValue={statusFilter ?? ""} className="field">
            <option value="">Todos os status</option>
            {AFFILIATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            Filtrar
          </button>
        </form>

        {/* Lista */}
        <div className="mt-6 overflow-hidden rounded-md border border-line bg-surface">
          {requests.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted">
              Nenhuma solicitação encontrada.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {requests.map((req) => (
                <li key={req.id}>
                  <Link
                    href={`/master/${req.id}`}
                    className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-paper"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{req.user.name}</p>
                      <p className="mt-0.5 truncate text-sm text-muted">
                        {req.ministerialRole} · {req.city}/{req.state} · {req.user.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {req.publicVisible ? (
                        <span className="text-xs font-medium text-emerald-700">Público</span>
                      ) : null}
                      <StatusBadge status={req.status} />
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
