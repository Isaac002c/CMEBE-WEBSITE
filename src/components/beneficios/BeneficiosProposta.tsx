import { SectionHeading } from "@/components/SectionHeading";
import { PartnerForm } from "@/components/beneficios/PartnerForm";
import { partnership } from "@/data/beneficios";

export function BeneficiosProposta() {
  return (
    <section id="proposta" className="section bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Seja parceiro"
            title="Envie seu interesse de parceria"
            description="Preencha o formulário e nossa equipe entrará em contato para apresentar os próximos passos. Usamos seus dados apenas para esse contato."
          />

          <div className="mt-8 rounded-md border border-line bg-surface p-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold-700">
              Responsável pela parceria
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-ink">
              {partnership.responsavel}
            </p>
            <p className="mt-1 text-sm text-muted">{partnership.role}</p>
            <p className="mt-3 text-sm font-medium text-ink">{partnership.phone}</p>
          </div>
        </div>

        <div>
          <PartnerForm />
        </div>
      </div>
    </section>
  );
}
