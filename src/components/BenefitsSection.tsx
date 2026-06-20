import { CheckCircle2, FileBadge2, Gem } from "lucide-react";

import { benefits } from "@/data/benefits";
import { SectionHeading } from "@/components/SectionHeading";

export function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="Benefícios"
            title="Condições e benefícios imperdíveis"
            description="Filie-se ao CMEBE e tenha acesso a credenciais, certificados, formação ministerial e benefícios exclusivos."
          />
          <div className="brand-panel relative overflow-hidden rounded-lg p-7 text-white shadow-[0_28px_70px_rgba(22,60,120,0.18)]">
            <div className="absolute inset-y-0 left-0 w-1 bg-[#c99a2e]" />
            <div className="flex items-start gap-4">
              <span className="luxe-button flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Gem className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold">Filiação com valor institucional</h3>
                <p className="mt-2 leading-7 text-blue-50/85">
                  A estrutura de benefícios foi organizada para oferecer
                  reconhecimento, preparo e documentação ao ministro filiado.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="premium-shadow rounded-lg border border-[#d9e5f5] bg-white p-6 transition hover:-translate-y-1 hover:border-[#c99a2e]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf2ff] text-[#c99a2e]">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <span className="text-sm font-black text-zinc-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#102b5c]">{benefit.title}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{benefit.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-[#f2dc99] bg-[#fff9e8] p-5 text-[#102b5c]">
          <div className="flex items-start gap-3">
            <FileBadge2 className="mt-1 h-5 w-5 shrink-0 text-[#b88924]" />
            <p className="leading-7">
              Credenciais e certificados dependem da validação documental e dos
              critérios internos do conselho.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
