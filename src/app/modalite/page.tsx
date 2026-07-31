import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ImageBackTop from "../../components/imageBackTop";
import Breadcrumb from "../../components/breadcrumb";
import JsonLd from "../../components/jsonLd";
import { faqSchema } from "@/lib/schema";
import { FAQ_ITEMS } from "@/lib/faq";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, localityPhrase } from "@/lib/business";

export const metadata: Metadata = buildMetadata({
  title: `Modalités et FAQ ${localityPhrase()}`,
  description: `Réservation, retards, annulations et suppléments chez ${BUSINESS.name}, barbier ${localityPhrase()} : toutes les réponses avant de prendre votre rendez-vous.`,
  path: "/modalite",
  imageAlt: `Salon de ${BUSINESS.name}, barbier ${localityPhrase()}`,
});

const POLICIES: { heading: string; items: string[] }[] = [
  {
    heading: "Prise de rendez-vous",
    items: [
      "Les réservations se font exclusivement en ligne via notre site web ou bien par appel direct.",
    ],
  },
  {
    heading: "Retards",
    items: [
      "Un retard de plus de 10-15 minutes peut entraîner l'annulation du rendez-vous.",
      "Si le retard est acceptable, la coupe sera adaptée au temps restant.",
    ],
  },
  {
    heading: "Annulations et modifications",
    items: [
      "Les annulations doivent être faites au moins 24h à l'avance pour obtenir un remboursement de l'acompte (si applicable).",
    ],
  },
  {
    heading: "Absences (no-show)",
    items: [
      "Une absence sans préavis entraîne la perte de l'acompte et peut bloquer les futures réservations.",
      "Après deux absences non justifiées, une réservation ne pourra se faire que sur paiement complet à l'avance.",
    ],
  },
  {
    heading: "Hygiène et respect",
    items: [
      "Merci d'arriver avec des cheveux propres pour garantir une coupe optimale.",
      "Toute attitude irrespectueuse envers le personnel ou les autres clients entraînera un refus de service.",
    ],
  },
  {
    heading: "Cas de force majeure",
    items: [
      "Si nous devons annuler un rendez-vous pour une raison exceptionnelle, un report ou un remboursement sera proposé.",
    ],
  },
  {
    heading: "Service express (+20 $)",
    items: [
      "Besoin d'une coupe rapide ? Optez pour le service express pour être pris en charge en priorité.",
      "Disponible uniquement sur certains créneaux et sous réserve de disponibilité.",
    ],
  },
  {
    heading: "Service après l'heure de fermeture (+25 $)",
    items: [
      "Pour ceux qui ne peuvent pas venir pendant les horaires habituels, nous proposons des coupes après la fermeture.",
      "Réservation obligatoire avec un supplément.",
    ],
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_ITEMS)} />

      <ImageBackTop
        title={`Modalités de réservation — barbier ${localityPhrase()}`}
        subtitle="Les règles du salon, puis les questions qui reviennent le plus souvent."
        imageAlt={`Salon de ${BUSINESS.name}, barbier ${localityPhrase()}`}
      >
        <Breadcrumb
          items={[
            { name: "Accueil", path: "/" },
            { name: "Modalités", path: "/modalite" },
          ]}
        />
      </ImageBackTop>

      <div className="text-white py-12 sm:py-16 px-6 md:px-20 max-w-4xl mx-auto">
        <section>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Conditions de réservation
          </h2>

          <div className="space-y-10">
            {POLICIES.map((policy) => (
              <div key={policy.heading}>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-orange-500">
                  {policy.heading}
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {policy.items.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section questions : c'est elle qui porte le FAQPage JSON-LD, et qui
            peut faire apparaître le site en résultat enrichi. */}
        <section className="mt-16 border-t border-white/10 pt-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Questions fréquentes
          </h2>

          <dl className="space-y-8">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                {/* Pas de <h3> ici : le modèle de contenu de <dt> interdit les
                    éléments de titre. Le <dt> joue déjà ce rôle sémantique. */}
                <dt className="text-xl font-bold text-orange-500">
                  {item.question}
                </dt>
                <dd className="mt-2 text-gray-300">{item.answer}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 text-gray-300">
            Une question qui n&apos;est pas dans la liste ? Appelle le{" "}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="text-orange-500 hover:underline"
            >
              {BUSINESS.phoneDisplay}
            </a>{" "}
            ou passe par la{" "}
            <Link href="/contact" className="text-orange-500 hover:underline">
              page contact
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
