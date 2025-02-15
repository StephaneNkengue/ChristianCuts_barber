import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";

export default function contact() {
  return (
    <div className="text-white">
      <div className="relative h-96 w-full">
        <Image
          src="/images/image-background.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold">CONTACT</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-5 md:space-y-7">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5">
              CONTACT INFO
            </h2>
            <p className="flex items-center space-x-2 md:space-x-4 text-xl md:text-2xl">
              <FiPhoneCall /> <span>+1 (514) 296-5702</span>
            </p>
            <p className="flex items-center space-x-2 md:space-x-4 text-xl md:text-2xl">
              <CiMail /> <span>Fouodohchristian@yahoo.com</span>
            </p>
            <p className="flex items-center space-x-2 md:space-x-4 text-xl md:text-2xl">
              <CiLocationOn />{" "}
              <span>3400 rue saint germain, Montréal, Québec</span>
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5">
              FORMULAIRE DE CONTACT
            </h2>
            <form className="space-y-4 md:space-y-6">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-white text-white p-2"
              />
              <input
                type="email"
                placeholder="Courriel"
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-white text-white p-2"
              />
              <textarea
                placeholder="Votre message"
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-white text-white p-2"
              />
              <button
                type="button"
                className="relative border border-orange-500 text-white px-4 py-2 rounded-md overflow-hidden group bg-[#0c0c0c]"
              >
                <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
                <strong className="relative z-10 text-xl md:text-2xl">
                  Envoyer le message
                </strong>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
