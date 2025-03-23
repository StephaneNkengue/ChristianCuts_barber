import React from "react";
import ImageBackTop from "../../components/imageBackTop";

export default function Page() {
  return (
    <div>
      <ImageBackTop title="MODALITÉS" />

      <div className="text-white py-16 px-6 md:px-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Modalités de Réservation
        </h2>

        {/* Prise de Rendez-vous */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">
            Prise de Rendez-vous
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Les réservations se font exclusivement en ligne via notre site web
              ou bien par appel direct
            </li>
          </ul>
        </div>

        {/* Retards */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">Retards</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Un retard de plus de 10-15 minutes peut entraîner l'annulation du
              rendez-vous.
            </li>
            <li>
              Si le retard est acceptable, la coupe sera adaptée au temps
              restant.
            </li>
          </ul>
        </div>

        {/* Annulations & Modifications */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">
            Annulations & Modifications
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Les annulations doivent être faites au moins 24h à l'avance pour
              obtenir un remboursement de l'acompte (si applicable).
            </li>
          </ul>
        </div>

        {/* Absences (No-Show) */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">
            Absences (No-Show)
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Une absence sans préavis entraîne la perte de l'acompte et peut
              bloquer les futures réservations.
            </li>
            <li>
              Après deux absences non justifiées, une réservation ne pourra se
              faire que sur paiement complet à l'avance.
            </li>
          </ul>
        </div>

        {/* Hygiène & Respect */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">
            Hygiène & Respect
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Merci d'arriver avec des cheveux propres pour garantir une coupe
              optimale.
            </li>
            <li>
              Toute attitude irrespectueuse envers le personnel ou les autres
              clients entraînera un refus de service.
            </li>
          </ul>
        </div>

        {/* Cas de Force Majeure */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">
            Cas de Force Majeure
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Si nous devons annuler un rendez-vous pour une raison
              exceptionnelle, un report ou un remboursement sera proposé.
            </li>
          </ul>
        </div>

        {/* Service Express */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">
            Service Express (+20$)
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Besoin d'une coupe rapide ? Optez pour le service express pour
              être pris en charge en priorité.
            </li>
            <li>
              Disponible uniquement sur certains créneaux et sous réserve de
              disponibilité.
            </li>
          </ul>
        </div>

        {/* Service Après Heure de Fermeture */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-orange-500">
            Service Après Heure de Fermeture (+25$)
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Pour ceux qui ne peuvent pas venir pendant les horaires habituels,
              nous proposons des coupes après la fermeture.
            </li>
            <li>Réservation obligatoire avec un supplément.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
