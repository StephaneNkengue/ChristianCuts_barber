import type { Metadata } from "next";
import { BUSINESS, absoluteUrl } from "./business";

/**
 * Fabrique les métadonnées d'une page : canonical, Open Graph et carte Twitter
 * sont dérivés du chemin, pour qu'aucune page n'oublie l'un des trois.
 *
 * Le site est unilingue français ; si une version anglaise est ajoutée plus
 * tard, c'est ici qu'il faudra brancher `alternates.languages`.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/images/image-background.jpg",
  imageAlt,
}: {
  /** Sans le nom du salon : le template du layout l'ajoute. */
  title: string;
  /** Viser 140-160 caractères, avec un appel à l'action. */
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${BUSINESS.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_CA",
      url,
      siteName: BUSINESS.name,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt ?? fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
