import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent align-[-0.125em]"></div>
        <p className="mt-4 text-white text-xl">Chargement...</p>
      </div>
    </div>
  );
}
