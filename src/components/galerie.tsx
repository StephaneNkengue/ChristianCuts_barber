"use client";

import React from "react";
import Image from "next/image";

const images = [
  "/galerie/gal1.jpg",
  "/galerie/gal2.jpg",
  "/galerie/gal3.jpg",
  "/galerie/gal4.jpg",
  "/galerie/gal5.jpg",
  "/galerie/gal6.jpg",
  "/galerie/gal7.jpg",
  "/galerie/gal8.jpg",
  "/galerie/gal9.jpg",
  "/galerie/gal10.jpg",
  "/galerie/gal13.jpg",
  "/galerie/gal14.jpg",
];

export default function galerie() {
  return (
    <section className="mb-10 sm:mb-16 md:mb-20 px-4 sm:px-6">
      <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold my-10 sm:my-14 md:my-20 text-center">
        Galérie
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <Image
              src={src}
              alt="Galerie"
              width={500}
              height={500}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
