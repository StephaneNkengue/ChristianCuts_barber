"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import React from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage("Email envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage(data.message || "Une erreur est survenue.");
      }
    } catch (error) {
      setResponseMessage("Erreur de connexion.");
      console.error("Erreur lors de l'envoi de l'email:", error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-5">
        FORMULAIRE DE CONTACT
      </h2>
      <form
        className="space-y-3 sm:space-y-4 md:space-y-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Votre nom"
          required
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-white text-white p-2 text-sm sm:text-base"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Votre courriel"
          required
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-white text-white p-2 text-sm sm:text-base"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message"
          required
          rows={4}
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-white text-white p-2 text-sm sm:text-base"
        />
        <button
          disabled={loading}
          className="relative border border-orange-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md overflow-hidden group bg-[#0c0c0c] mt-2 sm:mt-3"
        >
          <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
          <strong className="relative z-10 text-base sm:text-lg md:text-xl lg:text-2xl">
            Envoyer le message
          </strong>
        </button>
        {responseMessage && (
          <p className="text-center mt-2 text-sm sm:text-base">
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
}
