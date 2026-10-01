import { STATUS_LABELS, type AffiliationStatus } from "@/lib/constants";

const STYLES: Record<AffiliationStatus, string> = {
  DRAFT: "border-zinc-200 bg-zinc-50 text-zinc-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-800",
  UNDER_REVIEW: "border-blue-200 bg-blue-50 text-blue-800",
  DOCUMENTS_REQUESTED: "border-orange-200 bg-orange-50 text-orange-800",
  APPROVED: "border-emerald-200 bg-emerald-50 text-emerald-800",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  SUSPENDED: "border-zinc-300 bg-zinc-100 text-zinc-700",
};

export function StatusBadge({ status }: { status: string }) {
  const key = (status as AffiliationStatus) in STATUS_LABELS ? (status as AffiliationStatus) : "PENDING";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${STYLES[key]}`}
    >
      {STATUS_LABELS[key]}
    </span>
  );
}
