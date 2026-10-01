"use client";

import { AlertCircle, Loader2, Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AffiliateCard } from "@/components/AffiliateCard";
import { SectionHeading } from "@/components/SectionHeading";
import type { PublicAffiliate } from "@/lib/affiliates-public";

const ALL = "Todos";
type Status = "loading" | "ready" | "error";

export function AffiliatesSection() {
  const [status, setStatus] = useState<Status>("loading");
  const [affiliates, setAffiliates] = useState<PublicAffiliate[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(ALL);
  const [location, setLocation] = useState(ALL);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    fetch("/api/affiliates")
      .then((res) => {
        if (!res.ok) throw new Error("falha");
        return res.json();
      })
      .then((data: { affiliates: PublicAffiliate[] }) => {
        if (!active) return;
        setAffiliates(data.affiliates ?? []);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  const roles = useMemo(
    () => [ALL, ...Array.from(new Set(affiliates.map((a) => a.ministerialRole)))],
    [affiliates],
  );
  const locations = useMemo(
    () => [ALL, ...Array.from(new Set(affiliates.map((a) => `${a.city}/${a.state}`)))],
    [affiliates],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return affiliates.filter((a) => {
      const matchesSearch =
        term.length === 0 || a.name.toLocaleLowerCase("pt-BR").includes(term);
      const matchesRole = role === ALL || a.ministerialRole === role;
      const matchesLocation = location === ALL || `${a.city}/${a.state}` === location;
      return matchesSearch && matchesRole && matchesLocation;
    });
  }, [affiliates, search, role, location]);

  return (
    <section id="filiados" className="section border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Filiados CMEBE"
          title="Diretório oficial de filiados"
          description="Ministros, líderes e associados com filiação aprovada e exibição autorizada pelo conselho."
          align="center"
        />

        <div className="mt-10 rounded-md border border-line bg-paper p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
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
            <FilterSelect label="Função ministerial" value={role} onChange={setRole} options={roles} />
            <FilterSelect label="Cidade/estado" value={location} onChange={setLocation} options={locations} />
          </div>
        </div>

        <div className="mt-10">
          {status === "loading" ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
              <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
              <p className="text-sm">Carregando filiados…</p>
            </div>
          ) : status === "error" ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-md border border-line bg-paper py-14 text-center">
              <AlertCircle className="h-6 w-6 text-gold-700" aria-hidden />
              <p className="text-sm font-medium text-ink">
                Não foi possível carregar os filiados agora.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn btn-secondary h-10 px-4 text-sm"
              >
                Tentar novamente
              </button>
            </div>
          ) : affiliates.length === 0 ? (
            <EmptyState
              title="Ainda não há filiados publicados"
              text="Assim que houver filiações aprovadas e autorizadas para exibição pública, elas aparecerão aqui."
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="Nenhum filiado encontrado"
              text="Ajuste a busca ou os filtros para ver outros resultados."
            />
          ) : (
            <>
              <p className="mb-6 text-sm font-medium text-muted">
                {filtered.length} filiado(s) encontrado(s)
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((affiliate) => (
                  <AffiliateCard key={affiliate.id} affiliate={affiliate} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-md border border-dashed border-line bg-paper py-16 text-center">
      <Users className="h-7 w-7 text-brand-200" aria-hidden />
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      <p className="max-w-sm text-sm leading-7 text-body">{text}</p>
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === ALL ? label : option}
          </option>
        ))}
      </select>
    </label>
  );
}
