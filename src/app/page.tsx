import { AboutSection } from "@/components/AboutSection";
import { AgendaSection } from "@/components/AgendaSection";
import { ContactSection } from "@/components/ContactSection";
import { CommunityHighlights } from "@/components/CommunityHighlights";
import { CredentialsSection } from "@/components/CredentialsSection";
import { CtaBand } from "@/components/CtaBand";
import { DiretoriaSection } from "@/components/DiretoriaSection";
import { EntrepreneurSection } from "@/components/EntrepreneurSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HistorySection } from "@/components/HistorySection";
import { IncursionSection } from "@/components/IncursionSection";
import { JsonLd } from "@/components/JsonLd";
import { JoinSection } from "@/components/JoinSection";
import { LemaBand } from "@/components/LemaBand";
import { PillarsSection } from "@/components/PillarsSection";
import { PresidentSection } from "@/components/PresidentSection";
import { SchoolSection } from "@/components/SchoolSection";
import { organizationJsonLd, websiteJsonLd } from "@/data/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <div className="min-h-screen bg-paper text-body">
        <Header />
        <main>
          <Hero />
          <AgendaSection />
          <CommunityHighlights />
          <DiretoriaSection />
          <PresidentSection />
          <CredentialsSection />
          <EntrepreneurSection />
          <AboutSection />
          <PillarsSection />
          <LemaBand />
          <JoinSection />
          <SchoolSection />
          <HistorySection />
          <IncursionSection />
          <GallerySection />
          <CtaBand />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
