import React from "react";
import { BUSINESS } from "@/lib/business";

/**
 * Barre d'action fixe en bas d'écran, mobile uniquement.
 *
 * La majorité des recherches locales se font sur téléphone, souvent avec une
 * intention immédiate : appeler ou réserver. Ces deux actions doivent être
 * atteignables sans scroller. Sur desktop la barre disparaît, le bouton
 * « Réserver » de l'en-tête suffit.
 */
export default function MobileActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 flex border-t border-orange-500/40 bg-[#0c0c0c]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0c0c0c]/80 pb-[env(safe-area-inset-bottom)]">
      <a
        href={`tel:${BUSINESS.phone}`}
        className="flex-1 py-3 text-center text-white font-bold border-r border-orange-500/40 active:bg-white/10"
        aria-label={`Appeler ${BUSINESS.name} au ${BUSINESS.phoneDisplay}`}
      >
        Appeler
      </a>
      <a
        href={BUSINESS.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 text-center font-bold bg-orange-500 text-white active:bg-orange-600"
      >
        Réserver
      </a>
    </div>
  );
}
