import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { institution } from "@/data/institution";
import { buildWhatsappUrl, joinMessage } from "@/lib/whatsapp";

// Numeração real: estas são etapas sequenciais do processo de filiação.
const steps = [
  {
    n: "1",
    title: "Crie sua conta e envie a solicitação",
    text: "Preencha seus dados ministeriais. A solicitação entra como pendente de análise.",
  },
  {
    n: "2",
    title: "Análise pelo CMEBE",
    text: "A equipe avalia os dados e pode solicitar documentos adicionais.",
  },
  {
    n: "3",
    title: "Aprovação e credenciamento",
    text: "Após aprovada, a filiação recebe número e reconhecimento institucional.",
  },
  {
    n: "4",
    title: "Publicação no diretório",
    text: "Com sua autorização, o perfil pode aparecer na área pública de filiados.",
  },
];

export function JoinSection() {
  return (
    <section id="filiacao" className="section bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Filiação"
            title="Inicie sua solicitação de filiação"
            description="A filiação ao CMEBE é feita por um processo transparente: você cria sua conta, acompanha o status e o conselho analisa cada solicitação."
          />

          <ol className="mt-10 space-y-5">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-200 font-display text-sm font-semibold text-brand-800">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-7 text-body">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:pt-4">
          <div className="cmebe-card p-7 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              Solicite sua filiação
            </h3>
            <p className="mt-2 text-sm leading-7 text-body">
              Crie sua conta para enviar a solicitação e acompanhar o andamento na
              área “Minha filiação”.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/cadastro" className="btn btn-primary w-full">
                Criar conta e solicitar filiação
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/entrar" className="btn btn-secondary w-full">
                Já tenho conta — entrar
              </Link>
              <Link
                href="/credenciais#documentos"
                className="text-center text-sm font-semibold text-brand-800 underline decoration-gold-500/50 underline-offset-4"
              >
                Consultar documentos necessários e modelos
              </Link>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 rounded-md border border-line bg-surface px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-ink">Precisa de ajuda?</p>
              <p className="text-xs text-muted">
                Suporte pelo WhatsApp {institution.phone}
              </p>
            </div>
            <Link
              href={buildWhatsappUrl(joinMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary h-10 px-4 text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
