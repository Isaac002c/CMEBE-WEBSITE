"use client";

import { Search, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { PartnerCard } from "@/components/partners/PartnerCard";
import type { PublicPartner } from "@/lib/partners-public";

const ALL = "Todos";

export function PartnersDirectory({ partners }: { partners: PublicPartner[] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(ALL);
  const [segment, setSegment] = useState(ALL);
  const [location, setLocation] = useState(ALL);

  const types = useMemo(
    () => [ALL, ...Array.from(new Set(partners.map((p) => p.partnerType).filter(Boolean)))],
    [partners],
  );
  const segments = useMemo(
    () => [
      ALL,
      ...Array.from(
        new Set(
          partners
            .map((p) => p.businessSegment)
            .filter((s): s is string => Boolean(s && s.trim())),
        ),
      ),
    ],
    [partners],
  );
  const locations = useMemo(
    () => [ALL, ...Array.from(new Set(partners.map((p) => `${p.city}/${p.state}`)))],
    [partners],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return partners.filter((p) => {
      const matchesSearch =
        term.length === 0 ||
        p.institutionName.toLocaleLowerCase("pt-BR").includes(term);
      const matchesType = type === ALL || p.partnerType === type;
      const matchesSegment = segment === ALL || p.businessSegment === segment;
      const matchesLocation = location === ALL || `${p.city}/${p.state}` === location;
      return matchesSearch && matchesType && matchesSegment && matchesLocation;
    });
  }, [partners, search, type, segment, location]);

  const hasSegments = segments.length > 1;

  return (
    <div>
      <div className="rounded-md border border-line bg-surface p-4 sm:p-5">
        <div
          className={`grid gap-3 ${hasSegments ? "lg:grid-cols-[1.4fr_1fr_1fr_1fr]" : "lg:grid-cols-[1.4fr_1fr_1fr]"}`}
        >
          <label className="relative block">
            <span className="sr-only">Buscar por nome</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome"
              className="field pl-9"
            />
          </label>
          <FilterSelect label="Tipo de parceiro" value={type} onChange={setType} options={types} />
          {hasSegments ? (
            <FilterSelect label="Ramo/segmento" value={segment} onChange={setSegment} options={segments} />
          ) : null}
          <FilterSelect label="Cidade/estado" value={location} onChange={setLocation} options={locations} />
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-muted">
        {filtered.length} associado(s) encontrado(s)
      </p>

      {filtered.length === 0 ? (
        <div className="mx-auto mt-4 flex max-w-md flex-col items-center gap-3 rounded-md border border-dashed border-line bg-surface py-14 text-center">
          <Users className="h-7 w-7 text-brand-200" aria-hidden />
          <p className="font-display text-lg font-semibold text-ink">
            Nenhum associado encontrado
          </p>
          <p className="max-w-sm text-sm leading-7 text-body">
            Ajuste a busca ou os filtros para ver outros resultados.
          </p>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      )}
    </div>
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
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field">
        {options.map((option) => (
          <option key={option} value={option}>
            {option === ALL ? label : option}
          </option>
        ))}
      </select>
    </label>
  );
}
