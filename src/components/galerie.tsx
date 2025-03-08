"use client";

import React from "react";
import Image from "next/image";

const images = [
  "/images/test.jpg",
  "/images/test.jpg",
  "/images/test.jpg",
  "/images/test.jpg",
  "/images/test.jpg",
  "/images/test.jpg",
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
