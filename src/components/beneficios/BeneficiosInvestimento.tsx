import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { investimento } from "@/data/beneficios";

const termos = [
  { label: "Contrato", value: "Parceria com duração de 1 ano" },
  { label: "Início previsto", value: investimento.inicio },
  { label: "Renovação", value: investimento.renovacao },
];

export function BeneficiosInvestimento() {
  return (
    <section id="investimento" className="section bg-surface">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Investimento"
            title="Investimento acessível para uma presença contínua."
            description="Uma participação enxuta e previsível, pensada para manter sua marca presente na rede ao longo de todo o ano."
          />

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {termos.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold-700">
                  {item.label}
                </dt>
                <dd className="text-sm font-medium text-ink sm:text-right">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="cmebe-card overflow-hidden">
          <div className="h-1 bg-gold-500" aria-hidden />
          <div className="p-6 sm:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Participação financeira
            </p>
            <p className="mt-3 font-display text-5xl font-semibold leading-none text-ink">
              {investimento.valorMensal}
              <span className="ml-1 align-baseline text-base font-medium text-muted">
                /mês
              </span>
            </p>

            <dl className="mt-6 grid gap-3">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <dt className="text-sm text-body">Plano anual</dt>
                <dd className="text-sm font-semibold text-ink">
                  {investimento.plano}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-body">Investimento total anual</dt>
                <dd className="font-display text-lg font-semibold text-ink">
                  {investimento.totalAnual}
                </dd>
              </div>
            </dl>

            <Link href="#proposta" className="btn btn-primary mt-7 w-full">
              Quero ser parceiro
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
