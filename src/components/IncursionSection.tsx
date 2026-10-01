import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPinned, Route, UsersRound } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { incursion } from "@/data/incursion";

export function IncursionSection() {
  return (
    <section id="incursao-cmebe" className="section overflow-hidden border-y border-line bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 rotate-2 rounded-3xl bg-gold-500/15" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl border border-gold-500/35 bg-brand-950 p-2 shadow-[0_24px_70px_rgba(12,35,72,0.2)]">
            <Image
              src={incursion.cover}
              alt="Arte da Incursão CMEBE pelo Reino com o mapa das cidades visitadas"
              width={1024}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Presença que aproxima"
            title="Incursão CMEBE pelo Reino"
            description="Uma jornada de cuidado, comunhão e fortalecimento dos ministérios filiados. A iniciativa aproxima lideranças, honra trajetórias e amplia a presença institucional do CMEBE."
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-white p-4">
              <MapPinned className="h-5 w-5 text-gold-700" aria-hidden />
              <p className="mt-3 text-2xl font-semibold text-brand-950">6 cidades</p>
              <p className="mt-1 text-xs leading-5 text-muted">visitadas em São Paulo e no Rio de Janeiro</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-4">
              <Route className="h-5 w-5 text-gold-700" aria-hidden />
              <p className="mt-3 text-2xl font-semibold text-brand-950">2 estados</p>
              <p className="mt-1 text-xs leading-5 text-muted">conectados pela missão ministerial</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-4">
              <UsersRound className="h-5 w-5 text-gold-700" aria-hidden />
              <p className="mt-3 text-2xl font-semibold text-brand-950">1 propósito</p>
              <p className="mt-1 text-xs leading-5 text-muted">unir e cuidar de ministérios</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Cidades visitadas">
            {incursion.cities.map((place) => (
              <span
                key={`${place.city}-${place.state}`}
                className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800"
              >
                {place.city} · {place.state}
              </span>
            ))}
          </div>

          <Link href="/incursao-cmebe" className="btn btn-primary mt-8">
            Conhecer a jornada e ver fotos
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
