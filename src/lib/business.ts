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

/** Coordonnées GPS réelles du salon. À relever sur Google Maps : clic droit
 *  sur le point exact → les deux nombres affichés en haut du menu. */
export const GEO: { latitude: number; longitude: number } | null = null;

/** Code postal, format « H1H 1H1 ». */
export const POSTAL_CODE: string | null = null;

/** Quartier ou arrondissement, tel qu'un client le taperait dans Google
 *  (« Rosemont », « Villeray », « Le Plateau-Mont-Royal »…).
 *  C'est le mot-clé le plus important du référencement local : tant qu'il
 *  vaut `null`, le site se rabat sur « Montréal » partout. */
export const NEIGHBOURHOOD: string | null = null;

/** Horaires réels. `null` = jour fermé. Format 24 h « HH:MM ».
 *  Mettre l'objet entier à `null` si les horaires ne sont pas encore connus :
 *  des horaires faux dans le JSON-LD s'affichent dans Google et font
 *  déplacer des clients pour rien. */
export const OPENING_HOURS: OpeningHours | null = null;

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

export const BUSINESS = {
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

  /** Villes et secteurs desservis, pour areaServed. */
  areaServed: ["Montréal", "Laval", "Longueuil"],

  language: "fr-CA",
} as const;

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

/** URL absolue à partir d'un chemin interne, pour les canonical et le JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, BUSINESS.siteUrl).toString();
}
