/**
 * Source unique de vérité pour les informations du commerce.
 *
 * Toute mention du nom, de l'adresse ou du téléphone (NAP) sur le site doit
 * provenir d'ici : Google recoupe ces données entre le site, la fiche Google
 * Business Profile et les annuaires, et la moindre divergence affaiblit le
 * référencement local.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ À COMPLÉTER — les champs `null` ci-dessous sont volontairement vides.    │
 * │ Ils sont omis du JSON-LD tant qu'ils valent `null`, plutôt que d'être    │
 * │ remplis avec des valeurs approximatives. Renseigne-les et ils           │
 * │ apparaîtront automatiquement partout.                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

/** Coordonnées GPS réelles du salon, relevées sur Google Maps. */
export const GEO: { latitude: number; longitude: number } | null = {
  latitude: 45.544899191498786,
  longitude: -73.55750956824136,
};

/** Code postal, format « H1H 1H1 ». */
export const POSTAL_CODE: string | null = "H1W 2V5";

/** Quartier, tel qu'un client le taperait dans Google. Sans « Montréal » :
 *  les helpers d'affichage ajoutent déjà la ville derrière. */
export const NEIGHBOURHOOD: string | null = "Préfontaine";

/**
 * Le salon fonctionne uniquement sur rendez-vous, les disponibilités réelles
 * vivent dans Calendly. Il n'y a donc pas d'horaires fixes à déclarer, et ce
 * champ reste volontairement `null` : `openingHoursSpecification` est alors
 * absent du JSON-LD, ce qui vaut mieux que des horaires inventés que Google
 * afficherait et sur lesquels des clients se déplaceraient pour rien.
 *
 * Conséquence assumée : Google n'affichera pas de mention « Ouvert / Ferme à
 * 19 h ». Pour l'obtenir, il faudrait des plages d'ouverture stables.
 */
export const OPENING_HOURS: OpeningHours | null = null;

/**
 * Secteurs voisins déduits du code postal H1W, qui couvre
 * Mercier–Hochelaga-Maisonneuve. Ils enrichissent le JSON-LD et le contenu
 * local sans toucher au NAP. À retirer si le rayonnement réel diffère.
 */
export const NEARBY_AREAS: string[] = [
  "Hochelaga-Maisonneuve",
  "Mercier–Hochelaga-Maisonneuve",
];

/** Page Facebook, si elle existe. */
export const FACEBOOK_URL: string | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Informations confirmées
// ─────────────────────────────────────────────────────────────────────────────

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type OpeningHours = Record<
  DayKey,
  { opens: string; closes: string } | null
>;

export const DAY_LABELS: Record<DayKey, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

/** Noms de jours au format schema.org, pour openingHoursSpecification. */
export const DAY_SCHEMA: Record<DayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const DAY_ORDER: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export type Business = {
  name: string;
  legalName: string;
  foundingYear: number;
  siteUrl: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    regionName: string;
    postalCode: string | null;
    country: string;
  };
  neighbourhood: string | null;
  geo: { latitude: number; longitude: number } | null;
  openingHours: OpeningHours | null;
  priceRange: string;
  currency: string;
  bookingUrl: string;
  mapUrl: string;
  social: { instagram: string; facebook: string | null };
  areaServed: string[];
  nearbyAreas: string[];
  language: string;
};

// Le type est déclaré explicitement — sans lui, TypeScript rétrécit les champs
// encore vides au type `null` et considère comme mort tout le code qui les
// affichera une fois renseignés.
export const BUSINESS: Business = {
  /** Nom exact. Doit être identique au caractère près sur la fiche Google. */
  name: "Christian Cutz",
  legalName: "Christian Cutz",
  foundingYear: 2022,

  siteUrl: "https://christian-cutz.com",

  /** Téléphone au format E.164, pour les liens tel: et le JSON-LD. */
  phone: "+15142965702",
  /** Même numéro, formaté pour l'affichage. Ne jamais en dévier. */
  phoneDisplay: "+1 (514) 296-5702",

  email: "Fouodohchristian@yahoo.com",

  address: {
    street: "3400, rue Saint-Germain",
    city: "Montréal",
    region: "QC",
    regionName: "Québec",
    postalCode: POSTAL_CODE,
    country: "CA",
  },

  neighbourhood: NEIGHBOURHOOD,
  geo: GEO,
  openingHours: OPENING_HOURS,

  /** Fourchette de prix schema.org. Prestations de 25 $ à 150 $ → $$. */
  priceRange: "$$",
  currency: "CAD",

  bookingUrl: "https://calendly.com/tachristian21/60min",
  mapUrl: "https://maps.app.goo.gl/R4mRqBrE5P1Fqcss5",

  social: {
    instagram:
      "https://www.instagram.com/christian_cutzzzzz/?utm_source=ig_web_button_share_sheet",
    facebook: FACEBOOK_URL,
  },

  /** Villes desservies, pour areaServed. */
  areaServed: ["Montréal", "Laval", "Longueuil"],

  /** Quartiers voisins, pour le contenu local et containedInPlace. */
  nearbyAreas: NEARBY_AREAS,

  language: "fr-CA",
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers d'affichage — garantissent un NAP identique partout
// ─────────────────────────────────────────────────────────────────────────────

/** « 3400, rue Saint-Germain, Montréal, QC H1H 1H1 » (code postal omis s'il
 *  n'est pas encore renseigné). */
export function formatAddress(): string {
  const { street, city, region, postalCode } = BUSINESS.address;
  const tail = postalCode ? `${region} ${postalCode}` : region;
  return `${street}, ${city}, ${tail}`;
}

/** Localisation utilisée dans les titres et les h1. Se rabat sur « Montréal »
 *  tant que le quartier n'est pas renseigné. */
export function localityLabel(): string {
  return BUSINESS.neighbourhood ?? "Montréal";
}

/** « à Rosemont, Montréal » ou « à Montréal ». */
export function localityPhrase(): string {
  return BUSINESS.neighbourhood
    ? `à ${BUSINESS.neighbourhood}, Montréal`
    : "à Montréal";
}

/** Horaires prêts à afficher, ou `null` s'ils ne sont pas connus. */
export function formatOpeningHours():
  | { day: string; hours: string }[]
  | null {
  const hours = BUSINESS.openingHours;
  if (!hours) return null;
  return DAY_ORDER.map((day) => {
    const slot = hours[day];
    return {
      day: DAY_LABELS[day],
      hours: slot ? `${slot.opens} – ${slot.closes}` : "Fermé",
    };
  });
}

/**
 * URL absolue à partir d'un chemin interne, pour les canonical, le sitemap et
 * le JSON-LD. Le slash final est retiré : Next normalise déjà les canonical
 * sans slash, et une URL déclarée dans le sitemap qui ne correspond pas au
 * canonical de la page envoie un signal contradictoire à Google.
 */
export function absoluteUrl(path = "/"): string {
  const url = new URL(path, BUSINESS.siteUrl).toString();
  return url.length > 1 && url.endsWith("/") ? url.slice(0, -1) : url;
}
