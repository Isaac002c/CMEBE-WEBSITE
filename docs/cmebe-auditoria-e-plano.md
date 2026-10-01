# CMEBE — Auditoria Técnica e Plano de Implementação

> Documento gerado na **Fase 1** do trabalho, **antes** de qualquer alteração de
> código de produto. Serve como diagnóstico e contrato do que será feito.

Data da auditoria: 2026-06-22
Branch de trabalho: `feat/cmebe-filiacao-e-redesign`

---

## 0. Observação importante sobre as skills solicitadas

O pedido determinava o uso das skills `frontend-design` e `security-guidance`
(via `/plugin install`). **Neste ambiente o comando `/plugin` não está
disponível** (retornou "isn't available in this environment"), portanto esses
plugins não puderam ser instalados.

Como mitigação, sem inventar capacidades que não existem:

- Os **princípios de design** (hierarquia, sobriedade, acessibilidade,
  responsividade) são aplicados manualmente e documentados em
  `docs/cmebe-direcao-visual.md`.
- A **revisão de segurança** usa a skill nativa `security-review` e o
  `code-review`, além das práticas listadas na seção 8 deste documento.

---

## 1. Estado atual do projeto

### 1.1 Framework e stack

| Item | Valor |
|------|-------|
| Framework | **Next.js 15.5.19** (App Router) |
| UI | **React 19.2.4** |
| Linguagem | **TypeScript 5** (`strict: true`) |
| Estilo | **Tailwind CSS v4** (via `@tailwindcss/postcss`) |
| Ícones | `lucide-react` |
| Lint | ESLint 9 + `eslint-config-next` |
| Gerenciador | npm (Node v24.13.1) |
| Build atual | Compila e roda (`GET / 200`) |

### 1.2 Estrutura de pastas (real)

```
src/
  app/
    layout.tsx        # metadata + <html>/<body>; usa NEXT_PUBLIC_SITE_URL
    page.tsx          # monta todas as seções da home
    globals.css       # design tokens via CSS vars + utilitários (.brand-panel, .luxe-button...)
    favicon.ico
  components/          # 13 componentes de apresentação (sem lógica de backend)
    Header, Hero, AboutSection, PillarsSection, BenefitsSection,
    JoinSection, AffiliatesSection, AffiliateCard, SchoolSection,
    HistorySection, ContactSection, Footer, SectionHeading
  data/               # CONTEÚDO ESTÁTICO em TypeScript
    institution.ts    # dados institucionais REAIS (ver 1.7)
    pillars.ts, benefits.ts, courses.ts
    affiliates.ts     # 6 filiados FICTÍCIOS ("Filiado Exemplo 01"...)
  lib/
    whatsapp.ts       # monta links wa.me
public/
  cmebe-logo.jpeg     # logo oficial (único asset)
```

### 1.3 Rotas existentes

- **Apenas `/`** (home). Uma única página.
- **Nenhuma** API route, route handler ou server action.
- **Nenhum** `middleware.ts`.

### 1.4 Banco de dados, ORM e migrations

- **Inexistentes.** Não há Prisma, Drizzle, Mongoose, SQL, nem migrations.
- Confirmado por busca em todo o repositório (as únicas ocorrências de
  `prisma/auth/session/bcrypt/...` estão em `node_modules` e `.next`).

### 1.5 Autenticação, middleware, sessão, modelos de usuário

- **Não existe autenticação.** Sem NextAuth/Auth.js, sem JWT, sem cookies de
  sessão, sem hashing de senha.
- **Não existe middleware nem guards.**
- **Não existe modelo de usuário** nem painel administrativo.
- Verificação feita no código real (rotas, `package.json`, busca por palavras-
  chave, ausência de `middleware.ts` e de `.env`). A conclusão **não** se baseou
  apenas na home.

### 1.6 Fluxo de filiação atual

- O formulário em `JoinSection.tsx` **não envia para backend**: ele monta uma
  mensagem e abre o **WhatsApp** (`window.open(wa.me/...)`).
- `ContactSection.tsx` faz o mesmo para contato.
- Os CTAs "Filie-se já" (Header/Hero) também vão direto ao WhatsApp.
- **Conclusão:** hoje o WhatsApp é o **único** fluxo de filiação.

### 1.7 Dados institucionais REAIS (preservar — não inventar)

