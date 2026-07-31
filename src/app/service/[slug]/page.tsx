import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ImageBackTop from "../../../components/imageBackTop";
import Breadcrumb from "../../../components/breadcrumb";
import JsonLd from "../../../components/jsonLd";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, formatAddress, localityPhrase } from "@/lib/business";
import { SERVICES, getService } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

/** Toutes les pages de prestation sont générées statiquement au build. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

/**
 * Le catalogue est fixe : tout slug inconnu doit renvoyer un vrai 404.
 * Sans ce réglage, la page est rendue à la demande et le shell HTML part en
 * 200 avant que notFound() ne soit atteint — un « soft 404 » qui laisse Google
 * indexer n'importe quelle URL sous /service/.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.name} ${localityPhrase()}`,
    description: service.metaDescription,
    path: `/service/${service.slug}`,
    image: service.image,
    imageAlt: service.imageAlt,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      <ImageBackTop
        title={`${service.name} ${localityPhrase()}`}
        subtitle={service.summary}
        imageAlt={service.imageAlt}
      >
        <Breadcrumb
          items={[
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/service" },
            { name: service.name, path: `/service/${service.slug}` },
          ]}
        />
      </ImageBackTop>

      <article className="text-white py-12 sm:py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-6">
            <p className="text-orange-500 text-3xl sm:text-4xl font-bold">
              {service.priceLabel}
            </p>
            <a
              href={BUSINESS.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 transition-colors font-bold"
            >
              Réserver ce service
            </a>
          </div>

          <Image
            src={service.image}
            alt={service.imageAlt}
            width={900}
            height={600}
            sizes="(max-width: 896px) 100vw, 896px"
            className="rounded-lg w-full h-auto mt-8"
          />

          <div className="mt-10 space-y-10">
            {service.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-gray-300 text-base sm:text-lg">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Réserver {localityPhrase()}
            </h2>
            <p className="mt-4 text-gray-300">
              {service.name} est disponible sur rendez-vous chez{" "}
              {BUSINESS.name}, {formatAddress()}. Réserve ton créneau en ligne
              ou appelle le{" "}
              <a
                href={`tel:${BUSINESS.phone}`}
                className="text-orange-500 hover:underline"
              >
                {BUSINESS.phoneDisplay}
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={BUSINESS.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-md bg-orange-500 hover:bg-orange-600 transition-colors font-bold"
              >
                Réserver en ligne
              </a>
              <Link
                href="/tarifs"
                className="px-5 py-2 rounded-md border border-white/60 hover:border-white transition-colors font-bold"
              >
                Voir tous les tarifs
              </Link>
            </div>
          </section>

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold">Autres prestations</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/service/${other.slug}`}
                    className="block rounded-md border border-white/15 p-4 hover:border-orange-500 transition-colors"
                  >
                    <span className="font-semibold">{other.name}</span>
                    <span className="block text-sm text-orange-500 mt-1">
                      {other.priceLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
