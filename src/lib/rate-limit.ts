// Limitador de taxa simples em memória (sliding window por chave).
//
// Escopo e limitação (proposital): funciona por instância/processo. Na Vercel
// serverless, cada instância quente tem seu próprio contador e um cold start
// zera o estado — portanto NÃO é uma proteção distribuída forte. É a mitigação
// "por IP em memória" aceita no plano de deploy (docs/cmebe-deploy.md §6) para
// conter rajadas de brute-force numa mesma instância, sem dependências novas.
// Para proteção robusta em escala, migrar para um store compartilhado
// (ex.: Upstash Redis / Vercel KV) mantendo a mesma interface `rateLimit`.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Limpeza preguiçosa: remove janelas expiradas de vez em quando para não
// vazar memória em processos longos.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * Consome uma tentativa para `key`. Permite até `limit` tentativas por janela
 * de `windowMs`. Retorna `ok: false` quando o limite é excedido.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, retryAfterSeconds: 0 };
}

/**
 * Extrai um identificador de cliente da requisição para usar como chave.
 * Em produção atrás de proxy (Vercel), usa `x-forwarded-for` (primeiro IP).
 * Faz fallback para um rótulo fixo quando não há IP — nunca lança.
 */
export function clientKey(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}
