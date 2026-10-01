import { SectionHeading } from "@/components/SectionHeading";
import { alcanceRede } from "@/data/beneficios";

export function BeneficiosAlcance() {
  return (
    <section className="band-navy relative overflow-hidden">
      <div className="cmebe-rule-gold absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Alcance da rede"
          title="Quem a sua marca alcança."
          description="Pessoas conectadas pelo ministério e pela família — um público real, com quem sua empresa passa a se relacionar."
          inverse
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-white/15 bg-white/10 sm:grid-cols-3">
          {alcanceRede.map((item) => (
            <div key={item.titulo} className="band-navy-deep px-6 py-8">
              {item.destaque ? (
                <p className="font-display text-5xl font-semibold leading-none text-gold-300">
                  {item.destaque}
                </p>
              ) : null}
              <p
                className={`font-display text-lg font-semibold text-white ${
                  item.destaque ? "mt-3" : ""
                }`}
              >
                {item.titulo}
              </p>
              <p className="mt-2 text-sm leading-7 text-brand-100">
                {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
