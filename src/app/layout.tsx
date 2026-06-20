import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CMEBE | Conselho de Ministros Evangélicos do Brasil e do Exterior",
  description:
    "Conheça o CMEBE, conselho ministerial voltado à união, formação, credenciamento e fortalecimento de ministros evangélicos no Brasil e no exterior.",
  keywords: [
    "CMEBE",
    "ministros evangélicos",
    "conselho de ministros",
    "capelania cristã",
    "credencial ministerial",
    "filiação ministerial",
    "formação cristã",
    "escola de profetas",
  ],
  openGraph: {
    title: "CMEBE | Conselho de Ministros Evangélicos do Brasil e do Exterior",
    description:
      "Conselho ministerial voltado à união, formação, credenciamento e fortalecimento de ministros evangélicos.",
    images: ["/cmebe-logo.jpeg"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
