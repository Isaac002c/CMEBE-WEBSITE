import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  IdCard,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SectionHeading } from "@/components/SectionHeading";
import { institution } from "@/data/institution";
import { createPageMetadata } from "@/data/seo";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Credenciais e Certificados Oficiais CMEBE",
  description:
    "Conheça as credenciais e os certificados oficiais CMEBE apresentados com dados fictícios, além dos documentos para filiação e do Estatuto público.",
  path: "/credenciais",
  keywords: [
    "credencial CMEBE",
    "certificado CMEBE",
    "documentos filiação CMEBE",
    "Estatuto CMEBE",
  ],
});

const requiredDocuments = [
  "RG, CPF e comprovante de residência.",
  "Uma foto recente, adequada para a credencial.",
  "Carta de apresentação da igreja em papel timbrado, com CNPJ, assinada pelo pastor e com firma reconhecida.",
  "Ata de consagração ou certificado de ordenação.",
  "Comprovante de formação ministerial, se houver.",
];

const credentialModels = [
  {
    title: "Credencial de Capelania Geral Cristã",
    description: "Exemplo oficial preenchido exclusivamente com dados fictícios para apresentação do modelo.",
    image: "/images/credenciais/credencial-capelania-dados-ficticios.jpg",
    width: 1075,
    height: 697,
  },
  {
    title: "Credencial ministerial CMEBE",
    description: "Exemplo institucional para membros e ministros, apresentado com dados inteiramente fictícios.",
    image: "/images/credenciais/credencial-ministerial-dados-ficticios.jpg",
    width: 1075,
    height: 697,
  },
  {
    title: "Certificado de Ordenação de Ministro",
    description: "Modelo de certificado destinado ao reconhecimento formal da ordenação ministerial.",
    image: "/images/credenciais/certificado-ordenacao-ministro-modelo.jpg",
    width: 1600,
    height: 1131,
  },
  {
    title: "Certificado de Capelania Geral Cristã",
    description: "Modelo de conclusão e formação para atuação em Capelania Geral Cristã.",
    image: "/images/credenciais/certificado-capelania-modelo.jpg",
    width: 1600,
    height: 1131,
  },
  {
    title: "Certificado de Filiação CMEBE",
    description: "Modelo institucional de reconhecimento da filiação aprovada junto ao conselho.",
    image: "/images/credenciais/certificado-filiacao-modelo.jpg",
    width: 1600,
    height: 1131,
  },
  {
    title: "Certificado de Renovação CMEBE",
    description: "Modelo de certificação para renovação periódica da credencial ministerial.",
    image: "/images/credenciais/certificado-renovacao-modelo.jpg",
    width: 1600,
    height: 1131,
  },
];

