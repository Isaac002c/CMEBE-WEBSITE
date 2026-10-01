"use client";

import Link from "next/link";
import { Check, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { PARTNER_TYPES } from "@/lib/constants";
import { UFS } from "@/lib/validation";

const UF_LABELS: Record<string, string> = { EX: "Exterior" };

export function PartnerRegisterForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrors({});
    setGeneralError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
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
      consent: form.get("consent") === "on",
    };

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setGeneralError(data.error ?? "Verifique os campos e tente novamente.");
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setGeneralError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="cmebe-card p-6 text-center sm:p-8" role="status" aria-live="polite">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Check className="h-6 w-6" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">
          Solicitação enviada com sucesso
        </h3>
        <p className="mt-2 text-sm leading-7 text-body">
          A administração do CMEBE analisará seus dados e entrará em contato.
          Após a aprovação, sua instituição passará a aparecer na área pública de
          associados.
        </p>
        <Link href="/associados" className="btn btn-secondary mt-6">
          Ver associados CMEBE
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {generalError ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {generalError}
        </p>
      ) : null}

      <Field name="institutionName" label="Nome da instituição / parceiro" error={errors.institutionName} autoComplete="organization" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="responsibleName" label="Nome do responsável" error={errors.responsibleName} autoComplete="name" />
        <Field name="responsibleRole" label="Cargo / função do responsável" error={errors.responsibleRole} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="email" label="E-mail" type="email" error={errors.email} autoComplete="email" />
        <Field name="phone" label="Telefone / WhatsApp" type="tel" error={errors.phone} autoComplete="tel" />
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <Field name="city" label="Cidade" error={errors.city} />
        <label className="block">
          <span className="field-label">Estado</span>
          <select name="state" defaultValue="" className="field" required>
            <option value="" disabled>UF</option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>{UF_LABELS[uf] ?? uf}</option>
            ))}
          </select>
          {errors.state ? <span className="field-error">{errors.state}</span> : null}
        </label>
      </div>

      <label className="block">
        <span className="field-label">Tipo de parceiro</span>
        <select name="partnerType" defaultValue="" className="field" required>
          <option value="" disabled>Selecione…</option>
          {PARTNER_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.partnerType ? <span className="field-error">{errors.partnerType}</span> : null}
      </label>

      <label className="block">
        <span className="field-label">Descrição da instituição / parceiro</span>
        <textarea name="description" rows={4} className="field" required placeholder="Conte sobre a instituição, missão e atuação." />
        {errors.description ? <span className="field-error">{errors.description}</span> : null}
      </label>

      <label className="block">
        <span className="field-label">Serviços oferecidos</span>
        <textarea name="services" rows={3} className="field" required placeholder="Quais produtos ou serviços você oferece?" />
        {errors.services ? <span className="field-error">{errors.services}</span> : null}
      </label>

      <Field name="website" label="Site ou rede social (opcional)" error={errors.website} placeholder="https://…" required={false} />

      <label className="block">
        <span className="field-label">Observações adicionais (opcional)</span>
        <textarea name="notes" rows={2} className="field" />
        {errors.notes ? <span className="field-error">{errors.notes}</span> : null}
      </label>

      <label className="flex items-start gap-3 rounded-md border border-line bg-paper p-4 text-sm text-body">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4" required />
        <span>
          Concordo em enviar meus dados para análise do CMEBE e autorizo o contato
          da administração. <span className="text-red-700">*</span>
        </span>
      </label>
      {errors.consent ? <span className="field-error">{errors.consent}</span> : null}

      <button type="submit" disabled={loading} className="btn btn-primary mt-1 w-full disabled:opacity-70">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {loading ? "Enviando…" : "Enviar solicitação de parceria"}
      </button>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
};

function Field({ name, label, type = "text", error, autoComplete, placeholder, required = true }: FieldProps) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="field"
        required={required}
      />
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
