import Image from "next/image";

import { institution } from "@/data/institution";

type CmebeSealProps = {
  className?: string;
  animate?: boolean;
  tone?: "light" | "dark";
};

// Assinatura visual do CMEBE: selo institucional com anéis, texto circular e a
// logo oficial ao centro. Inspirado em credencial/registro de conselho.
export function CmebeSeal({ className = "", animate = false, tone = "light" }: CmebeSealProps) {
  const ticks = Array.from({ length: 48 });
  const isDark = tone === "dark";
  const ringOuter = isDark ? "#e3c878" : "#c99a2e";
  const ringMid = isDark ? "rgba(244,232,198,0.55)" : "#163c78";
  const ringInner = isDark ? "rgba(255,255,255,0.18)" : "#dce7f6";
  const tickColor = isDark ? "#e3c878" : "#c99a2e";
  const textColor = isDark ? "#f4e8c6" : "#102b5c";

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className={`h-full w-full ${animate ? "cmebe-seal-rotate" : ""}`}
        role="img"
        aria-label="Selo institucional do CMEBE"
      >
        <defs>
          <path
            id="cmebe-seal-text"
            d="M 22,100 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            fill="none"
          />
        </defs>

        <circle cx="100" cy="100" r="97" fill="none" stroke={ringOuter} strokeWidth="1.5" />
        <circle cx="100" cy="100" r="90" fill="none" stroke={ringMid} strokeWidth="1" />
        <circle cx="100" cy="100" r="62" fill="none" stroke={ringInner} strokeWidth="1" />

        {/* marcações finas tipo guilhochê */}
        <g stroke={tickColor} strokeWidth="0.8" opacity="0.55">
          {ticks.map((_, i) => {
            const angle = (i / ticks.length) * Math.PI * 2;
            const r1 = 90;
            const r2 = 86;
            const x1 = 100 + Math.cos(angle) * r1;
            const y1 = 100 + Math.sin(angle) * r1;
            const x2 = 100 + Math.cos(angle) * r2;
            const y2 = 100 + Math.sin(angle) * r2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        <text
          fill={textColor}
          fontSize="9.5"
          fontWeight={600}
          letterSpacing="1.4"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <textPath href="#cmebe-seal-text" startOffset="2%">
            CONSELHO DE MINISTROS EVANGÉLICOS · BRASIL E EXTERIOR ·
          </textPath>
        </text>
      </svg>

      <div className="absolute left-1/2 top-1/2 aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-1 ring-[#c99a2e]/60">
        <Image
          src={institution.logo}
          alt="Logo do CMEBE"
          fill
          sizes="200px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
