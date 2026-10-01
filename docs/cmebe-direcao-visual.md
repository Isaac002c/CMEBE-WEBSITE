# CMEBE — Direção Visual

> Documento da **Fase 2**, escrito **antes** de codar o redesign. Define o
> sistema de design que substitui a aparência de "template/IA" por uma
> identidade de **conselho ministerial / credencial institucional**.

Princípio-guia: **sobriedade que transmite credibilidade.** Azul como base
institucional; **dourado apenas como detalhe de honra**. Inspiração em
credenciais, selos, registros oficiais e editorial — não em SaaS, não em "igreja
moderna", não em "luxo fake".

---

## 1. Paleta final

Tons reorganizados em uma escala consistente (mantendo o azul/dourado atuais).

### Azul institucional (base)

| Token | Hex | Uso |
|-------|-----|-----|
| `--cmebe-blue-950` | `#081A35` | Tinta mais escura, rodapé, texto sobre claro forte |
| `--cmebe-blue-900` | `#0C2348` | Painéis escuros, headings sobre claro |
| `--cmebe-blue-800` | `#102B5C` | Botão primário, títulos |
| `--cmebe-blue-700` | `#163C78` | Cor de marca principal |
| `--cmebe-blue-600` | `#1D4F91` | Hover/realce de painel |
| `--cmebe-blue-200` | `#B9CCE9` | Bordas em superfícies escuras |
| `--cmebe-blue-100` | `#DCE7F6` | Bordas claras (linha fina) |
| `--cmebe-blue-50`  | `#EEF3FB` | Fundo de seção alternado |

### Dourado de honra (acento — uso reduzido)

| Token | Hex | Uso |
|-------|-----|-----|
| `--cmebe-gold-700` | `#8A6516` | Texto dourado sobre fundo claro (contraste AA) |
| `--cmebe-gold-600` | `#A87C1E` | Eyebrows, detalhes |
| `--cmebe-gold-500` | `#C99A2E` | Selo, filete dourado |
| `--cmebe-gold-300` | `#E3C878` | Detalhe sobre fundo escuro |
| `--cmebe-gold-100` | `#F4E8C6` | Realce sutil |

### Neutros (papel/tinta editorial)

| Token | Hex | Uso |
|-------|-----|-----|
| `--cmebe-paper` | `#F6F8FC` | Fundo geral (frio, sóbrio) |
| `--cmebe-surface` | `#FFFFFF` | Cartões/superfícies |
| `--cmebe-ink` | `#0C2348` | Texto forte |
| `--cmebe-body` | `#42506B` | Texto corrido |
| `--cmebe-muted` | `#697892` | Texto auxiliar/labels |
| `--cmebe-line` | `#DCE7F6` | Linhas/bordas |

Estados semânticos: sucesso `#1B7A52`, erro `#B42318`, aviso `#8A6516`.
Contraste alvo: **AA** para texto; foco visível sempre.

---

## 2. Tipografia

Dupla editorial + interface (carregadas via `next/font/google`, com fallback de
sistema caso o build esteja offline):

- **Títulos / display:** `Spectral` (serifada transicional, sóbria e editorial).
  Pesos 500/600. Fallback: `Georgia, 'Times New Roman', serif`.
- **Texto / interface:** `Inter` (sans limpa, alta legibilidade). Pesos
  400/500/600. Fallback: a pilha de sistema atual (`Segoe UI`…).

Por que: serifada nos títulos dá autoridade de "documento/conselho"; a sans nos
textos e na UI mantém clareza. Evita o ar genérico de site só-sans.

---

## 3. Hierarquia de títulos

| Nível | Fonte / peso | Tamanho (clamp) | Cor |
|-------|--------------|------------------|-----|
| Hero H1 | Spectral 600 | `clamp(2.5rem, 5.5vw, 4.25rem)` | `--cmebe-ink` |
| Seção H2 | Spectral 600 | `clamp(1.75rem, 3vw, 2.5rem)` | `--cmebe-ink` |
| Card H3 | Inter 600 | `1.125rem` | `--cmebe-ink` |
| Eyebrow | Inter 600, *small caps* tracking `0.18em` | `0.8rem` | `--cmebe-gold-700` |
| Corpo | Inter 400/500 | `1rem`–`1.125rem`, lh `1.7` | `--cmebe-body` |
| Label/caption | Inter 600 uppercase | `0.72rem` | `--cmebe-muted` |

O **eyebrow** ganha um traço curto (filete) à esquerda — etiqueta de registro,
não só texto colorido.

---

## 4. Espaçamentos

- Escala base **4px** (Tailwind padrão).
- Padding vertical de seção: `py-20` mobile → `py-28` desktop.
- Container: `max-w-6xl` (≈1152px) para leitura editorial (mais estreito que o
  `7xl` atual, que dava ar de dashboard). Largura de texto alvo ≈ 65ch.
- Gaps de grid: `gap-6`/`gap-8`.

---

## 5. Bordas e raios

- Raio padrão de cartões/inputs/botões: **`6px`** (`rounded-md`). Some o
  "tudo muito arredondado".
- Selo e avatares: círculo (intencional).
- Acentos de um lado só (filete superior/lateral) **sem** raio nesse lado.
- Bordas: `1px solid var(--cmebe-line)`; hover sobe para azul/dourado discreto.

