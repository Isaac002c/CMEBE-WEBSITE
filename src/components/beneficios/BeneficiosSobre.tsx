import { Check } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { formasDivulgacao } from "@/data/beneficios";

export function BeneficiosSobre() {
  return (
    <section id="parceria" className="section bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Sobre a parceria"
            title="Uma parceria que gera conexão e oportunidades."
          />
          <div className="mt-6 space-y-4 text-base leading-8 text-body">
            <p>
              O CMEBE apresenta uma excelente oportunidade de parceria para
              empresas de produtos e serviços que desejam ampliar sua
              visibilidade, fortalecer sua marca e aumentar suas vendas através de
              um público segmentado e fidelizado.
            </p>
            <p>
              A parceria permite a divulgação de produtos e serviços, a oferta de
              benefícios especiais para associados, familiares e amigos e o
              fortalecimento da presença institucional da empresa dentro da rede
              CMEBE.
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-ink">
            Formas de divulgação
          </h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {formasDivulgacao.map((item) => (
              <li key={item.title} className="flex gap-3 py-4">
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-600"
                  aria-hidden
                />
                <span className="text-sm leading-7 text-body">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
