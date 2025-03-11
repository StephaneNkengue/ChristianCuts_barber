import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Loader from "./loading";
import React from "react";
import { Metadata } from "next";

// Définir les métadonnées du site, incluant la favicon
export const metadata: Metadata = {
  title: "Christian Cutz | Barbier professionnel",
  description:
    "Découvrez Christian Cutz, votre barbier professionnel proposant des coupes personnalisées et des services de qualité",
  icons: {
    icon: "/icons/logo2.png",
    apple: "/icons/logo2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="scrollbar-hide overflow-x-hidden min-w-[320px]">
        <Header />
        <Loader />
        <main className="transition-all duration-500 ease-in-out w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