De `src/data/institution.ts`:

- Nome: **CMEBE — Conselho de Ministros Evangélicos do Brasil e do Exterior**
- Slogan: **"Tudo pelo Reino"**
- Fundação: **1º de maio de 2024**
- Presidente: **Pr. José Carlos Domingos**
- Endereço: **Estrada de Sepetiba nº 5236, Sepetiba, Rio de Janeiro - RJ, CEP 23545-003**
- Telefone/WhatsApp: **(21) 96441-8167** / `5521964418167`
- CNPJ: **55.500.596/0001-80**
- Instagram: **@cmebeoficial**
- Desenvolvedora (rodapé): **Chronostek**

### 1.8 Onde estão os "filiados" hoje

- `src/data/affiliates.ts`: **6 registros fictícios** ("Filiado Exemplo 01"…),
  todos com status único `"Filiado ativo"`.
- A própria seção exibe os textos "exemplos fictícios" e "Dados demonstrativos".
- **São 100% mockados/hardcoded.** Nenhuma origem em banco/API.

### 1.9 Variáveis de ambiente

- Hoje só `NEXT_PUBLIC_SITE_URL` (opcional, default `http://localhost:3000`).
- Não há `.env` no repositório.

---

## 2. O que pode ser reaproveitado

- **Toda a camada visual e a estrutura de seções da home** (Header → Footer).
  A arquitetura da página é boa e será preservada; muda a *execução* visual.
- **`src/data/institution.ts`** (dados reais) — mantido como fonte única.
- **`src/lib/whatsapp.ts`** — WhatsApp passa a ser **suporte secundário**.
- **Design tokens** em `globals.css` — serão reorganizados, não jogados fora.
- **`SectionHeading`** — reaproveitado e refinado.
- Configuração de TS, ESLint, Tailwind, paths `@/*`.

---

## 3. O que precisa ser criado

1. **Banco de dados + ORM** (Prisma + SQLite em dev; Postgres em produção).
2. **Modelos:** `User`, `AffiliateProfile`, `Session`, `AuditLog`,
   `DocumentRequest`.
3. **Autenticação própria e segura** (hash de senha + sessão por cookie
   httpOnly), com verificação no servidor.
4. **Controle de acesso por papel** (RBAC): MASTER, ADMIN, REVIEWER, SUPPORT,
   AFFILIATE — com MASTER como único aprovador nesta versão.
5. **Máquina de status** de filiação (DRAFT → … → APPROVED/REJECTED/SUSPENDED).
6. **Páginas:** `/cadastro`, `/entrar`, `/minha-filiacao`, `/master` (+ detalhe).
7. **APIs protegidas:** registro, login, logout, lista pública de filiados,
   ações do MASTER (aprovar/reprovar/documentos/suspender/reativar/visibilidade).
8. **Listagem pública de filiados** vinda do banco (campos não sensíveis).
9. **Auditoria** de todas as ações do MASTER.
10. **Seed/CLI** para criar o primeiro MASTER de forma segura.
11. **Estrutura de e-mail** (sem fingir envio se SMTP não existir).
12. **Redesign visual** de toda a home.

---

## 4. Arquitetura recomendada

Manter o **monólito Next.js** (App Router) — sem backend separado.

```
Browser
  │
  ├─ Server Components (renderização protegida; checagem de sessão no servidor)
  ├─ Route Handlers /api/*  (registro, login, logout, lista pública, ações MASTER)
  │        └─ todos revalidam sessão + papel NO SERVIDOR (nunca confiam no client)
  │
  ├─ lib/auth     (hash de senha scrypt, criação/validação de sessão)
  ├─ lib/session  (leitura do cookie httpOnly → usuário atual)
  ├─ lib/rbac     (assertRole / assertMaster)
  ├─ lib/audit    (registro de ações)
  └─ Prisma Client → SQLite (dev) / Postgres (prod)
```

Decisões e justificativas:

- **Prisma + SQLite (dev):** ORM real com migrations versionadas, **sem
  servidor de banco** e **sem dependências nativas de compilação** (importante
  no Windows). Troca para Postgres em produção apenas mudando `DATABASE_URL` e o
  `provider` do datasource. Documentado em `docs/cmebe-env.md`.
