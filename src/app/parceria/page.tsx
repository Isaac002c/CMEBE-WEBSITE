import Link from "next/link";

import { PartnerRegisterForm } from "@/components/partners/PartnerRegisterForm";
import { AuthShell } from "@/components/auth/AuthShell";
import { createNoIndexMetadata } from "@/data/seo";

export const metadata = createNoIndexMetadata("Solicitar parceria", "/parceria");

export default function ParceriaPage() {
  return (
    <AuthShell
      title="Solicitar parceria com o CMEBE"
      subtitle="Solicite sua parceria com o CMEBE. Após o envio, sua solicitação será analisada pela administração e, quando aprovada, sua instituição aparecerá na área de associados."
      maxWidth="lg"
      footer={
        <>
          Conheça quem já faz parte:{" "}
          <Link href="/associados" className="font-medium text-brand-800 underline underline-offset-2">
            Associados CMEBE
          </Link>
        </>
      }
    >
      <PartnerRegisterForm />
    </AuthShell>
  );
}
