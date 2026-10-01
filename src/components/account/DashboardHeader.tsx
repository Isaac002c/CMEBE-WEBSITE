import Image from "next/image";
import Link from "next/link";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { institution } from "@/data/institution";

type DashboardHeaderProps = {
  title: string;
  email: string;
  homeHref?: string;
};

export function DashboardHeader({ title, email, homeHref = "/" }: DashboardHeaderProps) {
  return (
    <header className="border-b border-line bg-white">
      <div className="h-[3px] bg-[linear-gradient(90deg,#163c78_0%,#c99a2e_50%,#163c78_100%)]" />
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={homeHref} className="flex items-center gap-3" aria-label="CMEBE">
          <Image
            src={institution.logo}
            alt="Logo do CMEBE"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-line object-cover"
          />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold text-ink">
              {title}
            </span>
            <span className="hidden text-xs text-muted sm:block">{email}</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden text-sm font-medium text-body transition hover:text-brand-800 sm:inline">
            Ver site
          </Link>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
