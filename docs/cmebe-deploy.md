# CMEBE — Deploy e Segurança (Vercel + VPS)

> Arquitetura escolhida (v1): **app Next.js (site + API) na Vercel** (domínio
> padrão `*.vercel.app`, plano Hobby/grátis) + **PostgreSQL na VPS**. Usa Vercel
> e VPS, sem custo extra, mantém a autenticação por cookie na mesma origem.

Por que não separar 100% (front Vercel / API VPS) agora: a API na VPS exigiria um
**domínio** para HTTPS (Let's Encrypt não emite para IP puro) — que ainda não
existe — e uma refatoração da auth para funcionar entre domínios diferentes
(CORS/CSRF/SameSite=None). Fica para uma v2, quando houver domínio.

---

## 0. Pré-requisitos e segredos

- **Chave SSH** dedicada já gerada nesta máquina (`~/.ssh/cmebe_vps`). A pública
  precisa estar em `~/.ssh/authorized_keys` na VPS.
- **Token Vercel**: usado apenas como variável de ambiente da sessão
  (`$VERCEL_TOKEN`), **nunca** commitado. **Rotacionar após o deploy.**
- Nenhum segredo vai para o repositório (`.env` é ignorado).

---

## 1. Hardening da VPS (auditoria de segurança)

Executado via SSH (usuário root inicial → cria usuário de deploy):

1. **Usuário sem-root** `deploy` com sudo; chave SSH copiada.
2. **SSH**: desabilitar `PermitRootLogin`, `PasswordAuthentication no`
   (só chave), `PubkeyAuthentication yes`. Recarregar `sshd`.
3. **Firewall (ufw)**: `default deny incoming`; permitir `22` (SSH) e `5432`
   (Postgres, só com TLS). `allow out`.
4. **fail2ban**: jails para `sshd` e `postgresql` (brute-force).
5. **Atualizações automáticas**: `unattended-upgrades`.
6. Conferir que **nada mais** está exposto (`ss -tlnp`).

---

## 2. PostgreSQL na VPS

1. Instalar PostgreSQL (16+).
2. Banco `cmebe` + usuário `cmebe_app` com **senha forte (40+ chars)**;
   privilégios só no schema da aplicação.
3. **TLS obrigatório**: `ssl = on` com certificado. `listen_addresses` público,
   mas em `pg_hba.conf` **somente `hostssl`** (nega conexão sem TLS).
4. **mTLS (defesa extra)**: CA própria + certificado de cliente; `pg_hba`
   `hostssl cmebe cmebe_app 0.0.0.0/0 scram-sha-256 clientcert=verify-full`
   → exige **certificado de cliente + senha**. O certificado de cliente fica só
   nas variáveis da Vercel.
5. Backups: `pg_dump` diário (cron) para fora do diretório do banco.

`DATABASE_URL` (na Vercel):
```
postgresql://cmebe_app:SENHA@SEU_IP_VPS:5432/cmebe?sslmode=verify-full&sslrootcert=/tmp/ca.crt&sslcert=/tmp/client.crt&sslkey=/tmp/client.key
```
Na Vercel (serverless), os certificados são gravados em `/tmp` no cold start a
partir de variáveis base64 (`PG_CA_B64`, `PG_CLIENT_CERT_B64`, `PG_CLIENT_KEY_B64`).

---

## 3. Migração Prisma SQLite → PostgreSQL

- `prisma/schema.prisma`: `provider = "postgresql"`.
- Como os enums já são `String` (compatível), o schema migra sem mudanças de
  modelo. Gerar migration inicial contra o Postgres (`prisma migrate deploy`).
- Rodar o seed do MASTER (`npm run db:seed:master`) apontando para o Postgres.
- Dev local: usar um Postgres local **ou** a mesma instância (schema separado).

---

## 4. Deploy na Vercel

1. `vercel link` (projeto novo) usando `$VERCEL_TOKEN`.
2. **Variáveis de ambiente** (Production): `DATABASE_URL`, `PG_*_B64`,
   `NEXT_PUBLIC_SITE_URL` (= URL da Vercel), `AUTH_SESSION_TTL_HOURS`. SMTP
   quando houver. **Sem segredos no código.**
3. `prisma generate` no build (já há `postinstall`).
4. `vercel deploy --prod`.
5. Cookies de sessão já são `Secure`+`HttpOnly`+`SameSite=Lax` em produção
   (`NODE_ENV=production`) — ok para mesma origem na Vercel.

---

## 5. Cabeçalhos de segurança (a adicionar no next.config)

`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
`X-Frame-Options: DENY` (ou CSP frame-ancestors), `Referrer-Policy`,
`Permissions-Policy`. (A Vercel já força HTTPS.)

---

## 6. Checklist de segurança da aplicação (já verificado)

- [x] Senhas com `scrypt` (nativo), comparação timing-safe.
- [x] Sessão: token 256 bits guardado com hash; cookie HttpOnly/SameSite/Secure.
- [x] Autorização revalidada no servidor em cada rota MASTER (401/403 testados).
- [x] `status`/`role`/`publicVisible`/`membershipNumber` server-only (injeção
      testada e ignorada; escalonamento via `/api/me/profile` bloqueado).
- [x] Lista pública com whitelist de campos (sem e-mail/telefone/dados sensíveis).
- [x] E-mail duplicado bloqueado; login com mensagem genérica (anti-enumeração).
- [x] `/beneficios` é só apresentação + WhatsApp (sem novo endpoint/armazenamento).
- [ ] **Pendente (hardening recomendado)**: rate limiting em
      `/api/auth/login` e `/api/auth/register` (mitiga brute-force). Fazer com um
      limitador simples (ex.: por IP em memória/edge) antes ou logo após o go-live.

---

## 7. Pós-deploy

- **Rotacionar o token da Vercel.**
- Trocar a senha do MASTER (via app) após o primeiro login.
- Validar: home, cadastro, login, área do afiliado, painel MASTER, lista pública.
- Conferir logs e `ss -tlnp` na VPS (superfície mínima).

---

## 8. Estado do deploy (2026-07-07)

**No ar (base):** https://cmebe.vercel.app — projeto Vercel `cmebe`
(`isaac002cs-projects`). Verificado em produção: HTTP 200, cabeçalhos de
segurança ativos, `robots.txt`/`sitemap.xml` corretos, sem auth wall.

Já funciona para o visitante público: home, `/beneficios`, diretório de filiados
(degrada com estado vazio/erro se o banco cair), SEO/metadata.

**Variáveis já definidas na Vercel (Production):**
- `DATABASE_URL` — **placeholder** (`...@127.0.0.1:5432/...`) até o Postgres da
  VPS existir. Enquanto for placeholder, as rotas de banco (login/cadastro/
  painel) falham de forma controlada; o site público segue normal.
- `AUTH_SESSION_TTL_HOURS=168`
- `NEXT_PUBLIC_SITE_URL=https://cmebe.vercel.app`

**Pendência única para o app 100% funcional — provisionar o Postgres na VPS.**
A VPS de produção é **compartilhada**: não
mexer em SSH/firewall global; criar apenas um banco isolado. Runbook (como root,
após autorizar a chave `cmebe_vps.pub` em `/root/.ssh/authorized_keys`):

```bash
# 0. Reaproveitar Postgres existente se já houver (não instalar duplicado):
systemctl status postgresql 2>/dev/null | head -3 || apt-get update && apt-get install -y postgresql

# 1. Banco + usuário isolados (senha forte de 40+ chars):
PGPW="$(openssl rand -base64 32)"
sudo -u postgres psql -v ON_ERROR_STOP=1 <<SQL
  CREATE ROLE cmebe_app LOGIN PASSWORD '${PGPW}';
  CREATE DATABASE cmebe OWNER cmebe_app;
  REVOKE ALL ON DATABASE cmebe FROM PUBLIC;
SQL
echo "GUARDE ESTA SENHA (vai para a Vercel): ${PGPW}"

# 2. TLS ligado (self-signed) + escuta pública, SEM tocar em regras existentes:
#    ssl=on, listen_addresses='*' em postgresql.conf; em pg_hba.conf ADICIONAR:
#    hostssl  cmebe  cmebe_app  0.0.0.0/0  scram-sha-256
#    depois: systemctl reload postgresql
# 3. Abrir 5432 no firewall (ufw) se aplicável, restringindo o que der.
```

Depois, do lado da aplicação (local, com a chave/token):
```bash
# DATABASE_URL real (sslmode=require no v1; verify-full é o hardening seguinte):
#   postgresql://cmebe_app:SENHA@SEU_IP_VPS:5432/cmebe?sslmode=require
DATABASE_URL="...":  prisma migrate deploy   # cria o schema
DATABASE_URL="...":  npm run db:seed:master  # cria o MASTER (lê MASTER_* do .env)
# Atualizar a env na Vercel e redeployar:
vercel env rm DATABASE_URL production --yes && printf '%s' "$DATABASE_URL" | vercel env add DATABASE_URL production
vercel deploy --prod
```

Hardening seguinte (não bloqueante): mTLS/`verify-full` (§2), rate-limit já
está no código, `fail2ban` para `postgresql`.
