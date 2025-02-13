import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function footer() {
  return (
    <footer className="bg-[#0c0c0c] text-white py-5 text-center h-96">
      <div className="flex flex-col items-center	content-between space-y-7">
        {/* Logo */}
        <Link href="/">
          <div className="text-4xl font-bold flex items-center ">
            <span className="text-white">CHRISTIAN</span>
            <Image
              src="/icons/Logo2.PNG"
              width={90}
              height={90}
              alt="Picture of the author"
            />
            <span className="text-white">CUTZ</span>
          </div>
        </Link>
        <span className="text-white text-2xl">SINCE 2022</span>
        <nav className="flex text-2xl mx-20 space-x-6 text-gray-400">
          <Link
            href="/"
            className="text-orange-500 transition duration-1000 ease-in-out"
          >
            Home
          </Link>
          <Link
            href="/service"
            className="hover:text-orange-500  transition duration-1000 ease-in-out"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="hover:text-orange-500  transition duration-1000 ease-in-out"
          >
            Contact
          </Link>
        </nav>

        <div className="flex space-x-6 text-gray-400 text-4xl">
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          {/* <a href="#" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white">
            <FaXTwitter />
          </a> */}
        </div>

        {/* Copyright */}
        <p className="text-white text-sm">
          Réalisé par Stéphane Darryl Wamo Nkengue. © Copyright 2025 Christian
          Cutz. Tous droits réservé
        </p>
      </div>
    </footer>
  );
}
