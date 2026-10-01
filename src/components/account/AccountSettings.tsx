"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

export type AccountValues = { name: string; email: string; phone: string };

export function AccountSettings({ initial }: { initial: AccountValues }) {
  const router = useRouter();

  return (
    <div className="grid gap-6">
      <AccountForm initial={initial} onSaved={() => router.refresh()} />
      <PasswordForm />
    </div>
  );
}

function AccountForm({
  initial,
  onSaved,
}: {
  initial: AccountValues;
  onSaved: () => void;
}) {
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
    try {
      const res = await fetch("/api/me/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
        }),
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
      onSaved();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <section className="cmebe-card p-6">
      <h2 className="font-display text-lg font-semibold text-ink">Meus dados</h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-4" noValidate>
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
          <span className="field-label">Nome</span>
          <input name="name" defaultValue={initial.name} className="field" required />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">E-mail</span>
            <input name="email" type="email" defaultValue={initial.email} className="field" required />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </label>
          <label className="block">
            <span className="field-label">Telefone</span>
            <input name="phone" defaultValue={initial.phone} className="field" required />
            {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
          </label>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Salvando…" : "Salvar dados"}
        </button>
      </form>
    </section>
  );
}

function PasswordForm() {
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
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    try {
      const res = await fetch("/api/me/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.get("currentPassword"),
          newPassword: form.get("newPassword"),
          confirmPassword: form.get("confirmPassword"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setError(data.error ?? "Não foi possível alterar a senha.");
        setLoading(false);
        return;
      }
      setMessage(data.message ?? "Senha alterada.");
      formEl.reset();
      setLoading(false);
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <section className="cmebe-card p-6">
      <h2 className="font-display text-lg font-semibold text-ink">Segurança — alterar senha</h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-4" noValidate>
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
          <span className="field-label">Senha atual</span>
          <input name="currentPassword" type="password" autoComplete="current-password" className="field" required />
          {errors.currentPassword ? <span className="field-error">{errors.currentPassword}</span> : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">Nova senha</span>
            <input name="newPassword" type="password" autoComplete="new-password" className="field" required />
            {errors.newPassword ? <span className="field-error">{errors.newPassword}</span> : null}
          </label>
          <label className="block">
            <span className="field-label">Confirmar nova senha</span>
            <input name="confirmPassword" type="password" autoComplete="new-password" className="field" required />
            {errors.confirmPassword ? <span className="field-error">{errors.confirmPassword}</span> : null}
          </label>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Alterando…" : "Alterar senha"}
        </button>
      </form>
    </section>
  );
}
