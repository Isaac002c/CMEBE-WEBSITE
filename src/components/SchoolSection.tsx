import { BookOpenCheck } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { featuredCourses } from "@/data/courses";

export function SchoolSection() {
  return (
    <section id="escola" className="brand-panel px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Formação ministerial"
            title="Escola de Profetas"
            description="Uma frente de capacitação do CMEBE voltada à formação, especialização e aperfeiçoamento de ministros evangélicos, líderes e vocacionados, preparando homens e mulheres para servirem com excelência na igreja local, na sociedade e no corpo de Cristo."
            inverse
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredCourses.map((course) => (
              <article
                key={course.title}
                className="rounded-lg border border-white/15 bg-white/[0.08] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[#f2dc99]"
              >
                <span className="luxe-button flex h-11 w-11 items-center justify-center rounded-full">
                  <BookOpenCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{course.title}</h3>
                <p className="mt-3 text-sm leading-7 text-blue-50/85">
                  {course.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
