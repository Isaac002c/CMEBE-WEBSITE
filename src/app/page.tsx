import { AboutSection } from "@/components/AboutSection";
import { AffiliatesSection } from "@/components/AffiliatesSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HistorySection } from "@/components/HistorySection";
import { JoinSection } from "@/components/JoinSection";
import { PillarsSection } from "@/components/PillarsSection";
import { SchoolSection } from "@/components/SchoolSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <PillarsSection />
        <BenefitsSection />
        <JoinSection />
        <AffiliatesSection />
        <SchoolSection />
        <HistorySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
