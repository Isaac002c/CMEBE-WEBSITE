import { writeFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

// mTLS com o Postgres da VPS: em produção os certificados de cliente chegam
// por variáveis de ambiente em base64 (PG_CLIENT_CERT_B64/PG_CLIENT_KEY_B64/
// PG_CA_B64) e são gravados em /tmp no cold start, ANTES do Prisma conectar.
// A DATABASE_URL referencia esses caminhos (sslcert/sslkey/sslrootcert).
// Sem essas variáveis (ex.: dev local), a função é no-op e a conexão usa a
// DATABASE_URL como está.
function writePgClientCertsFromEnv() {
  const cert = process.env.PG_CLIENT_CERT_B64;
  const key = process.env.PG_CLIENT_KEY_B64;
  const ca = process.env.PG_CA_B64;
  if (!cert || !key || !ca) return;
  try {
    writeFileSync("/tmp/cmebe-client.crt", Buffer.from(cert, "base64"), { mode: 0o600 });
    writeFileSync("/tmp/cmebe-client.key", Buffer.from(key, "base64"), { mode: 0o600 });
    writeFileSync("/tmp/cmebe-ca.crt", Buffer.from(ca, "base64"), { mode: 0o644 });
  } catch {
    // best-effort: se falhar, o Prisma reporta o erro de conexão normalmente.
  }
}

writePgClientCertsFromEnv();

// Singleton do Prisma para evitar múltiplas conexões em dev (hot reload).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
