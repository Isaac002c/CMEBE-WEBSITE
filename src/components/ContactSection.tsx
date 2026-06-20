"use client";

import Link from "next/link";
import { Building2, Camera, Hash, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import type { FormEvent } from "react";

import { SectionHeading } from "@/components/SectionHeading";
import { institution } from "@/data/institution";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const contactItems = [
  { icon: MapPin, label: "Endereço", value: institution.address },
  { icon: Phone, label: "Telefone/WhatsApp", value: institution.phone },
  { icon: Hash, label: "CNPJ", value: institution.cnpj },
  { icon: Camera, label: "Instagram", value: `@${institution.instagram}` },
  { icon: Building2, label: "Instituição", value: institution.fullName },
];

export function ContactSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      "Olá, gostaria de falar com o CMEBE.",
      "",
      "Dados do contato:",
      `Nome: ${formData.get("nome") ?? ""}`,
      `Telefone/WhatsApp: ${formData.get("telefone") ?? ""}`,
      `E-mail: ${formData.get("email") ?? ""}`,
      `Mensagem: ${formData.get("mensagem") ?? ""}`,
    ].join("\n");

    window.open(buildWhatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="soft-section px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contato"
          title="Fale com o CMEBE"
          description="Entre em contato para informações sobre filiação, credenciais, cursos, validação de filiados e agenda institucional."
          align="center"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="premium-shadow flex items-start gap-4 rounded-lg border border-[#d9e5f5] bg-white p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#163c78] text-[#f2dc99]">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    {item.label}
                  </p>
                  <p className="mt-1 font-bold leading-7 text-[#102b5c]">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="premium-shadow rounded-lg border border-[#d9e5f5] bg-white p-3">
              <iframe
                title="Mapa com endereço do CMEBE"
                src="https://www.google.com/maps?q=Estrada%20de%20Sepetiba%205236%20Sepetiba%20Rio%20de%20Janeiro%20RJ%2023545-003&output=embed"
                className="h-72 w-full rounded-lg border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="brand-panel relative overflow-hidden rounded-lg p-5 text-white shadow-[0_28px_70px_rgba(22,60,120,0.18)] sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f2dc99] via-[#c99a2e] to-[#f2dc99]" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={buildWhatsappUrl("Olá, gostaria de falar com o CMEBE.")}
                target="_blank"
                className="luxe-button inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-extrabold transition"
              >
                <MessageCircle className="h-5 w-5" />
                Chamar no WhatsApp
              </Link>
              <Link
                href={institution.instagramUrl}
                target="_blank"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-bold text-white transition hover:border-[#f2dc99] hover:text-[#f2dc99]"
              >
                <Camera className="h-5 w-5" />
                Instagram
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <label className="block">
                <span className="text-sm font-bold text-zinc-100">Nome</span>
                <input
                  name="nome"
                  required
                  className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-white/[0.08] px-4 text-sm font-medium text-white outline-none transition placeholder:text-blue-100/50 focus:border-[#f2dc99] focus:ring-4 focus:ring-[#f2dc99]/15"
                />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-zinc-100">
                    Telefone/WhatsApp
                  </span>
                  <input
                    name="telefone"
                    required
                    className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-white/[0.08] px-4 text-sm font-medium text-white outline-none transition placeholder:text-blue-100/50 focus:border-[#f2dc99] focus:ring-4 focus:ring-[#f2dc99]/15"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-zinc-100">E-mail</span>
                  <input
                    name="email"
                    type="email"
                    className="mt-2 h-12 w-full rounded-lg border border-white/15 bg-white/[0.08] px-4 text-sm font-medium text-white outline-none transition placeholder:text-blue-100/50 focus:border-[#f2dc99] focus:ring-4 focus:ring-[#f2dc99]/15"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-bold text-zinc-100">Mensagem</span>
                <textarea
                  name="mensagem"
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-lg border border-white/15 bg-white/[0.08] px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-blue-100/50 focus:border-[#f2dc99] focus:ring-4 focus:ring-[#f2dc99]/15"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-extrabold text-[#102b5c] transition hover:-translate-y-0.5 hover:bg-[#fff9e8] sm:w-auto"
              >
                <Send className="h-5 w-5" />
                Enviar contato
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
