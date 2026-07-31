import React from "react";
import Image from "next/image";

interface ImageBackTopProps {
  /** Texte du <h1> de la page. Doit contenir la prestation et la ville. */
  title: string;
  /** Sous-titre optionnel, rendu en <p> pour ne pas casser la hiérarchie. */
  subtitle?: string;
  /** Texte alternatif de la photo de fond. */
  imageAlt: string;
  /** Fil d'Ariane, affiché sous le titre. */
  children?: React.ReactNode;
}

export default function ImageBackTop({
  title,
  subtitle,
  imageAlt,
  children,
}: ImageBackTopProps) {
  return (
    <header className="relative min-h-64 sm:min-h-80 md:min-h-96 w-full">
      <Image
        src="/images/image-background.jpg"
        alt={imageAlt}
        fill
        sizes="100vw"
        quality={75}
        // Image LCP des pages internes.
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex min-h-64 sm:min-h-80 md:min-h-96 flex-col items-center justify-center gap-3 px-4 py-12 text-center text-white">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-200">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
