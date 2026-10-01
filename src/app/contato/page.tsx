import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({
  title: "Contato CMEBE",
  description:
    "Fale com o CMEBE — Conselho de Ministros Evangélicos do Brasil e do Exterior. Consulte endereço, telefone, WhatsApp e Instagram oficiais.",
  path: "/contato",
  keywords: ["contato CMEBE", "telefone CMEBE", "WhatsApp CMEBE"],
});

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
