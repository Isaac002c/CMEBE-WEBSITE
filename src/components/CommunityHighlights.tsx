import Image from "next/image";
import {
  ArrowDownToLine,
  BookOpenCheck,
  GraduationCap,
  MessageCircle,
  PlayCircle,
} from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";

const lifemasterWhatsapp =
  "https://wa.me/5521987071173?text=Ol%C3%A1%21%20Vi%20o%20destaque%20da%20Lifemaster%20no%20site%20da%20CMEBE%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20T%C3%A9cnico%20em%20Enfermagem.";
const anhangueraWhatsapp =
  "https://wa.me/5521978903868?text=Ol%C3%A1%21%20Vi%20o%20panfleto%20de%20p%C3%B3s-gradua%C3%A7%C3%A3o%20no%20site%20da%20CMEBE%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

function VideoDisclosure({
  label,
  src,
  poster,
}: {
  label: string;
  src: string;
  poster: string;
}) {
  return (
    <details className="mt-5 rounded-xl border border-line bg-brand-50/70 p-4">
      <summary className="cursor-pointer list-none font-semibold text-brand-900 marker:hidden">
        <span className="inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-white" aria-hidden>
            <PlayCircle className="h-4 w-4" />
          </span>
          {label}
        </span>
      </summary>
      <video
        controls
        playsInline
        preload="none"
        poster={poster}
        className="mt-4 max-h-[30rem] w-full rounded-lg bg-black object-contain"
      >
        <source src={src} type="video/mp4" />
        Seu navegador não oferece suporte à reprodução de vídeo.
      </video>
    </details>
  );
}

export function CommunityHighlights() {
  return (
    <section id="destaques" className="section border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Formação e oportunidades"
          title="Destaques para a comunidade"
          description="Conheça as divulgações educacionais compartilhadas com a comunidade CMEBE e fale diretamente com cada instituição para confirmar vagas, preços e condições."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-2">
          <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_50px_rgba(12,35,72,0.07)]">
            <div className="grid md:grid-cols-[0.78fr_1.22fr]">
              <a
                href="/images/education/lifemaster-matriculas-2027-1.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="relative mx-auto block aspect-[2/3] w-full max-w-[24rem] overflow-hidden bg-white md:max-w-none"
                aria-label="Abrir o panfleto de matrículas da Lifemaster em tamanho maior"
              >
                <Image
                  src="/images/education/lifemaster-matriculas-2027-1.jpg"
                  alt="Panfleto Lifemaster: matrículas abertas para Técnico em Enfermagem, turma 2027.1"
                  fill
                  sizes="(max-width: 768px) 90vw, 25vw"
                  className="object-contain"
                />
              </a>

              <div className="flex flex-col p-5 sm:p-6">
                <p className="cmebe-eyebrow">Matrículas 2027.1</p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">
                  Técnico em Enfermagem
                </h3>
                <p className="mt-3 text-sm leading-6 text-body">
                  A Lifemaster divulga turmas de manhã, tarde e noite, com início previsto para janeiro de 2027.
                </p>

                <ul className="mt-5 grid gap-3 text-sm leading-5 text-body">
                  <li className="flex gap-2.5">
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden />
                    Estágio e aulas práticas, conforme o material da escola.
                  </li>
                  <li className="flex gap-2.5">
                    <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden />
                    Primeira mensalidade divulgada: R$ 100.
                  </li>
                </ul>

                <address className="mt-5 text-xs leading-5 text-muted not-italic">
                  Rua Felipe Cardoso, 910 · Santa Cruz, em frente aos Correios
                </address>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={lifemasterWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Informações no WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/lifemaster_sc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    @lifemaster_sc
                  </a>
                </div>

                <VideoDisclosure
                  label="Assistir ao vídeo da escola"
                  src="/videos/education/lifemaster-apresentacao.mp4"
                  poster="/images/education/lifemaster-matriculas-2027-1.jpg"
                />
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_50px_rgba(12,35,72,0.07)]">
            <div className="grid md:grid-cols-[0.78fr_1.22fr]">
              <a
                href="/documents/education/anhanguera-pos-graduacao.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative mx-auto block aspect-[2/3] w-full max-w-[24rem] overflow-hidden border-b border-line bg-brand-50 md:max-w-none"
                aria-label="Abrir o panfleto completo de pós-graduação da Anhanguera"
              >
                <Image
                  src="/images/education/anhanguera-pos-preview.png"
                  alt="Prévia da primeira página do panfleto de pós-graduação Anhanguera"
                  fill
                  sizes="(max-width: 768px) 90vw, 25vw"
                  className="object-contain"
                />
              </a>

              <div className="p-5 sm:p-6">
                <p className="cmebe-eyebrow">Pós-graduação</p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">
                  Amplie seus caminhos profissionais
                </h3>
                <p className="mt-3 text-sm leading-6 text-body">
                  O material da Anhanguera apresenta opções de MBA e especializações, em formatos online e híbrido, e informa mais de 400 cursos disponíveis.
                </p>
                <p className="mt-3 text-xs leading-5 text-muted">
                  Atendimento indicado no panfleto para Santa Cruz · (21) 97890-3868
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href="/documents/education/anhanguera-pos-graduacao.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <ArrowDownToLine className="h-4 w-4" aria-hidden />
                    Ver panfleto completo
                  </a>
                  <a
                    href={anhangueraWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Consultar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>

        <p className="mt-5 text-xs leading-5 text-muted">
          Divulgações informativas. Confirme diretamente com cada instituição a disponibilidade, os requisitos e as condições vigentes.
        </p>
      </div>
    </section>
  );
}
