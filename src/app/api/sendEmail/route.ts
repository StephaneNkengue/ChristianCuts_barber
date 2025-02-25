import { NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY as string,
    });

    const response = await mg.messages.create(
      process.env.MAILGUN_DOMAIN as string,
      {
        from: "Mailgun Sandbox <postmaster@sandbox92175008dba84288a2f8609a3171fc3a.mailgun.org>",
        to: email,
        subject: `Nouveau message de ${name}`,
        text: `Email: ${email}\n\nMessage:\n${message}`,
      }
    );

    return NextResponse.json(
      { message: "Email envoyé avec succès", response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
