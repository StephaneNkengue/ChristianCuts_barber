import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Configuration Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

// Clé secrète pour vérifier l'authenticité des webhooks
const WEBHOOK_SECRET = process.env.BREVO_WEBHOOK_SECRET || "votre_secret_ici";

// Interface pour les participants
interface Attendee {
  name: string;
  email: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Vérification de sécurité (optionnelle mais recommandée)
    const signature = request.headers.get("X-Brevo-Signature") || "";
    // Une vraie implémentation devrait vérifier cette signature

    // Récupérer les données du webhook
    const data = await request.json();

    console.log("Webhook Brevo reçu:", JSON.stringify(data));

    // Extraire les informations de la réservation
    const {
      event_type, // doit être "booking_created"
      booking = {},
    } = data;

    // Vérifier que c'est bien une nouvelle réservation
    if (event_type !== "booking_created") {
      return NextResponse.json({
        message: "Événement ignoré (pas une nouvelle réservation)",
      });
    }

    // Extraire les détails de la réservation
    const { attendees = [], start_time, end_time, title } = booking;

    // Format des dates pour le SMS
    const startDate = new Date(start_time);
    const formattedDate = startDate.toLocaleDateString("fr-FR");
    const formattedTime = startDate.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Envoyer un SMS à chaque participant
    for (const attendee of attendees) {
      if (attendee.phone) {
        try {
          // Composer le message
          const message = `Bonjour ${attendee.name}, votre rendez-vous "${title}" est confirmé pour le ${formattedDate} à ${formattedTime}. Merci d'avoir réservé chez Christian Cutz!`;

          // Envoyer le SMS via Twilio
          await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: attendee.phone,
          });

          console.log(`SMS envoyé à ${attendee.name} au ${attendee.phone}`);
        } catch (error) {
          console.error(`Erreur d'envoi de SMS à ${attendee.phone}:`, error);
        }
      }
    }

    return NextResponse.json({
      message: "Webhook traité avec succès",
      sms_sent: attendees.filter((a: Attendee) => a.phone).length,
    });
  } catch (error) {
    console.error("Erreur de traitement du webhook:", error);
    return NextResponse.json(
      { error: "Erreur de traitement du webhook" },
      { status: 500 }
    );
  }
}
