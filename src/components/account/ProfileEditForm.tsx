"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { ministerialFunctions } from "@/data/institution";
import { UFS } from "@/lib/validation";

const UF_LABELS: Record<string, string> = { EX: "Exterior" };

export type ProfileEditValues = {
  name: string;
  phone: string;
  city: string;
  state: string;
  ministerialRole: string;
  church: string;
  presentation: string;
  consentPublicDisplay: boolean;
};

export function ProfileEditForm({ initial }: { initial: ProfileEditValues }) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage(null);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      city: form.get("city"),
      state: form.get("state"),
      ministerialRole: form.get("ministerialRole"),
      church: form.get("church"),
      presentation: form.get("presentation"),
      consentPublicDisplay: form.get("consentPublicDisplay") === "on",
    };

    try {
      const res = await fetch("/api/me/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setError(data.error ?? "Não foi possível salvar.");
        setLoading(false);
        return;
      }
      setMessage(data.message ?? "Dados atualizados.");
      setLoading(false);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {message ? (
        <p role="status" className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800">
          {message}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <label className="block">
        <span className="field-label">Nome completo</span>
        <input name="name" defaultValue={initial.name} className="field" required />
        {errors.name ? <span className="field-error">{errors.name}</span> : null}
      </label>

      <label className="block">
        <span className="field-label">Telefone/WhatsApp</span>
        <input name="phone" defaultValue={initial.phone} className="field" required />
        {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
      </label>

      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <label className="block">
          <span className="field-label">Cidade</span>
          <input name="city" defaultValue={initial.city} className="field" required />
          {errors.city ? <span className="field-error">{errors.city}</span> : null}
        </label>
        <label className="block">
          <span className="field-label">Estado</span>
          <select name="state" defaultValue={initial.state} className="field" required>
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
        <input name="ministerialRole" list="ministerial-roles-edit" defaultValue={initial.ministerialRole} className="field" required />
        <datalist id="ministerial-roles-edit">
          {ministerialFunctions.map((role) => (
            <option key={role} value={role} />
          ))}
        </datalist>
        {errors.ministerialRole ? <span className="field-error">{errors.ministerialRole}</span> : null}
      </label>

      <label className="block">
        <span className="field-label">Igreja ou ministério</span>
        <input name="church" defaultValue={initial.church} className="field" required />
        {errors.church ? <span className="field-error">{errors.church}</span> : null}
      </label>

      <label className="block">
        <span className="field-label">Apresentação (opcional)</span>
        <textarea name="presentation" rows={3} defaultValue={initial.presentation} className="field" />
      </label>

      <label className="flex items-start gap-3 rounded-md border border-line bg-paper p-4 text-sm text-body">
        <input
          type="checkbox"
          name="consentPublicDisplay"
          defaultChecked={initial.consentPublicDisplay}
          className="mt-0.5 h-4 w-4"
        />
        <span>
          Autorizo a exibição do meu perfil na área pública de filiados após
          aprovação. (Sem esta autorização, seu perfil não aparece publicamente.)
        </span>
      </label>

      <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Salvando…" : "Salvar alterações"}
      </button>
    </form>
  );
}
