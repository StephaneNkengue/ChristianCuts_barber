"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { BUSINESS, localityPhrase } from "@/lib/business";

const NAV_LINKS = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/service" },
  { name: "Tarifs", path: "/tarifs" },
  { name: "Modalités", path: "/modalite" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const linkClass = (path: string) =>
    `transition duration-300 ease-in-out ${
      pathname === path ? "text-orange-500 font-semibold" : "hover:text-orange-500"
    }`;

  return (
    <header className="bg-[#0c0c0c] text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:justify-evenly">
        <Link href="/" aria-label={`${BUSINESS.name} — retour à l'accueil`}>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-white">CHRISTIAN</span>
            <Image
              src="/icons/logo3.PNG"
              width={80}
              height={80}
              alt={`Logo de ${BUSINESS.name}, barbier ${localityPhrase()}`}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
            />
            <span className="text-white">CUTZ</span>
          </div>
        </Link>

        {/* Menu hamburger sur mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation sur desktop */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex text-base lg:text-xl mx-4 lg:mx-12 space-x-4 lg:space-x-6 text-gray-400"
        >
          {NAV_LINKS.map(({ name, path }) => (
            <Link key={path} href={path} className={linkClass(path)}>
              {name}
            </Link>
          ))}
        </nav>

        {/* Bouton de réservation sur desktop */}
        <a
          href={BUSINESS.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block"
        >
          <button className="relative border border-orange-500 text-orange-500 px-3 py-1 lg:px-4 lg:py-2 rounded-md overflow-hidden group">
            <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
            <strong className="relative z-10 text-lg lg:text-2xl group-hover:text-white transition-colors duration-300">
              Réserver
            </strong>
          </button>
        </a>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0c0c0c] py-4 px-6">
          <nav
            aria-label="Navigation principale mobile"
            className="flex flex-col space-y-4 text-xl text-gray-400"
          >
            {NAV_LINKS.map(({ name, path }) => (
              <Link
                key={path}
                href={path}
                className={linkClass(path)}
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="hover:text-orange-500 transition-colors"
            >
              {BUSINESS.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
