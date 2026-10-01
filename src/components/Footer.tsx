import Image from "next/image";
import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";

import { associadosLink, beneficiosLink, institution, quickLinks } from "@/data/institution";
import { buildWhatsappUrl, joinMessage } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="cmebe-rule-gold mx-auto mb-12 max-w-6xl" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={institution.logo}
              alt="Logo do CMEBE"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border border-gold-500/40 object-cover"
            />
            <div>
              <p className="font-display text-xl font-semibold text-white">
                {institution.shortName}
              </p>
              <p className="mt-0.5 max-w-xs text-xs leading-5 text-brand-100">
                {institution.fullName}
              </p>
            </div>
          </div>
          <p className="mt-5 font-display text-lg font-medium italic text-gold-300">
            “{institution.slogan}”
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-brand-100">
            Conselho ministerial voltado à união, formação, credenciamento e
            fortalecimento de ministros evangélicos no Brasil e no exterior.
          </p>
          <div className="mt-6 flex gap-2">
            <Link
              href={buildWhatsappUrl(joinMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir WhatsApp do CMEBE"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white transition hover:border-gold-300 hover:text-gold-300"
            >
              <MessageCircle className="h-4 w-4" />
            </Link>
            <Link
              href={institution.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram do CMEBE"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white transition hover:border-gold-300 hover:text-gold-300"
            >
              <Camera className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
            Navegação
          </h3>
          <nav className="mt-4 grid gap-2.5">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-brand-100 transition hover:text-gold-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={associadosLink.href}
              className="text-sm text-brand-100 transition hover:text-gold-300"
            >
              {associadosLink.label}
            </Link>
            <Link
              href="/filiados"
              className="text-sm text-brand-100 transition hover:text-gold-300"
            >
              Filiados CMEBE
            </Link>
            <Link
              href="/escola-de-profetas"
              className="text-sm text-brand-100 transition hover:text-gold-300"
            >
              Escola de Profetas
            </Link>
            <Link
              href="/incursao-cmebe"
              className="text-sm font-semibold text-gold-300 transition hover:text-gold-100"
            >
              Incursão CMEBE
            </Link>
            <Link
              href="/edital"
              className="text-sm font-semibold text-gold-300 transition hover:text-gold-100"
            >
              Edital de convocação
            </Link>
            <Link
              href="/parceria"
              className="text-sm text-brand-100 transition hover:text-gold-300"
            >
              Solicitar parceria
            </Link>
            <Link
              href={beneficiosLink.href}
              className="text-sm font-medium text-gold-300 transition hover:text-gold-100"
            >
              {beneficiosLink.label}
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
            Acesso e contato
          </h3>
          <nav className="mt-4 grid gap-2.5">
            <Link href="/cadastro" className="text-sm text-brand-100 transition hover:text-gold-300">
              Solicitar filiação
            </Link>
            <Link href="/entrar" className="text-sm text-brand-100 transition hover:text-gold-300">
              Entrar / Minha filiação
            </Link>
          </nav>
          <div className="mt-4 grid gap-1.5 text-sm leading-6 text-brand-100">
            <Link
              href={`tel:+${institution.whatsappNumber}`}
              className="transition hover:text-gold-300"
            >
              {institution.phone}
            </Link>
            <p>CNPJ: {institution.cnpj}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} CMEBE. Todos os direitos reservados.</p>
        <p>
          Desenvolvido pela{" "}
          <span className="font-medium text-gold-300">Telun</span>.
        </p>
      </div>
    </footer>
  );
}
