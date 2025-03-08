"use client";

import React, { useEffect, useState } from "react";

export default function ReservationPage() {
  const [meetingUrl, setMeetingUrl] = useState<string | null>(null);

  useEffect(() => {
    // Utiliser directement le lien Brevo Meeting
    const url =
      process.env.NEXT_PUBLIC_BREVO_MEETING_URL ||
      "https://meet.brevo.com/stephane-nkengue";
    setMeetingUrl(url);
  }, []);

  return (
    <div className="container mx-auto pt-24 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Réservez votre rendez-vous
      </h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {meetingUrl ? (
          <iframe
            src={meetingUrl}
            width="100%"
            height="900px"
            frameBorder="0"
            title="Brevo Meeting Booking"
            className="border-0"
            allow="camera; microphone; fullscreen; display-capture"
          />
        ) : (
          <div className="flex justify-center items-center h-[700px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>
          Vous pouvez également réserver directement sur
          <a
            href="https://meet.brevo.com/stephane-nkengue?lang=fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline ml-1"
          >
            notre page de réservation Brevo
          </a>
        </p>
      </div>
    </div>
  );
}
