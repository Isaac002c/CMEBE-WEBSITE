import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  FileText,
  MapPin,
  Mic2,
  Pin,
  UserRound,
} from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { institutionalRecess, officialEvents, type CmebeEvent } from "@/data/events";

function DateBadge({ event, inverse = false }: { event: CmebeEvent; inverse?: boolean }) {
  return (
    <time
      dateTime={event.isoDate}
      className={`flex h-24 w-20 shrink-0 flex-col items-center justify-center rounded-xl border text-center ${
        inverse
          ? "border-gold-300/35 bg-white/10 text-white"
          : "border-gold-500/30 bg-gold-100/45 text-ink"
      }`}
    >
      <span className="text-[0.62rem] font-bold tracking-[0.14em] text-gold-600">
        {event.month}
      </span>
      <span className="font-display text-3xl font-semibold leading-none">{event.day}</span>
      <span className={`mt-1 text-[0.62rem] font-semibold ${inverse ? "text-brand-100" : "text-muted"}`}>
        {event.year}
      </span>
    </time>
  );
}

function EventMeta({ event, inverse = false }: { event: CmebeEvent; inverse?: boolean }) {
  const textClass = inverse ? "text-brand-100" : "text-body";
  const iconClass = inverse ? "text-gold-300" : "text-gold-600";

  return (
    <div className={`mt-5 grid gap-2.5 text-sm ${textClass}`}>
      <p className="flex items-start gap-2">
        <Clock3 className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
        <span>
          {event.weekday} · <strong className={inverse ? "text-white" : "text-ink"}>{event.time}</strong>
        </span>
      </p>
      {event.host ? (
        <p className="flex items-start gap-2">
          <UserRound className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
          <span>Anfitrião: {event.host}</span>
        </p>
      ) : null}
      {event.direction ? (
        <p className="flex items-start gap-2">
          <UserRound className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
          <span>Direção: {event.direction}</span>
        </p>
      ) : null}
      {event.speaker ? (
        <p className="flex items-start gap-2">
          <Mic2 className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
          <span>Preletor oficial: {event.speaker}</span>
        </p>
      ) : null}
      <p className="flex items-start gap-2">
        <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
        <span>
          <strong className={inverse ? "text-white" : "text-ink"}>{event.venue}</strong>
          {event.address ? <span className="mt-0.5 block">{event.address}</span> : null}
        </span>
      </p>
    </div>
  );
}

