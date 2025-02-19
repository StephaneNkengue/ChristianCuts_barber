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
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#2c2d2f] text-white text-8xl font-bold z-50"
    >
      <div className="flex items-center">
        {text1.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mx-1"
          >
            {letter}
          </motion.span>
        ))}

        {/* Image au milieu */}
        <motion.img
          src="/icons/Logo2.PNG" // Remplace avec ton image
          alt="Logo"
          className="mx-3"
          width={180}
          height={180}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        />

        {text2.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mx-1"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  ) : null;
};

export default Loader;
