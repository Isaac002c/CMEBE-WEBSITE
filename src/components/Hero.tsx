import Image from "next/image";
import Link from "next/link";
import { ArrowDown, BadgeCheck, Globe2, MessageCircle, ShieldCheck } from "lucide-react";

import { institution } from "@/data/institution";
import { buildWhatsappUrl, joinMessage } from "@/lib/whatsapp";

const heroStats = [
  { label: "Fundado em", value: institution.foundedAt },
  { label: "Presidente", value: institution.president },
  { label: "Slogan", value: institution.slogan },
];

export function Hero() {
  return (
    <section id="inicio" className="hero-surface relative overflow-hidden text-[#102b5c]">
      <div className="hero-grid absolute inset-0 opacity-80" />
      <div className="hero-blue-field absolute inset-y-0 right-0 hidden w-[46%] lg:block" />
      <div className="gold-rule absolute inset-x-0 bottom-0 h-px" />

      <div className="relative mx-auto grid min-h-[calc(100svh-77px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.85fr] lg:gap-10 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9e5f5] bg-white/80 px-4 py-2 text-sm font-bold text-[#163c78] shadow-[0_12px_30px_rgba(22,60,120,0.08)] backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-[#c99a2e]" />
            Conselho ministerial cristão
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-[0.98] text-[#102b5c] sm:text-6xl lg:text-[5.2rem]">
            Bem-vindo ao <span className="gold-text">CMEBE</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-[#163c78] sm:text-2xl">
            {institution.fullName}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Unindo ministros, fortalecendo vocações e servindo ao Reino de Deus no
            Brasil e no exterior.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={buildWhatsappUrl(joinMessage)}
              target="_blank"
              className="blue-button inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-extrabold transition hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" />
              Filie-se já
            </Link>
            <Link
              href="#beneficios"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[#d9e5f5] bg-white px-7 text-base font-bold text-[#102b5c] shadow-[0_16px_34px_rgba(22,60,120,0.09)] transition hover:-translate-y-0.5 hover:border-[#c99a2e] hover:text-[#a87518]"
            >
              Conheça os benefícios
              <ArrowDown className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-10 hidden gap-3 border-y border-[#d9e5f5] py-5 sm:grid sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="border-l border-[#c99a2e] bg-white/70 p-4 backdrop-blur"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87518]">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-bold text-[#102b5c]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[480px] justify-center lg:justify-end">
          <div className="relative aspect-square w-[min(62vw,280px)] sm:w-[min(50vw,340px)] lg:w-[min(32vw,420px)]">
            <div className="absolute inset-0 rounded-full border border-[#f2dc99]/70 bg-white/40 shadow-[0_30px_90px_rgba(16,43,92,0.18)] backdrop-blur" />
            <div className="absolute inset-5 rounded-full border border-[#d9e5f5]" />
            <div className="absolute inset-10 rounded-full border border-[#c99a2e]/35" />
            <Image
              src={institution.logo}
              alt="Logo do CMEBE - Conselho de Ministros Evangélicos do Brasil e do Exterior"
              width={640}
              height={640}
              className="absolute inset-[13%] h-[74%] w-[74%] rounded-full object-cover shadow-[0_24px_70px_rgba(16,43,92,0.32)] ring-1 ring-[#f2dc99]"
              priority
            />
            <div className="brand-card absolute -bottom-2 left-0 right-0 mx-auto hidden max-w-sm gap-2 rounded-lg p-4 backdrop-blur sm:grid">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-[#c99a2e]" />
                <p className="text-sm font-medium leading-6 text-slate-700">
                  Credenciamento, formação e suporte para ministros evangélicos.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Globe2 className="mt-1 h-5 w-5 shrink-0 text-[#c99a2e]" />
                <p className="text-sm font-medium leading-6 text-slate-700">
                  Atuação voltada ao Brasil e ao exterior, com visão de unidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