---

## 6. Padrões de botões

| Tipo | Estilo |
|------|--------|
| **Primário** | Fundo `--cmebe-blue-800`, texto branco, `rounded-md`, sombra mínima, **anel de foco dourado**. Hover: `--cmebe-blue-900`. |
| **Secundário** | Fundo branco, borda `1px` azul, texto azul. Hover: borda/realce azul-600. |
| **Honra (dourado)** | **Raro.** Fundo `--cmebe-gold-500` chapado (sem gradiente), texto `--cmebe-blue-950`. Usar só em 1 momento-chave (ex.: selo/credencial), nunca em todo botão. |
| **WhatsApp/suporte** | Secundário com ícone; **nunca** é o CTA primário de filiação. |

Removido: gradientes dourados (`.luxe-button`) e sombras coloridas fortes.

---

## 7. Padrões de formulários

- Label **acima** do campo (Inter 600, `--cmebe-ink`).
- Campo: altura `44px`, borda `1px`, fundo `#FBFCFE`, `rounded-md`.
- Foco: borda azul + **anel** `ring-2` azul translúcido (sem brilho dourado).
- Erro: borda vermelha + texto `--erro` curto e claro abaixo do campo.
- Mensagens de sucesso/erro com `role="status"`/`aria-live`.
- Validação real no servidor (a UI só espelha).

---

## 8. Padrões de cards

- Base: branco, borda `1px var(--cmebe-line)`, `rounded-md`, **sombra sutil**
  (`0 1px 2px rgba(12,35,72,.06)`), não a sombra pesada atual.
- Variante "documento": filete superior fino (azul ou dourado 2px) para seções
  de destaque — leitura de credencial.
- Hover discreto: muda **cor da borda**, sem "pulo" (translate) em todo card.
- **Sem** o mesmo "ícone dentro de quadrado azul" repetido em toda seção.

---

## 9. Uso de ícones

- `lucide-react`, traço fino, tamanho `16–20px`.
- Ícone **inline** ao lado do texto/label, em azul ou dourado — sem o box
  colorido onipresente.
- Ícone decorativo: `aria-hidden`. Botão só-ícone: `aria-label`.

---

## 10. Elemento visual assinatura do CMEBE — o "Selo"

Componente próprio `CmebeSeal` (SVG), inspirado em **selo/credencial de
conselho**:

- Anéis concêntricos finos (azul + filete dourado).
- Texto circular: `CONSELHO DE MINISTROS EVANGÉLICOS • BRASIL E EXTERIOR •`.
- Centro: a **logo oficial** (mantida como elemento central) ou monograma
  `CMEBE` com o ano `2024`.
- Acabamento "guilhochê" discreto (linhas finas radiais), respeitando
  `prefers-reduced-motion` (sem rotação automática; rotação só opcional e lenta,
  desativada quando o usuário pede menos movimento).

Usos: no **Hero** (em volta da logo), como **marca d'água** sutil em uma seção,
e como divisor/etiqueta. É a "impressão digital" visual do site.

Complementos de assinatura:
- **Etiqueta institucional** (registry tag): pequena cápsula com filete, ex.:
  `Fundado em 1º/05/2024 · Sede RJ`.
- **Filetes** (rules) dourados/azuis finos como divisores editoriais.

---

## 11. O que foi REMOVIDO por parecer genérico/IA

- Numeração decorativa `01/02/03` (Benefícios) — não é sequência real.
- `.luxe-button` (gradiente dourado) em todo lugar → dourado vira chapado e raro.
- `gold-text` (gradiente clipado) no "CMEBE" do hero.
- "Ícone em quadrado azul" repetido em todas as seções.
- `premium-shadow` pesada (`0 18px 48px`) generalizada.
- Excesso de `backdrop-blur` (glassmorphism).
- `hero-blue-field` diagonal (clip-path) com cara de SaaS → composição mais
  editorial com selo + filete + painel sóbrio.
- Copy promocional/vazia: "imperdíveis", "excelência incomparável",
  "experiência premium".
- "Dados demonstrativos" / "exemplos fictícios" (a lista passa a ser real).

## 12. O que foi MANTIDO da página atual

- **Estrutura/ordem das seções** (Header → Hero → Sobre → Pilares → Benefícios →
  Filiação → Filiados → Escola de Profetas → História → Contato → Footer).
- Identidade **azul + dourado**.
- **Logo como elemento central** (Hero, Header, Footer).
- **Dados institucionais reais** e contato (endereço, CNPJ, Instagram, mapa).
- **WhatsApp** — agora como **suporte secundário**, não como fluxo único.
- Âncoras/scroll suave e tratamento de `prefers-reduced-motion`.
- Créditos da **Chronostek** no rodapé.

---

## 13. Acessibilidade e responsividade (metas)

- Contraste **AA**; foco de teclado visível (anel) em todos os interativos.
- Navegação por teclado no menu, formulários e painel.
- `prefers-reduced-motion` respeitado (sem animações essenciais ao conteúdo).
- Responsivo real: mobile (1 coluna), tablet (2 col.), desktop (layout editorial).
- Imagens com `alt` significativo; `iframe` do mapa com `title`.
