import { MoveHorizontal } from "lucide-react";

export function CarouselHint({
  label = "Deslize para explorar",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-gold-700 sm:hidden ${className}`}
    >
      <MoveHorizontal className="h-4 w-4" aria-hidden />
      {label}
    </p>
  );
}
