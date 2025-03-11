"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const text1 = "CHRISTIAN".split(""); // Découper chaque lettre
const text2 = "CUTZ".split(""); // Découper chaque lettre

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Détecter les changements de page

  useEffect(() => {
    setLoading(true); // Réinitialiser le loader à chaque navigation
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [pathname]); // Se déclenche à chaque changement de page

  return loading ? (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3 }}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#2c2d2f] text-white text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold z-50 px-4"
    >
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex">
          {text1.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mx-0.5 sm:mx-1"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Image au milieu */}
        <motion.img
          src="/icons/logo2.png" // Remplace avec ton image
          alt="Logo"
          className="mx-2 sm:mx-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-[180px] xl:h-[180px] my-2 sm:my-0"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        />

        <div className="flex">
          {text2.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mx-0.5 sm:mx-1"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default Loader;
