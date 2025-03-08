"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

// Définition des services avec des données complètes
const services = [
  {
    name: "HAIR STYLING",
    image: "/images/test.jpg",
    text: "Coupes personnalisées adaptées à votre style",
  },
  {
    name: "BEARD TRIM",
    image: "/images/test.jpg",
    text: "Taille et entretien de barbe professionnels",
  },
  {
    name: "HAIR COLOR",
    image: "/images/test.jpg",
    text: "Colorations et mèches de qualité salon",
  },
  {
    name: "SHAVING",
    image: "/images/test.jpg",
    text: "Rasage traditionnel à l'ancienne",
  },
];

// Correction du nom du composant (majuscule)
export default function HomeServices() {
  return (
    <section className="pb-20">
      <h2 className="text-white text-center text-6xl font-bold py-20">
        SERVICES
      </h2>

      <div className="grid grid-cols-2 gap-x-60 gap-y-20 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="flex flex-row items-center">
            {/* Texte vertical - dans sa propre colonne */}
            <div className="pr-4 w-10">
              <div
                className="text-white font-bold text-xl tracking-widest"
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
                <span className="text-white text-lg font-semibold">
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
          className="mt-12 px-2 relative border border-orange-500 text-white py-2 rounded-md overflow-hidden group"
        >
          <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
          <strong className="relative z-10 text-2xl flex items-center space-x-2">
            <span> Tous nos services </span> <FaLongArrowAltRight />
          </strong>
        </button>
      </Link>
    </section>
  );
}
