import type { Metadata } from "next";

import { EntrepreneurSection } from "@/components/EntrepreneurSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Empreendedor CMEBE",
  description:
    "Conheça as empresas, profissionais e parceiros institucionais que integram o espaço Empreendedor CMEBE.",
  path: "/empreendedores",
  keywords: ["parceiros CMEBE", "empresas parceiras CMEBE"],
});

export default function EmpreendedoresPage() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <EntrepreneurSection standalone />
      </main>
      <Footer />
    </div>
  );
}
