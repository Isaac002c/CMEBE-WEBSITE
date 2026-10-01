import { FounderPortrait } from "@/components/FounderPortrait";
import { partnership } from "@/data/beneficios";

export function BeneficiosFundador() {
  return (
    <section className="section bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <FounderPortrait
            src={partnership.photo}
            alt={`${partnership.responsavel}, diretor administrativo do CMEBE e responsável pelo CMEBE Benefícios`}
          />
        </div>

        <div>
          <p className="cmebe-eyebrow">Liderança</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Uma rede construída com propósito e relacionamento.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-body sm:text-lg">
            O CMEBE nasce do compromisso de fortalecer líderes, famílias,
            ministérios e empresas que caminham com valores, propósito e visão de
            futuro.
          </p>

          <div className="mt-8 border-t border-line pt-5">
            <p className="font-display text-lg font-semibold text-ink">
              {partnership.responsavel}
            </p>
            <p className="mt-1 text-sm text-muted">{partnership.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
