import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock3, FileCheck2, MapPin, MessageCircle } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { extraordinaryAssemblyNotice as notice } from "@/data/edital";
import { createPageMetadata } from "@/data/seo";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Edital de Convocação da Assembleia Geral",
  description:
    "Edital oficial de convocação da Assembleia Geral Extraordinária do CMEBE em 12 de setembro de 2026.",
  path: "/edital",
  keywords: ["edital CMEBE", "Assembleia Geral Extraordinária CMEBE"],
});

export default function EditalPage() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <section className="band-navy relative overflow-hidden border-b border-gold-500/30">
          <div className="seal-watermark opacity-[0.025]" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gold-300">
              <FileCheck2 className="h-5 w-5" aria-hidden />
              Documento institucional
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {notice.title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-brand-100 sm:text-base">
              {notice.institution}
            </p>

            <dl className="mt-9 grid gap-px overflow-hidden rounded-xl border border-white/15 bg-white/10 sm:grid-cols-3">
              <div className="band-navy-deep p-5">
                <dt className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-gold-300">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  Data
                </dt>
                <dd className="mt-2 text-sm font-semibold text-white">{notice.date}</dd>
              </div>
              <div className="band-navy-deep p-5">
                <dt className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-gold-300">
                  <Clock3 className="h-4 w-4" aria-hidden />
                  Convocações
                </dt>
                <dd className="mt-2 text-sm font-semibold text-white">
                  {notice.firstCall} · {notice.secondCall}
                </dd>
              </div>
              <div className="band-navy-deep p-5">
                <dt className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-gold-300">
                  <MapPin className="h-4 w-4" aria-hidden />
                  Local
                </dt>
                <dd className="mt-2 text-sm font-semibold leading-5 text-white">{notice.venue}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section paper-engrave">
          <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-line bg-white shadow-[0_22px_70px_rgba(12,35,72,0.1)]">
            <div className="border-b border-line px-6 py-7 text-center sm:px-12 sm:py-9">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">
                {notice.institution}
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-semibold uppercase leading-tight text-ink sm:text-3xl">
                {notice.title}
              </h2>
            </div>

            <div className="px-6 py-8 text-[0.96rem] leading-8 text-body sm:px-12 sm:py-12">
              <p>{notice.introduction}</p>
              <p className="mt-6">{notice.quorum}</p>

              <section className="mt-9 rounded-xl border border-brand-200 bg-brand-50 p-6 sm:p-7">
                <h3 className="text-xl font-semibold uppercase tracking-wide text-ink">
                  Ordem do dia
                </h3>
                <ol className="mt-5 grid gap-3">
                  {notice.agenda.map((item, index) => (
                    <li key={item} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <p className="mt-8 font-semibold text-ink">{notice.eligibility}</p>
              <p className="mt-10 text-right font-display text-lg italic text-ink">{notice.publishedAt}</p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {notice.signatures.map((signature) => (
                  <div key={signature.name} className="border-t border-ink/40 pt-3 text-center">
                    <p className="font-display text-lg font-semibold text-ink">{signature.name}</p>
                    <p className="mt-1 whitespace-pre-line text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                      {signature.role}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-10 border-l-2 border-gold-500 bg-gold-100/35 px-4 py-3 text-sm font-semibold text-ink">
                {notice.note}
              </p>
            </div>
          </article>

          <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/agenda" className="btn btn-primary">
              <CalendarDays className="h-4 w-4" aria-hidden />
              Consultar agenda completa
            </Link>
            <Link
              href={buildWhatsappUrl("Olá, gostaria de informações sobre a Assembleia Geral Extraordinária do CMEBE.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Falar com o CMEBE
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