export default function CredenciaisPage() {
  const documentsWhatsapp = buildWhatsappUrl(
    "Olá, gostaria de orientações sobre os documentos para filiação e emissão de credencial do CMEBE.",
  );

  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <section className="band-navy relative overflow-hidden border-b border-gold-500/20">
          <div className="seal-watermark opacity-[0.025]" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="cmebe-eyebrow !text-gold-300">Identidade e transparência</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Credenciais e Certificados Oficiais CMEBE
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-brand-100 sm:text-lg">
                Conheça as credenciais ministeriais e de capelania, os certificados institucionais e a documentação oficial do conselho com proteção de dados sensíveis.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#modelos" className="btn btn-gold">
                  <IdCard className="h-4 w-4" aria-hidden />
                  Ver modelos
                </Link>
                <Link href="#estatuto" className="btn btn-ghost-light">
                  <FileText className="h-4 w-4" aria-hidden />
                  Consultar Estatuto
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="modelos" className="section bg-paper">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Modelos institucionais"
              title="Credenciais e certificados"
              description="Conheça as artes oficiais de credenciais e certificados. Todos os nomes, números e demais dados exibidos nos exemplos são fictícios."
              align="center"
            />

            <div className="mt-12 grid gap-7 lg:grid-cols-2">
              {credentialModels.map((model) => (
                <article
                  key={model.title}
                  className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_48px_rgba(12,35,72,0.08)]"
                >
                  <div className="relative flex min-h-72 items-center bg-[linear-gradient(135deg,#f7f9fd,#edf2f9)] p-4 sm:p-6">
                    <span className="absolute left-6 top-6 z-10 rounded-full border border-gold-500/40 bg-brand-950/90 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.13em] text-gold-200 shadow-lg">
                      Dados fictícios
                    </span>
                    <Image
                      src={model.image}
                      alt={model.title}
                      width={model.width}
                      height={model.height}
                      className="aspect-[1.42/1] w-full rounded-lg border border-black/10 object-contain shadow-lg"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="border-t border-line px-5 py-4 sm:px-6">
                    <h2 className="font-display text-lg font-semibold text-ink">{model.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-body">{model.description}</p>
                    <Link
                      href={model.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.11em] text-brand-800 transition hover:text-gold-700"
                      aria-label={`Ampliar ${model.title}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      Ampliar arte
                    </Link>
                  </div>
                </article>
              ))}
              <aside id="certificados" className="flex flex-col justify-center rounded-2xl border border-gold-500/30 bg-gold-100/35 p-6 sm:p-8 lg:col-span-2">
                <BadgeCheck className="h-9 w-9 text-gold-700" aria-hidden />
                <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
                  Emissão controlada
                </h2>
                <p className="mt-3 text-sm leading-7 text-body">
                  As artes demonstram a apresentação das credenciais e certificados, mas não comprovam vínculo por si sós. Validade, numeração, função, cargo e demais dados são definidos pelo CMEBE após aprovação institucional.
                </p>
                <p className="mt-3 text-xs leading-6 text-muted">
                  Campos, cores e acabamento podem receber ajustes na versão final emitida.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section id="documentos" className="section border-y border-line bg-surface">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Filiação CMEBE"
                title="Documentos necessários"
                description="Prepare os arquivos antes de iniciar ou concluir a análise da sua solicitação."
              />

              <ol className="mt-8 grid gap-3">
                {requiredDocuments.map((document, index) => (
                  <li key={document} className="flex gap-4 rounded-xl border border-line bg-white p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-body">{document}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-5">
                <p className="text-sm font-semibold text-brand-950">Dispensa da ata de consagração</p>
                <p className="mt-2 text-sm leading-6 text-body">
                  Diáconos, presbíteros, membros e seminaristas não precisam apresentar a ata de consagração, salvo se o conselho solicitar esclarecimento adicional durante a análise.
                </p>
              </div>
            </div>

            <div className="space-y-5 lg:pt-10">
              <article className="rounded-2xl bg-brand-950 p-6 text-white sm:p-8">
                <ShieldCheck className="h-9 w-9 text-gold-300" aria-hidden />
                <h2 className="mt-5 font-display text-2xl font-semibold text-white">
                  Envio seguro dos documentos
                </h2>
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-brand-100">
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden />
                    Digitalize os documentos com boa legibilidade e salve cada arquivo em PDF.
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden />
                    Não envie fotografias soltas, documentos cortados ou arquivos ilegíveis.
                  </li>
                  <li className="flex gap-3">
                    <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden />
                    Envie dados pessoais somente quando solicitado, pelo WhatsApp institucional. Nunca pelo Instagram ou em comentários públicos.
                  </li>
                </ul>
                <Link
                  href={documentsWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold mt-7 w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Falar no WhatsApp {institution.phone}
                </Link>
              </article>

              <p className="rounded-xl border border-line bg-white p-5 text-xs leading-6 text-muted">
                Esta página não publica documentos pessoais de filiados. As credenciais e os certificados exibidos usam dados declaradamente fictícios; o Estatuto permanece em versão pública sanitizada.
              </p>
            </div>
          </div>
        </section>

        <section id="estatuto" className="section bg-paper">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-10 rounded-3xl border border-line bg-white p-6 shadow-[0_18px_60px_rgba(12,35,72,0.08)] sm:p-10 lg:grid-cols-[0.72fr_1.28fr] lg:p-12">
              <div className="flex min-h-72 items-center justify-center rounded-2xl border border-gold-500/30 bg-[linear-gradient(145deg,#0c2348,#163c78)] p-8 text-center text-white">
                <div>
                  <FileText className="mx-auto h-14 w-14 text-gold-300" aria-hidden />
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
                    Documento institucional
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold text-white">Estatuto CMEBE</p>
                  <p className="mt-2 text-sm text-brand-100">Versão pública protegida</p>
                </div>
              </div>

              <div>
                <p className="cmebe-eyebrow">Transparência com privacidade</p>
                <h2 className="mt-5 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  Estatuto do CMEBE
                </h2>
                <p className="mt-4 text-sm leading-7 text-body sm:text-base">
                  A versão disponível para consulta preserva o conteúdo estatutário e remove assinaturas, rubricas, CPFs, selos, QR codes, códigos de autenticação e contatos de terceiros presentes no documento registrado.
                </p>
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="flex gap-3 text-sm leading-6 text-emerald-900">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    A cópia pública foi revisada página a página para evitar exposição indevida de dados pessoais e elementos de assinatura.
                  </p>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/documents/estatuto-cmebe-versao-publica.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    Abrir Estatuto (PDF)
                  </Link>
                  <a
                    href="/documents/estatuto-cmebe-versao-publica.pdf"
                    download
                    className="btn btn-secondary"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Baixar versão pública
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
