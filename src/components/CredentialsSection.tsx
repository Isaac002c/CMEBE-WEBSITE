import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BadgeCheck, Fingerprint, ShieldCheck } from "lucide-react";

import { CarouselHint } from "@/components/CarouselHint";
import { SectionHeading } from "@/components/SectionHeading";

const credentialBenefits = [
  {
    icon: BadgeCheck,
    title: "Identidade ministerial",
    description: "Apresentação clara do vínculo e da função ministerial reconhecida pelo conselho.",
  },
  {
    icon: ShieldCheck,
    title: "Validação institucional",
    description: "Emissão condicionada à análise documental e aos critérios internos do CMEBE.",
  },
  {
    icon: Fingerprint,
    title: "Pertencimento e legitimidade",
    description: "Uma identidade visual própria para fortalecer reconhecimento e conexão ministerial.",
  },
];

export function CredentialsSection() {
  return (
    <section id="credenciais" className="band-navy relative overflow-hidden border-y border-gold-500/20">
      <div className="seal-watermark opacity-[0.025]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
        <div>
          <SectionHeading
            eyebrow="Identidade ministerial"
            title="Credenciais e Certificados CMEBE"
            description="Conheça os modelos oficiais que representam pertencimento, responsabilidade, formação e reconhecimento institucional."
            inverse
          />

          <div className="mt-8 grid gap-5">
            {credentialBenefits.map((benefit) => (
              <article key={benefit.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-300/25 bg-white/5 text-gold-300">
                  <benefit.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-brand-100">{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/credenciais" className="btn btn-gold">
              Conhecer credenciais e certificados
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link href="/cadastro" className="btn btn-ghost-light">
              Solicitar filiação
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl py-5">
          <CarouselHint className="mb-4 !text-brand-200 sm:hidden" label="Deslize para ver os modelos" />
          <div className="mobile-carousel no-scrollbar grid gap-5 sm:grid-cols-2" role="region" aria-label="Modelos oficiais de credenciais CMEBE" tabIndex={0}>
            <article className="overflow-hidden rounded-2xl border border-gold-300/30 bg-white p-3 shadow-[0_24px_70px_rgba(3,14,31,0.45)]">
              <div className="flex aspect-[1.9/1] items-center justify-center overflow-hidden rounded-xl bg-[#f6efdc]">
                <Image
                  src="/images/credenciais/credencial-ministerial-dados-ficticios.jpg"
                  alt="Exemplo da credencial ministerial CMEBE preenchida com dados fictícios"
                  width={1075}
                  height={697}
                  className="h-full w-full object-contain"
                  sizes="(max-width: 640px) 84vw, 320px"
                />
              </div>
              <div className="px-2 pb-2 pt-4">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-gold-700">Exemplo com dados fictícios</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-brand-950">Credencial ministerial</h3>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-gold-300/30 bg-white p-3 shadow-[0_24px_70px_rgba(3,14,31,0.45)] sm:translate-y-8">
              <div className="flex aspect-[1.9/1] items-center justify-center overflow-hidden rounded-xl bg-[#f6efdc]">
                <Image
                  src="/images/credenciais/credencial-capelania-dados-ficticios.jpg"
                  alt="Exemplo da credencial de Capelania Geral Cristã preenchida com dados fictícios"
                  width={1075}
                  height={697}
                  className="h-full w-full object-contain"
                  sizes="(max-width: 640px) 84vw, 320px"
                />
              </div>
              <div className="px-2 pb-2 pt-4">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-gold-700">Exemplo com dados fictícios</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-brand-950">Credencial de capelania</h3>
              </div>
            </article>
          </div>

          <div className="relative mx-3 mt-5 flex items-center gap-4 rounded-2xl border border-gold-300/25 bg-white/10 p-4 text-white backdrop-blur sm:mx-10 sm:mt-14">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-300 text-brand-950">
              <Award className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Certificados institucionais</p>
              <p className="mt-1 text-xs leading-5 text-brand-100">Ordenação, capelania, filiação e renovação com emissão controlada pelo conselho.</p>
            </div>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-brand-200">
            Artes demonstrativas preenchidas exclusivamente com dados fictícios. A emissão depende de análise e aprovação institucional.
          </p>
        </div>
      </div>
    </section>
  );
}
