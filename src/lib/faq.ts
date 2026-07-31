import { BUSINESS, formatAddress, localityPhrase } from "./business";

/**
 * Questions fréquentes. Chaque réponse reprend une information réellement
 * publiée ailleurs sur le site (modalités, tarifs, coordonnées) : le FAQPage
 * JSON-LD ne doit rien affirmer qui ne soit vérifiable sur la page.
 */
export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: `Comment prendre rendez-vous chez ${BUSINESS.name} ?`,
    answer: `Les réservations se font en ligne depuis le site, ou par appel direct au ${BUSINESS.phoneDisplay}. Le salon fonctionne uniquement sur rendez-vous.`,
  },
  {
    question: "Quelles sont les heures d'ouverture ?",
    answer:
      "Le salon fonctionne uniquement sur rendez-vous, sans plages d'ouverture fixes. Les créneaux disponibles s'affichent en temps réel sur la page de réservation en ligne, et peuvent aussi être confirmés par téléphone.",
  },
  {
    question: `Où se trouve le salon ${BUSINESS.name} ?`,
    answer: `Le salon est situé au ${formatAddress()}, dans le quartier ${
      BUSINESS.neighbourhood ?? BUSINESS.address.city
    }. Il dessert ${BUSINESS.areaServed.join(", ")} et les secteurs voisins : ${BUSINESS.nearbyAreas.join(
      ", "
    )}.`,
  },
  {
    question: "Combien coûte une coupe ?",
    answer:
      "La coupe classique est à 40 $, la coupe avec barbe à 50 $, la coiffure avec lavage à 60 $ et la reprise des contours seuls à 25 $. La grille complète est consultable sur la page des tarifs.",
  },
  {
    question: "Que se passe-t-il en cas de retard ?",
    answer:
      "Un retard de plus de 10 à 15 minutes peut entraîner l'annulation du rendez-vous. Si le retard reste acceptable, la coupe est adaptée au temps restant.",
  },
  {
    question: "Comment annuler ou modifier un rendez-vous ?",
    answer:
      "Les annulations doivent être faites au moins 24 heures à l'avance pour obtenir le remboursement de l'acompte, si un acompte a été versé.",
  },
  {
    question: "Le barbier se déplace-t-il à domicile ?",
    answer: `Oui. Le service à domicile démarre à 150 $ et couvre ${BUSINESS.areaServed.join(
      ", "
    )}. Il faut prévoir un point d'eau, une prise électrique et un espace dégagé.`,
  },
  {
    question: "Peut-on venir en dehors des heures d'ouverture ?",
    answer:
      "Oui, un service après l'heure de fermeture est proposé moyennant un supplément de 25 $, sur réservation. Un service express, pour être pris en charge en priorité, est également disponible pour 20 $ de plus.",
  },
  {
    question: "La coiffure d'anniversaire est-elle vraiment offerte ?",
    answer:
      "Oui. La coiffure est offerte le jour de votre anniversaire, sur présentation d'une pièce d'identité indiquant votre date de naissance. Le rendez-vous se réserve normalement.",
  },
  {
    question: `Faut-il venir avec les cheveux propres ${localityPhrase()} ?`,
    answer:
      "C'est recommandé pour garantir une coupe optimale. Si ce n'est pas possible, la formule coiffure et lavage inclut un shampooing complet avant la coupe.",
  },
];
