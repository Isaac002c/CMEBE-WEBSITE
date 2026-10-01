import type { Metadata } from "next";

import { officialEvents } from "@/data/events";
import { institution } from "@/data/institution";

export const siteUrl = "https://www.cmebe.com.br";

export const homeTitle =
  "CMEBE – Conselho de Ministros Evangélicos do Brasil e do Exterior";

export const defaultDescription =
  "Site oficial do CMEBE, Conselho de Ministros Evangélicos do Brasil e do Exterior. Conheça a instituição, diretoria, agenda, credenciais e projetos.";

export const defaultKeywords = [
  "CMEBE",
  "Conselho de Ministros Evangélicos do Brasil e do Exterior",
  "Conselho de Ministros Evangélicos",
  "ministros evangélicos",
  "conselho evangélico",
  "liderança cristã",
  "agenda CMEBE",
  "diretoria CMEBE",
  "credenciais CMEBE",
];

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: homeTitle,
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const socialTitle = title.includes("CMEBE") ? title : `${title} | CMEBE`;

  return {
    title: title.includes("CMEBE") ? { absolute: title } : title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: institution.shortName,
      locale: "pt_BR",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function createNoIndexMetadata(
  title: string,
  path: `/${string}`,
): Metadata {
  return {
    title: title.includes("CMEBE") ? { absolute: title } : title,
    alternates: { canonical: path },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: institution.fullName,
  legalName: institution.fullName,
  alternateName: institution.shortName,
  url: siteUrl,
  slogan: institution.slogan,
  description: defaultDescription,
  taxID: institution.cnpj,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}${institution.logo}`,
    contentUrl: `${siteUrl}${institution.logo}`,
    caption: `Logo oficial do ${institution.shortName}`,
  },
  image: `${siteUrl}/opengraph-image`,
  telephone: "+55 21 96441-8167",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Estrada de Sepetiba, 5236",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    postalCode: "23545-003",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55 21 96441-8167",
    contactType: "atendimento institucional",
    availableLanguage: "Portuguese",
    areaServed: "BR",
  },
  sameAs: [institution.instagramUrl],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: institution.shortName,
  alternateName: institution.fullName,
  description: defaultDescription,
  inLanguage: "pt-BR",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

function getEventAddress(eventId: string, address?: string) {
  if (eventId === "encontro-piracicaba") {
    return {
      "@type": "PostalAddress",
      streetAddress: "Rua Osasco, 318 – Parque Piracicaba",
      addressLocality: "Piracicaba",
      addressRegion: "SP",
      addressCountry: "BR",
    };
  }

  if (eventId === "escola-profetas-piracicaba") {
    return {
      "@type": "PostalAddress",
      addressLocality: "Piracicaba",
      addressRegion: "SP",
      addressCountry: "BR",
    };
  }

  if (eventId === "confraternizacao") {
    return {
      "@type": "PostalAddress",
      streetAddress: "Estrada Boa Esperança, 13 – Santa Cruz",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    };
  }

  return {
    "@type": "PostalAddress",
    streetAddress: address ?? "Estrada de Sepetiba, 5236 – Sepetiba",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    postalCode: "23545-003",
    addressCountry: "BR",
  };
}

export function createEventJsonLd(event: (typeof officialEvents)[number]) {
  const eventUrl = `${siteUrl}/agenda/${event.id}`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${eventUrl}#event`,
    name: event.title,
    description: [
      event.title,
      ...(event.details ?? []),
      event.host ? `Anfitrião: ${event.host}` : null,
      event.direction ? `Direção: ${event.direction}` : null,
      event.speaker ? `Preletor: ${event.speaker}` : null,
      event.note ?? null,
    ]
      .filter(Boolean)
      .join(". "),
    startDate: event.isoDate,
    ...(event.endsAt ? { endDate: event.endsAt } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: eventUrl,
    image: [event.image ? `${siteUrl}${event.image}` : `${siteUrl}/opengraph-image`],
    location: {
      "@type": "Place",
      ...(event.venue !== "Local a confirmar" ? { name: event.venue } : {}),
      address: getEventAddress(event.id, event.address),
    },
    organizer: {
      "@id": `${siteUrl}/#organization`,
      name: institution.fullName,
      url: siteUrl,
    },
    ...(event.speaker
      ? {
          performer: {
            "@type": "Person",
            name: event.speaker,
          },
        }
      : {}),
  };
}

export const agendaItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Agenda Oficial CMEBE – 2º semestre de 2026",
  numberOfItems: officialEvents.length,
  itemListElement: officialEvents.map((event, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: event.title,
    url: `${siteUrl}/agenda/${event.id}`,
  })),
};
