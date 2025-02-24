"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { text } from "stream/consumers";

export default function homeServices() {
  const services = [
    { name: "HAIR STYLING", image: "/images/test.jpg", text: "HAIR STYLING" },
    { name: "HAIR CUT", image: "/images/test.jpg", text: "HAIR STYLING" },
    { name: "BEARD TRIM", image: "/images/test.jpg", text: "HAIR STYLING" },
    { name: "HAIR WASH", image: "/images/test.jpg", text: "HAIR STYLING" },
  ];

  return (
    <section className="pb-20">
      <h2 className="text-white text-center text-6xl font-bold py-20">
        SERVICES
      </h2>
      <div className="grid grid-cols-2 gap-x-60 gap-y-20 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="relative group overflow-hidden">
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

            {/* Texte vertical */}
            <span className="absolute top-3/4 text-white font-bold text-3xl tracking-wide -rotate-90 origin-left writing-mode-vertical-rl -inset-x-6">
              {service.name}
            </span>
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
