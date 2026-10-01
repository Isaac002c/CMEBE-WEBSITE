import Image from "next/image";

export function MemorialSection() {
  return (
    <article
      id="homenagem-jose-pereira"
      aria-labelledby="homenagem-jose-pereira-titulo"
      className="relative mt-12 overflow-hidden rounded-2xl border border-gold-500/30 bg-[#0a0b0f] text-white shadow-[0_24px_70px_rgba(8,26,53,0.22)]"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(201,154,46,0.12),transparent_34%),radial-gradient(circle_at_12%_86%,rgba(22,60,120,0.18),transparent_42%)]"
        aria-hidden
      />
      <div className="cmebe-rule-gold absolute inset-x-0 top-0" />

      <div className="relative grid items-center gap-10 p-5 sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:p-10">
        <figure className="mx-auto w-full max-w-[28rem]">
          <a
            href="/images/homenagens/pr-jose-pereira.jpg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir a arte da homenagem ao Pr. José Pereira em tamanho original"
            className="block overflow-hidden rounded-sm border border-gold-300/30 bg-black shadow-[0_28px_80px_rgba(0,0,0,0.58)] transition hover:border-gold-300/60"
          >
            <Image
              src="/images/homenagens/pr-jose-pereira.jpg"
              alt="Arte oficial de homenagem póstuma ao Pr. José Pereira"
              width={848}
              height={1024}
              sizes="(max-width: 1024px) calc(100vw - 4rem), 448px"
              className="h-auto w-full"
            />
          </a>
          <figcaption className="mt-3 text-center text-xs leading-5 text-white/55">
            Toque na imagem para visualizá-la em tamanho original.
          </figcaption>
        </figure>

        <div className="max-w-2xl">
          <p className="cmebe-eyebrow on-dark">Homenagem póstuma</p>
          <h3
            id="homenagem-jose-pereira-titulo"
            className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            Em memória do Pr. José Pereira
          </h3>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">
            1º conselheiro fundador do CMEBE
          </p>

          <div className="mt-8 border-l-2 border-gold-500 pl-5 sm:pl-6">
            <p className="font-display text-xl leading-8 text-white sm:text-2xl sm:leading-9">
              Com profundo pesar, despedimo-nos de um autêntico missionário dos pés
              formosos, que esteve, conviveu e fez muitos amigos.
            </p>
            <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
              Deus conforte os corações dos familiares e das muitas ovelhas que foram
              apascentadas com carinho através de seu ministério.
            </p>
          </div>

          <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
            O CMEBE honra sua história, seu serviço ao Reino e o legado de fé deixado
            em cada vida alcançada por sua caminhada ministerial.
          </p>

          <div className="mt-9 border-t border-white/15 pt-6">
            <p className="font-display text-2xl font-semibold tracking-wide text-gold-300">
              CMEBE em luto
            </p>
            <div className="mt-3 grid gap-1 text-sm leading-6 text-white/65 sm:grid-cols-2 sm:gap-5">
              <p>Pr. José Carlos Domingos · Presidente</p>
              <p>Pr. Gerson Martins · Vice-presidente</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
