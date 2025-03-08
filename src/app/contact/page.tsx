import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import ImageBackTop from "../../components/imageBackTop";
import ContactForm from "../../components/contactForm";
import Link from "next/link";

export default function contact() {
  return (
    <div className="text-white">
      <ImageBackTop title="CONTACT" />

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-5 md:space-y-7">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5">
              CONTACT INFO
            </h2>
            <p className="flex items-center space-x-2 md:space-x-4 text-xl md:text-xl">
              <FiPhoneCall />{" "}
              <a href="tel:+15142965702" className="hover:text-orange-500">
                +1 (514) 296-5702
              </a>
            </p>
            <p className="flex items-center space-x-2 md:space-x-4 text-xl md:text-xl">
              <CiMail />{" "}
              <Link
                href="mailto:Fouodohchristian@yahoo.com"
                className="hover:text-orange-500"
              >
                Fouodohchristian@yahoo.com
              </Link>
            </p>
            <p className="flex items-center space-x-2 md:space-x-4 text-xl md:text-xl">
              <CiLocationOn />{" "}
              <Link
                href="https://maps.app.goo.gl/R4mRqBrE5P1Fqcss5"
                className="hover:text-orange-500"
              >
                <span>3400 rue saint germain, Montréal, Québec</span>
              </Link>
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
