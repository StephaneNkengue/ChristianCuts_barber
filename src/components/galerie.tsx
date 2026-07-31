import React from "react";
import Image from "next/image";
import { BUSINESS, localityPhrase } from "@/lib/business";

/**
 * Chaque photo a son propre texte alternatif, décrivant la coupe réellement
 * visible sur l'image et situant le salon. C'est ce qui permet à la galerie
 * de ressortir dans Google Images sur des requêtes comme « dégradé bas
 * Montréal », en plus de rendre la page utilisable au lecteur d'écran.
 */
const images: { src: string; description: string }[] = [
  {
    src: "/galerie/gal1.jpg",
    description: "Coupe courte afro décolorée en blond platine",
  },
  {
    src: "/galerie/gal2.jpg",
    description: "Coupe waves avec dégradé bas et ligne frontale nette",
  },
  {
    src: "/galerie/gal3.jpg",
    description: "Dégradé bas avec barbe pleine fondue et contours redessinés",
  },
  {
    src: "/galerie/gal4.jpg",
    description: "Twists courts sur le dessus avec dégradé haut",
  },
  {
    src: "/galerie/gal5.jpg",
    description:
      "Nattes collées vers l'arrière, dégradé sur les côtés et barbe taillée",
  },
  {
    src: "/galerie/gal6.jpg",
    description: "Coupe courte dégradée avec contour frontal net",
  },
  {
    src: "/galerie/gal7.jpg",
    description: "Dégradé haut avec dessus afro conservé et contour net",
  },
  {
    src: "/galerie/gal8.jpg",
    description: "Twists courts avec contour frontal redessiné",
  },
  {
    src: "/galerie/gal9.jpg",
    description: "Coupe courte dégradée avec barbe longue entretenue",
  },
  {
    src: "/galerie/gal10.jpg",
    description: "Dessus bouclé volumineux, dégradé bas et barbe fondue",
  },
  {
    src: "/galerie/gal20.jpg",
    description: "Coupe courte avec dégradé fondu et contour net",
  },
  {
    src: "/galerie/gal21.jpg",
    description: "Coupe très courte dégradée avec contour frontal marqué",
  },
];

export default function Galerie() {
  return (
    <section
      id="galerie"
      className="mb-10 sm:mb-16 md:mb-20 px-4 sm:px-6"
      aria-labelledby="galerie-titre"
    >
      <h2
        id="galerie-titre"
        className="text-white text-4xl sm:text-5xl md:text-6xl font-bold my-10 sm:my-14 md:my-20 text-center"
      >
        Galerie
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {images.map(({ src, description }) => (
          <div key={src} className="overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={`${description}, réalisé chez ${BUSINESS.name}, barbier ${localityPhrase()}`}
              width={500}
              height={500}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
