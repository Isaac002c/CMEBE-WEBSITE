import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  Mic2,
  UserRound,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { officialEvents } from "@/data/events";
import { createEventJsonLd, createPageMetadata } from "@/data/seo";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return officialEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = officialEvents.find((item) => item.id === id);

  if (!event) {
    return {};
  }

  return createPageMetadata({
    title: event.title,
    description: [
      event.title,
      `${event.day}/${event.month}/${event.year}, às ${event.time}`,
      event.venue,
    ].join(" — "),
    path: `/agenda/${event.id}`,
    keywords: ["evento CMEBE", event.title],
  });
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = officialEvents.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  const mapUrl = event.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${event.venue}, ${event.address}`,
      )}`
    : null;

  return (
    <>
      <JsonLd data={createEventJsonLd(event)} />
      <div className="min-h-screen bg-paper text-body">
        <Header />
        <main>
          <section className="band-navy relative overflow-hidden border-b border-gold-500/30">
            <div className="seal-watermark opacity-[0.03]" aria-hidden />
            <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
              <Link
                href="/agenda"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-100 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Voltar para a agenda
              </Link>

              <p className="mt-9 cmebe-eyebrow on-dark">Agenda Oficial CMEBE</p>
              <h1 className="mt-4 max-w-4xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
                {event.title}
              </h1>
              {event.details?.map((detail) => (
                <p
                  key={detail}
                  className="mt-2 max-w-3xl text-base leading-7 text-brand-100"
                >
                  {detail}
                </p>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[0.72fr_1.28fr]">
              <aside className="rounded-2xl border border-gold-500/25 bg-brand-50 p-6">
                <CalendarDays className="h-6 w-6 text-gold-700" aria-hidden />
                <p className="mt-5 font-display text-3xl font-semibold text-ink">
                  {event.day} {event.month} {event.year}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-brand-800">
                  <Clock3 className="h-4 w-4 text-gold-700" aria-hidden />
                  {event.weekday}, às {event.time}
                </p>
              </aside>

              <article className="rounded-2xl border border-line bg-white p-6 shadow-[0_16px_50px_rgba(12,35,72,0.07)] sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Informações do evento
                </h2>

                <dl className="mt-7 grid gap-6">
                  <div className="flex gap-3">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-700" aria-hidden />
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                        Local
                      </dt>
                      <dd className="mt-1 font-semibold text-ink">{event.venue}</dd>
                      {event.address ? (
                        <dd className="mt-1 text-sm leading-6 text-body">{event.address}</dd>
                      ) : null}
                    </div>
                  </div>

                  {event.host ? (
                    <div className="flex gap-3">
                      <UserRound
                        className="mt-1 h-5 w-5 shrink-0 text-gold-700"
                        aria-hidden
                      />
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                          Anfitrião
                        </dt>
                        <dd className="mt-1 font-semibold text-ink">{event.host}</dd>
                      </div>
                    </div>
                  ) : null}

                  {event.direction ? (
                    <div className="flex gap-3">
                      <UserRound
                        className="mt-1 h-5 w-5 shrink-0 text-gold-700"
                        aria-hidden
                      />
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                          Direção
                        </dt>
                        <dd className="mt-1 font-semibold text-ink">
                          {event.direction}
                        </dd>
                      </div>
                    </div>
                  ) : null}

                  {event.speaker ? (
                    <div className="flex gap-3">
                      <Mic2 className="mt-1 h-5 w-5 shrink-0 text-gold-700" aria-hidden />
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                          Preletor oficial
                        </dt>
                        <dd className="mt-1 font-semibold text-ink">{event.speaker}</dd>
                      </div>
                    </div>
                  ) : null}
                </dl>

                {event.note ? (
                  <p className="mt-7 border-l-2 border-gold-500 bg-gold-100/40 px-4 py-3 text-sm leading-6 text-body">
                    {event.note}
                  </p>
                ) : null}

                {mapUrl || event.documentHref ? (
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    {mapUrl ? (
                      <Link
                        href={mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                      >
                        <MapPin className="h-4 w-4" aria-hidden />
                        Abrir no mapa
                      </Link>
                    ) : null}
                    {event.documentHref ? (
                      <Link href={event.documentHref} className="btn btn-secondary">
                        <FileText className="h-4 w-4" aria-hidden />
                        {event.documentLabel ?? "Ler documento"}
                      </Link>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </div>

            {event.image ? (
              <figure className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-[0_16px_50px_rgba(12,35,72,0.07)] sm:p-5">
                <Image
                  src={event.image}
                  alt={`Arte oficial de ${event.title}`}
                  width={720}
                  height={720}
                  className="h-auto w-full rounded-xl object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <figcaption className="px-2 pb-1 pt-4 text-center text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  Arte oficial do evento
                </figcaption>
              </figure>
            ) : null}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
