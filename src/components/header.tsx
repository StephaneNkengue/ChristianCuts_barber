"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [meetingUrl, setMeetingUrl] = useState<string>(
    "https://meet.brevo.com/stephane-nkengue?hl=fr&language=fr&locale=fr_FR&ui=fr"
  );

  useEffect(() => {
    // Récupérer l'URL de base de Brevo Meeting
    if (process.env.NEXT_PUBLIC_BREVO_MEETING_URL) {
      const baseUrl = process.env.NEXT_PUBLIC_BREVO_MEETING_URL;
      // Essayer plusieurs options pour forcer la langue française
      setMeetingUrl(`${baseUrl}?hl=fr&language=fr&locale=fr_FR&ui=fr`);
    }
  }, []);

  return (
    <header className="bg-[#0c0c0c] text-white py-4 ">
      <div className="container mx-auto flex justify-evenly items-center px-6">
        <Link href="/">
          <div className="text-3xl font-bold flex items-center ">
            <span className="text-white">CHRISTIAN</span>
            <Image
              src="/icons/Logo2.PNG"
              width={80}
              height={80}
              alt="Picture of the author"
            />
            <span className="text-white">CUTZ</span>
          </div>
        </Link>

        <nav className="flex text-2xl mx-20 space-x-6 text-gray-400">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/service" },
            { name: "Contact", path: "/contact" },
            { name: "Réservation", path: "/reservation" },
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

        <a
          href={meetingUrl}
          target="_blank"
          rel="noopener noreferrer"
          hrefLang="fr"
        >
          <button className="relative border border-orange-500 text-orange-500 px-4 py-2 rounded-md overflow-hidden group">
            <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
            <strong className="relative z-10 text-2xl group-hover:text-white transition-colors duration-300">
              Réserver
            </strong>
          </button>
        </a>
      </div>
    </header>
  );
};

export default Header;
