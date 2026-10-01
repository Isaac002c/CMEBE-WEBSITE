import { CmebeSeal } from "@/components/CmebeSeal";

// Faixa institucional (âncora visual entre seções). Restating fiel do propósito
// real do CMEBE — sem números, promessas ou dados inventados.
export function LemaBand() {
  return (
    <section className="band-navy relative overflow-hidden">
      <div className="cmebe-rule-gold absolute inset-x-0 top-0" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 lg:flex-row lg:gap-12 lg:py-20 lg:text-left">
        <CmebeSeal tone="dark" className="w-32 shrink-0 sm:w-36" />
        <div>
          <p className="cmebe-eyebrow on-dark">Propósito</p>
          <p className="mt-4 font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
            Unir, formar e fortalecer ministros evangélicos — respeitando cada
            denominação e cooperando para o crescimento do Reino, no Brasil e no
            exterior.
          </p>
        </div>
      </div>
    </section>
  );
}
