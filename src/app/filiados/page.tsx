import { AffiliatesSection } from "@/components/AffiliatesSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createNoIndexMetadata } from "@/data/seo";

export const metadata = createNoIndexMetadata("Filiados", "/filiados");

export default function FiliadosPage() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <AffiliatesSection />
      </main>
      <Footer />
    </div>
  );
}
