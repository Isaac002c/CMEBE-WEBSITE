import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { createNoIndexMetadata } from "@/data/seo";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata = createNoIndexMetadata("Solicitar filiação", "/cadastro");

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(user.role === "MASTER" ? "/master" : "/minha-filiacao");
  }

  return (
    <AuthShell
      title="Solicitar filiação"
      subtitle="Crie sua conta para enviar a solicitação. Toda solicitação passa por análise do CMEBE antes da aprovação."
      maxWidth="lg"
      footer={
        <>
          Já tem conta?{" "}
          <Link href="/entrar" className="font-medium text-brand-800 underline underline-offset-2">
            Entrar
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
