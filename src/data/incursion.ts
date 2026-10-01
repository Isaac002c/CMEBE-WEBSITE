export const incursion = {
  name: "Incursão CMEBE pelo Reino",
  cover: "/images/incursao-cmebe/capa-incursao-cmebe.jpg",
  verse: "Ide por todo o mundo e pregai o evangelho a toda criatura.",
  verseReference: "Marcos 16:15",
  cities: [
    { city: "Piracicaba", state: "SP" },
    { city: "Campinas", state: "SP" },
    { city: "Várzea Paulista", state: "SP" },
    { city: "Campo Limpo Paulista", state: "SP" },
    { city: "Taubaté", state: "SP" },
    { city: "Itatiaia", state: "RJ" },
  ],
} as const;

export type IncursionGalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const incursionGallery: IncursionGalleryImage[] = [
  {
    src: "/images/incursao-cmebe/louvor-e-adoracao.jpg",
    alt: "Momento de louvor durante encontro da Incursão CMEBE",
    caption: "Louvor e adoração reunindo ministros e lideranças.",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/incursao-cmebe/comunhao-entre-ministros.jpg",
    alt: "Ministros se abraçam durante encontro do CMEBE",
    caption: "Comunhão e acolhimento entre os participantes.",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/incursao-cmebe/palavra-ao-conselho.jpg",
    alt: "Liderança compartilha uma palavra em encontro do CMEBE",
    caption: "Palavra compartilhada durante a programação ministerial.",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/incursao-cmebe/reconhecimento-ministerial.jpg",
    alt: "Entrega de certificado em cerimônia do CMEBE",
    caption: "Reconhecimento ministerial registrado em cerimônia.",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/incursao-cmebe/homenagem-e-certificacao.jpg",
    alt: "Participantes celebram uma certificação do CMEBE",
    caption: "Homenagem e celebração entre participantes.",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/incursao-cmebe/grupo-de-ministros.jpg",
    alt: "Grupo de ministros e líderes reunidos após cerimônia do CMEBE",
    caption: "Ministros e líderes reunidos após a cerimônia.",
    width: 1280,
    height: 960,
  },
  {
    src: "/images/incursao-cmebe/confraternizacao.jpg",
    alt: "Lideranças em momento de confraternização do CMEBE",
    caption: "Confraternização e troca de lembranças ao fim do encontro.",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/incursao-cmebe/registro-coletivo.jpg",
    alt: "Registro coletivo de ministros e participantes do CMEBE",
    caption: "Registro coletivo da comunhão construída na programação.",
    width: 1280,
    height: 960,
  },
];
