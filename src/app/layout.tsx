import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Loader from "./loading";
import MobileActionBar from "../components/mobileActionBar";
import React from "react";
import { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BUSINESS, localityPhrase } from "@/lib/business";

// Chargée par next/font plutôt que par un @import CSS : la requête n'est plus
// bloquante et `display: swap` évite que le texte reste invisible au chargement.
const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  // Rend absolues les URL relatives des canonical et des images Open Graph.
  metadataBase: new URL(BUSINESS.siteUrl),
  title: {
    default: `${BUSINESS.name} | Barbier ${localityPhrase()}`,
    // Les pages ne fournissent que leur titre propre.
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    `Barbier ${localityPhrase()} : coupe homme, taille de barbe, dégradé, teinture, nattes et twists. ` +
    `Réservez votre rendez-vous en ligne chez ${BUSINESS.name}.`,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  keywords: [
    "barbier Montréal",
    "coupe de cheveux Montréal",
    "barbier près de moi",
    "salon de coiffure Montréal",
    "taille de barbe Montréal",
    "dégradé Montréal",
    BUSINESS.name,
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icons/logo3.PNG",
    apple: "/icons/logo3.PNG",
  },
  formatDetection: {
    // Laisse le navigateur mobile transformer le numéro affiché en lien d'appel.
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-CA" className={`${exo2.variable} scroll-smooth`}>
      {/* pb-14 sur mobile : réserve la place de la barre d'action fixe pour
          qu'elle ne recouvre pas la fin du footer. */}
      <body className="scrollbar-hide overflow-x-hidden min-w-[320px] pb-14 md:pb-0">
        <Header />
        <Loader />
        <main className="transition-all duration-500 ease-in-out w-full">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <SpeedInsights />
      </body>
    </html>
  );
}
