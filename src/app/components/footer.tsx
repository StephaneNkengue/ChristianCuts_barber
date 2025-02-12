import React from "react";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

export default function footer() {
  return (
    <footer className="bg-black text-white py-10 text-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo */}
        <div className="text-3xl font-bold flex items-center space-x-2">
          <span>TRIM</span>
          <span className="text-orange-500">✂</span>
          <span>STYLE</span>
        </div>
        <p className="text-gray-400">
          SINCE <span className="font-semibold">1995</span>
        </p>

        {/* Navigation */}
        <nav className="flex space-x-6 text-gray-400">
          <a href="#" className="hover:text-white">
            Home
          </a>
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Services
          </a>
          <a href="#" className="text-orange-500">
            Contact
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-6 text-gray-400 text-2xl">
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white">
            <FaXTwitter />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          ©2024 All rights are reserved by trimStyle
        </p>
      </div>
    </footer>
  );
}
