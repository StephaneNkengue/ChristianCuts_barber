import React from "react";
import Image from "next/image";

export default function imageBackTop() {
  return (
    <div className="relative h-96 w-full">
      <Image
        src="/images/image-background.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-8xl font-bold">CONTACT</h1>
      </div>
    </div>
  );
}
