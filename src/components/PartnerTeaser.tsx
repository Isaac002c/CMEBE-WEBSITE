import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { beneficiosLink } from "@/data/institution";

// Ponte da home para a área comercial — convida empresas a conhecer o CMEBE
// Benefícios sem competir com o CTA de filiação (público diferente).
export function PartnerTeaser() {
  return (
    <section className="border-y border-line bg-paper">
      <div className="cmebe-rule-gold mx-auto h-px max-w-6xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <p className="cmebe-eyebrow">CMEBE Benefícios · Para empresas</p>
          <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            Sua empresa conectada à rede CMEBE.
          </h2>
          <p className="mt-3 text-base leading-7 text-body">
            Empresas de produtos e serviços podem ampliar sua visibilidade e
            oferecer benefícios à nossa rede de relacionamento cristã, ministerial
            e familiar.
          </p>
        </div>
        <div className="shrink-0">
          <Link href={beneficiosLink.href} className="btn btn-secondary">
            Conhecer o CMEBE Benefícios
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
