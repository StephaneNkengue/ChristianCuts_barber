import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Durée du chargement : 3 secondes
  }, []);

  return loading ? (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white text-3xl font-bold z-50"
    >
      Chargement...
    </motion.div>
  ) : null;
};

export default Loader;
