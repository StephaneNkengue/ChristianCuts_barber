import React from "react";

/**
 * Injecte un graphe JSON-LD dans la page. Composant serveur : le script est
 * présent dans le HTML initial, donc lisible par les robots sans exécution JS.
 */
export default function JsonLd({ data }: { data: unknown }) {
  // Échappe `<` pour qu'une chaîne de données ne puisse pas fermer le <script>.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
