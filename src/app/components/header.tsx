"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-[#0c0c0c] text-white py-4 ">
      <div className="container mx-auto flex justify-evenly items-center px-6">
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

        <nav className="flex text-2xl mx-20 space-x-6 text-gray-400">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/service" },
            { name: "Contact", path: "/contact" },
          ].map(({ name, path }) => (
            <Link
              key={path}
              href={path}
              className={`transition duration-300 ease-in-out ${
                pathname === path
                  ? "text-orange-500 font-semibold"
                  : "hover:text-orange-500"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="relative border border-orange-500 text-white px-4 py-2 rounded-md overflow-hidden group"
        >
          <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
          <strong className="relative z-10 text-2xl">Book Appointment</strong>
        </button>
      </div>
    </header>
  );
};

export default header;
