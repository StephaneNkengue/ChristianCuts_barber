import React from "react";
import Link from "next/link";
import JsonLd from "./jsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; path: string };

/**
 * Fil d'Ariane visible + BreadcrumbList JSON-LD correspondant. Les deux
 * proviennent de la même liste, donc ils ne peuvent pas diverger.
 * Le dernier élément est la page courante : affiché, mais pas cliquable.
 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Fil d'Ariane" className="text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-x-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-x-2">
                {isLast ? (
                  <span aria-current="page" className="text-gray-300">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
