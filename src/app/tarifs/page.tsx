import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ImageBackTop from "../../components/imageBackTop";
import Breadcrumb from "../../components/breadcrumb";
import JsonLd from "../../components/jsonLd";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, absoluteUrl, localityPhrase } from "@/lib/business";
import { SERVICES } from "@/lib/services";
import { SALON_ID } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: `Tarifs barbier ${localityPhrase()}`,
  description: `Prix du salon ${BUSINESS.name} ${localityPhrase()} : coupe 40 $, coupe et barbe 50 $, contours 25 $, teinture, nattes et twists. Réservez en ligne.`,
  path: "/tarifs",
  imageAlt: `Tarifs de ${BUSINESS.name}, barbier ${localityPhrase()}`,
});

/** Liste de prix balisée, pour que Google associe chaque prestation à son prix. */
const priceListSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: `Tarifs — ${BUSINESS.name}`,
  url: absoluteUrl("/tarifs"),
  provider: { "@id": SALON_ID },
  itemListElement: SERVICES.map((service, index) => ({
    "@type": "Offer",
    position: index + 1,
    name: service.name,
    description: service.summary,
    url: absoluteUrl(`/service/${service.slug}`),
    ...(service.priceValue !== null
      ? { price: service.priceValue, priceCurrency: BUSINESS.currency }
      : {}),
    availability: "https://schema.org/InStock",
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd data={priceListSchema} />

      <ImageBackTop
        title={`Tarifs de barbier ${localityPhrase()}`}
        subtitle="Les prix affichés sont ceux pratiqués en salon. Les suppléments éventuels sont détaillés sur la page des modalités."
        imageAlt={`Salon de ${BUSINESS.name}, barbier ${localityPhrase()}`}
      >
        <Breadcrumb
          items={[
            { name: "Accueil", path: "/" },
            { name: "Tarifs", path: "/tarifs" },
          ]}
        />
      </ImageBackTop>

      <div className="text-white py-12 sm:py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Prix par prestation
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">
                Tarifs des prestations de {BUSINESS.name}, barbier{" "}
                {localityPhrase()}
              </caption>
              <thead>
                <tr className="border-b border-white/20 text-gray-400 text-sm uppercase">
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Prestation
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Durée
                  </th>
                  <th scope="col" className="py-3 font-semibold text-right">
                    Prix
                  </th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((service) => (
                  <tr
                    key={service.slug}
                    className="border-b border-white/10 align-top"
                  >
                    <th scope="row" className="py-4 pr-4 font-normal">
                      <Link
                        href={`/service/${service.slug}`}
                        className="font-semibold hover:text-orange-500 transition-colors"
                      >
                        {service.name}
                      </Link>
                      <span className="block text-sm text-gray-400 mt-1 max-w-md">
                        {service.summary}
                      </span>
                    </th>
                    <td className="py-4 pr-4 text-gray-400 whitespace-nowrap">
                      {formatDuration(service.duration)}
                    </td>
                    <td className="py-4 text-orange-500 font-bold text-right whitespace-nowrap">
                      {service.priceLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Suppléments</h2>
            <ul className="mt-4 space-y-2 text-gray-300 list-disc pl-5">
              <li>
                Service express, pour être pris en charge en priorité : +20 $
              </li>
              <li>Service après l&apos;heure de fermeture : +25 $</li>
            </ul>
            <p className="mt-4 text-gray-400 text-sm">
              Les conditions de réservation, de retard et d&apos;annulation sont
              détaillées sur la page{" "}
              <Link href="/modalite" className="text-orange-500 hover:underline">
                modalités
              </Link>
              .
            </p>
          </section>

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Réserver {localityPhrase()}
            </h2>
            <p className="mt-4 text-gray-300">
              Réserve ton créneau en ligne, ou appelle directement le salon au{" "}
              <a
                href={`tel:${BUSINESS.phone}`}
                className="text-orange-500 hover:underline"
              >
                {BUSINESS.phoneDisplay}
              </a>
              .
            </p>
            <a
              href={BUSINESS.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 transition-colors font-bold"
            >
              Réserver en ligne
            </a>
          </section>
        </div>
      </div>
    </>
  );
}

/** « PT45M » → « 45 min ». Renvoie un tiret quand la durée est variable. */
function formatDuration(duration: string | null): string {
  if (!duration) return "Variable";
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);
  if (!match) return "Variable";
  const [, h, m] = match;
  if (h && m) return `${h} h ${m}`;
  if (h) return `${h} h`;
  return `${m} min`;
}
