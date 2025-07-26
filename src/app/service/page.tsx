import React from "react";
import ImageBackTop from "../../components/imageBackTop";
import Image from "next/image";

export default function page() {
  // URL de réservation Brevo
  const meetingUrl = "https://meet.brevo.com/christiancutz?lang=fr";

  // Tableau avec les services spécifiques
  const services = [
    {
      title: "HOME SERVICE",
      image: "/galerie/gal18.jpg",
      price: "À partir de 150$",
    },
    {
      title: "COUPE CLASSIQUE",
      image: "/galerie/gal13.jpg",
      price: "40$",
    },
    {
      title: "COUPE & BARBE",
      image: "/galerie/gal10.jpg",
      price: "50$",
    },
    {
      title: "COIFFURE & LAVAGE",
      image: "/galerie/gal19.jpg",
      price: "60$",
    },
    {
      title: "CONTOUR UNIQUE",
      image: "/galerie/gal22.jpg",
      price: "25$",
    },
    {
      title: "COIFFURE D'ANNIVERSAIRE",
      image: "/galerie/gal12.jpg",
      price: "Gratuit",
    },
    {
      title: "TEINTURE",
      image: "/galerie/gal1.jpg",
      price: "COLORATION : 60$ | DECOLORATION : 100$",
    },
    {
      title: "NATTES",
      image: "/galerie/gal17.jpg",
      price: "40$ ",
    },
    {
      title: "TWIST",
      image: "/galerie/gal16.jpg",
      price: "50$",
    },
  ];

  return (
    <div>
      <ImageBackTop title="SERVICES" />

      <div className="text-white py-16 px-6 md:px-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center mb-20"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={200}
                className="rounded-lg"
              />
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent)",
                }}
              ></div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-3/4 md:pl-12 mt-8 md:mt-0">
              <h2 className="text-3xl font-bold">{service.title}</h2>
              <p className="text-orange-500 mt-4 text-4xl font-bold">
                {service.price}
              </p>

              <a
                href={meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-4 relative border border-orange-500 text-white py-2 rounded-md overflow-hidden group"
              >
                <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
                <strong className="relative z-10 text-l">Réserver</strong>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