- **Hash de senha com `crypto.scrypt` (nativo do Node):** KDF forte e
  *memory-hard*, **sem dependência nativa** (evita falhas de build de
  `bcrypt`/`argon2` no Windows). Formato armazenado:
  `scrypt$N$r$p$saltB64$hashB64`.
- **Sessão por banco + cookie httpOnly** (padrão "Lucia-like"): token aleatório
  de 256 bits, **armazenado com hash** no banco; cookie `HttpOnly`, `SameSite=Lax`,
  `Secure` em produção. Simples de auditar e sem os *footguns* do provider de
  credenciais. Sem segredo de sessão no frontend.
- **Validação com `zod`** no servidor para todos os formulários.
- **Autorização em cada handler/página** (não apenas no middleware). O
  `middleware.ts` faz só uma barreira grosseira; a verdade é checada no servidor.

---

## 5. Estrutura de permissões (RBAC)

| Papel | Pode |
|-------|------|
| **MASTER** | Tudo: aprovar, reprovar, pedir documentos, suspender, reativar, alterar visibilidade pública, ver auditoria. **Único aprovador nesta versão.** |
| ADMIN | (Reservado) gestão futura, sem poder de aprovação nesta versão. |
| REVIEWER | (Reservado) análise/sugestão, sem decisão final. |
| SUPPORT | (Reservado) suporte/visualização. |
| **AFFILIATE** | Ver/editar os próprios dados permitidos; ver status da própria solicitação. |

Regras inegociáveis:

- Usuário recém-cadastrado nasce como **PENDING** (nunca APPROVED).
- **Nenhuma** requisição do usuário pode definir `status`, `role`,
  `publicVisible` ou `membershipNumber`. Esses campos são *server-controlled*.
- Aprovação/again de status só via endpoints MASTER, validados no servidor.
- Esconder botão no front **não** é segurança — a checagem é no backend.

---

## 6. Estrutura de banco recomendada

```prisma
enum Role   { MASTER ADMIN REVIEWER SUPPORT AFFILIATE }
enum AffiliationStatus {
  DRAFT PENDING UNDER_REVIEW DOCUMENTS_REQUESTED APPROVED REJECTED SUSPENDED
}

User
  id, name, email (unique), phone, passwordHash, role (default AFFILIATE),
  createdAt, updatedAt
  → profile (AffiliateProfile?), sessions[], auditActions[]

AffiliateProfile (1:1 com User)
  id, userId (unique),
  city, state, ministerialRole, church, presentation?,
  status (default PENDING),
  publicVisible (default false),     // só MASTER altera
  consentPrivacy (bool), consentPublicDisplay (bool),
  membershipNumber? (gerado na aprovação),
  rejectionReason?, reviewedById?, reviewedAt?,
  createdAt, updatedAt

Session
  id, userId, tokenHash (unique), expiresAt, createdAt

AuditLog
  id, actorId, action, targetUserId?, fromStatus?, toStatus?,
  reason?, metadata? (json em texto), createdAt

DocumentRequest
  id, profileId, message, resolved (default false), createdAt
```

Campos **sensíveis** (nunca expostos publicamente): email, phone, passwordHash,
consentimentos, rejectionReason, observações administrativas, documentos.

Campos **públicos** (apenas se APPROVED + publicVisible): name, ministerialRole,
city, state, membershipNumber, church *(somente se consentPublicDisplay)*.

---

## 7. Fluxo de cadastro, aprovação e publicação

1. **Cadastro** (`/cadastro`): valida no servidor, impede e-mail duplicado, cria
   `User` (role AFFILIATE) + `AffiliateProfile` (status **PENDING**), grava
   consentimentos. Mensagem: *"Sua solicitação foi recebida e está em análise
   pelo CMEBE."* Cria sessão e redireciona para `/minha-filiacao`.
2. **Área do afiliado** (`/minha-filiacao`): mostra status, etapa, dados,
   pedidos de documento, motivo de reprovação, visibilidade pública, edição dos
   campos permitidos e WhatsApp como suporte secundário.
3. **Análise (MASTER)** (`/master`): dashboard (contagens), lista com busca e
   filtros, detalhe do solicitante, ações: aprovar / reprovar (motivo
   obrigatório) / solicitar documentos / suspender / reativar / tornar
   público/ocultar. Toda ação grava `AuditLog`.
