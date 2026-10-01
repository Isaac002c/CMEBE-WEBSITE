import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BeneficiosAlcance } from "@/components/beneficios/BeneficiosAlcance";
import { BeneficiosCartao } from "@/components/beneficios/BeneficiosCartao";
import { BeneficiosClosing } from "@/components/beneficios/BeneficiosClosing";
import { BeneficiosFaq } from "@/components/beneficios/BeneficiosFaq";
import { BeneficiosFundador } from "@/components/beneficios/BeneficiosFundador";
import { BeneficiosHero } from "@/components/beneficios/BeneficiosHero";
import { BeneficiosInvestimento } from "@/components/beneficios/BeneficiosInvestimento";
import { BeneficiosProposta } from "@/components/beneficios/BeneficiosProposta";
import { BeneficiosSobre } from "@/components/beneficios/BeneficiosSobre";
import { BeneficiosVantagens } from "@/components/beneficios/BeneficiosVantagens";
import { createPageMetadata } from "@/data/seo";

export const metadata: Metadata = createPageMetadata({
  title: "CMEBE Benefícios e Parcerias",
  description:
    "Parcerias que fortalecem empresas e a rede do CMEBE. Divulgação, Cartão Parceiro de Descontos e presença institucional para empresas que desejam alcançar um público cristão segmentado.",
  path: "/beneficios",
  keywords: ["CMEBE Benefícios", "parcerias comerciais CMEBE"],
});

export default function BeneficiosPage() {
  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <BeneficiosHero />
        <BeneficiosSobre />
        <BeneficiosAlcance />
        <BeneficiosVantagens />
        <BeneficiosInvestimento />
        <BeneficiosCartao />
        <BeneficiosFundador />
        <BeneficiosProposta />
        <BeneficiosFaq />
        <BeneficiosClosing />
      </main>
      <Footer />
    </div>
  );
}
