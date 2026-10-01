"use client";

import { useState } from "react";

import { CmebeSeal } from "@/components/CmebeSeal";

type FounderPortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

// Retrato institucional com degradação elegante: tenta carregar a foto real;
// se o arquivo ainda não existir no projeto, exibe um espaço sóbrio com o selo
// do CMEBE (nunca uma imagem quebrada, nunca um rosto gerado ou de banco).
export function FounderPortrait({ src, alt, className = "" }: FounderPortraitProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-md border border-line bg-brand-900 shadow-[0_18px_48px_rgba(12,35,72,0.16)] ${className}`}
    >
      {failed ? (
        <div className="band-navy absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <CmebeSeal tone="dark" className="w-24" />
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-100">
            Foto institucional em breve
          </p>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- fallback onError exige <img>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}
    </div>
  );
}
