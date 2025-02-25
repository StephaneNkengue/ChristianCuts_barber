import { NextApiRequest, NextApiResponse } from "next";
import formData from "form-data";
import Mailgun from "mailgun.js";

interface EmailRequestBody {
  name: string;
  email: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, message } = req.body as EmailRequestBody;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY as string,
    });

    const response = await mg.messages.create(
      process.env.MAILGUN_DOMAIN as string,
      {
        from: "Mailgun Sandbox <postmaster@sandbox92175008dba84288a2f8609a3171fc3a.mailgun.org>",
        to: email as string,
        subject: `Nouveau message de ${name}`,
        text: `Email: ${email}\n\nMessage:\n${message}`,
      }
    );

    return res
      .status(200)
      .json({ message: "Email envoyé avec succès", response });
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de l'email" });
  }
}
