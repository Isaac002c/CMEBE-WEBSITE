import { Briefcase, Globe, MapPin, MessageCircle, Tag } from "lucide-react";

import type { PublicPartner } from "@/lib/partners-public";
import { buildWhatsappUrlFor, toWhatsappNumber } from "@/lib/whatsapp";

function normalizeWebsite(url: string): { href: string; label: string } {
  const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  const label = url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  return { href, label };
}

export function PartnerCard({ partner }: { partner: PublicPartner }) {
  const wa = toWhatsappNumber(partner.phone);
  const waUrl = wa
    ? buildWhatsappUrlFor(
        wa,
        `Olá! Encontrei ${partner.institutionName} na área de associados do CMEBE e gostaria de mais informações.`,
      )
    : null;
  const site = partner.website ? normalizeWebsite(partner.website) : null;

  return (
    <article className="cmebe-card cmebe-card-hover flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {partner.institutionName}
        </h3>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted">
        <span className="inline-flex items-center gap-1">
          <Tag className="h-3.5 w-3.5 text-gold-600" aria-hidden />
          {partner.partnerType}
        </span>
        {partner.businessSegment ? (
          <span className="inline-flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-gold-600" aria-hidden />
            {partner.businessSegment}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-gold-600" aria-hidden />
          {partner.city}/{partner.state}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-body">
        {partner.description}
      </p>

      {partner.services ? (
        <p className="mt-3 text-sm leading-6 text-body">
          <span className="font-semibold text-ink">Serviços: </span>
          <span className="line-clamp-2">{partner.services}</span>
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
        {waUrl ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary h-10 px-4 text-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Contato
          </a>
        ) : null}
        {site ? (
          <a
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary h-10 px-4 text-sm"
          >
            <Globe className="h-4 w-4" aria-hidden />
            <span className="max-w-[160px] truncate">{site.label}</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
