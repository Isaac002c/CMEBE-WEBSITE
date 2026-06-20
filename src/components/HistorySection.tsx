import { Flag, Target, Telescope } from "lucide-react";

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
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="História e missão"
              title="Uma origem recente com propósito claro."
              description={`O CMEBE foi fundado em ${institution.foundedAt} com o objetivo de reunir ministros evangélicos do Brasil e do exterior em torno de uma missão comum: fortalecer a unidade, promover capacitação, apoiar ministérios e contribuir para o crescimento espiritual e numérico da Igreja.`}
            />

            <div className="premium-shadow mt-8 rounded-lg border border-[#d9e5f5] bg-white p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#163c78] text-[#f2dc99]">
                  <Flag className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Slogan
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#102b5c]">
                    “{institution.slogan}”
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {statements.map((statement) => (
              <article
                key={statement.title}
                className="premium-shadow rounded-lg border border-[#d9e5f5] bg-white p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf2ff] text-[#b88924]">
                  <statement.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-[#102b5c]">
                  {statement.title}
                </h3>
                <p className="mt-3 leading-7 text-zinc-600">{statement.text}</p>
              </article>
            ))}

            <div className="brand-panel rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold">Valores</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {values.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
