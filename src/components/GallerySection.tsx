import Image from "next/image";

import { CarouselHint } from "@/components/CarouselHint";
import { SectionHeading } from "@/components/SectionHeading";
import { galleryImages } from "@/data/gallery";

export function GallerySection() {
  return (
    <section id="galeria" className="paper-engrave section">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Presença institucional"
          title="Momentos reais do CMEBE"
          description="Eventos de formação, credenciamento e comunhão entre ministros e líderes filiados."
          align="center"
        />

        <CarouselHint className="mt-8" label="Deslize para ver mais momentos" />

        <div
          className="mobile-carousel mobile-carousel-photo no-scrollbar mt-4 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
          role="region"
          aria-label="Galeria de momentos do CMEBE"
          tabIndex={0}
        >
          {galleryImages.map((img) => (
            <figure
              key={img.src}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_8px_24px_rgba(12,35,72,0.08)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 360px"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
