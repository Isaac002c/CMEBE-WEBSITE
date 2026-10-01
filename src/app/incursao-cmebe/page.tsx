import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin, MessageCircle, Route, Sparkles } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SectionHeading } from "@/components/SectionHeading";
import { incursion, incursionGallery } from "@/data/incursion";
import { institution } from "@/data/institution";
import { createPageMetadata } from "@/data/seo";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Incursão CMEBE pelo Reino",
  description:
    "Conheça a Incursão CMEBE pelo Reino, as cidades alcançadas e os registros de comunhão, cuidado e reconhecimento ministerial.",
  path: "/incursao-cmebe",
  keywords: [
    "Incursão CMEBE",
    "CMEBE pelo Reino",
    "ministérios filiados CMEBE",
    "visitas ministeriais CMEBE",
  ],
});

export default function IncursaoCmebePage() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <section className="band-navy relative overflow-hidden border-b border-gold-500/20">
          <div className="seal-watermark opacity-[0.025]" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div>
              <p className="cmebe-eyebrow on-dark">Avançando juntos pelo Reino</p>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Incursão CMEBE pelo Reino
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-brand-100 sm:text-lg">
                Uma iniciativa de aproximação com pastores, pastoras e ministérios filiados, levando presença, comunhão e reconhecimento a diferentes cidades.
              </p>

              <blockquote className="mt-8 max-w-xl border-l-2 border-gold-400 pl-5">
                <p className="font-display text-xl italic leading-8 text-gold-100">
                  “{incursion.verse}”
                </p>
                <cite className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-gold-300 not-italic">
                  {incursion.verseReference}
                </cite>
              </blockquote>

              <Link href="#registros" className="btn btn-gold mt-9">
                Ver registros da jornada
                <ArrowDown className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-5 -rotate-2 rounded-[2rem] border border-gold-300/20 bg-white/5" aria-hidden />
              <Image
                src={incursion.cover}
                alt="Arte oficial da Incursão CMEBE pelo Reino"
                width={1024}
                height={1024}
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="relative h-auto w-full rounded-2xl border border-gold-300/30 shadow-[0_28px_80px_rgba(0,0,0,0.38)]"
              />
            </div>
          </div>
        </section>

        <section className="section border-b border-line bg-surface">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Caminhos da incursão"
              title="Seis cidades, uma mesma missão"
              description="A jornada conecta lideranças e fortalece vínculos entre o conselho e os ministérios locais em São Paulo e no Rio de Janeiro."
              align="center"
            />

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {incursion.cities.map((place, index) => (
                <article
                  key={`${place.city}-${place.state}`}
                  className="flex items-center gap-4 rounded-xl border border-line bg-white p-5 shadow-[0_8px_24px_rgba(12,35,72,0.05)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-950 text-sm font-bold text-gold-300">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-ink">{place.city}</h2>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      <MapPin className="h-3.5 w-3.5 text-gold-700" aria-hidden />
                      {place.state}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="registros" className="section bg-paper">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Registros da jornada"
                title="Presença, palavra e comunhão"
                description="Uma seleção dos melhores registros recebidos, organizada para contar a história do encontro sem repetir imagens muito semelhantes."
              />
              <div className="flex shrink-0 items-center gap-3 rounded-xl border border-gold-500/25 bg-gold-100/35 px-4 py-3 text-sm font-semibold text-brand-900">
                <Route className="h-5 w-5 text-gold-700" aria-hidden />
                Unindo e cuidando de ministérios
              </div>
            </div>

            <figure className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_50px_rgba(12,35,72,0.08)] sm:mt-12">
              <Image
                src="/images/incursao-cmebe/registro-coletivo.jpg"
                alt="Registro coletivo de ministros e participantes da Incursão CMEBE"
                width={1280}
                height={960}
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="h-auto max-h-[720px] w-full object-cover"
              />
              <figcaption className="flex items-center gap-3 border-t border-line px-5 py-4 text-sm leading-6 text-body sm:px-6">
                <Sparkles className="h-4 w-4 shrink-0 text-gold-700" aria-hidden />
                Registro coletivo da comunhão construída ao longo da programação.
              </figcaption>
            </figure>

            <div className="mt-5 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {incursionGallery
                .filter((image) => image.src !== "/images/incursao-cmebe/registro-coletivo.jpg")
                .map((image) => (
                  <figure
                    key={image.src}
                    className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_36px_rgba(12,35,72,0.07)]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-auto w-full"
                    />
                    <figcaption className="border-t border-line px-5 py-4 text-sm leading-6 text-body">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gold-500/20 bg-brand-950 px-4 py-14 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
                CMEBE mais perto dos ministérios
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold text-white sm:text-3xl">
                Quer receber orientações sobre ações e encontros do conselho?
              </h2>
            </div>
            <Link
              href={buildWhatsappUrl("Olá, gostaria de saber mais sobre a Incursão CMEBE pelo Reino e as próximas ações do conselho.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold shrink-0"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp {institution.phone}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
