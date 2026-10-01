"use client";

import Link from "next/link";
import { Building2, Camera, Hash, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import type { FormEvent } from "react";

import { SectionHeading } from "@/components/SectionHeading";
import { institution } from "@/data/institution";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const contactItems = [
  { icon: MapPin, label: "Endereço", value: institution.address },
  {
    icon: Phone,
    label: "Telefone/WhatsApp",
    value: institution.phone,
    href: buildWhatsappUrl("Olá, gostaria de falar com o CMEBE."),
  },
  { icon: Hash, label: "CNPJ", value: institution.cnpj },
  {
    icon: Camera,
    label: "Instagram",
    value: `@${institution.instagram}`,
    href: institution.instagramUrl,
  },
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
    <section id="contato" className="section border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contato"
          title="Fale com o CMEBE"
          description="Entre em contato para informações sobre filiação, credenciais, cursos e agenda institucional."
          align="center"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <dl className="divide-y divide-line border-y border-line">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 py-4">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                      {item.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink">
                      {"href" in item && item.href ? (
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-gold-500/50 underline-offset-4 transition hover:text-brand-700"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-5 overflow-hidden rounded-md border border-line">
              <iframe
                title="Mapa com o endereço do CMEBE"
                src="https://www.google.com/maps?q=Estrada%20de%20Sepetiba%205236%20Sepetiba%20Rio%20de%20Janeiro%20RJ%2023545-003&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="cmebe-card p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={buildWhatsappUrl("Olá, gostaria de falar com o CMEBE.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex-1"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
              <Link
                href={institution.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex-1"
              >
                <Camera className="h-4 w-4" />
                Instagram
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <label className="block">
                <span className="field-label">Nome</span>
                <input name="nome" required className="field" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="field-label">Telefone/WhatsApp</span>
                  <input name="telefone" required className="field" />
                </label>
                <label className="block">
                  <span className="field-label">E-mail</span>
                  <input name="email" type="email" className="field" />
                </label>
              </div>
              <label className="block">
                <span className="field-label">Mensagem</span>
                <textarea name="mensagem" required rows={5} className="field" />
              </label>
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                <Send className="h-4 w-4" />
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
