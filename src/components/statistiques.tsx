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
    <section className="w-full bg-[#181818]">
      <div className="w-full flex flex-wrap justify-between text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex-1 py-8 px-4 flex flex-col items-center justify-center border-r border-[#222222] last:border-r-0"
          >
            <motion.h2
              className="text-6xl md:text-8xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {stat.value}
              {stat.suffix}
            </motion.h2>
            <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
