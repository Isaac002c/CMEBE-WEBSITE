import { SectionHeading } from "@/components/SectionHeading";
import { vantagensEmpresa } from "@/data/beneficios";

export function BeneficiosVantagens() {
  return (
    <section className="paper-engrave section">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Vantagens"
          title="Por que se tornar um parceiro CMEBE?"
          align="center"
        />

        <ul className="mx-auto mt-12 grid max-w-3xl gap-x-10 gap-y-6 sm:grid-cols-2">
          {vantagensEmpresa.map((item) => (
            <li
              key={item.title}
              className="border-l-2 border-gold-500 pl-4 text-base font-medium leading-7 text-ink"
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
