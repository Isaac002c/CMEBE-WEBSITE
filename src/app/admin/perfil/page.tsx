import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { AccountSettings } from "@/components/account/AccountSettings";
import { DashboardHeader } from "@/components/account/DashboardHeader";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Meu perfil | Admin CMEBE" };

export default async function AdminPerfilPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar?next=/admin/perfil");
  if (user.role !== "ADMIN" && user.role !== "MASTER") redirect("/minha-filiacao");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { name: true, email: true, phone: true, role: true },
  });
  if (!dbUser) redirect("/entrar");

  const roleLabel =
    dbUser.role === "MASTER"
      ? "Master · CMEBE"
      : "Administrador · Vice-presidência CMEBE";

  return (
    <div className="min-h-screen bg-paper">
      <DashboardHeader title="Painel do conselho" email={user.email} homeHref="/admin" />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-body transition hover:text-brand-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao painel
        </Link>

        <div className="mt-4 flex items-center gap-4 rounded-md border border-line bg-surface p-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-white">
            <ShieldCheck className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {dbUser.name}
            </h1>
            <p className="mt-0.5 text-sm font-medium text-gold-700">{roleLabel}</p>
          </div>
        </div>

        <div className="mt-6">
          <AccountSettings
            initial={{ name: dbUser.name, email: dbUser.email, phone: dbUser.phone }}
          />
        </div>
      </main>
    </div>
  );
}
