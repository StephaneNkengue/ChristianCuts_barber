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
    <section className="pb-20 ">
      <h2 className="text-white text-center text-6xl font-bold py-20">
        SERVICES
      </h2>
      <div className="grid grid-cols-2 gap-x-60 gap-y-20 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="relative">
            <Image
              src={service.image}
              alt={service.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
            <span className="absolute top-3/4 text-white font-bold text-3xl tracking-wide -rotate-90 origin-left writing-mode-vertical-rl -inset-x-6">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
