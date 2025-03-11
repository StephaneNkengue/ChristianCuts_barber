"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname();
  const [meetingUrl, setMeetingUrl] = useState<string>(
    "https://meet.brevo.com/stephane-nkengue?lang=fr"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Récupérer l'URL de base de Brevo Meeting
    if (process.env.NEXT_PUBLIC_BREVO_MEETING_URL) {
      const baseUrl = process.env.NEXT_PUBLIC_BREVO_MEETING_URL;
      // Ajouter le paramètre de langue française
      setMeetingUrl(`${baseUrl}?lang=fr`);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-[#0c0c0c] text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:justify-evenly">
        <Link href="/">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-white">CHRISTIAN</span>
            <Image
              src="/icons/logo2.PNG"
              width={80}
              height={80}
              alt="Picture of the author"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
            />
            <span className="text-white">CUTZ</span>
          </div>
        </Link>

        {/* Menu Hamburger sur mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation sur desktop */}
        <nav className="hidden md:flex text-lg lg:text-2xl mx-4 lg:mx-20 space-x-4 lg:space-x-6 text-gray-400">
          {[
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/service" },
            { name: "Contact", path: "/contact" },
          ].map(({ name, path }) => (
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

        {/* Bouton de réservation sur desktop */}
        <a
          href={meetingUrl}
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
          <nav className="flex flex-col space-y-4 text-xl text-gray-400">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/service" },
              { name: "Contact", path: "/contact" },
            ].map(({ name, path }) => (
              <Link
                key={path}
                href={path}
                className={`transition duration-300 ease-in-out ${
                  pathname === path
                    ? "text-orange-500 font-semibold"
                    : "hover:text-orange-500"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
            <a
              href={meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-2"
            >
              <button className="relative border border-orange-500 text-orange-500 px-3 py-1 rounded-md overflow-hidden group w-full">
                <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
                <strong className="relative z-10 text-lg group-hover:text-white transition-colors duration-300">
                  Réserver
                </strong>
              </button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
