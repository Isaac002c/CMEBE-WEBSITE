"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { ministerialFunctions } from "@/data/institution";
import { UFS } from "@/lib/validation";

const UF_LABELS: Record<string, string> = { EX: "Exterior" };

export function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
      city: form.get("city"),
      state: form.get("state"),
      ministerialRole: form.get("ministerialRole"),
      church: form.get("church"),
      presentation: form.get("presentation"),
      consentPrivacy: form.get("consentPrivacy") === "on",
      consentPublicDisplay: form.get("consentPublicDisplay") === "on",
    };

    try {
      const res = await fetch("/api/auth/register", {
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
      router.push(data.redirect ?? "/minha-filiacao");
      router.refresh();
    } catch {
      setGeneralError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {generalError ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
        >
          {generalError}
        </p>
      ) : null}

      <Field name="name" label="Nome completo" error={errors.name} autoComplete="name" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="email" label="E-mail" type="email" error={errors.email} autoComplete="email" />
        <Field name="phone" label="Telefone/WhatsApp" type="tel" error={errors.phone} autoComplete="tel" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="password" label="Senha" type="password" error={errors.password} autoComplete="new-password" hint="Mínimo de 8 caracteres." />
        <Field name="confirmPassword" label="Confirmar senha" type="password" error={errors.confirmPassword} autoComplete="new-password" />
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <Field name="city" label="Cidade" error={errors.city} />
        <label className="block">
          <span className="field-label">Estado</span>
          <select name="state" defaultValue="" className="field" required>
            <option value="" disabled>
              UF
            </option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>
                {UF_LABELS[uf] ?? uf}
              </option>
            ))}
          </select>
          {errors.state ? <span className="field-error">{errors.state}</span> : null}
        </label>
      </div>

      <label className="block">
        <span className="field-label">Função ministerial</span>
        <input name="ministerialRole" list="ministerial-roles" className="field" required />
        <datalist id="ministerial-roles">
          {ministerialFunctions.map((role) => (
            <option key={role} value={role} />
          ))}
        </datalist>
        {errors.ministerialRole ? (
          <span className="field-error">{errors.ministerialRole}</span>
        ) : null}
      </label>

      <Field name="church" label="Igreja ou ministério" error={errors.church} />

      <label className="block">
        <span className="field-label">Apresentação (opcional)</span>
        <textarea name="presentation" rows={3} className="field" />
        {errors.presentation ? (
          <span className="field-error">{errors.presentation}</span>
        ) : null}
      </label>

      <div className="grid gap-3 rounded-md border border-line bg-paper p-4">
        <label className="flex items-start gap-3 text-sm text-body">
          <input type="checkbox" name="consentPrivacy" className="mt-0.5 h-4 w-4" required />
          <span>
            Li e aceito a política de privacidade e o uso dos meus dados para fins
            de análise da filiação. <span className="text-red-700">*</span>
          </span>
        </label>
        {errors.consentPrivacy ? (
          <span className="field-error">{errors.consentPrivacy}</span>
        ) : null}
        <label className="flex items-start gap-3 text-sm text-body">
          <input type="checkbox" name="consentPublicDisplay" className="mt-0.5 h-4 w-4" />
          <span>
            Autorizo a exibição do meu perfil na área pública de filiados{" "}
            <strong>após aprovação</strong> (nome, função, cidade/estado e igreja).
            Posso revogar a qualquer momento.
          </span>
        </label>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary mt-1 w-full disabled:opacity-70">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Enviando…" : "Criar conta e enviar solicitação"}
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
  hint?: string;
};

function Field({ name, label, type = "text", error, autoComplete, hint }: FieldProps) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} className="field" required />
      {hint && !error ? (
        <span className="mt-1 block text-xs text-muted">{hint}</span>
      ) : null}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
