import type { NextConfig } from "next";

// Cabeçalhos de segurança aplicados a todas as rotas (ver docs/cmebe-deploy.md §5).
// A Vercel já força HTTPS; estes reforçam a postura sem quebrar o app.
const securityHeaders = [
  // HSTS: só tem efeito sob HTTPS (produção). Inofensivo em http local.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Impede o navegador de "adivinhar" o content-type (evita MIME sniffing).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Anti-clickjacking: o site não pode ser embutido em iframes.
  { key: "X-Frame-Options", value: "DENY" },
  // Não vaza a URL completa como referrer para outros domínios.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desliga APIs sensíveis do navegador que o site não usa.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Remove o header "X-Powered-By: Next.js" (menos superfície de fingerprint).
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
