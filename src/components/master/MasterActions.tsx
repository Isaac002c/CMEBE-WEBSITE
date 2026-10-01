"use client";

import { useRouter } from "next/navigation";
import {
  Check,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Pause,
  Play,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

type Props = {
  profileId: string;
  status: string;
  publicVisible: boolean;
  consentPublicDisplay: boolean;
};

type Panel = "reject" | "request-docs" | null;

export function MasterActions({ profileId, status, publicVisible, consentPublicDisplay }: Props) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(action: string, payload: Record<string, unknown> = {}) {
    setLoading(action);
    setError(null);
    try {
      const res = await fetch(`/api/master/requests/${profileId}`, {
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
      setPanel(null);
      setText("");
      setLoading(null);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(null);
    }
  }

  const isApproved = status === "APPROVED";
  const isSuspended = status === "SUSPENDED";

  return (
    <div className="grid gap-4">
      {error ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {!isApproved ? (
          <button onClick={() => run("approve")} disabled={!!loading} className="btn btn-primary h-10 px-4 text-sm disabled:opacity-60">
            {loading === "approve" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Aprovar
          </button>
        ) : null}

        {status !== "REJECTED" ? (
          <button onClick={() => setPanel(panel === "reject" ? null : "reject")} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
            <X className="h-4 w-4" />
            Reprovar
          </button>
        ) : null}

        <button onClick={() => setPanel(panel === "request-docs" ? null : "request-docs")} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
          <FileText className="h-4 w-4" />
          Solicitar documentos
        </button>

        {status === "PENDING" ? (
          <button onClick={() => run("under-review")} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
            {loading === "under-review" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Marcar em análise
          </button>
        ) : null}

        {isApproved ? (
          <button onClick={() => run("suspend")} disabled={!!loading} className="btn btn-secondary h-10 px-4 text-sm">
            {loading === "suspend" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pause className="h-4 w-4" />}
            Suspender
          </button>
        ) : null}

        {isSuspended ? (
          <button onClick={() => run("reactivate")} disabled={!!loading} className="btn btn-primary h-10 px-4 text-sm">
            {loading === "reactivate" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Reativar
          </button>
        ) : null}

        {isApproved ? (
          <button
            onClick={() => run("visibility", { publicVisible: !publicVisible })}
            disabled={!!loading}
            className="btn btn-secondary h-10 px-4 text-sm"
          >
            {loading === "visibility" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : publicVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            {publicVisible ? "Ocultar do público" : "Tornar público"}
          </button>
        ) : null}
      </div>

      {isApproved && !consentPublicDisplay ? (
        <p className="text-xs text-muted">
          Observação: o usuário ainda não autorizou a exibição pública, então o
          perfil não aparecerá no diretório mesmo que marcado como público.
        </p>
      ) : null}

      {panel === "reject" ? (
        <ActionPanel
          label="Motivo da reprovação (obrigatório)"
          placeholder="Descreva o motivo da reprovação…"
          text={text}
          setText={setText}
          loading={loading === "reject"}
          onSubmit={() => run("reject", { reason: text })}
          onCancel={() => setPanel(null)}
        />
      ) : null}

      {panel === "request-docs" ? (
        <ActionPanel
          label="Documentos solicitados"
          placeholder="Descreva os documentos que o solicitante deve enviar…"
          text={text}
          setText={setText}
          loading={loading === "request-docs"}
          onSubmit={() => run("request-docs", { message: text })}
          onCancel={() => setPanel(null)}
        />
      ) : null}
    </div>
  );
}

function ActionPanel({
  label,
  placeholder,
  text,
  setText,
  loading,
  onSubmit,
  onCancel,
}: {
  label: string;
  placeholder: string;
  text: string;
  setText: (v: string) => void;
  loading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="rounded-md border border-line bg-paper p-4">
      <label className="field-label">{label}</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="field"
        autoFocus
      />
      <div className="mt-3 flex gap-2">
        <button onClick={onSubmit} disabled={loading || text.trim().length < 3} className="btn btn-primary h-10 px-4 text-sm disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Confirmar
        </button>
        <button onClick={onCancel} disabled={loading} className="btn btn-secondary h-10 px-4 text-sm">
          Cancelar
        </button>
      </div>
    </div>
  );
}
