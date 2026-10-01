"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronDown, LogIn, Menu, MessageCircle, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { officialEvents } from "@/data/events";
import { associadosLink, beneficiosLink, institution, quickLinks } from "@/data/institution";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type Me = { name: string; role: string } | null;

const highlightedEvent = officialEvents.find((event) => event.id === "encontro-oracao")!;

function areaFor(role: string) {
  switch (role) {
    case "MASTER":
      return { href: "/master", area: "Painel Master", label: "Master" };
    case "ADMIN":
      return { href: "/admin", area: "Painel admin", label: "Administrador" };
    case "PARTNER":
      return { href: "/minha-area", area: "Minha área", label: "Parceiro" };
    default:
      return { href: "/minha-filiacao", area: "Minha filiação", label: "Afiliado" };
  }
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [me, setMe] = useState<Me | undefined>(undefined); // undefined = carregando
  const [userMenu, setUserMenu] = useState(false);
  const [showEventNotice, setShowEventNotice] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => active && setMe(d.user ?? null))
      .catch(() => active && setMe(null));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const expiration = Date.parse(
      highlightedEvent.endsAt ?? highlightedEvent.isoDate,
    );
    const remaining = expiration - Date.now();

    if (remaining <= 0) return;

    setShowEventNotice(true);
    const timeout = window.setTimeout(() => setShowEventNotice(false), remaining);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenu(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const close = () => {
    setIsOpen(false);
    setUserMenu(false);
  };

  const area = me ? areaFor(me.role) : null;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="h-[3px] bg-[linear-gradient(90deg,#163c78_0%,#c99a2e_50%,#163c78_100%)]" />
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo + nome */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Início" onClick={close}>
          <Image
            src={institution.logo}
            alt="Logo do CMEBE"
            width={44}
            height={44}
            className="h-10 w-10 rounded-full border border-line object-cover"
            priority
          />
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-wide text-ink">
              {institution.shortName}
            </span>
            <span className="mt-0.5 hidden text-[0.66rem] font-medium text-muted sm:block">
              Conselho de Ministros Evangélicos
            </span>
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center xl:flex" aria-label="Navegação principal">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-body transition hover:bg-brand-50 hover:text-brand-800"
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden />
          <Link
            href={beneficiosLink.href}
            className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-gold-700 transition hover:bg-brand-50"
          >
            {beneficiosLink.label}
          </Link>
        </nav>

        {/* Ações desktop (login/estado) */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <Link
            href={buildWhatsappUrl("Olá, gostaria de falar com o CMEBE.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp CMEBE ${institution.phone}`}
            className="flex h-10 items-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-brand-800 transition hover:border-brand-600"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            <span className="hidden 2xl:inline">{institution.phone}</span>
          </Link>
          {me === undefined ? (
            <span className="h-9 w-40 animate-pulse rounded-md bg-brand-50" aria-hidden />
          ) : me && area ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setUserMenu((v) => !v)}
                className="flex items-center gap-2 rounded-md border border-line px-2.5 py-1.5 text-left transition hover:border-brand-200"
                aria-expanded={userMenu}
                aria-haspopup="menu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-white">
                  <User className="h-4 w-4" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block max-w-[140px] truncate text-sm font-semibold text-ink">
                    {me.name.split(" ")[0]}
                  </span>
                  <span className="block text-[0.66rem] font-medium uppercase tracking-wide text-gold-700">
                    {area.label}
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 text-muted" aria-hidden />
              </button>
              {userMenu ? (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-52 overflow-hidden rounded-md border border-line bg-white shadow-lg"
                >
                  <Link
                    href={area.href}
                    onClick={close}
                    className="block px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-brand-50"
                    role="menuitem"
                  >
                    {area.area}
                  </Link>
                  <div className="border-t border-line px-4 py-2">
                    <LogoutButton />
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <Link href="/entrar" className="btn btn-secondary h-10 px-4 text-sm">
                <LogIn className="h-4 w-4" />
                Entrar
              </Link>
            </>
          )}
        </div>

        {/* Botão mobile */}
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line text-brand-800 transition hover:border-brand-600 xl:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {showEventNotice ? (
        <Link
          href="/agenda/encontro-oracao"
          onClick={close}
          className="group flex min-h-10 items-center justify-center gap-2 bg-brand-950 px-4 py-2 text-center text-[0.7rem] font-semibold text-white transition hover:bg-brand-900 sm:gap-3 sm:text-xs"
        >
          <CalendarDays className="h-4 w-4 shrink-0 text-gold-300" aria-hidden />
          <span className="rounded-full border border-gold-300/30 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-gold-300">
            Evento em destaque
          </span>
          <span className="truncate">Encontro de Oração da Nação</span>
          <span className="hidden text-brand-200 md:inline">1º de outubro · 9h</span>
          <span className="hidden font-bold text-gold-300 sm:inline group-hover:text-gold-100">
            Ver detalhes →
          </span>
        </Link>
      ) : null}

      {/* Menu mobile */}
      {isOpen ? (
        <div className="border-t border-line bg-white px-4 py-4 xl:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1" aria-label="Menu">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-md px-4 py-3 text-sm font-medium text-body transition hover:bg-brand-50 hover:text-brand-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={beneficiosLink.href}
              onClick={close}
              className="rounded-md border-l-2 border-gold-500 px-4 py-3 text-sm font-semibold text-gold-700 transition hover:bg-brand-50"
            >
              {beneficiosLink.label}
            </Link>
            <Link
              href={associadosLink.href}
              onClick={close}
              className="rounded-md px-4 py-3 text-sm font-medium text-body transition hover:bg-brand-50 hover:text-brand-800"
            >
              {associadosLink.label}
            </Link>

            <div className="mt-2 border-t border-line pt-3">
              {me === undefined ? null : me && area ? (
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 px-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-white">
                      <User className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-semibold text-ink">{me.name}</span>
                      <span className="block text-[0.66rem] font-medium uppercase tracking-wide text-gold-700">
                        {area.label}
                      </span>
                    </span>
                  </div>
                  <Link href={area.href} onClick={close} className="btn btn-primary text-sm">
                    {area.area}
                  </Link>
                  <div className="px-1">
                    <LogoutButton />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/entrar" onClick={close} className="btn btn-secondary text-sm">
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </Link>
                  <Link href="/cadastro" onClick={close} className="btn btn-primary text-sm">
                    Solicitar filiação
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
