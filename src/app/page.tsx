import React from "react";
import Image from "next/image";
import HomeServices from "../components/homeServices";
import Galerie from "../components/galerie";
import Statistiques from "../components/statistiques";

export default function page() {
  // URL de réservation Calendly
  const meetingUrl = "https://calendly.com/tachristian21/60min";

  return (
    <div>
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <Image
          src="/images/image-background.jpg"
          alt="Barber"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col justify-start items-start h-full px-6 sm:px-10 md:px-20 lg:ms-20 xl:ms-44 pt-24 sm:pt-32 md:pt-44 text-white">
          <h3 className="text-xl sm:text-2xl md:text-3xl uppercase font-bold">
            Ici, je suis chez
          </h3>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mt-2 uppercase">
            christian <br />
            <span className="text-orange-500">cutz</span>
          </h1>
          <p className="mt-4 max-w-lg text-gray-300 text-sm sm:text-base md:text-lg">
            Chez Christian Cutz, nous nous engageons à offrir des services de
            coiffure et de style exceptionnels, adaptés à vos préférences
            uniques. Prenez rendez-vous!
          </p>

          <a
            href={meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 sm:mt-8 md:mt-12 px-4 sm:px-6 relative border border-orange-500 text-white py-1 sm:py-2 rounded-md overflow-hidden group"
          >
            <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
            <strong className="relative z-10 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              Réserver
            </strong>
          </a>
        </div>
      </div>
      <HomeServices />
      <Statistiques />
      <Galerie />
    </div>
  );
}
