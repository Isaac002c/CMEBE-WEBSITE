# CMEBE — imagem de produção para rodar na VPS (Next.js 15 + Prisma/Postgres).
# Build e runtime em Debian slim (compatível com o engine do Prisma).
FROM node:20-bookworm-slim

WORKDIR /app

# openssl é exigido pelo engine do Prisma em runtime.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Instala dependências (inclui devDeps p/ o build). O postinstall roda prisma generate.
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# Copia o código e faz o build de produção (next build; não conecta no banco).
COPY . .
RUN npx prisma generate && npm run build

EXPOSE 3000

# No start: aplica migrations (o banco é local na VPS, então funciona) e sobe o servidor.
# migrate deploy é não-fatal para o app subir mesmo se o banco estiver momentaneamente indisponível.
CMD ["sh", "-c", "npx prisma migrate deploy || echo '[start] migrate deploy falhou — seguindo'; npm run start"]
