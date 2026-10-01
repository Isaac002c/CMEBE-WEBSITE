import { SectionHeading } from "@/components/SectionHeading";
import { CmebeSeal } from "@/components/CmebeSeal";

export function BeneficiosCartao() {
  return (
    <section id="cartao" className="section bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Cartão Parceiro"
            title="Cartão Parceiro de Descontos CMEBE"
            description="O Cartão Parceiro de Descontos CMEBE conecta empresas parceiras a associados, familiares e amigos da rede, facilitando o acesso a benefícios especiais e fortalecendo relações comerciais dentro da comunidade."
          />
        </div>

        {/* Área neutra reservada para a arte oficial do cartão (sem mockup falso). */}
        <div className="band-navy relative flex aspect-[16/10] flex-col items-center justify-center gap-4 overflow-hidden rounded-md border border-line px-6 text-center">
          <CmebeSeal tone="dark" className="w-20" />
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Cartão Parceiro de Descontos
            </p>
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
              CMEBE Benefícios
            </p>
          </div>
          <p className="text-xs text-brand-100">
            Espaço reservado para a arte oficial do cartão.
          </p>
        </div>
      </div>
    </section>
  );
}
