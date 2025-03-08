import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import Loader from "./loading";
import React from "react";

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
