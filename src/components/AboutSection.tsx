import Image from "next/image";

import { institution, ministerialFunctions } from "@/data/institution";
import { SectionHeading } from "@/components/SectionHeading";

const facts = [
  { label: "Fundação", value: institution.foundedAt },
  { label: "Presidente", value: institution.president },
  { label: "Sede", value: "Sepetiba, Rio de Janeiro – RJ" },
  { label: "CNPJ", value: institution.cnpj },
];

export function AboutSection() {
  return (
    <section id="sobre" className="section border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-md border border-line shadow-[0_18px_48px_rgba(12,35,72,0.12)]">
            <Image
              src="/images/sobre-conselho.jpg"
              alt="Cerimônia institucional do CMEBE com a diretoria e ministros à mesa de honra"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover object-top"
            />
          </figure>
          <p className="mt-3 text-xs text-muted">
            Cerimônia institucional do CMEBE — diretoria e ministros.
          </p>
        </div>

        <div>
          <SectionHeading
            eyebrow="Sobre o CMEBE"
            title="Um conselho para unir, reconhecer e fortalecer lideranças cristãs."
            description="O CMEBE nasceu para unir ministros evangélicos, fortalecer vocações e criar uma rede de apoio, capacitação e reconhecimento ministerial no Brasil e no exterior, promovendo comunhão, formação e suporte aos líderes que servem ao Reino de Deus."
          />

          <dl className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {facts.map((item) => (
              <div key={item.label} className="border-b border-line pb-3">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold-700">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 font-display text-lg font-semibold text-ink">
            Lideranças contempladas
          </h3>
          <p className="mt-2 text-sm leading-7 text-body">
            Voltado a líderes evangélicos de ambos os sexos, respeitando as
            peculiaridades de cada denominação e incentivando a cooperação para o
            crescimento do Reino de Deus.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ministerialFunctions.map((role) => (
              <span
                key={role}
                className="rounded-md border border-line bg-paper px-3 py-1.5 text-sm font-medium text-brand-800"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
