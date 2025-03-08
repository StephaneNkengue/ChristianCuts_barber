import React from "react";
import Image from "next/image";

interface ImageBackTopProps {
  title: string;
}

export default function imageBackTop(props: ImageBackTopProps) {
  return (
    <div className="relative h-64 sm:h-80 md:h-96 w-full">
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
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
          {props.title}
        </h1>
      </div>
    </div>
  );
}
