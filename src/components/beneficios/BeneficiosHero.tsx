import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { CmebeSeal } from "@/components/CmebeSeal";
import { partnership } from "@/data/beneficios";
import { buildWhatsappUrlFor, partnerMessage } from "@/lib/whatsapp";

const facts = [
  { label: "Rede", value: "≈ 2.000 pessoas" },
  { label: "Público", value: "Cristão selecionado" },
  { label: "Contrato", value: "1 ano · início 01/06/2026" },
];

export function BeneficiosHero() {
  return (
    <section id="inicio" className="band-navy relative overflow-hidden">
      <div className="cmebe-rule-gold absolute inset-x-0 top-0" />
      <div className="cmebe-rule-gold absolute inset-x-0 bottom-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-20">
        <div>
          <p className="cmebe-eyebrow on-dark">
            CMEBE Benefícios · Parcerias comerciais
          </p>

          <h1 className="mt-5 font-display text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]">
            CMEBE Benefícios
          </h1>

          <p className="mt-4 font-display text-xl font-medium text-gold-300 sm:text-2xl">
            Parcerias que fortalecem empresas e a nossa rede.
          </p>

          <p className="mt-5 max-w-xl text-base leading-7 text-brand-100 sm:text-lg sm:leading-8">
            O CMEBE apresenta uma oportunidade para empresas que desejam ampliar
            sua visibilidade, fortalecer sua marca e gerar novas oportunidades por
            meio de uma rede cristã ativa, ministerial e familiar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#proposta" className="btn btn-gold">
              Quero ser parceiro
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={buildWhatsappUrlFor(partnership.whatsappNumber, partnerMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Falar com o CMEBE
            </Link>
          </div>

          <p className="mt-6 text-sm text-brand-100">
            Responsável:{" "}
            <span className="font-semibold text-white">{partnership.responsavel}</span>{" "}
            · 1º Vice-Presidente – CMEBE
          </p>
        </div>

        <div className="relative">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-white/15 bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
            {facts.map((item) => (
              <div key={item.label} className="band-navy-deep px-5 py-4">
                <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
                  {item.label}
                </dt>
                <dd className="mt-1 text-base font-semibold text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 hidden justify-end lg:flex">
            <CmebeSeal tone="dark" className="w-24" />
          </div>
        </div>
      </div>
    </section>
  );
}
