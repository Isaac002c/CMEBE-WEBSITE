"use client";

import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import type { FormEvent } from "react";

import { SectionHeading } from "@/components/SectionHeading";
import { institution } from "@/data/institution";
import { buildWhatsappUrl, joinMessage } from "@/lib/whatsapp";

const fields = [
  { name: "nome", label: "Nome completo", type: "text", required: true },
  { name: "telefone", label: "Telefone/WhatsApp", type: "tel", required: true },
  { name: "email", label: "E-mail", type: "email", required: true },
  { name: "cidade", label: "Cidade/Estado", type: "text", required: true },
  { name: "funcao", label: "Função ministerial", type: "text", required: true },
  { name: "igreja", label: "Igreja/Ministério", type: "text", required: true },
] as const;

export function JoinSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      joinMessage,
      "",
      "Dados para filiação:",
      `Nome completo: ${formData.get("nome") ?? ""}`,
      `Telefone/WhatsApp: ${formData.get("telefone") ?? ""}`,
      `E-mail: ${formData.get("email") ?? ""}`,
      `Cidade/Estado: ${formData.get("cidade") ?? ""}`,
      `Função ministerial: ${formData.get("funcao") ?? ""}`,
      `Igreja/Ministério: ${formData.get("igreja") ?? ""}`,
      `Mensagem: ${formData.get("mensagem") ?? ""}`,
    ].join("\n");

    window.open(buildWhatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="filiacao" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Filie-se já"
            title="Faça parte do CMEBE"
            description="Junte-se a uma rede de ministros, líderes e vocacionados comprometidos com a expansão do Reino."
          />

          <div className="brand-panel relative mt-8 overflow-hidden rounded-lg p-7 text-white shadow-[0_28px_70px_rgba(22,60,120,0.18)]">
            <div className="absolute inset-y-0 left-0 w-1 bg-[#c99a2e]" />
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f2dc99]">
              Atendimento via WhatsApp
            </p>
            <h3 className="mt-3 text-2xl font-bold">Quero me filiar agora</h3>
            <p className="mt-3 leading-7 text-blue-50/85">
              Fale com a equipe pelo número {institution.phone} e receba orientação
              sobre documentação, benefícios e próximos passos.
            </p>
            <Link
              href={buildWhatsappUrl(joinMessage)}
              target="_blank"
              className="luxe-button mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-extrabold transition sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Quero me filiar agora
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="premium-shadow rounded-lg border border-[#d9e5f5] bg-white p-5 sm:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className="block">
                <span className="text-sm font-bold text-[#102b5c]">{field.label}</span>
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  className="mt-2 h-12 w-full rounded-lg border border-[#d9e5f5] bg-[#f7faff] px-4 text-sm font-medium text-[#102b5c] outline-none transition placeholder:text-slate-400 focus:border-[#c99a2e] focus:bg-white focus:ring-4 focus:ring-[#f2dc99]/45"
                />
              </label>
            ))}
            <label className="block md:col-span-2">
              <span className="text-sm font-bold text-[#102b5c]">Mensagem</span>
              <textarea
                name="mensagem"
                rows={5}
                className="mt-2 w-full resize-none rounded-lg border border-[#d9e5f5] bg-[#f7faff] px-4 py-3 text-sm font-medium text-[#102b5c] outline-none transition placeholder:text-slate-400 focus:border-[#c99a2e] focus:bg-white focus:ring-4 focus:ring-[#f2dc99]/45"
              />
            </label>
          </div>

          <button
            type="submit"
            className="blue-button mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-extrabold transition hover:-translate-y-0.5 sm:w-auto"
          >
            <Send className="h-5 w-5" />
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
