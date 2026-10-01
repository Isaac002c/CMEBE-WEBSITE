import { SectionHeading } from "@/components/SectionHeading";
import { faq } from "@/data/beneficios";

export function BeneficiosFaq() {
  return (
    <section id="faq" className="section bg-surface">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Dúvidas"
          title="Perguntas frequentes"
          align="center"
        />

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faq.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 font-display text-base font-semibold text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="pb-5 text-sm leading-7 text-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
