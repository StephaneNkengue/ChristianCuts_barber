import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HomeServices from "../components/homeServices";
import Galerie from "../components/galerie";
import Statistiques from "../components/statistiques";
import JsonLd from "../components/jsonLd";
import { hairSalonSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, formatAddress, localityPhrase } from "@/lib/business";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `Barbier ${localityPhrase()}`,
    description: `Coupe homme, taille de barbe, dégradé et teinture ${localityPhrase()}. Barbier sur rendez-vous depuis 2022 — réservez votre créneau en ligne en moins d'une minute.`,
    path: "/",
    imageAlt: `Salon de ${BUSINESS.name}, barbier ${localityPhrase()}`,
  }),
  // Next n'applique pas le template de titre du layout aux pages du même
  // segment : l'accueil doit donc porter son titre complet lui-même.
  title: { absolute: `Barbier ${localityPhrase()} | ${BUSINESS.name}` },
};

export default function Page() {
  return (
    <>
      {/* Entité principale du site : une seule fois, sur l'accueil. */}
      <JsonLd data={hairSalonSchema()} />

      <div className="relative w-full h-screen">
        <Image
          src="/images/image-background.jpg"
          alt={`Intérieur du salon de ${BUSINESS.name}, barbier ${localityPhrase()}`}
          fill
          sizes="100vw"
          quality={75}
          // Seule image LCP de la page d'accueil.
          priority
          className="absolute inset-0 z-0 object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col justify-start items-start h-full px-6 sm:px-10 md:px-20 lg:ms-20 xl:ms-44 pt-24 sm:pt-32 md:pt-44 text-white">
          <p className="text-xl sm:text-2xl md:text-3xl uppercase font-bold">
            Ici, je suis chez
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mt-2 uppercase">
            christian <br />
            <span className="text-orange-500">cutz</span>
            <span className="block mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl normal-case font-semibold text-gray-200">
              Barbier {localityPhrase()}
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-gray-300 text-sm sm:text-base md:text-lg">
            Chez {BUSINESS.name}, nous nous engageons à offrir des services de
            coiffure et de style exceptionnels, adaptés à vos préférences
            uniques. Prenez rendez-vous!
          </p>

          <div className="mt-6 sm:mt-8 md:mt-12 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={BUSINESS.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 relative border border-orange-500 text-white py-1 sm:py-2 rounded-md overflow-hidden group"
            >
              <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
              <strong className="relative z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Réserver
              </strong>
            </a>

            {/* Appel en un geste : l'action la plus demandée en recherche locale. */}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="px-4 sm:px-6 py-1 sm:py-2 rounded-md border border-white/70 hover:border-white transition-colors"
              aria-label={`Appeler ${BUSINESS.name} au ${BUSINESS.phoneDisplay}`}
            >
              <strong className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                Appeler
              </strong>
            </a>
          </div>
        </div>
      </div>

      <HomeServices />
      <Statistiques />

      {/* Contenu local : c'est ce bloc qui porte la ville et le secteur
          desservi en texte indexable, absents du site jusqu'ici. */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 text-white">
        <div className="max-w-4xl mx-auto space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Votre barbier {localityPhrase()}
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            {BUSINESS.name} accueille ses clients au{" "}
            <strong className="text-white">{formatAddress()}</strong>, depuis{" "}
            {BUSINESS.foundingYear}. Coupe classique, coupe et barbe, contours,
            teinture, nattes ou twists : chaque prestation est adaptée à ta
            texture de cheveux et à la forme de ton visage, sur rendez-vous.
          </p>
          <p className="text-gray-300 text-base sm:text-lg">
            Le salon dessert {BUSINESS.areaServed.join(", ")}, et propose aussi
            un{" "}
            <Link
              href="/service/home-service"
              className="text-orange-500 hover:underline"
            >
              service de barbier à domicile
            </Link>{" "}
            pour celles et ceux qui ne peuvent pas se déplacer. Les tarifs sont
            publics et consultables sur la{" "}
            <Link href="/tarifs" className="text-orange-500 hover:underline">
              page des tarifs
            </Link>
            .
          </p>
          <p className="text-gray-300 text-base sm:text-lg">
            Une question avant de réserver ? Appelle le{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-orange-500 hover:underline"
            >
              {BUSINESS.phoneDisplay}
            </a>{" "}
            ou passe par la{" "}
            <Link href="/contact" className="text-orange-500 hover:underline">
              page contact
            </Link>
            .
          </p>
        </div>
      </section>

      <Galerie />
    </>
  );
}
