# CMEBE — Rodar o app na VPS (self-host, sem Vercel, sem túnel)

Arquitetura: **app Next.js em container na VPS**, atrás do **nginx** (TLS), falando
com o **Postgres local** (`cmebe-postgres`, porta 5433 do host). Nada de banco
exposto à internet, nenhum terceiro, tudo na VPS.

Pré-requisitos: Docker + Docker Compose na VPS (já há), nginx com TLS (já há para
os outros apps), e um **subdomínio** apontando para a VPS (ex.: `cmebe.chronostek.com.br`).

---

## 1. Enviar o código para a VPS

Opção A — via git (recomendado): `git clone`/`git pull` do repositório para
`/opt/cmebe` (ou onde preferir).
Opção B — `scp -r` da pasta do projeto (sem `node_modules`/`.next`).

## 2. Criar o `.env` (no diretório do projeto, na VPS — NÃO versionar)

```env
# Postgres LOCAL da VPS (o container alcança o host via host.docker.internal)
DATABASE_URL="postgresql://cmebe_app:SENHA_DO_BANCO@host.docker.internal:5433/cmebe?sslmode=require"
# URL pública do site (o subdomínio com https)
NEXT_PUBLIC_SITE_URL="https://cmebe.SEU-DOMINIO"
AUTH_SESSION_TTL_HOURS="168"
```

`SENHA_DO_BANCO` é a senha do usuário `cmebe_app` definida no provisionamento do
Postgres. (Se não tiver, dá para redefinir com `docker exec -it cmebe-postgres
psql -U cmebe_app -d cmebe -c "ALTER USER cmebe_app PASSWORD '...';"`.)

## 3. Subir o app

```bash
cd /opt/cmebe          # diretório do projeto
docker compose up -d --build
docker logs -f cmebe-app   # acompanhar; deve aplicar migrations e subir na :3000
```

O compose publica **só** em `127.0.0.1:8090` (o nginx faz o proxy). Confirme:
`curl -I http://127.0.0.1:8090` deve responder 200.

## 4. nginx (reverse proxy + TLS)

Adicione um server block (host nginx ou o container nginx que já serve os outros
domínios). Exemplo:

```nginx
server {
    server_name cmebe.SEU-DOMINIO;

    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    listen 80;
}
```

TLS com Let's Encrypt (host nginx):
```bash
certbot --nginx -d cmebe.SEU-DOMINIO
```
(Se o nginx roda em container, use o mesmo fluxo de cert que os outros domínios
Chronostek já usam e recarregue o nginx.)

## 5. DNS

Aponte um registro **A** de `cmebe.SEU-DOMINIO` para `SEU_IP_VPS`.
Propaga e o certbot valida.

## 6. Bootstrap dos usuários (uma vez)

MASTER e ADMIN (Pr. Gerson) já foram semeados no banco. Se precisar recriar:
```bash
docker exec -it cmebe-app sh -c "MASTER_EMAIL=... MASTER_PASSWORD=... npm run db:seed:master"
docker exec -it cmebe-app sh -c "ADMIN_EMAIL=gerson@cmebe.org ADMIN_PASSWORD=... ADMIN_NAME='Pr. Gerson' npm run db:seed:admin"
```

## 7. Atualizações futuras

```bash
cd /opt/cmebe && git pull && docker compose up -d --build
```

---

## Notas

- O app conecta no Postgres **local** — o firewall que bloqueia 5432/5433 da
  internet **não atrapalha** (é conexão interna do host).
- O antigo deploy na Vercel (`cmebe.vercel.app`) pode ser desativado ou mantido
  como espelho estático; a partir daqui o site oficial é o subdomínio na VPS.
- Cabeçalhos de segurança e HSTS já vêm do `next.config.ts`; o nginx cuida do TLS.
