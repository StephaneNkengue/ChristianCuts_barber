"use client";

import React from "react";

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
    <section className="bg-gray-900 py-10">
      <h2 className="text-white text-4xl font-bold text-center mb-8">
        Galérie
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <img
              src={src}
              alt={`Instagram Image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
