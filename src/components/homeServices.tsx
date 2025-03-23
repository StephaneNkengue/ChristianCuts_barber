"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

// Définition des services avec des données complètes
const services = [
  {
    name: "TEINTURE",
    image: "/galerie/gal1.jpg",
    text: "Colorations de qualité à votre guise",
  },
  {
    name: "COUPE CLASSIQUE",
    image: "/galerie/gal13.jpg",
    text: "Coupe classique ",
  },
  {
    name: "COUPE & LAVAGE",
    image: "/galerie/gal10.jpg",
    text: "Coupes personnalisées adaptées et lavage de cheveux",
  },
  {
    name: "CONTOUR UNIQUE",
    image: "/galerie/gal14.jpg",
    text: "Contour unique et soin de la barbe",
  },
];

// Correction du nom du composant (majuscule)
export default function HomeServices() {
  return (
    <section className="pb-10 sm:pb-20 px-4 sm:px-6">
      <h2 className="text-white text-center text-4xl sm:text-5xl md:text-6xl font-bold py-10 sm:py-14 md:py-20">
        SERVICES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 sm:gap-y-16 md:gap-y-20 md:gap-x-20 lg:gap-x-40 xl:gap-x-60 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="flex flex-row items-center">
            {/* Texte vertical - dans sa propre colonne */}
            <div className="pr-2 sm:pr-4 w-8 sm:w-10">
              <div
                className="text-white font-bold text-xl sm:text-2xl md:text-3xl tracking-widest"
                style={{
                  writingMode: "vertical-lr",
                  transform: "rotate(180deg)",
                }}
              >
                {service.name}
              </div>
            </div>

            {/* Container de l'image avec l'overlay */}
            <div className="relative group overflow-hidden flex-grow">
              {/* Image */}
              <Image
                src={service.image}
                alt={service.name}
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay avec texte animé */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                <span className="text-white text-base sm:text-lg font-semibold px-4 text-center">
                  {service.text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton */}
      <Link href="/service" className="items-center justify-center flex">
        <button
          type="button"
          className="mt-8 sm:mt-12 px-2 relative border border-orange-500 text-white py-1 sm:py-2 rounded-md overflow-hidden group"
        >
          <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
          <strong className="relative z-10 text-lg sm:text-xl md:text-2xl flex items-center space-x-2">
            <span> Tous nos services </span> <FaLongArrowAltRight />
          </strong>
        </button>
      </Link>
    </section>
  );
}
