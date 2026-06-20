import { CalendarDays, Crown, MapPin } from "lucide-react";

import { institution, ministerialFunctions } from "@/data/institution";
import { SectionHeading } from "@/components/SectionHeading";

const highlights = [
  {
    icon: CalendarDays,
    label: "Fundação",
    value: institution.foundedAt,
  },
  {
    icon: Crown,
    label: "Presidente",
    value: institution.president,
  },
  {
    icon: MapPin,
    label: "Sede",
    value: "Sepetiba, Rio de Janeiro - RJ",
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Sobre o CMEBE"
            title="Um conselho para unir, reconhecer e fortalecer lideranças cristãs."
            description="O CMEBE nasceu com o propósito de unir ministros evangélicos, fortalecer vocações e criar uma rede de apoio, capacitação e reconhecimento ministerial no Brasil e no exterior. Nosso compromisso é promover comunhão, desenvolvimento, formação e suporte aos líderes que desejam servir com excelência ao Reino de Deus."
          />

          <div className="mt-8 grid gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="premium-shadow flex items-start gap-4 rounded-lg border border-[#d9e5f5] bg-white p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#163c78] text-[#f2dc99]">
                  <item.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-bold leading-7 text-[#102b5c]">
                    {item.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="brand-panel relative overflow-hidden rounded-lg p-8 text-white shadow-[0_28px_70px_rgba(22,60,120,0.18)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f2dc99] via-[#c99a2e] to-[#f2dc99]" />
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f2dc99]">
            Lideranças contempladas
          </p>
          <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
            Uma casa institucional para vocacionados de diferentes frentes.
          </h3>
          <p className="mt-5 leading-8 text-blue-50/85">
            A instituição é voltada para líderes evangélicos de ambos os sexos,
            respeitando as peculiaridades de cada denominação e incentivando a
            cooperação para o crescimento do Reino de Deus.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {ministerialFunctions.map((role) => (
              <span
                key={role}
                className="rounded-full border border-[#f2dc99]/25 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
