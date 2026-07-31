import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ImageBackTop from "../../components/imageBackTop";
import Breadcrumb from "../../components/breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS, localityPhrase } from "@/lib/business";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = buildMetadata({
  title: `Services de barbier ${localityPhrase()}`,
  description: `Coupe, barbe, dégradé, contours, teinture, nattes et twists ${localityPhrase()}. Les 10 prestations du salon et leurs tarifs, puis réservez en ligne.`,
  path: "/service",
  imageAlt: `Prestations de ${BUSINESS.name}, barbier ${localityPhrase()}`,
});

export default function Page() {
  return (
    <>
      <ImageBackTop
        title={`Services de barbier ${localityPhrase()}`}
        subtitle="Dix prestations, du contour rapide à la coloration complète. Chaque service a sa page dédiée."
        imageAlt={`Salon de ${BUSINESS.name}, barbier ${localityPhrase()}`}
      >
        <Breadcrumb
          items={[
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/service" },
          ]}
        />
      </ImageBackTop>

      <div className="text-white py-12 sm:py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
          {SERVICES.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              <div className="w-full md:w-1/2 relative">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-lg w-full h-auto"
                />
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent)",
                  }}
                />
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  <Link
                    href={`/service/${service.slug}`}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {service.name}
                  </Link>
                </h2>
                <p className="text-orange-500 mt-3 text-2xl sm:text-3xl font-bold">
                  {service.priceLabel}
                </p>
                <p className="mt-4 text-gray-300">{service.summary}</p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/service/${service.slug}`}
                    className="px-4 relative border border-orange-500 text-white py-2 rounded-md overflow-hidden group inline-block"
                  >
                    <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
                    <strong className="relative z-10">En savoir plus</strong>
                  </Link>
                  <a
                    href={BUSINESS.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md border border-white/60 hover:border-white transition-colors"
                  >
                    <strong>Réserver</strong>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
