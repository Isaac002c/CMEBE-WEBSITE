import Link from "next/link";
import { BadgeCheck, IdCard, MapPin } from "lucide-react";

import type { Affiliate } from "@/data/affiliates";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type AffiliateCardProps = {
  affiliate: Affiliate;
};

export function AffiliateCard({ affiliate }: AffiliateCardProps) {
  const validationMessage = `Olá, gostaria de validar a filiação ${affiliate.membershipNumber} no CMEBE.`;

  return (
    <article className="premium-shadow rounded-lg border border-[#d9e5f5] bg-white p-5 transition hover:-translate-y-1 hover:border-[#c99a2e]">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#163c78] text-lg font-black text-[#f2dc99]">
          {affiliate.initials}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-[#102b5c]">{affiliate.name}</h3>
          <p className="mt-1 text-sm font-semibold text-[#b88924]">{affiliate.role}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
            <MapPin className="h-4 w-4 shrink-0" />
            {affiliate.city}/{affiliate.state}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-zinc-700">
        <p>
          <span className="font-semibold text-[#102b5c]">Igreja/Ministério:</span>{" "}
          {affiliate.church}
        </p>
        <p className="flex items-center gap-2">
          <IdCard className="h-4 w-4 text-[#b88924]" />
          <span className="font-semibold text-[#102b5c]">Nº:</span>{" "}
          {affiliate.membershipNumber}
        </p>
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
          <BadgeCheck className="h-4 w-4" />
          {affiliate.status}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href={buildWhatsappUrl(validationMessage)}
          target="_blank"
          className="blue-button inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-bold transition"
        >
          Validar filiação
        </Link>
        <Link
          href={buildWhatsappUrl(validationMessage)}
          target="_blank"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[#d9e5f5] px-4 text-sm font-bold text-[#102b5c] transition hover:border-[#c99a2e] hover:text-[#a87518]"
        >
          Ver credencial
        </Link>
      </div>
    </article>
  );
}
