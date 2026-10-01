import Image from "next/image";
import { Heart, Landmark, UsersRound } from "lucide-react";

import { CarouselHint } from "@/components/CarouselHint";
import { SectionHeading } from "@/components/SectionHeading";
import { institution } from "@/data/institution";
import { presidentPhotos } from "@/data/president";

const presidentialValues = [
  {
    icon: Landmark,
    title: "Serviço ao Reino",
    description: "Uma caminhada dedicada à fé, à comunhão e ao fortalecimento de ministros.",
  },
  {
    icon: Heart,
    title: "Família como fundamento",
    description: "Valores cristãos vividos no cuidado, na presença e no testemunho familiar.",
  },
  {
    icon: UsersRound,
    title: "Liderança que acolhe",
    description: "Proximidade e responsabilidade na condução da missão institucional do CMEBE.",
  },
];

export function PresidentSection() {
  return (
    <section id="presidencia" className="section paper-engrave border-t border-line">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Presidência, família e propósito"
              title="Uma liderança sustentada pela fé e pela família"
              description="A vida ministerial também é construída no cuidado com a casa, no testemunho diário e na comunhão com aqueles que caminham ao nosso lado."
            />

            <div className="mt-7 border-l-2 border-gold-500 pl-5">
              <p className="font-display text-xl font-semibold text-ink">
                {institution.president}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.1em] text-gold-700">
                Presidente – CMEBE
              </p>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-body sm:text-base">
              À frente do CMEBE, o Pr. José Carlos Domingos une experiência
              ministerial, compromisso institucional e valores familiares. Sua
              liderança busca aproximar pessoas, reconhecer vocações e fortalecer
              uma comunidade que serve a Deus com responsabilidade e propósito.
            </p>
          </div>

          <div>
            <CarouselHint label="Deslize para ver as fotos" />
            <div
              className="mobile-carousel mobile-carousel-photo no-scrollbar mt-4 grid gap-5 sm:grid-cols-2 lg:mt-0"
              role="region"
              aria-label="Fotos do presidente com sua família"
              tabIndex={0}
            >
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-brand-900 shadow-[0_20px_60px_rgba(12,35,72,0.14)]">
                <Image
                  src={presidentPhotos.family.src}
                  alt={presidentPhotos.family.alt}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 360px"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-transparent px-5 pb-5 pt-20">
                  <figcaption className="text-xs font-semibold uppercase tracking-[0.13em] text-gold-300">
                    Família e caminhada
                  </figcaption>
                </div>
              </figure>

              <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-brand-900 shadow-[0_20px_60px_rgba(12,35,72,0.14)]">
                <Image
                  src={presidentPhotos.couple.src}
                  alt={presidentPhotos.couple.alt}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 360px"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-transparent px-5 pb-5 pt-20">
                  <figcaption className="text-xs font-semibold uppercase tracking-[0.13em] text-gold-300">
                    Ao lado de sua esposa
                  </figcaption>
                </div>
              </figure>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12">
          {presidentialValues.map((value) => (
            <article
              key={value.title}
              className="flex gap-4 rounded-xl border border-line bg-white/75 p-5 shadow-[0_8px_28px_rgba(12,35,72,0.05)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-900 text-gold-300">
                <value.icon className="h-4.5 w-4.5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink">{value.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{value.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
