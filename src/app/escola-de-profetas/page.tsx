import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SchoolSection } from "@/components/SchoolSection";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({
  title: "Escola de Profetas CMEBE",
  description:
    "A Escola de Profetas do CMEBE: formação e capacitação ministerial, com o Curso de Capelania Cristã — módulos e instrutores.",
  path: "/escola-de-profetas",
  keywords: ["Escola de Profetas CMEBE", "formação ministerial"],
});

export default function EscolaDeProfetasPage() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <SchoolSection />
      </main>
      <Footer />
    </div>
  );
}
