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
    <section className="mb-20">
      <h2 className="text-white text-6xl font-bold my-20 text-center">
        Galérie
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
