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
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

  const fetchAvailableDates = async () => {
    try {
      const response = await fetch("https://api.cal.com/v1/availability", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CALCOM_API_KEY}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const availableDatesSet: Set<string> = new Set(
          data.availableDates.map((d: string) =>
            format(new Date(d), "yyyy-MM-dd")
          )
        );
        setAvailableDates(availableDatesSet);
      }
    } catch (error) {
      console.error("Erreur de récupération des dates disponibles:", error);
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
    if (!selectedDate || !timeSlot || !name) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const eventData: BookingData = {
      name,
      date: formattedDate,
      time: timeSlot,
      duration: 30,
      eventType: "meeting",
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

      if (response.ok) {
        alert(
          `Réservation confirmée pour ${name} le ${formattedDate} à ${timeSlot}`
        );
      } else {
        alert("Erreur lors de la réservation");
      }
    } catch (error) {
      console.error("Erreur API:", error);
      alert("Impossible de finaliser la réservation");
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">Réserver un créneau</h1>
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
          {availableTimeSlots.length > 0 ? (
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
        placeholder="Votre nom et prénom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 border rounded-lg"
      />
      <Button
        onClick={handleBooking}
        className="bg-green-500 text-white px-6 py-2 rounded-lg"
      >
        Réserver
      </Button>
    </div>
  );
}
