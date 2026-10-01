import { Target, Telescope } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { institution } from "@/data/institution";

const values = [
  "Fé",
  "Unidade",
  "Fraternidade",
  "Serviço",
  "Excelência",
  "Compromisso com o Reino",
  "Respeito denominacional",
];

const statements = [
  {
    icon: Target,
    title: "Missão",
    text: "Promover a união, formação, cuidado e fortalecimento de ministros evangélicos, respeitando as peculiaridades de cada denominação e incentivando a cooperação para o crescimento do Reino de Deus.",
  },
  {
    icon: Telescope,
    title: "Visão",
    text: "Ser uma referência nacional e internacional na união, capacitação e apoio aos ministros evangélicos.",
  },
];

export function HistorySection() {
  return (
    <section className="section bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="História e missão"
            title="Uma origem recente com propósito claro."
            description={`O CMEBE foi fundado em ${institution.foundedAt} para reunir ministros evangélicos do Brasil e do exterior em torno de uma missão comum: fortalecer a unidade, promover capacitação, apoiar ministérios e contribuir para o crescimento da Igreja.`}
          />

          <figure className="mt-8 border-l-2 border-gold-500 pl-5">
            <blockquote className="font-display text-2xl font-medium italic text-brand-800">
              “{institution.slogan}”
            </blockquote>
            <figcaption className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-gold-700">
              Lema institucional
            </figcaption>
          </figure>
        </div>

        <div className="grid gap-5">
          {statements.map((statement) => (
            <article key={statement.title} className="cmebe-card p-6">
              <statement.icon className="h-5 w-5 text-gold-600" aria-hidden />
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {statement.title}
              </h3>
              <p className="mt-2 leading-7 text-body">{statement.text}</p>
            </article>
          ))}

          <div className="cmebe-card p-6">
            <h3 className="font-display text-lg font-semibold text-ink">Valores</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {values.map((value) => (
                <span
                  key={value}
                  className="rounded-md border border-line bg-paper px-3 py-1.5 text-sm font-medium text-brand-800"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
