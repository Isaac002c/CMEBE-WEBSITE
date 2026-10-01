import { BadgeCheck, Building2, IdCard, MapPin } from "lucide-react";

import type { PublicAffiliate } from "@/lib/affiliates-public";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

export function AffiliateCard({ affiliate }: { affiliate: PublicAffiliate }) {
  return (
    <article className="cmebe-card cmebe-card-hover flex flex-col p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-800 font-display text-base font-semibold text-gold-300">
          {getInitials(affiliate.name)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-semibold text-ink">
            {affiliate.name}
          </h3>
          <p className="mt-0.5 text-sm font-medium text-gold-700">
            {affiliate.ministerialRole}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-body">
            <MapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden />
            {affiliate.city}/{affiliate.state}
          </p>
        </div>
      </div>

      {affiliate.church ? (
        <p className="mt-4 flex items-start gap-2 text-sm text-body">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
          <span>{affiliate.church}</span>
        </p>
      ) : null}

      <div className="mt-auto pt-4">
        {affiliate.membershipNumber ? (
          <p className="flex items-center gap-1.5 text-sm text-body">
            <IdCard className="h-4 w-4 text-gold-600" aria-hidden />
            <span className="font-medium text-ink">{affiliate.membershipNumber}</span>
          </p>
        ) : null}
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
          <BadgeCheck className="h-3.5 w-3.5 text-gold-600" aria-hidden />
          Filiado oficial CMEBE
        </p>
      </div>
    </article>
  );
}
