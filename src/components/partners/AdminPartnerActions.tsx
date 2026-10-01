"use client";

import { useRouter } from "next/navigation";
import { Check, Handshake, Loader2, Pencil, Power, X } from "lucide-react";
import { useState } from "react";

import { PARTNER_TYPES } from "@/lib/constants";
import { UFS } from "@/lib/validation";

type PartnerData = {
  id: string;
  institutionName: string;
  responsibleName: string;
  responsibleRole: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  partnerType: string;
  description: string;
  services: string;
  website: string | null;
  notes: string | null;
  status: string;
  active: boolean;
};

export function AdminPartnerActions({ partner }: { partner: PartnerData }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  async function run(action: string, payload: Record<string, unknown> = {}) {
    setLoading(action);
    setError(null);
    try {
      const res = await fetch(`/api/admin/partners/${partner.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Não foi possível concluir a ação.");
        setLoading(null);
        return;
      }
      setRejectOpen(false);
      setEditOpen(false);
      setReason("");
      setLoading(null);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(null);
    }
  }

  function onEditSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    run("edit", {
      institutionName: form.get("institutionName"),
      responsibleName: form.get("responsibleName"),
      responsibleRole: form.get("responsibleRole"),
      email: form.get("email"),
      phone: form.get("phone"),
      city: form.get("city"),
      state: form.get("state"),
      partnerType: form.get("partnerType"),
      description: form.get("description"),
      services: form.get("services"),
      website: form.get("website"),
      notes: form.get("notes"),
    });
  }

  const isApproved = partner.status === "APPROVED";

  return (
    <div className="grid gap-4">
      {error ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {partner.status !== "APPROVED" ? (
          <button onClick={() => run("approve")} disabled={!!loading} className="btn btn-primary h-10 px-4 text-sm disabled:opacity-60">
            {loading === "approve" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Aprovar
          </button>
        ) : null}

        {partner.status !== "REJECTED" ? (
          <button onClick={() => setRejectOpen((v) => !v)} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
            <X className="h-4 w-4" />
            Recusar
          </button>
        ) : null}

        {partner.status !== "NEGOTIATING" ? (
          <button onClick={() => run("negotiate")} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
            {loading === "negotiate" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Handshake className="h-4 w-4" />}
            Em negociação
          </button>
        ) : null}

        {isApproved ? (
          <button
            onClick={() => run(partner.active ? "deactivate" : "activate")}
            disabled={!!loading}
            className="btn btn-secondary h-10 px-4 text-sm"
          >
            {loading === "activate" || loading === "deactivate" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Power className="h-4 w-4" />
            )}
            {partner.active ? "Desativar" : "Reativar"}
          </button>
        ) : null}

        <button onClick={() => setEditOpen((v) => !v)} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
          <Pencil className="h-4 w-4" />
          Editar
        </button>
      </div>

      {isApproved ? (
        <p className="text-xs text-muted">
          {partner.active
            ? "Aprovado e ativo — aparece na área pública de associados."
            : "Aprovado, porém inativo — não aparece na área pública."}
        </p>
      ) : null}

      {rejectOpen ? (
        <div className="rounded-md border border-line bg-paper p-4">
          <label className="field-label">Motivo da recusa (obrigatório)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Descreva o motivo da recusa…"
            className="field"
            autoFocus
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => run("reject", { reason })}
              disabled={loading === "reject" || reason.trim().length < 3}
              className="btn btn-primary h-10 px-4 text-sm disabled:opacity-60"
            >
              {loading === "reject" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Confirmar recusa
            </button>
            <button onClick={() => setRejectOpen(false)} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
              Cancelar
            </button>
          </div>
        </div>
      ) : null}

      {editOpen ? (
        <form onSubmit={onEditSubmit} className="grid gap-3 rounded-md border border-line bg-paper p-4">
          <p className="text-sm font-semibold text-ink">Editar dados do parceiro</p>
          <EditField name="institutionName" label="Instituição" defaultValue={partner.institutionName} />
          <div className="grid gap-3 sm:grid-cols-2">
            <EditField name="responsibleName" label="Responsável" defaultValue={partner.responsibleName} />
            <EditField name="responsibleRole" label="Cargo" defaultValue={partner.responsibleRole} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <EditField name="email" label="E-mail" type="email" defaultValue={partner.email} />
            <EditField name="phone" label="Telefone/WhatsApp" defaultValue={partner.phone} />
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_110px]">
            <EditField name="city" label="Cidade" defaultValue={partner.city} />
            <label className="block">
              <span className="field-label">UF</span>
              <select name="state" defaultValue={partner.state} className="field" required>
                {UFS.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="field-label">Tipo</span>
            <select name="partnerType" defaultValue={partner.partnerType} className="field" required>
              {PARTNER_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="field-label">Descrição</span>
            <textarea name="description" rows={3} defaultValue={partner.description} className="field" required />
          </label>
          <label className="block">
            <span className="field-label">Serviços</span>
            <textarea name="services" rows={2} defaultValue={partner.services} className="field" required />
          </label>
          <EditField name="website" label="Site/rede (opcional)" defaultValue={partner.website ?? ""} required={false} />
          <label className="block">
            <span className="field-label">Observações (opcional)</span>
            <textarea name="notes" rows={2} defaultValue={partner.notes ?? ""} className="field" />
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={loading === "edit"} className="btn btn-primary h-10 px-4 text-sm disabled:opacity-60">
              {loading === "edit" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Salvar alterações
            </button>
            <button type="button" onClick={() => setEditOpen(false)} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
              Cancelar
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

function EditField({
  name,
  label,
  defaultValue,
  type = "text",
  required = true,
}: {
  name: string;
  label: string;
  defaultValue: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input name={name} type={type} defaultValue={defaultValue} className="field" required={required} />
    </label>
  );
}
