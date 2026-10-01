import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Store,
  UserRound,
} from "lucide-react";

import { CarouselHint } from "@/components/CarouselHint";
import { SectionHeading } from "@/components/SectionHeading";
import { entrepreneurs } from "@/data/entrepreneurs";

function partnerWhatsappUrl(number: string, company: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(
    `Olá! Conheci a ${company} por meio do Empreendedor CMEBE e gostaria de mais informações.`,
  )}`;
}

export function EntrepreneurSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      id="empreendedores"
      className={`section border-t border-line ${standalone ? "bg-paper" : "bg-surface"}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Rede de parceiros"
            title="Empreendedor CMEBE"
            description="Empresas e profissionais parceiros apresentados com clareza, identidade e conexão direta com a comunidade CMEBE."
          />
          {!standalone ? (
            <Link href="/empreendedores" className="btn btn-secondary shrink-0">
              Conhecer todos os parceiros
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>

        <CarouselHint className="mt-8" label="Deslize para conhecer os parceiros" />

        <div
          className="mobile-carousel no-scrollbar mt-4 grid gap-6 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4"
          role="region"
          aria-label="Empresas e profissionais do Empreendedor CMEBE"
          tabIndex={0}
        >
          {entrepreneurs.map((partner) => (
            <article
              key={partner.name}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_40px_rgba(12,35,72,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_18px_50px_rgba(12,35,72,0.12)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-[linear-gradient(135deg,#f7f9fd,#eef3fb)]">
                {partner.image ? (
                  <Image
                    src={partner.image}
                    alt={`Identidade visual de ${partner.name}`}
                    fill
                    sizes="(max-width: 640px) 84vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,#214f91,#0c2348_72%)] p-7 text-center text-white">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-300/35 bg-white/10 text-gold-300">
                      <Store className="h-8 w-8" aria-hidden />
                    </span>
                    <p className="mt-5 font-display text-2xl font-semibold leading-7 text-white">
                      {partner.name}
                    </p>
                    <p className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold-300">
                      Empreendedor CMEBE
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.13em] text-gold-700">
                  {partner.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-7 text-ink">{partner.name}</h3>
                <p className="mt-3 text-sm leading-6 text-body">{partner.description}</p>

                {partner.offer ? (
                  <p className="mt-4 rounded-lg border border-gold-500/25 bg-gold-100/45 px-3 py-2 text-xs font-semibold leading-5 text-gold-900">
                    {partner.offer}
                  </p>
                ) : null}

                {partner.services?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Serviços de ${partner.name}`}>
                    {partner.services.slice(0, 3).map((service) => (
                      <li
                        key={service}
                        className="rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-[0.64rem] font-semibold text-brand-800"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-5 grid gap-2 text-xs leading-5 text-muted">
                  {partner.contactName ? (
                    <p className="flex items-start gap-2">
                      <UserRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden />
                      {partner.contactName}
                    </p>
                  ) : null}
                  {partner.address ? (
                    <address className="flex items-start gap-2 not-italic">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden />
                      {partner.address}
                    </address>
                  ) : null}
                  {partner.email ? (
                    <a
                      href={`mailto:${partner.email}`}
                      className="flex items-start gap-2 transition hover:text-brand-900"
                    >
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden />
                      {partner.email}
                    </a>
                  ) : null}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {partner.contacts?.map((contact) => (
                    <Link
                      key={`${partner.name}-${contact.whatsappNumber}`}
                      href={partnerWhatsappUrl(contact.whatsappNumber, partner.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 w-full flex-col items-center justify-center gap-0.5 rounded-md bg-brand-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-800"
                      aria-label={`Falar com ${contact.name}, da ${partner.name}, pelo WhatsApp no número ${contact.phone}`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" aria-hidden />
                        {contact.name}
                      </span>
                      <span className="text-[0.7rem] text-brand-100">{contact.phone}</span>
                    </Link>
                  ))}
                  {!partner.contacts?.length && partner.whatsappNumber && partner.phone ? (
                    <Link
                      href={partnerWhatsappUrl(partner.whatsappNumber, partner.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md bg-brand-900 px-3 text-xs font-semibold text-white transition hover:bg-brand-800"
                      aria-label={`Falar com ${partner.name} pelo WhatsApp no número ${partner.phone}`}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      {partner.phone}
                    </Link>
                  ) : null}
                  {partner.instagramUrl && partner.instagram ? (
                    <Link
                      href={partner.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md border border-line px-3 text-xs font-semibold text-brand-800 transition hover:border-brand-600"
                    >
                      <Camera className="h-4 w-4" aria-hidden />
                      {partner.instagram}
                    </Link>
                  ) : null}
                  {partner.mapsUrl ? (
                    <Link
                      href={partner.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-line px-3 text-xs font-semibold text-brand-800 transition hover:border-brand-600"
                    >
                      <Navigation className="h-4 w-4" aria-hidden />
                      Ver localização
                    </Link>
                  ) : null}
                  {!partner.contacts?.length && !partner.whatsappNumber && !partner.instagramUrl ? (
                    <span className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-dashed border-brand-200 bg-brand-50 px-3 text-xs font-semibold text-muted">
                      <Store className="h-4 w-4" aria-hidden />
                      Contato em atualização
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 rounded-2xl bg-brand-950 px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-gold-300">
              Sua empresa nesta rede
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-100">
              Apresente seus serviços à comunidade CMEBE em um espaço institucional
              preparado para crescer com novos parceiros.
            </p>
          </div>
          <Link href="/parceria" className="btn btn-gold shrink-0">
            Solicitar parceria
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
