// Galeria institucional — fotos reais de eventos/formação do CMEBE.
export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/galeria-1.jpg",
    alt: "Ministros e líderes reunidos em evento institucional do CMEBE",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/galeria-2.jpg",
    alt: "Momento de comunhão durante a formatura de capelania do CMEBE",
    width: 1000,
    height: 563,
  },
  {
    src: "/images/galeria-3.jpg",
    alt: "Capelã formada exibindo seu certificado do CMEBE",
    width: 563,
    height: 1000,
  },
  {
    src: "/images/galeria-4.jpg",
    alt: "Ministros do CMEBE durante cerimônia de credenciamento",
    width: 563,
    height: 1000,
  },
  {
    src: "/images/galeria-5.jpg",
    alt: "Entrega de certificado de capelania pelo CMEBE",
    width: 1000,
    height: 563,
  },
  {
    src: "/images/galeria-6.jpg",
    alt: "Confraternização entre filiados e líderes do CMEBE",
    width: 563,
    height: 1000,
  },
];
