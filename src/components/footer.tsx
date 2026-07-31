"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import {
  BUSINESS,
  formatAddress,
  formatOpeningHours,
  localityPhrase,
} from "@/lib/business";

const NAV_LINKS = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/service" },
  { name: "Tarifs", path: "/tarifs" },
  { name: "Modalités", path: "/modalite" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  const pathname = usePathname();
  const hours = formatOpeningHours();

  return (
    <footer className="bg-[#0c0c0c] text-white py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center space-y-6">
        <Link href="/" aria-label={`${BUSINESS.name} — retour à l'accueil`}>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center">
            <span className="text-white">CHRISTIAN</span>
            <Image
              src="/icons/logo3.PNG"
              width={90}
              height={90}
              alt={`Logo de ${BUSINESS.name}, barbier ${localityPhrase()}`}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[90px] lg:h-[90px]"
            />
            <span className="text-white">CUTZ</span>
          </div>
        </Link>
        <span className="text-white text-lg sm:text-xl md:text-2xl">
          SINCE {BUSINESS.foundingYear}
        </span>

        <nav
          aria-label="Navigation de pied de page"
          className="flex flex-wrap justify-center text-base sm:text-lg md:text-xl gap-x-4 sm:gap-x-6 gap-y-2 text-gray-400"
        >
          {NAV_LINKS.map(({ name, path }) => (
            <Link
              key={path}
              href={path}
              className={`transition duration-300 ease-in-out ${
                pathname === path
                  ? "text-orange-500 font-semibold"
                  : "hover:text-orange-500"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        {/*
          NAP présent sur chaque page : Google s'attend à retrouver le nom,
          l'adresse et le téléphone à l'identique partout, ici comme sur la
          fiche Google Business Profile. Les valeurs viennent toutes de
          lib/business.ts pour qu'elles ne puissent pas diverger.
        */}
        <address className="not-italic text-center text-sm sm:text-base text-gray-300 space-y-1">
          <div className="font-semibold text-white">{BUSINESS.name}</div>
          <div>{formatAddress()}</div>
          <div>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="hover:text-orange-500 transition-colors"
            >
              {BUSINESS.phoneDisplay}
            </a>
            {" · "}
            <a
              href={`mailto:${BUSINESS.email}`}
              className="hover:text-orange-500 transition-colors"
            >
              {BUSINESS.email}
            </a>
          </div>
        </address>

        {hours && (
          <div className="text-center text-sm text-gray-400">
            <h2 className="text-white font-semibold mb-1">Heures d&apos;ouverture</h2>
            <ul>
              {hours.map(({ day, hours: slot }) => (
                <li key={day}>
                  {day} : {slot}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex space-x-6 text-gray-400 text-2xl sm:text-3xl">
          <a
            href={BUSINESS.social.instagram}
            className="hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${BUSINESS.name} sur Instagram`}
          >
            <FaInstagram />
          </a>
          {BUSINESS.social.facebook && (
            <a
              href={BUSINESS.social.facebook}
              className="hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BUSINESS.name} sur Facebook`}
            >
              <FaFacebookF />
            </a>
          )}
        </div>

        <p className="text-white text-xs sm:text-sm max-w-md mx-auto text-center">
          Réalisé par{" "}
          <Link
            href="https://www.snkode.com/"
            className="hover:text-orange-500"
            target="_blank"
          >
            Stéphane Darryl Wamo Nkengue
          </Link>
          . © Copyright {new Date().getFullYear()} {BUSINESS.name}. Tous droits
          réservé
        </p>
      </div>
    </footer>
  );
}
