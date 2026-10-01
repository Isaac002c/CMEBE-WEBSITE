import { PARTNER_STATUS_LABELS, type PartnerStatus } from "@/lib/constants";

const STYLES: Record<PartnerStatus, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-800",
  APPROVED: "border-emerald-200 bg-emerald-50 text-emerald-800",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  NEGOTIATING: "border-blue-200 bg-blue-50 text-blue-800",
};

export function PartnerStatusBadge({ status }: { status: string }) {
  const key =
    (status as PartnerStatus) in PARTNER_STATUS_LABELS
      ? (status as PartnerStatus)
      : "PENDING";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STYLES[key]}`}
    >
      {PARTNER_STATUS_LABELS[key]}
    </span>
  );
}
