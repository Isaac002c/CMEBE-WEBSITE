import type { Metadata } from "next";

import { AgendaSection } from "@/components/AgendaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { agendaItemListJsonLd, createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Agenda Oficial 2026",
  description:
    "Agenda Oficial CMEBE do segundo semestre de 2026: datas, horários, locais e informações dos encontros institucionais.",
  path: "/agenda",
  keywords: ["eventos CMEBE", "calendário CMEBE 2026"],
});

export default function AgendaPage() {
  return (
    <>
      <JsonLd data={agendaItemListJsonLd} />
      <div className="min-h-screen bg-paper text-body">
        <Header />
        <main>
          <AgendaSection full />
        </main>
        <Footer />
      </div>
    </>
  );
}
