import {
  CalendarHeart,
  Cross,
  GraduationCap,
  Handshake,
  HeartHandshake,
  MapPinned,
  Sprout,
} from "lucide-react";
import type { ComponentType } from "react";

import { CarouselHint } from "@/components/CarouselHint";
import { pillars, type PillarIcon } from "@/data/pillars";
import { SectionHeading } from "@/components/SectionHeading";

const iconMap: Record<PillarIcon, ComponentType<{ className?: string }>> = {
  handshake: Handshake,
  heart: HeartHandshake,
  calendar: CalendarHeart,
  map: MapPinned,
  cross: Cross,
  graduation: GraduationCap,
  sprout: Sprout,
};

export function PillarsSection() {
  const [featured, ...rest] = pillars;
  const FeaturedIcon = iconMap[featured.icon];

  return (
    <section className="paper-engrave section">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pilares"
          title="Fundamentos que sustentam a atuação do CMEBE."
          description="Cada pilar apoia ministros, igrejas e projetos cristãos com responsabilidade institucional, fraternidade e visão de Reino."
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_2fr] lg:items-stretch">
          {/* Card de destaque (elimina o buraco do grid e cria hierarquia) */}
          <article className="band-navy relative overflow-hidden rounded-lg p-6 sm:p-8">
            <div className="cmebe-rule-gold absolute inset-x-0 top-0" />
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-gold-500/30">
              <FeaturedIcon className="h-6 w-6 text-gold-300" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-white">
              {featured.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-brand-100">
              {featured.description}
            </p>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-gold-300">
              Pilar central do CMEBE
            </p>
          </article>

          <CarouselHint label="Deslize para ver os pilares" />

          {/* Demais pilares: carrossel deslizante no mobile, grid 2x3 no desktop */}
          <div
            className="mobile-carousel mobile-carousel-compact no-scrollbar grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="region"
            aria-label="Demais pilares do CMEBE"
            tabIndex={0}
          >
            {rest.map((pillar) => {
              const Icon = iconMap[pillar.icon];
              return (
                <article
                  key={pillar.title}
                  className="cmebe-card cmebe-card-hover flex flex-col p-5"
                >
                  <Icon className="h-6 w-6 shrink-0 text-gold-600" aria-hidden />
                  <h3 className="mt-3 font-display text-base font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-body">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