export function AgendaSection({ full = false }: { full?: boolean }) {
  const featuredEvent = officialEvents.find((event) => event.featured)!;
  const remainingEvents = officialEvents.filter(
    (event) =>
      !event.featured &&
      new Date(event.isoDate).getTime() > new Date(featuredEvent.isoDate).getTime(),
  );

  return (
    <section id="agenda" className={`section border-t border-line ${full ? "bg-paper" : "paper-engrave"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="2º semestre de 2026"
            title="Agenda Oficial CMEBE"
            description="Datas, encontros e compromissos institucionais para consulta de ministros, membros e parceiros."
          />
          {!full ? (
            <Link href="/agenda" className="btn btn-secondary shrink-0">
              Agenda completa
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>

        {full ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {officialEvents.map((event) => (
              <article
                key={event.id}
                id={event.id}
                className={`relative overflow-hidden rounded-2xl border p-6 ${
                  event.featured
                    ? "band-navy border-gold-500/35 shadow-[0_20px_60px_rgba(12,35,72,0.2)]"
                    : "border-line bg-white shadow-[0_10px_35px_rgba(12,35,72,0.06)]"
                }`}
              >
                {event.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-gold-500 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-brand-950">
                    Destaque oficial
                  </span>
                ) : null}
                <DateBadge event={event} inverse={event.featured} />
                <h3
                  className={`mt-6 text-xl font-semibold leading-7 ${
                    event.featured ? "text-white" : "text-ink"
                  }`}
                >
                  <Link
                    href={`/agenda/${event.id}`}
                    className="transition hover:text-gold-600"
                  >
                    {event.title}
                  </Link>
                </h3>
                {event.details?.map((detail) => (
                  <p key={detail} className={`mt-1 text-sm ${event.featured ? "text-brand-100" : "text-muted"}`}>
                    {detail}
                  </p>
                ))}
                <EventMeta event={event} inverse={event.featured} />
                {event.note ? (
                  <p className={`mt-5 border-l-2 border-gold-500 pl-3 text-xs leading-5 ${event.featured ? "text-gold-100" : "text-body"}`}>
                    {event.note}
                  </p>
                ) : null}
                {event.documentHref ? (
                  <Link href={event.documentHref} className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${event.featured ? "text-gold-300 hover:text-gold-100" : "text-brand-700 hover:text-brand-900"}`}>
                    <FileText className="h-4 w-4" aria-hidden />
                    {event.documentLabel ?? "Ler documento"}
                  </Link>
                ) : (
                  <Link
                    href={`/agenda/${event.id}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
                  >
                    Ver detalhes
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <article className="band-navy relative overflow-hidden rounded-2xl border border-gold-500/30 p-7 shadow-[0_24px_70px_rgba(12,35,72,0.22)] sm:p-9">
              <div className="seal-watermark opacity-[0.035]" aria-hidden />
              <div className="relative">
                {featuredEvent.image ? (
                  <Link
                    href={`/agenda/${featuredEvent.id}`}
                    className="relative -mx-7 -mt-7 mb-7 block aspect-square overflow-hidden border-b border-gold-500/25 sm:-mx-9 sm:-mt-9 sm:mb-8"
                    aria-label={`Ver detalhes de ${featuredEvent.title}`}
                  >
                    <Image
                      src={featuredEvent.image}
                      alt={`Arte oficial de ${featuredEvent.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 46vw"
                    />
                  </Link>
                ) : null}
                <div className="flex items-start justify-between gap-4">
                  <DateBadge event={featuredEvent} inverse />
                  <span className="rounded-full bg-gold-500 px-3 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-brand-950">
                    Encontro em destaque
                  </span>
                </div>
                <p className="mt-8 cmebe-eyebrow on-dark">Evento em destaque</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight text-white">
                  <Link
                    href={`/agenda/${featuredEvent.id}`}
                    className="transition hover:text-gold-100"
                  >
                    {featuredEvent.title}
                  </Link>
                </h3>
                {featuredEvent.details?.map((detail) => (
                  <p key={detail} className="mt-1.5 text-sm leading-6 text-brand-100">
                    {detail}
                  </p>
                ))}
                <EventMeta event={featuredEvent} inverse />
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/agenda/${featuredEvent.id}`}
                    className="btn btn-gold"
                  >
                    Ver detalhes do encontro
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  {featuredEvent.documentHref ? (
                    <Link href={featuredEvent.documentHref} className="btn btn-ghost-light">
                      <FileText className="h-4 w-4" aria-hidden />
                      {featuredEvent.documentLabel ?? "Ler documento"}
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>

            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_50px_rgba(12,35,72,0.07)]">
              <div className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
                <CalendarDays className="h-5 w-5 text-gold-600" aria-hidden />
                <h3 className="text-lg font-semibold text-ink">Demais compromissos oficiais</h3>
              </div>
              <div className="divide-y divide-line">
                {remainingEvents.map((event) => (
                  <article key={event.id} className="flex gap-4 p-5 sm:p-6">
                    <time
                      dateTime={event.isoDate}
                      className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-50 text-center"
                    >
                      <span className="text-[0.58rem] font-bold tracking-wider text-gold-700">
                        {event.month}
                      </span>
                      <span className="font-display text-xl font-semibold leading-none text-ink">
                        {event.day}
                      </span>
                    </time>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted">
                        <span>{event.weekday}</span>
                        <span aria-hidden>•</span>
                        <span className="font-semibold text-brand-700">{event.time}</span>
                      </div>
                      <h4 className="mt-1.5 text-base font-semibold leading-6 text-ink">
                        <Link
                          href={`/agenda/${event.id}`}
                          className="transition hover:text-brand-700"
                        >
                          {event.title}
                        </Link>
                      </h4>
                      <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-5 text-muted">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden />
                        {event.venue}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 rounded-xl border border-brand-200 bg-brand-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
            <Pin className="h-4 w-4 text-gold-600" aria-hidden />
            {institutionalRecess.label}
          </p>
          <p className="text-sm text-body">
            De <strong>{institutionalRecess.start}</strong> a <strong>{institutionalRecess.end}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
