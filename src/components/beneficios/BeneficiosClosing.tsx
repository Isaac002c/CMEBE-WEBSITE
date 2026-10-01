import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { partnership } from "@/data/beneficios";
import { buildWhatsappUrlFor, partnerMessage } from "@/lib/whatsapp";

export function BeneficiosClosing() {
  return (
    <section className="band-navy relative overflow-hidden">
      <div className="cmebe-rule-gold absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <p className="cmebe-eyebrow on-dark is-center">Vamos conversar</p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Ainda com dúvidas sobre a parceria?
        </h2>
        <p className="mt-4 text-base leading-8 text-brand-100">
          Fale diretamente com {partnership.responsavel}, responsável pelo CMEBE
          Benefícios, e entenda como sua empresa pode participar.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={buildWhatsappUrlFor(partnership.whatsappNumber, partnerMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Falar pelo WhatsApp
          </Link>
          <Link href="#proposta" className="btn btn-ghost-light">
            Preencher o formulário
          </Link>
        </div>
      </div>
    </section>
  );
}
