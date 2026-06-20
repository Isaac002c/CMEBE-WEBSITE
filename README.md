# CMEBE

Website institucional do CMEBE — Conselho de Ministros Evangélicos do Brasil e do Exterior.

## Stack

- Next.js 15 com App Router
- TypeScript
- Tailwind CSS
- lucide-react

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

```bash
npm run lint
npm run build
npm run start
```

## Dados editáveis

Os conteúdos institucionais e mockados ficam em:

- `src/data/institution.ts`
- `src/data/benefits.ts`
- `src/data/pillars.ts`
- `src/data/affiliates.ts`
- `src/data/courses.ts`

Para produção, defina `NEXT_PUBLIC_SITE_URL` com o domínio real do site.
