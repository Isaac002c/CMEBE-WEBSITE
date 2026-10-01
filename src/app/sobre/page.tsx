import { AboutSection } from "@/components/AboutSection";
import { DiretoriaSection } from "@/components/DiretoriaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HistorySection } from "@/components/HistorySection";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({
  title: "Sobre o CMEBE e sua Diretoria",
  description:
    "Conheça o CMEBE — Conselho de Ministros Evangélicos do Brasil e do Exterior —, sua história, missão, diretoria e liderança institucional.",
  path: "/sobre",
  keywords: ["história do CMEBE", "diretoria CMEBE", "Pr. José Carlos Domingos"],
});

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <AboutSection />
        <HistorySection />
        <DiretoriaSection />
      </main>
      <Footer />
    </div>
  );
}
