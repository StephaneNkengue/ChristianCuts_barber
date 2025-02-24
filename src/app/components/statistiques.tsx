"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 1000, suffix: "+", label: "Services Completed" },
  { value: 21, suffix: "", label: "Experienced Staff" },
  { value: 1220, suffix: "+", label: "Happy Customers" },
];

export const statistiques = () => {
  return (
    <section className="mb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center my-20">
        {stats.map((stat, index) => (
          <div key={index} className="bg-black text-white p-6 rounded-lg">
            <motion.h2
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {stat.value}
              {stat.suffix}
            </motion.h2>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
