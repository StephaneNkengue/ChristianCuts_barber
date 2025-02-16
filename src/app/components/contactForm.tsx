import React from "react";

export const contactForm = () => {
  return (
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
  );
};
