import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function footer() {
  return (
    <footer className="bg-[#020202] text-white py-10 text-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo */}
        <Link href="/">
          <div className="text-3xl font-bold flex items-center ">
            <span className="text-white">CHRISTIAN</span>
            <Image
              src="/icons/Logo2.PNG"
              width={80}
              height={80}
              alt="Picture of the author"
            />
            <span className="text-white">CUTZ</span>
          </div>
        </Link>
        <p className="text-gray-400">
          SINCE <span className="font-semibold">2022</span>
        </p>

        {/* Navigation */}
        <nav className="flex space-x-6 text-gray-400">
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

        {/* Social Icons */}
        <div className="flex space-x-6 text-gray-400 text-2xl">
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
        <p className="text-gray-500 text-sm">
          Réalisé par Stéphane Darryl Wamo Nkengue. © Copyright 2025 Christian
          Cutz. Tous droits réservé
        </p>
      </div>
    </footer>
  );
}
