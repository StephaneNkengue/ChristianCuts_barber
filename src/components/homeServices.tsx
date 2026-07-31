import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FEATURED_SERVICES } from "@/lib/services";

/**
 * Prestations mises en avant sur l'accueil. Les tuiles pointent désormais vers
 * la page dédiée de chaque service : c'est ce maillage interne qui fait
 * remonter ces pages, et non la seule existence des fichiers.
 */
export default function HomeServices() {
  return (
    <section className="pb-10 sm:pb-20 px-4 sm:px-6" aria-labelledby="services-titre">
      <h2
        id="services-titre"
        className="text-white text-center text-4xl sm:text-5xl md:text-6xl font-bold py-10 sm:py-14 md:py-20"
      >
        Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 sm:gap-y-16 md:gap-y-20 md:gap-x-20 lg:gap-x-40 xl:gap-x-60 max-w-7xl mx-auto">
        {FEATURED_SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/service/${service.slug}`}
            className="flex flex-row items-center group"
          >
            {/* Nom vertical, dans sa propre colonne */}
            <div className="pr-2 sm:pr-4 w-8 sm:w-10">
              <h3
                className="text-white font-bold text-xl sm:text-2xl md:text-3xl tracking-widest uppercase"
                style={{
                  writingMode: "vertical-lr",
                  transform: "rotate(180deg)",
                }}
              >
                {service.name}
              </h3>
            </div>

            <div className="relative overflow-hidden flex-grow">
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/50 flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                <span className="text-white text-base sm:text-lg font-semibold px-4 text-center">
                  {service.summary}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="items-center justify-center flex">
        <Link href="/service">
          <span className="mt-8 sm:mt-12 px-2 relative border border-orange-500 text-white py-1 sm:py-2 rounded-md overflow-hidden group inline-block">
            <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
            <strong className="relative z-10 text-lg sm:text-xl md:text-2xl flex items-center space-x-2">
              <span>Tous nos services</span> <FaLongArrowAltRight />
            </strong>
          </span>
        </Link>
      </div>
    </section>
  );
}
