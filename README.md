# CMEBE

Website institucional do **CMEBE — Conselho de Ministros Evangélicos do Brasil e
do Exterior**, com fluxo real de filiação (cadastro, análise e aprovação) e
diretório público de filiados.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Prisma ORM — **PostgreSQL** (dev e produção)
- Autenticação própria: hash de senha com `scrypt` (nativo) + sessão por cookie httpOnly
- Validação no servidor com `zod`
- Deploy: **Vercel** (site + API) — ver `docs/cmebe-deploy.md`

## Pré-requisitos

- Node 20+ (testado em Node 24)
- Um PostgreSQL acessível (local ou remoto) para desenvolvimento

## Como rodar (desenvolvimento)

```bash
# 1. Instalar dependências (gera o Prisma Client via postinstall)
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
#   edite .env: DATABASE_URL (Postgres), MASTER_EMAIL e MASTER_PASSWORD

# 3. Criar o banco e aplicar as migrations
npm run db:migrate

# 4. Criar o primeiro usuário MASTER (lê MASTER_EMAIL/MASTER_PASSWORD do .env)
npm run db:seed:master

# 5. Subir o servidor
npm run dev
```

Acesse `http://localhost:3000`.

## Usuário MASTER

O MASTER é o único perfil que aprova/reprova filiações. **Ele não pode ser criado
por cadastro público** — apenas pelo seed protegido:

```bash
# defina no .env:  MASTER_EMAIL, MASTER_PASSWORD (mín. 8 caracteres), MASTER_NAME
npm run db:seed:master
```

O script é idempotente (se o e-mail já existir, garante o papel MASTER) e nunca
imprime a senha. Faça login em `/entrar` e troque a senha após o primeiro acesso.

## Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Home institucional + diretório público de filiados |
| `/cadastro` | Criar conta e solicitar filiação |
| `/entrar` | Login |
| `/minha-filiacao` | Área do afiliado (status, dados, documentos) |
| `/master` + `/master/[id]` | Painel do conselho (somente MASTER) |
| `/api/affiliates` | Lista pública (apenas campos não sensíveis) |

## Scripts

```bash
npm run dev            # desenvolvimento
npm run build          # build de produção
npm run start          # servir build
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
npm run db:migrate     # prisma migrate dev
npm run db:studio      # inspecionar o banco
npm run db:seed:master # criar/garantir o MASTER
```

## Documentação

- `docs/cmebe-auditoria-e-plano.md` — auditoria técnica e plano.
- `docs/cmebe-direcao-visual.md` — sistema de design.
- `docs/cmebe-env.md` — variáveis de ambiente (banco, sessão, MASTER, SMTP).

## Produção

- **No ar:** https://cmebe.vercel.app (projeto Vercel `cmebe`). Detalhes,
  variáveis e passo pendente do banco em `docs/cmebe-deploy.md` (§8).
- O `provider` do Prisma já é `postgresql`. Em produção, `DATABASE_URL` aponta
  para o Postgres; rode `npm run db:migrate` (ou `prisma migrate deploy`).
- `NEXT_PUBLIC_SITE_URL` definido nas variáveis da Vercel.
- E-mail (confirmação/aprovação/etc.) só é enviado com SMTP configurado — ver
  `docs/cmebe-env.md`. Sem SMTP, o sistema **não finge** envio.

## Dados editáveis (conteúdo institucional)

- `src/data/institution.ts`, `benefits.ts`, `pillars.ts`, `courses.ts`.
