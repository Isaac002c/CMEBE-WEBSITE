# CMEBE — Variáveis de Ambiente

Este projeto **não** versiona segredos. Use um arquivo `.env` local (já ignorado
pelo `.gitignore`). Há um modelo em **`.env.example`** na raiz — copie e preencha:

```bash
cp .env.example .env
```

> Nada aqui é exposto ao frontend, **exceto** variáveis com prefixo
> `NEXT_PUBLIC_`. Nunca coloque segredos (senha SMTP, secret de sessão) em
> variáveis `NEXT_PUBLIC_`.

---

## 1. Banco de dados

| Variável | Obrigatória | Exemplo | Descrição |
|----------|-------------|---------|-----------|
| `DATABASE_URL` | sim | `file:./dev.db` | Conexão do Prisma. Dev usa **SQLite**. Em produção, troque para Postgres (ver abaixo). |

**Desenvolvimento (SQLite, padrão):**
```env
DATABASE_URL="file:./dev.db"
```

**Produção (PostgreSQL recomendado):**
```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:5432/cmebe?schema=public"
```
Ao migrar para Postgres, altere também o `provider` em
`prisma/schema.prisma` de `sqlite` para `postgresql` e rode as migrations.

---

## 2. Sessão e autenticação

| Variável | Obrigatória | Exemplo | Descrição |
|----------|-------------|---------|-----------|
| `SESSION_COOKIE_NAME` | não | `cmebe_session` | Nome do cookie de sessão (default já definido no código). |
| `AUTH_SESSION_TTL_HOURS` | não | `168` | Validade da sessão em horas (default 7 dias). |

A segurança da sessão **não** depende de um segredo em env: o token é aleatório
(256 bits) e guardado **com hash** no banco. O cookie é `HttpOnly`,
`SameSite=Lax` e `Secure` em produção.

---

## 3. Criação do primeiro usuário MASTER (bootstrap)

O MASTER **não** pode ser criado por cadastro público. Use o script de seed
protegido, que lê estas variáveis:

| Variável | Obrigatória p/ seed | Exemplo | Descrição |
|----------|---------------------|---------|-----------|
| `MASTER_EMAIL` | sim | `master@cmebe.org` | E-mail do MASTER inicial. |
| `MASTER_PASSWORD` | sim | *(senha forte)* | Senha inicial (troque após o 1º login). |
| `MASTER_NAME` | não | `Administração CMEBE` | Nome exibido. |

Como executar (documentado também no README):
```bash
# 1. defina as variáveis no .env (MASTER_EMAIL, MASTER_PASSWORD)
# 2. rode o seed:
npm run db:seed:master
```
O script é **idempotente**: se o e-mail já existir, ele promove/garante o papel
MASTER sem duplicar. A senha nunca é impressa nos logs.

---

## 4. E-mail / SMTP (opcional — recursos de e-mail)

Os e-mails (confirmação, aprovação, reprovação, documentos, suspensão) só são
**realmente enviados** se o SMTP estiver configurado. **Sem estas variáveis, o
sistema não finge envio** — ele registra a intenção e segue o fluxo.

| Variável | Obrigatória p/ e-mail | Exemplo | Descrição |
|----------|-----------------------|---------|-----------|
| `SMTP_HOST` | sim | `smtp.seuprovedor.com` | Servidor SMTP. |
| `SMTP_PORT` | sim | `587` | Porta (587 STARTTLS / 465 SSL). |
| `SMTP_SECURE` | não | `false` | `true` para 465. |
| `SMTP_USER` | sim | `no-reply@cmebe.org` | Usuário SMTP. |
| `SMTP_PASSWORD` | sim | *(segredo)* | Senha SMTP. **Nunca** `NEXT_PUBLIC_`. |
| `EMAIL_FROM` | sim | `CMEBE <no-reply@cmebe.org>` | Remetente. |

> A integração de envio (ex.: `nodemailer`) **não** foi adicionada como
> dependência ainda — o código fica preparado por trás de uma interface
> (`lib/email`) que hoje só registra a intenção. Ao definir o SMTP, plugamos o
> transporte real. Ver pendências no relatório final.

---

## 5. Armazenamento de documentos (futuro — não implementado)

Upload de documentos **não** foi implementado (para evitar storage inseguro). O
modelo `DocumentRequest` está pronto para registrar **pedidos** de documento. Ao
implementar upload, defina um storage seguro (ex.: S3/R2) e documente:

| Variável (futura) | Exemplo |
|-------------------|---------|
| `STORAGE_BUCKET` | `cmebe-docs` |
| `STORAGE_REGION` | `sa-east-1` |
| `STORAGE_ACCESS_KEY_ID` | *(segredo)* |
| `STORAGE_SECRET_ACCESS_KEY` | *(segredo)* |
| `STORAGE_ENDPOINT` | `https://...` |

---

## 6. Site

| Variável | Obrigatória | Exemplo | Descrição |
|----------|-------------|---------|-----------|
| `NEXT_PUBLIC_SITE_URL` | recomendada em prod | `https://cmebe.org` | URL pública (metadata/OpenGraph). Default `http://localhost:3000`. |

---

## Resumo mínimo para rodar em desenvolvimento

```env
DATABASE_URL="file:./dev.db"
MASTER_EMAIL="master@cmebe.org"
MASTER_PASSWORD="troque-esta-senha-forte"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```
