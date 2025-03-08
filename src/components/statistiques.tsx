"use client";

import React from "react";
import { motion } from "framer-motion";

// Données des statistiques
const stats = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 1000, suffix: "+", label: "Services Completed" },
  { value: 21, suffix: "", label: "Experienced Staff" },
  { value: 1220, suffix: "+", label: "Happy Customers" },
];

export default function Statistiques() {
  return (
    <section className="w-full bg-[#181818] py-4 sm:py-6">
      <div className="w-full grid grid-cols-2 md:flex md:flex-wrap md:justify-between text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="py-6 sm:py-8 px-2 sm:px-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#222222] last:border-r-0 even:border-r-0 md:even:border-r md:flex-1"
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-1 sm:mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {stat.value}
              {stat.suffix}
            </motion.h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
