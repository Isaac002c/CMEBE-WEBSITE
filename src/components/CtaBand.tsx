import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { buildWhatsappUrl, joinMessage } from "@/lib/whatsapp";

// Faixa final de chamada à filiação, com foto real de fundo e overlay azul-marinho.
export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/cta-comunhao.jpg"
        alt="Líderes do CMEBE em momento de comunhão durante evento de capelania"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-brand-950/85" />
      <div className="cmebe-rule-gold absolute inset-x-0 top-0" />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-24">
        <p className="cmebe-eyebrow on-dark is-center">Filie-se ao CMEBE</p>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Faça parte de uma rede ministerial séria e comprometida com o Reino.
        </h2>
        <p className="mt-4 text-base leading-8 text-brand-100">
          Crie sua conta, envie sua solicitação e acompanhe a análise do conselho.
          Reconhecimento, formação e comunhão entre líderes do Brasil e do exterior.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/cadastro" className="btn btn-gold">
            Iniciar solicitação de filiação
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={buildWhatsappUrl(joinMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-light"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
