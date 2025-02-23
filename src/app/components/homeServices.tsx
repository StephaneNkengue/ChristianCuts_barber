"use client";

import React from "react";
import Image from "next/image";

export default function homeServices() {
  const services = [
    { name: "HAIR STYLING", image: "/images/test.jpg" },
    { name: "HAIR CUT", image: "/images/test.jpg" },
    { name: "BEARD TRIM", image: "/images/test.jpg" },
    { name: "HAIR WASH", image: "/images/test.jpg" },
  ];

  return (
    <section className="p-10">
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="relative">
            <Image
              src={service.image}
              alt={service.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
            <span className="absolute top-1/2 text-white font-bold text-xl tracking-wide -rotate-90 origin-left writing-mode-vertical-rl">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
