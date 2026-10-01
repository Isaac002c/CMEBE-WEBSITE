import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { institution } from "@/data/institution";

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "lg";
};

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  maxWidth = "sm",
}: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-line bg-white/90">
        <div className="h-[3px] bg-[linear-gradient(90deg,#163c78_0%,#c99a2e_50%,#163c78_100%)]" />
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Ir para o início">
            <Image
              src={institution.logo}
              alt="Logo do CMEBE"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-line object-cover"
            />
            <span className="font-display text-lg font-semibold tracking-wide text-ink">
              {institution.shortName}
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-body transition hover:text-brand-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className={maxWidth === "lg" ? "w-full max-w-2xl" : "w-full max-w-md"}>
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-sm leading-7 text-body">{subtitle}</p>
            ) : null}
          </div>
          <div className="cmebe-card p-6 sm:p-8">{children}</div>
          {footer ? (
            <p className="mt-5 text-center text-sm text-body">{footer}</p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
