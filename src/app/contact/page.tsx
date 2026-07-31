import React from "react";
import type { Metadata } from "next";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail, CiLocationOn, CiClock2 } from "react-icons/ci";
import ImageBackTop from "../../components/imageBackTop";
import ContactForm from "../../components/contactForm";
import Breadcrumb from "../../components/breadcrumb";
import JsonLd from "../../components/jsonLd";
import { contactPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  BUSINESS,
  formatAddress,
  formatOpeningHours,
  localityPhrase,
} from "@/lib/business";

export const metadata: Metadata = buildMetadata({
  title: `Contact — barbier ${localityPhrase()}`,
  description: `Adresse, téléphone et accès du salon ${BUSINESS.name}, barbier ${localityPhrase()}. Appelez le ${BUSINESS.phoneDisplay} ou écrivez-nous pour prendre rendez-vous.`,
  path: "/contact",
  imageAlt: `Salon de ${BUSINESS.name}, barbier ${localityPhrase()}`,
});

/**
 * Carte Google intégrée sans clé d'API. L'adresse reste écrite en texte HTML
 * juste au-dessus : une adresse lisible uniquement dans une carte embarquée ou
 * dans une image n'est pas exploitable par les robots.
 */
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  `${BUSINESS.name}, ${formatAddress()}`
)}&output=embed`;

export default function Page() {
  const hours = formatOpeningHours();

  return (
    <>
      <JsonLd data={contactPageSchema()} />

      <ImageBackTop
        title={`Contacter votre barbier ${localityPhrase()}`}
        subtitle={`${BUSINESS.name} — ${formatAddress()}`}
        imageAlt={`Salon de ${BUSINESS.name}, barbier ${localityPhrase()}`}
      >
        <Breadcrumb
          items={[
            { name: "Accueil", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
      </ImageBackTop>

      <div className="text-white container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Coordonnées du salon
            </h2>

            {/* NAP en texte, identique au footer et au JSON-LD. */}
            <address className="not-italic space-y-4 text-lg">
              <p className="font-bold text-xl">{BUSINESS.name}</p>

              <p className="flex items-start gap-3">
                <CiLocationOn className="mt-1 shrink-0" aria-hidden="true" />
                <span>
                  {formatAddress()}
                  <a
                    href={BUSINESS.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-base text-orange-500 hover:underline"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </span>
              </p>

              <p className="flex items-center gap-3">
                <FiPhoneCall className="shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </p>

              <p className="flex items-center gap-3">
                <CiMail className="shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="hover:text-orange-500 transition-colors break-all"
                >
                  {BUSINESS.email}
                </a>
              </p>
            </address>

            <section>
              <h3 className="text-xl font-bold flex items-center gap-3">
                <CiClock2 aria-hidden="true" />{" "}
                {hours ? "Heures d'ouverture" : "Disponibilités"}
              </h3>
              {hours ? (
                <ul className="mt-3 space-y-1 text-gray-300">
                  {hours.map(({ day, hours: slot }) => (
                    <li key={day} className="flex justify-between max-w-xs">
                      <span>{day}</span>
                      <span>{slot}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-gray-300">
                  Le salon fonctionne uniquement sur rendez-vous. Les créneaux
                  libres s&apos;affichent en temps réel sur la{" "}
                  <a
                    href={BUSINESS.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    page de réservation en ligne
                  </a>
                  , ou appelez le{" "}
                  <a
                    href={`tel:${BUSINESS.phone}`}
                    className="text-orange-500 hover:underline"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                  .
                </p>
              )}
            </section>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={BUSINESS.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 transition-colors font-bold"
              >
                Réserver en ligne
              </a>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="px-5 py-2 rounded-md border border-white/60 hover:border-white transition-colors font-bold"
              >
                Appeler le salon
              </a>
            </div>
          </div>

          <ContactForm />
        </div>

        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Où nous trouver {localityPhrase()}
          </h2>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <iframe
              src={mapEmbedUrl}
              title={`Carte — ${BUSINESS.name}, ${formatAddress()}`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </section>
      </div>
    </>
  );
}
