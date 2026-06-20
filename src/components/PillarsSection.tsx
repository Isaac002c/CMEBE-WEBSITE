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
  return (
    <section className="soft-section px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pilares"
          title="Fundamentos que sustentam a atuação do CMEBE."
          description="Cada pilar foi pensado para apoiar ministros, igrejas e projetos cristãos com responsabilidade institucional, fraternidade e visão de Reino."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon];

            return (
              <article
                key={pillar.title}
                className="premium-shadow group rounded-lg border border-[#d9e5f5] bg-white p-6 transition hover:-translate-y-1 hover:border-[#c99a2e]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#163c78] text-[#f2dc99] transition group-hover:bg-[#c99a2e] group-hover:text-[#102b5c]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#102b5c]">{pillar.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
