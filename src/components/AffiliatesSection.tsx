"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { AffiliateCard } from "@/components/AffiliateCard";
import { SectionHeading } from "@/components/SectionHeading";
import { affiliateBenefits, affiliates } from "@/data/affiliates";

const all = "Todos";

export function AffiliatesSection() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(all);
  const [location, setLocation] = useState(all);
  const [status, setStatus] = useState(all);

  const roles = useMemo(
    () => [all, ...Array.from(new Set(affiliates.map((affiliate) => affiliate.role)))],
    [],
  );

  const locations = useMemo(
    () => [
      all,
      ...Array.from(
        new Set(affiliates.map((affiliate) => `${affiliate.city}/${affiliate.state}`)),
      ),
    ],
    [],
  );

  const statuses = useMemo(
    () => [all, ...Array.from(new Set(affiliates.map((affiliate) => affiliate.status)))],
    [],
  );

  const filteredAffiliates = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

    return affiliates.filter((affiliate) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        affiliate.name.toLocaleLowerCase("pt-BR").includes(normalizedSearch);
      const matchesRole = role === all || affiliate.role === role;
      const matchesLocation =
        location === all || `${affiliate.city}/${affiliate.state}` === location;
      const matchesStatus = status === all || affiliate.status === status;

      return matchesSearch && matchesRole && matchesLocation && matchesStatus;
    });
  }, [location, role, search, status]);

  return (
    <section id="filiados" className="soft-section px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Filiados CMEBE"
          title="Área preparada para ministros, líderes e associados filiados."
          description="Os dados abaixo são exemplos fictícios e genéricos. A estrutura já está pronta para ser substituída por dados reais vindos de API, banco de dados, CMS ou painel administrativo."
          align="center"
        />

        <div className="premium-shadow mt-10 rounded-lg border border-[#d9e5f5] bg-white p-5">
          <div className="flex items-center gap-3 text-[#102b5c]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf2ff] text-[#b88924]">
              <SlidersHorizontal className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold">Filtros de filiados</h3>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <label className="relative block">
              <span className="sr-only">Buscar por nome</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nome"
                className="h-12 w-full rounded-lg border border-[#d9e5f5] bg-[#f7faff] pl-12 pr-4 text-sm font-medium text-[#102b5c] outline-none transition placeholder:text-slate-400 focus:border-[#c99a2e] focus:bg-white focus:ring-4 focus:ring-[#f2dc99]/45"
              />
            </label>

            <FilterSelect label="Função ministerial" value={role} onChange={setRole} options={roles} />
            <FilterSelect label="Estado/cidade" value={location} onChange={setLocation} options={locations} />
            <FilterSelect label="Status" value={status} onChange={setStatus} options={statuses} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-zinc-600">
            {filteredAffiliates.length} filiado(s) encontrado(s)
          </p>
          <p className="text-sm font-semibold text-[#b88924]">Dados demonstrativos</p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredAffiliates.map((affiliate) => (
            <AffiliateCard key={affiliate.id} affiliate={affiliate} />
          ))}
        </div>

        <div className="brand-panel relative mt-12 overflow-hidden rounded-lg p-6 text-white shadow-[0_28px_70px_rgba(22,60,120,0.18)] sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f2dc99] via-[#c99a2e] to-[#f2dc99]" />
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f2dc99]">
                Para filiados
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight">
                Benefícios que fortalecem a caminhada ministerial.
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {affiliateBenefits.map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-blue-50"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-[#d9e5f5] bg-[#f7faff] px-4 text-sm font-semibold text-[#102b5c] outline-none transition focus:border-[#c99a2e] focus:bg-white focus:ring-4 focus:ring-[#f2dc99]/45"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === all ? label : option}
          </option>
        ))}
      </select>
    </label>
  );
}
