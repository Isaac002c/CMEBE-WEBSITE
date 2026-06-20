import Image from "next/image";
import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";

import { institution, quickLinks } from "@/data/institution";
import { buildWhatsappUrl, joinMessage } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d9e5f5] bg-[#0c2348] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={institution.logo}
              alt="Logo CMEBE"
              width={72}
              height={72}
              className="h-16 w-16 rounded-full border border-[#f2dc99]/50 object-cover"
            />
            <div>
              <p className="text-2xl font-black text-white">{institution.shortName}</p>
              <p className="mt-1 max-w-md text-sm leading-6 text-zinc-300">
                {institution.fullName}
              </p>
            </div>
          </div>
          <p className="mt-6 text-xl font-bold text-[#f2dc99]">“{institution.slogan}”</p>
          <p className="mt-4 max-w-xl leading-7 text-zinc-400">
            Conselho ministerial voltado à união, formação, credenciamento e
            fortalecimento de ministros evangélicos no Brasil e no exterior.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#f2dc99]">
            Links rápidos
          </h3>
          <nav className="mt-5 grid gap-3">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-blue-50/75 transition hover:text-[#f2dc99]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#f2dc99]">
            Contato
          </h3>
          <div className="mt-5 grid gap-3 text-sm leading-7 text-zinc-300">
            <p>{institution.phone}</p>
            <p>{institution.address}</p>
            <p>CNPJ: {institution.cnpj}</p>
          </div>
          <div className="mt-5 flex gap-3">
            <Link
              href={buildWhatsappUrl(joinMessage)}
              target="_blank"
              aria-label="Abrir WhatsApp do CMEBE"
              className="luxe-button flex h-11 w-11 items-center justify-center rounded-full transition"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
            <Link
              href={institution.instagramUrl}
              target="_blank"
              aria-label="Abrir Instagram do CMEBE"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#f2dc99] hover:text-[#f2dc99]"
            >
              <Camera className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-blue-50/65">
          © {year} Chronostek. Todos os direitos reservados.
        </p>
        <p className="font-semibold text-blue-50/80">
          Website desenvolvido pela <span className="text-[#f2dc99]">Chronostek</span>.
        </p>
      </div>

      <div className="mx-auto mt-4 max-w-7xl text-xs leading-6 text-blue-50/45">
        O CMEBE mantém a titularidade sobre sua identidade institucional, textos,
        informações, marca e conteúdo publicado neste website. Projeto, design e
        desenvolvimento técnico realizados pela Chronostek.
      </div>
    </footer>
  );
}
