import Image from "next/image";

import { SectionHeading } from "@/components/SectionHeading";
import { capelaniaModules } from "@/data/courses";

export function SchoolSection() {
  return (
    <section id="escola" className="band-navy section relative overflow-hidden text-white">
      <div className="cmebe-rule-gold absolute inset-x-0 top-0" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Formação ministerial"
              title="Escola de Profetas"
              description="Frente de capacitação do CMEBE para formação e especialização de ministros, líderes e vocacionados. O Curso de Capelania Cristã prepara homens e mulheres para servir na igreja, na sociedade e em contextos de cuidado."
              inverse
            />
            <figure className="mt-8 overflow-hidden rounded-md border border-white/15 shadow-[0_20px_50px_rgba(8,26,53,0.5)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/escola-ministracao.jpg"
                  alt="Ministro ministrando durante a formação de capelania do CMEBE"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-top"
                />
              </div>
            </figure>
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <p className="cmebe-eyebrow on-dark">Curso de Capelania Cristã</p>
            <h3 className="mt-3 font-display text-xl font-semibold text-white">
              Módulos e instrutores
            </h3>
            <ul className="mt-5 divide-y divide-white/10">
              {capelaniaModules.map((mod) => (
                <li key={mod.title} className="flex items-baseline justify-between gap-4 py-3">
                  <div>
                    <p className="font-display text-base font-semibold text-white">
                      {mod.title}
                      {mod.note ? (
                        <span className="font-sans text-sm font-normal text-brand-100">
                          {" "}
                          · {mod.note}
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-sm font-medium text-gold-300">
                    {mod.instructor}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
