import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { createNoIndexMetadata } from "@/data/seo";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata = createNoIndexMetadata("Entrar", "/entrar");

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(user.role === "MASTER" ? "/master" : "/minha-filiacao");
  }

  return (
    <AuthShell
      title="Entrar"
      subtitle="Acesse sua conta para acompanhar sua solicitação de filiação."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="font-medium text-brand-800 underline underline-offset-2">
            Solicitar filiação
          </Link>
        </>
      }
    >
      <Suspense fallback={<div className="h-40" />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
