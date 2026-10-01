import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { institution } from "@/data/institution";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export function FloatingWhatsapp() {
  return (
    <Link
      href={buildWhatsappUrl("Olá, gostaria de falar com o CMEBE.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com o CMEBE pelo WhatsApp ${institution.phone}`}
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-brand-900 px-3.5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(8,26,53,0.3)] transition hover:-translate-y-0.5 hover:bg-brand-800 sm:bottom-6 sm:right-6 sm:px-4"
    >
      <MessageCircle className="h-5 w-5 text-gold-300" aria-hidden />
      <span className="hidden sm:inline">{institution.phone}</span>
    </Link>
  );
}