4. **Publicação:** o filiado só aparece na seção pública **Filiados** quando
   `status = APPROVED` **e** `publicVisible = true`. A API pública devolve apenas
   campos não sensíveis.

---

## 8. Riscos e como serão evitados

| Risco | Mitigação |
|-------|-----------|
| Escalonamento de privilégio (usuário vira MASTER/APPROVED) | `status`/`role`/`publicVisible`/`membershipNumber` são server-only; endpoints ignoram esses campos vindos do client; criação de MASTER só por seed/CLI. |
| Autorização só no front | Toda mutação revalida sessão + papel no servidor; middleware é defesa extra, não a principal. |
| Senhas vazadas | `scrypt` com salt aleatório; nunca logar senha; nunca retornar `passwordHash`. |
| Vazamento de dados sensíveis na API pública | DTO público com whitelist de campos; testes específicos. |
| Enumeração de e-mail no login | Mensagem genérica ("credenciais inválidas"). |
| Fixation/roubo de sessão | Token aleatório de 256 bits, guardado com hash; cookie HttpOnly/SameSite/Secure; expiração. |
| CSRF | SameSite=Lax + mutações via POST same-origin; (camada extra possível depois). |
| Quebra de build por dep nativa (Windows) | Zero deps nativas: scrypt nativo do Node + Prisma (engine embarcado). |
| Dados fictícios vazando para produção | Mock removido da home; lista vem do banco; seed de exemplo é opcional e marcado. |
| E-mail "fake" | Sem SMTP, o sistema **não finge** envio; loga intenção e documenta env. |
| Upload inseguro de documentos | **Não** implementar storage improvisado; só preparar o modelo `DocumentRequest`. |

---

## 9. Plano de testes

- **Estático:** `npm run lint`, `tsc --noEmit` (typecheck), `npm run build`.
- **Fluxos manuais (Fase 6):** cadastro novo / e-mail duplicado; login válido /
  inválido; pendente não acessa `/master`; pendente não aparece na lista
  pública; MASTER aprova → aparece só se `publicVisible`; MASTER reprova → não
  aparece; tentativa de mudar status via API sem permissão (deve dar 401/403);
  acesso não autorizado ao `/master`; logout.
- **Responsividade:** home, cadastro e painel em mobile/tablet/desktop.
- **Estados:** carregando, vazio, erro e resultado filtrado na lista pública.
- **Segurança:** `security-review` + checagem manual dos endpoints MASTER e da
  API pública (whitelist de campos).

---

## 10. Lista das alterações que serão feitas

**Infra/dados**
- [ ] Adicionar `prisma`, `@prisma/client`, `zod`.
- [ ] `prisma/schema.prisma` + migration inicial + `prisma generate`.
- [ ] `src/lib/db.ts`, `src/lib/auth.ts`, `src/lib/session.ts`, `src/lib/rbac.ts`,
      `src/lib/audit.ts`, `src/lib/validation.ts`.
- [ ] `prisma/seed.ts` + script CLI para criar o MASTER.

**APIs** (`src/app/api/...`)
- [ ] `auth/register`, `auth/login`, `auth/logout`.
- [ ] `affiliates` (pública, somente campos seguros).
- [ ] `master/requests/[id]` (aprovar/reprovar/documentos/suspender/reativar/visibilidade).

**Páginas**
- [ ] `/cadastro`, `/entrar`, `/minha-filiacao`, `/master`, `/master/[id]`.
- [ ] `middleware.ts` (barreira de rota).

**Visual (home — estrutura mantida)**
- [ ] `globals.css` (tokens + tipografia editorial + selo/credencial CMEBE).
- [ ] Refino de Header, Hero, About, Pillars, Benefits, Join, Affiliates,
      School, History, Contact, Footer (sem descaracterizar).
- [ ] Copy institucional (remover "imperdíveis", "Dados demonstrativos", etc.).
- [ ] `JoinSection` → cadastro real (WhatsApp vira secundário).
- [ ] `AffiliatesSection` → consome a API pública real.

**Docs**
- [x] `docs/cmebe-auditoria-e-plano.md` (este arquivo).
- [ ] `docs/cmebe-direcao-visual.md`.
- [ ] `docs/cmebe-env.md`.

> Após documentar, a implementação segue sem pedir confirmações desnecessárias,
> conforme instruído. Deploy em produção **não** será feito sem confirmação.
