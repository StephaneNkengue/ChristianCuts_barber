import {
  BUSINESS,
  DAY_ORDER,
  DAY_SCHEMA,
  absoluteUrl,
  formatAddress,
  localityPhrase,
} from "./business";
import { SERVICES, type Service } from "./services";

/**
 * Construction des données structurées JSON-LD.
 *
 * Principe : tout champ dont la donnée n'est pas connue est **omis** du graphe
 * plutôt que rempli avec une approximation. Une adresse ou des horaires faux
 * dans le JSON-LD sont repris tels quels par Google et se retournent contre le
 * référencement — mieux vaut un schéma incomplet qu'un schéma inexact.
 */

/** Identifiant stable du commerce, référencé par les autres entités. */
export const SALON_ID = `${BUSINESS.siteUrl}/#salon`;

type Json = Record<string, unknown>;

/** Retire récursivement les clés `null` / `undefined` du graphe. */
function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    return value
      .map(prune)
      .filter((v) => v !== null && v !== undefined) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Json = {};
    for (const [key, raw] of Object.entries(value as Json)) {
      if (raw === null || raw === undefined) continue;
      const cleaned = prune(raw);
      if (Array.isArray(cleaned) && cleaned.length === 0) continue;
      out[key] = cleaned;
    }
    return out as unknown as T;
  }
  return value;
}

function postalAddress(): Json {
  return {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  };
}

function openingHoursSpecification(): Json[] | null {
  const hours = BUSINESS.openingHours;
  if (!hours) return null;
  return DAY_ORDER.flatMap((day) => {
    const slot = hours[day];
    if (!slot) return [];
    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${DAY_SCHEMA[day]}`,
        opens: slot.opens,
        closes: slot.closes,
      },
    ];
  });
}

function sameAs(): string[] {
  return [BUSINESS.social.instagram, BUSINESS.social.facebook].filter(
    (url): url is string => Boolean(url)
  );
}

/** Offre schema.org pour une prestation. */
function offer(service: Service): Json {
  return {
    "@type": "Offer",
    name: service.name,
    description: service.summary,
    url: absoluteUrl(`/service/${service.slug}`),
    price: service.priceValue,
    priceCurrency: service.priceValue === null ? null : BUSINESS.currency,
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      provider: { "@id": SALON_ID },
    },
  };
}

/**
 * Entité principale : HairSalon (sous-type de LocalBusiness).
 * À poser une seule fois, sur la page d'accueil.
 */
export function hairSalonSchema(): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": SALON_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: `${BUSINESS.name}, barbier ${localityPhrase()} : coupe homme, taille de barbe, dégradé, contours, teinture, nattes et twists. Sur rendez-vous.`,
    url: BUSINESS.siteUrl,
    image: [
      absoluteUrl("/images/image-background.jpg"),
      absoluteUrl("/galerie/gal13.jpg"),
      absoluteUrl("/galerie/gal10.jpg"),
    ],
    logo: absoluteUrl("/icons/logo3.PNG"),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currency,
    foundingDate: String(BUSINESS.foundingYear),
    address: postalAddress(),
    geo: BUSINESS.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: BUSINESS.geo.latitude,
          longitude: BUSINESS.geo.longitude,
        }
      : null,
    hasMap: BUSINESS.mapUrl,
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: sameAs(),
    areaServed: BUSINESS.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    knowsLanguage: ["fr-CA"],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: BUSINESS.bookingUrl,
        inLanguage: "fr-CA",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Rendez-vous chez Christian Cutz" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Prestations — ${BUSINESS.name}`,
      itemListElement: SERVICES.map(offer),
    },
  });
}

/** Service détaillé, pour une page /service/[slug]. */
export function serviceSchema(service: Service): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/service/${service.slug}`)}#service`,
    name: `${service.name} — ${BUSINESS.name}`,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(`/service/${service.slug}`),
    image: absoluteUrl(service.image),
    provider: {
      "@type": "HairSalon",
      "@id": SALON_ID,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      address: postalAddress(),
      url: BUSINESS.siteUrl,
    },
    areaServed: BUSINESS.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    offers: {
      "@type": "Offer",
      price: service.priceValue,
      priceCurrency: service.priceValue === null ? null : BUSINESS.currency,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/service/${service.slug}`),
    },
  });
}

/** Fil d'Ariane. `items` va de la racine à la page courante. */
export function breadcrumbSchema(
  items: { name: string; path: string }[]
): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  });
}

/** Page de questions fréquentes. */
export function faqSchema(
  items: { question: string; answer: string }[]
): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });
}

/** Page de contact, avec le NAP en clair. */
export function contactPageSchema(): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact — ${BUSINESS.name}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "HairSalon",
      "@id": SALON_ID,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      email: BUSINESS.email,
      address: postalAddress(),
      description: formatAddress(),
      hasMap: BUSINESS.mapUrl,
      url: BUSINESS.siteUrl,
    },
  });
}
