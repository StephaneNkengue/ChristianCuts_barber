// pages/api/sendSms.ts
import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res
        .status(400)
        .json({ message: "Phone and message are required" });
    }

    const sms = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phone,
    });

    return res.status(200).json({ success: true, sid: sms.sid });
  } catch (error: any) {
    console.error("Error sending SMS:", error);
    return res
      .status(500)
      .json({ message: "Failed to send SMS", error: error.message });
  }
}
