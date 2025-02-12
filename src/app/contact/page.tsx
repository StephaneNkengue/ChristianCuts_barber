import React from "react";

export default function contact() {
  return (
    <div className=" text-white">
      {/* Header */}
      <div
        className="relative w-full h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/image-background.jpg')" }}
      >
        <h1 className="text-5xl font-bold">CONTACT US</h1>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">CONTACT INFO</h2>
            <p className="flex items-center space-x-2">
              📞 <span>+1 233 898 0897</span>
            </p>
            <p className="flex items-center space-x-2">
              📧 <span>email@example.com</span>
            </p>
            <p className="flex items-center space-x-2">
              📍 <span>123 Main Street, Anytown, USA.</span>
            </p>

            {/* Opening Hours */}
            <h2 className="text-2xl font-semibold mt-6 mb-4">OPENING HOURS</h2>
            <p>
              Mon-Fri{" "}
              <span className="text-orange-500 font-semibold">9 AM - 7 PM</span>
            </p>
            <p>
              Sat-Sun{" "}
              <span className="text-orange-500 font-semibold">9 AM - 5 PM</span>
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">CONTACT FORM</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg h-32"
              ></textarea>
              <button className="w-full bg-transparent border-2 border-orange-500 text-orange-500 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
