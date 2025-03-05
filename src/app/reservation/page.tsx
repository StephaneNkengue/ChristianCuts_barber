"use client";

import React from "react";
import { useState, useEffect } from "react";
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
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("https://api.cal.com/v1/availability", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALCOM_API_KEY}`,
        },
      });
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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableSlots = async (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    if (!availableDates.has(formattedDate)) {
      setAvailableTimeSlots([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.cal.com/v1/availability?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALCOM_API_KEY}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAvailableTimeSlots(data.slots || []);
      } else {
        setAvailableTimeSlots([]);
      }
    } catch (error) {
      console.error("Erreur de récupération des disponibilités:", error);
      setAvailableTimeSlots([]);
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, fetchAvailableSlots]);

  const handleBooking = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    const formattedDate = format(selectedDate!, "yyyy-MM-dd");
    const eventData: BookingData = {
      name,
      date: formattedDate,
      time: timeSlot,
      duration: 30,
      eventType: "meeting",
      email: email || undefined,
      phone: phone || undefined,
    };

    try {
      const response = await fetch("https://api.cal.com/v1/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALCOM_API_KEY}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la réservation");
      }

      alert(
        `Réservation confirmée pour ${name} le ${formattedDate} à ${timeSlot}`
      );
      // Réinitialiser le formulaire
      setName("");
      setEmail("");
      setPhone("");
      setTimeSlot("");
      setSelectedDate(undefined);
    } catch (error) {
      console.error("Erreur API:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Impossible de finaliser la réservation"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">Réserver un créneau</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
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
