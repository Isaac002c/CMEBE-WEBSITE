"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

import { institution, quickLinks } from "@/data/institution";
import { buildWhatsappUrl, joinMessage } from "@/lib/whatsapp";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9e5f5] bg-white/95 text-[#102b5c] shadow-[0_10px_30px_rgba(22,60,120,0.08)] backdrop-blur-xl">
      <div className="h-1 bg-[linear-gradient(90deg,#163c78_0%,#c99a2e_48%,#163c78_100%)]" />
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#inicio"
          className="flex items-center gap-3"
          aria-label="Ir para o início"
          onClick={closeMenu}
        >
          <Image
            src={institution.logo}
            alt="Logo do CMEBE"
            width={56}
            height={56}
            className="h-12 w-12 rounded-full border border-[#d9e5f5] object-cover shadow-[0_8px_22px_rgba(22,60,120,0.14)]"
            priority
          />
          <span className="min-w-0">
            <span className="block text-lg font-black leading-none tracking-wide text-[#102b5c]">
              {institution.shortName}
            </span>
            <span className="hidden max-w-[260px] truncate text-xs font-medium text-zinc-500 sm:block">
              {institution.fullName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-[#eaf2ff] hover:text-[#102b5c]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={buildWhatsappUrl(joinMessage)}
            target="_blank"
            className="luxe-button inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-black transition hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" />
            Filie-se já
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d9e5f5] text-[#102b5c] transition hover:border-[#c99a2e] hover:text-[#b88924] lg:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[#d9e5f5] bg-white px-4 py-4 shadow-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Menu mobile">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#eaf2ff] hover:text-[#102b5c]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={buildWhatsappUrl(joinMessage)}
              target="_blank"
              onClick={closeMenu}
              className="luxe-button mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-black transition"
            >
              <MessageCircle className="h-4 w-4" />
              Filie-se já
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
