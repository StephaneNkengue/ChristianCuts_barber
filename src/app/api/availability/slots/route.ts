import { NextRequest, NextResponse } from "next/server";
import { format, addDays } from "date-fns";

// Variable pour suivre les erreurs d'autorisation
let hasAuthorizationError = false;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Le paramètre 'date' est requis" },
      { status: 400 }
    );
  }

  // Si nous avons déjà rencontré une erreur d'autorisation, ne pas réessayer l'API
  if (hasAuthorizationError) {
    console.log(
      "Erreur d'autorisation précédente détectée, utilisation de données factices"
    );
    return NextResponse.json({
      slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    });
  }

  try {
    console.log("Récupération des créneaux pour la date:", date);
    console.log("Utilisation de la clé API:", process.env.CALCOM_API_KEY);
    console.log("Utilisateur Cal.com:", process.env.CALCOM_USERNAME);

    // Nous utilisons la date fournie comme dateFrom et dateTo pour obtenir les créneaux pour cette journée spécifique
    const dateObj = new Date(date);
    const nextDay = addDays(dateObj, 1);

    const dateFrom = format(dateObj, "yyyy-MM-dd");
    const dateTo = format(nextDay, "yyyy-MM-dd");

    console.log(`Récupération des créneaux entre ${dateFrom} et ${dateTo}`);

    // Utilisez username (ou userId ou teamId) comme requis par l'API Cal.com
    const username = process.env.CALCOM_USERNAME || "demo"; // Valeur par défaut au cas où

    const response = await fetch(
      `https://api.cal.com/v1/availability/slots?apiKey=${process.env.CALCOM_API_KEY}&dateFrom=${dateFrom}&dateTo=${dateTo}&username=${username}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur API Cal.com (slots):", response.status, errorText);

      // Si erreur 403, marquer le drapeau pour éviter les futures requêtes
      if (response.status === 403) {
        hasAuthorizationError = true;
        console.log(
          "Erreur d'autorisation 403 détectée, les prochaines requêtes utiliseront des données factices"
        );
      }

      return NextResponse.json({
        slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      });
    }

    const data = await response.json();
    console.log("Réponse de Cal.com (slots):", JSON.stringify(data));

    // Si data n'a pas de propriété slots, créons-en une avec des données factices
    const responseData = data.slots
      ? data
      : {
          slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
        };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des créneaux disponibles:",
      error
    );
    return NextResponse.json(
      { slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { status: 200 }
    );
  }
}
