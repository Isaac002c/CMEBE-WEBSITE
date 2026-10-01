import Link from "next/link";
import { Handshake } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SectionHeading } from "@/components/SectionHeading";
import { PartnersDirectory } from "@/components/partners/PartnersDirectory";
import { createNoIndexMetadata } from "@/data/seo";
import { getPublicPartners, type PublicPartner } from "@/lib/partners-public";

export const dynamic = "force-dynamic";

export const metadata = createNoIndexMetadata("Associados CMEBE", "/associados");

export default async function AssociadosPage() {
  let partners: PublicPartner[] = [];
  try {
    partners = await getPublicPartners();
  } catch {
    partners = [];
  }

  return (
    <div className="min-h-screen bg-paper text-body">
      <Header />
      <main>
        <section className="section">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Associados CMEBE"
              title="Parceiros e instituições associadas"
              description="Igrejas, ministérios, empresas e instituições parceiras aprovadas pela administração do CMEBE."
              align="center"
            />

            <div className="mt-10">
              {partners.length === 0 ? (
                <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-md border border-dashed border-line bg-surface py-16 text-center">
                  <Handshake className="h-8 w-8 text-brand-200" aria-hidden />
                  <p className="max-w-md text-sm leading-7 text-body">
                    Em breve, os associados e parceiros aprovados do CMEBE estarão
                    disponíveis nesta área.
                  </p>
                  <Link href="/parceria" className="btn btn-primary">
                    Solicitar parceria
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex justify-end">
                    <Link href="/parceria" className="btn btn-secondary h-10 px-4 text-sm">
                      Quero ser parceiro
                    </Link>
                  </div>
                  <PartnersDirectory partners={partners} />
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
