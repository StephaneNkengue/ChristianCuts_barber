import React from "react";
import ImageBackTop from "../../components/imageBackTop";
import Image from "next/image";

export default function page() {
  return (
    <div>
      <ImageBackTop title="SERVICES" />

      <div className="text-white py-16 px-6 md:px-20">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="max-w-6xl mx-auto flex flex-col md:flex-row items-center mb-8"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative">
              <Image
                src="/images/test.jpg"
                alt="Hair Styling"
                width={600}
                height={400}
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
              <h2 className="text-3xl font-bold">HAIR STYLING</h2>
              <p className="text-gray-300 mt-4">
                Our experienced stylists are skilled in creating a wide range of
                hair styles to suit your preferences. Whether you're looking for
                a trendy haircut, a classic updo, or a special occasion
                hairstyle, we have the expertise to bring your vision to life.
                With a keen eye for detail and a deep understanding of hair
                textures and face shapes, we'll work with you to achieve a
                personalized and flattering style that complements your
                individuality.
              </p>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2">
                <li className="font-semibold">Customized Styles</li>
                <li className="font-semibold">Trendy and Versatile</li>
                <li className="font-semibold">Finishing Touches</li>
              </ul>

              <button
                type="button"
                className=" mt-6 px-4 relative border border-orange-500 text-white py-2 rounded-md overflow-hidden group"
              >
                <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left transition-transform duration-1000 ease-in-out group-hover:scale-x-100"></span>
                <strong className="relative z-10 text-l">
                  Book Appointment
                </strong>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
