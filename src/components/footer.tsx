"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-[#0c0c0c] text-white py-5 text-center min-h-[16rem] sm:min-h-[20rem] md:h-96">
      <div className="flex flex-col items-center content-between space-y-4 sm:space-y-5 md:space-y-7 px-4">
        {/* Logo */}
        <Link href="/">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center">
            <span className="text-white">CHRISTIAN</span>
            <Image
              src="/icons/logo2.PNG"
              width={90}
              height={90}
              alt="Picture of the author"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[90px] lg:h-[90px]"
            />
            <span className="text-white">CUTZ</span>
          </div>
        </Link>
        <span className="text-white text-lg sm:text-xl md:text-2xl">
          SINCE 2022
        </span>

        <nav className="flex text-lg sm:text-xl md:text-2xl space-x-4 sm:space-x-6 text-gray-400">
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

        <div className="flex space-x-4 sm:space-x-6 text-gray-400 text-2xl sm:text-3xl md:text-4xl">
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white text-xs sm:text-sm max-w-md mx-auto">
          Réalisé par Stéphane Darryl Wamo Nkengue. © Copyright 2025 Christian
          Cutz. Tous droits réservé
        </p>
      </div>
    </footer>
  );
}
