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
        from: "Christian Cutz <postmaster@sandbox92175008dba84288a2f8609a3171fc3a.mailgun.org>",
        to: "fouodohchristian@yahoo.com",
        subject: `Nouveau message de ${name}`,
        html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: 'Arial', sans-serif; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000; margin: 0; font-size: 28px; display: inline-block; vertical-align: middle;">CHRISTIAN <img src="https://christian-cutz.com/icons/logo2.png" alt="Logo" style="width: 50px; height: 50px; vertical-align: middle; margin: 0 5px;"> CUTZ</h1>
            <p style="color: #666; font-size: 14px; margin-top: 5px;">SINCE 2022</p>
          </div>
          
          <div style="background-color: #2c2d2f; border-left: 4px solid #f97316; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <h2 style="color: #fff; margin-top: 0; margin-bottom: 15px; font-size: 20px;">Nouveau message de contact</h2>
            <p style="color: #fff; margin: 0 0 10px; font-size: 16px;"><strong>Nom:</strong> ${name}</p>
            <p style="color: #fff; margin: 0 0 10px; font-size: 16px;"><strong>Email:</strong> ${email}</p>
            <div style="color: #fff; margin: 0; font-size: 16px;">
              <p style="margin-top: 0;"><strong>Message:</strong></p>
              <p style="white-space: pre-line; background-color: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 4px;">${message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px; margin: 0 0 10px;">© Christian Cutz. Tous droits réservés.</p>
            <div>
              <a href="https://christian-cutz.com/" style="color: #f97316; text-decoration: none; margin: 0 10px;">Accueil</a>
              <a href="https://christian-cutz.com/service" style="color: #f97316; text-decoration: none; margin: 0 10px;">Services</a>
              <a href="https://christian-cutz.com/contact" style="color: #f97316; text-decoration: none; margin: 0 10px;">Contact</a>
            </div>
          </div>
        </div>
        `,
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
