import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import { institution } from "@/data/institution";
import { presidentContent, presidentPhotos } from "@/data/president";

const institutionalFacts = [
  { label: "Fundação", value: institution.foundedAt },
  { label: "Agenda oficial", value: "6 encontros em 2026" },
  { label: "Sede", value: "Sepetiba · Rio de Janeiro" },
];

export function Hero() {
  return (
    <section id="inicio" className="band-navy relative overflow-hidden">
      <div className="cmebe-rule-gold absolute inset-x-0 top-0" />
      <div className="cmebe-rule-gold absolute inset-x-0 bottom-0" />
      <div className="absolute -left-28 top-24 h-72 w-72 rounded-full border border-gold-300/10" />
      <div className="absolute -left-16 top-36 h-48 w-48 rounded-full border border-gold-300/10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div>
          <p className="cmebe-eyebrow on-dark">Conselho ministerial · Brasil e exterior</p>

          <h1 className="mt-5 max-w-3xl font-display text-[2.15rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
            Conselho de Ministros Evangélicos do Brasil e do Exterior
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-100 sm:text-lg">
            Unidade, formação e representatividade para ministros e lideranças
            cristãs que servem ao Reino com fé, responsabilidade e propósito.
          </p>

          <p className="mt-5 inline-flex items-center gap-2 border-l-2 border-gold-500 pl-4 font-display text-xl font-medium italic text-gold-300">
            “{institution.slogan}”
          </p>

          <div className="mt-8">
            <Link href="/agenda" className="btn btn-gold">
              <CalendarDays className="h-4 w-4" aria-hidden />
              Ver agenda oficial
            </Link>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:grid-cols-3">
            {institutionalFacts.map((item) => (
              <div key={item.label} className="band-navy-deep px-4 py-4">
                <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold leading-5 text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <article className="relative overflow-hidden rounded-2xl border border-white/15 bg-brand-950/75 shadow-[0_28px_80px_rgba(3,14,31,0.48)] ring-1 ring-gold-500/20">
          <div className="grid sm:grid-cols-[0.82fr_1.18fr] lg:grid-cols-1 xl:grid-cols-[0.82fr_1.18fr]">
            <div className="relative min-h-80 overflow-hidden sm:min-h-full lg:min-h-80 xl:min-h-full">
              <Image
                src={presidentPhotos.main.src}
                alt={presidentPhotos.main.alt}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 44vw, 260px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-transparent" />
            </div>

            <div className="relative flex flex-col justify-center p-6 sm:p-7 lg:p-8 xl:p-7">
              <p className="cmebe-eyebrow on-dark">{presidentContent.title}</p>
              <blockquote className="mt-5 font-display text-lg italic leading-8 text-white">
                “{presidentContent.message}”
              </blockquote>
              <div className="mt-6 border-l-2 border-gold-500 pl-4">
                <p className="font-display text-lg font-semibold text-white">
                  {institution.president}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold-300">
                  {presidentContent.signatureRole}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
