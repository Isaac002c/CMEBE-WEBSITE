type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p
          className={`cmebe-eyebrow ${align === "center" ? "is-center" : ""} ${
            inverse ? "on-dark" : ""
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl ${
          inverse ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-8 sm:text-lg ${
            inverse ? "text-brand-100" : "text-body"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
