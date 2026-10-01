import { Crown, UsersRound } from "lucide-react";

import { CarouselHint } from "@/components/CarouselHint";
import { FounderPortrait } from "@/components/FounderPortrait";
import { MemorialSection } from "@/components/MemorialSection";
import { SectionHeading } from "@/components/SectionHeading";
import { boardMembers, leadership } from "@/data/diretoria";

export function DiretoriaSection() {
  return (
    <section id="diretoria" className="section border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Diretoria e liderança"
          title="Quem conduz a missão do CMEBE"
          description="Uma liderança comprometida com unidade ministerial, seriedade institucional e serviço ao Reino."
          align="center"
        />

        <CarouselHint className="mt-8" label="Deslize para conhecer as lideranças" />

        <div
          className="mobile-carousel no-scrollbar mt-4 grid gap-6 sm:mt-12 lg:grid-cols-2"
          role="region"
          aria-label="Lideranças executivas do CMEBE"
          tabIndex={0}
        >
          {leadership.map((member, index) => (
            <article
              key={member.name}
              className="group grid overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_16px_50px_rgba(12,35,72,0.09)] sm:grid-cols-[0.72fr_1.28fr]"
            >
              <FounderPortrait
                src={member.photo}
                alt={`${member.name}, ${member.role}`}
                className="!aspect-[5/4] min-h-0 rounded-none border-0 shadow-none sm:!aspect-[4/5] sm:min-h-full"
              />
              <div className="relative flex flex-col justify-end overflow-hidden p-7 sm:p-8">
                <div className="seal-watermark" aria-hidden />
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-900 text-gold-300">
                    {index === 0 ? (
                      <Crown className="h-5 w-5" aria-hidden />
                    ) : (
                      <UsersRound className="h-5 w-5" aria-hidden />
                    )}
                  </span>
                  <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-700 sm:mt-8">
                    Liderança executiva
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-brand-700">{member.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <MemorialSection />

        <div className="mt-12 rounded-2xl border border-line bg-paper p-6 sm:p-8">
          <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="cmebe-eyebrow">Composição institucional</p>
              <h3 className="mt-3 text-2xl font-semibold text-ink">
                Demais integrantes da diretoria
              </h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">
              Os nomes são apresentados sem atribuição de cargo quando a função
              específica não consta nos dados oficiais.
            </p>
          </div>

          <ol className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((name, index) => (
              <li
                key={name}
                className="flex min-h-16 items-center gap-3 border-b border-line/80 py-3.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-500/35 bg-gold-100/50 text-xs font-bold text-gold-700">
                  {String(index + 3).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold leading-6 text-ink">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
