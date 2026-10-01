import Image from "next/image";
import { Check, FileBadge2 } from "lucide-react";

import { benefits } from "@/data/benefits";
import { SectionHeading } from "@/components/SectionHeading";

export function BenefitsSection() {
  return (
    <section id="beneficios" className="section bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Benefícios"
            title="Benefícios da filiação"
            description="A filiação reúne credenciais, certificados e formação ministerial, organizados para oferecer reconhecimento, preparo e documentação ao ministro filiado."
          />

          <figure className="mt-6 overflow-hidden rounded-md border border-line shadow-[0_14px_40px_rgba(12,35,72,0.12)]">
            <Image
              src="/images/beneficios-certificado.jpg"
              alt="Certificado oficial de Capelania Cristã emitido pelo CMEBE, assinado pela diretoria"
              width={1200}
              height={675}
              sizes="(max-width: 1024px) 100vw, 460px"
              className="h-auto w-full"
            />
            <figcaption className="bg-paper px-4 py-2.5 text-xs text-muted">
              Certificado oficial de Capelania Cristã emitido pelo CMEBE.
            </figcaption>
          </figure>

          <div className="mt-6 flex items-start gap-3 rounded-md border border-gold-300 bg-[#fdf9ee] p-4 text-brand-900">
            <FileBadge2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" aria-hidden />
            <p className="text-sm leading-7">
              Credenciais e certificados dependem da validação documental e dos
              critérios internos do conselho.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="flex gap-4 py-5">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-300 text-gold-600">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm leading-7 text-body">{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
