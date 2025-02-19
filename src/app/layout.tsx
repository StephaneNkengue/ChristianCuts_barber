import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Loader from "./loading";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scrollbar-hide overflow-x-hidden scroll-behavior-smooth">
        <Header />
        <Loader />
        <main className="transition-all duration-500 ease-in-out">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
