"use client";

import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/Calendar";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface BookingData {
  name: string;
  date: string;
  time: string;
  duration: number;
  eventType: string;
  email?: string;
  phone?: string;
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const hasTriedFetchingDates = useRef<boolean>(false);
  const hasTriedFetchingSlots = useRef<Map<string, boolean>>(new Map());

  const validateForm = () => {
    if (!selectedDate || !timeSlot || !name) {
      setError("Veuillez remplir tous les champs obligatoires");
      return false;
    }
    if (email && !email.includes("@")) {
      setError("Veuillez entrer une adresse email valide");
      return false;
    }
    return true;
  };

  const fetchAvailableDates = async () => {
    if (hasTriedFetchingDates.current) {
      console.log(
        "Déjà essayé de récupérer les dates disponibles, utilisation des données existantes"
      );
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/availability");
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      const availableDatesSet: Set<string> = new Set(
        data.availableDates.map((d: string) =>
          format(new Date(d), "yyyy-MM-dd")
        )
      );
      setAvailableDates(availableDatesSet);
    } catch (error) {
      console.error("Erreur de récupération des dates disponibles:", error);
      setError("Impossible de récupérer les dates disponibles");

      const today = new Date();
      const fakeDates = new Set<string>();
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        fakeDates.add(format(date, "yyyy-MM-dd"));
      }
      setAvailableDates(fakeDates);
    } finally {
      setIsLoading(false);
      hasTriedFetchingDates.current = true;
    }
  };

  const fetchAvailableSlots = async (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    // Vérifier si on a déjà essayé de récupérer les créneaux pour cette date
    if (hasTriedFetchingSlots.current.get(formattedDate)) {
      console.log(
        `Déjà essayé de récupérer les créneaux pour ${formattedDate}, utilisation des données factices`
      );

      // Utiliser des créneaux factices si aucun n'a été chargé
      if (availableTimeSlots.length === 0) {
        setAvailableTimeSlots([
          "09:00",
          "10:00",
          "11:00",
          "14:00",
          "15:00",
          "16:00",
        ]);
      }
      return;
    }

    if (!availableDates.has(formattedDate)) {
      setAvailableTimeSlots([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/availability/slots?date=${formattedDate}`
      );
      if (response.ok) {
        const data = await response.json();
        setAvailableTimeSlots(data.slots || []);
      } else {
        console.error(
          `Erreur HTTP: ${response.status} pour les créneaux de ${formattedDate}`
        );
        setAvailableTimeSlots([
          "09:00",
          "10:00",
          "11:00",
          "14:00",
          "15:00",
          "16:00",
        ]);
      }
    } catch (error) {
      console.error("Erreur de récupération des disponibilités:", error);
      setAvailableTimeSlots([
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
      ]);
    } finally {
      setIsLoading(false);
      // Marquer cette date comme déjà essayée
      hasTriedFetchingSlots.current.set(formattedDate, true);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setTimeSlot("");

    if (date) {
      fetchAvailableSlots(date);
    } else {
      setAvailableTimeSlots([]);
    }
  };

  const handleBooking = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Créer l'objet de données pour la réservation
      const bookingData: BookingData = {
        name,
        date: format(selectedDate!, "yyyy-MM-dd"),
        time: timeSlot,
        duration: 30, // durée par défaut en minutes
        eventType: "haircut", // type d'événement par défaut
        email,
        phone,
      };

      // Simuler l'envoi de la réservation
      console.log("Données de réservation:", bookingData);

      // Simuler un délai de traitement
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Rediriger ou afficher un message de succès
      alert("Réservation confirmée avec succès!");

      // Réinitialiser le formulaire
      setSelectedDate(undefined);
      setName("");
      setEmail("");
      setPhone("");
      setTimeSlot("");
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      setError("Une erreur est survenue lors de la réservation");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">Réserver un créneau</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateChange}
        disabled={(date) =>
          date < new Date() || !availableDates.has(format(date, "yyyy-MM-dd"))
        }
        className="mb-4 border p-4 rounded-lg"
      />
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Choisissez un horaire :</h2>
        <div className="flex space-x-2">
          {isLoading ? (
            <p>Chargement des créneaux disponibles...</p>
          ) : availableTimeSlots.length > 0 ? (
            availableTimeSlots.map((slot) => (
              <Button
                key={slot}
                onClick={() => setTimeSlot(slot)}
                disabled={!availableTimeSlots.includes(slot)}
                className={`px-4 py-2 ${
                  timeSlot === slot ? "bg-blue-500 text-white" : "bg-gray-200"
                } ${
                  !availableTimeSlots.includes(slot)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {slot}
              </Button>
            ))
          ) : (
            <p className="text-red-500">
              Aucune disponibilité pour cette date.
            </p>
          )}
        </div>
      </div>
      <Input
        type="text"
        placeholder="Votre nom et prénom *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 border rounded-lg"
      />
      <Input
        type="email"
        placeholder="Votre email (optionnel)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 border rounded-lg"
      />
      <Input
        type="tel"
        placeholder="Votre téléphone (optionnel)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mb-4 p-2 border rounded-lg"
      />
      <Button
        onClick={handleBooking}
        disabled={isLoading}
        className="bg-green-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {isLoading ? "Réservation en cours..." : "Réserver"}
      </Button>
    </div>
  );
}
