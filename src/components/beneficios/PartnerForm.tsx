"use client";

import Link from "next/link";
import { AlertCircle, Check, Loader2, MessageCircle, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { partnership, segmentos } from "@/data/beneficios";
import { UFS } from "@/lib/validation";
import { buildWhatsappUrlFor, partnerMessage } from "@/lib/whatsapp";

const UF_LABELS: Record<string, string> = { EX: "Exterior" };

type Field =
  | "nome"
  | "empresa"
  | "segmento"
  | "whatsapp"
  | "email"
  | "cidade"
  | "uf"
  | "comoBeneficia"
  | "mensagem";

type Errors = Partial<Record<Field | "consent", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const empty: Record<Field, string> = {
  nome: "",
  empresa: "",
  segmento: "",
  whatsapp: "",
  email: "",
  cidade: "",
  uf: "",
  comoBeneficia: "",
  mensagem: "",
};

// Ordem usada para focar o primeiro campo inválido.
const order: (Field | "consent")[] = [
  "nome",
  "empresa",
  "segmento",
  "whatsapp",
  "email",
  "cidade",
  "uf",
  "comoBeneficia",
  "consent",
];

function validate(values: Record<Field, string>, consent: boolean): Errors {
  const errors: Errors = {};
  if (!values.nome.trim()) errors.nome = "Informe seu nome completo.";
  if (!values.empresa.trim()) errors.empresa = "Informe o nome da empresa.";
  if (!values.segmento.trim()) errors.segmento = "Selecione o segmento.";

  const digits = values.whatsapp.replace(/\D/g, "");
  if (!values.whatsapp.trim()) errors.whatsapp = "Informe um WhatsApp para contato.";
  else if (digits.length < 10) errors.whatsapp = "Informe um WhatsApp válido com DDD.";

  if (!values.email.trim()) errors.email = "Informe um e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Informe um e-mail válido.";

  if (!values.cidade.trim()) errors.cidade = "Informe a cidade.";
  if (!values.uf.trim()) errors.uf = "Selecione o estado.";
  if (!values.comoBeneficia.trim())
    errors.comoBeneficia = "Conte como sua empresa pode beneficiar os associados.";
  if (!consent)
    errors.consent = "É necessário concordar para que possamos entrar em contato.";

  return errors;
}

export function PartnerForm() {
  const [values, setValues] = useState<Record<Field, string>>(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name as Field]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // evita duplo envio

    const nextErrors = validate(values, consent);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = order.find((key) => nextErrors[key]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setErrors({});
    setServerError(null);
    setStatus("submitting");

    // Persiste a solicitação para o painel do admin (mesmo fluxo de /parceria).
    // Um parceiro comercial é do tipo "Empresa"; o segmento vira businessSegment.
    const payload = {
      institutionName: values.empresa,
      responsibleName: values.nome,
      responsibleRole: "Responsável",
      email: values.email,
      phone: values.whatsapp,
      city: values.cidade,
      state: values.uf,
      partnerType: "Empresa",
      businessSegment: values.segmento,
      description: `Segmento: ${values.segmento}. ${values.comoBeneficia}`,
      services: values.comoBeneficia,
      website: "",
      notes: values.mensagem || "",
      consent,
    };

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(
          data.error ?? "Não foi possível enviar sua solicitação. Tente novamente.",
        );
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError("Erro de conexão. Tente novamente em instantes.");
      setStatus("error");
    }
  }

  function reset() {
    setValues(empty);
    setConsent(false);
    setErrors({});
    setServerError(null);
    setStatus("idle");
  }

  const directWhatsapp = buildWhatsappUrlFor(
    partnership.whatsappNumber,
    partnerMessage,
  );

  if (status === "success") {
    return (
      <div className="cmebe-card p-6 sm:p-8" role="status" aria-live="polite">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f3ee] text-[#1b7a52]">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">
          Solicitação enviada com sucesso
        </h3>
        <p className="mt-2 text-sm leading-7 text-body">
          A administração do CMEBE analisará seus dados. Após a aprovação, sua
          empresa poderá aparecer na área de parceiros do CMEBE.
        </p>
        <p className="mt-2 text-sm leading-7 text-muted">
          Se quiser adiantar a conversa, fale também pelo WhatsApp:
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={directWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Falar pelo WhatsApp
          </Link>
          <button type="button" onClick={reset} className="btn btn-secondary">
            Enviar outro interesse
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="cmebe-card p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold text-ink">
        Formulário de interesse
      </h3>
      <p className="mt-2 text-sm leading-7 text-body">
        Conte um pouco sobre a sua empresa. Os campos marcados com{" "}
        <span className="text-[#b42318]">*</span> são obrigatórios.
      </p>

      {serverError ? (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-md border border-[#f0c2c2] bg-[#fdeeee] px-3 py-2.5 text-sm text-[#b42318]"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {serverError}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4">
        <FormField id="nome" label="Nome completo" required error={errors.nome}>
          <input
            id="nome"
            name="nome"
            value={values.nome}
            onChange={handleChange}
            autoComplete="name"
            aria-invalid={errors.nome ? true : undefined}
            aria-describedby={errors.nome ? "nome-error" : undefined}
            className={`field ${errors.nome ? "border-[#b42318]" : ""}`}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="empresa" label="Nome da empresa" required error={errors.empresa}>
            <input
              id="empresa"
              name="empresa"
              value={values.empresa}
              onChange={handleChange}
              autoComplete="organization"
              aria-invalid={errors.empresa ? true : undefined}
              aria-describedby={errors.empresa ? "empresa-error" : undefined}
              className={`field ${errors.empresa ? "border-[#b42318]" : ""}`}
            />
          </FormField>

          <FormField
            id="segmento"
            label="Segmento da empresa"
            required
            error={errors.segmento}
          >
            <select
              id="segmento"
              name="segmento"
              value={values.segmento}
              onChange={handleChange}
              aria-invalid={errors.segmento ? true : undefined}
              aria-describedby={errors.segmento ? "segmento-error" : undefined}
              className={`field ${errors.segmento ? "border-[#b42318]" : ""}`}
            >
              <option value="">Selecione…</option>
              {segmentos.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField id="whatsapp" label="WhatsApp" required error={errors.whatsapp}>
            <input
              id="whatsapp"
              name="whatsapp"
              value={values.whatsapp}
              onChange={handleChange}
              inputMode="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              aria-invalid={errors.whatsapp ? true : undefined}
              aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
              className={`field ${errors.whatsapp ? "border-[#b42318]" : ""}`}
            />
          </FormField>

          <FormField id="email" label="E-mail" required error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`field ${errors.email ? "border-[#b42318]" : ""}`}
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
          <FormField id="cidade" label="Cidade" required error={errors.cidade}>
            <input
              id="cidade"
              name="cidade"
              value={values.cidade}
              onChange={handleChange}
              autoComplete="address-level2"
              placeholder="Ex.: Rio de Janeiro"
              aria-invalid={errors.cidade ? true : undefined}
              aria-describedby={errors.cidade ? "cidade-error" : undefined}
              className={`field ${errors.cidade ? "border-[#b42318]" : ""}`}
            />
          </FormField>

          <FormField id="uf" label="Estado" required error={errors.uf}>
            <select
              id="uf"
              name="uf"
              value={values.uf}
              onChange={handleChange}
              aria-invalid={errors.uf ? true : undefined}
              aria-describedby={errors.uf ? "uf-error" : undefined}
              className={`field ${errors.uf ? "border-[#b42318]" : ""}`}
            >
              <option value="">UF</option>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>
                  {UF_LABELS[uf] ?? uf}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField
          id="comoBeneficia"
          label="Como sua empresa pode beneficiar os associados CMEBE?"
          required
          error={errors.comoBeneficia}
        >
          <textarea
            id="comoBeneficia"
            name="comoBeneficia"
            value={values.comoBeneficia}
            onChange={handleChange}
            rows={3}
            aria-invalid={errors.comoBeneficia ? true : undefined}
            aria-describedby={errors.comoBeneficia ? "comoBeneficia-error" : undefined}
            className={`field ${errors.comoBeneficia ? "border-[#b42318]" : ""}`}
          />
        </FormField>

        <FormField id="mensagem" label="Mensagem adicional" error={errors.mensagem}>
          <textarea
            id="mensagem"
            name="mensagem"
            value={values.mensagem}
            onChange={handleChange}
            rows={3}
            className="field"
          />
        </FormField>

        <div>
          <label htmlFor="consent" className="flex items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (errors.consent)
                  setErrors((c) => ({ ...c, consent: undefined }));
              }}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-line text-brand-800 accent-brand-800"
            />
            <span className="text-sm leading-6 text-body">
              Li e concordo em ser contatado pelo CMEBE para conhecer a parceria
              comercial.
            </span>
          </label>
          {errors.consent ? (
            <p id="consent-error" role="alert" className="field-error">
              {errors.consent}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Enviando…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Enviar interesse
            </>
          )}
        </button>

        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-line" />
          ou
          <span className="h-px flex-1 bg-line" />
        </div>

        <Link
          href={directWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary w-full"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Falar diretamente pelo WhatsApp
        </Link>
        <p className="text-center text-xs text-muted">{partnership.phone}</p>
      </div>
    </form>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

function FormField({ id, label, required, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="text-[#b42318]" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
