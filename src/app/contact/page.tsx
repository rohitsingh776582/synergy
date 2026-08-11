import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import Container from "@/components/Container";
import { MapPin, Phone, Mail, Clock, Building2, Factory } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Synergy PUF - Get in Touch",
  description: "Contact Synergy PUF head office in New Delhi and factory in Gurugram. Phone: +91 98765 43210, Email: info@synergypuf.com.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-16 text-center border-b border-gray-100">
          <Container>
            <span className="rounded-full bg-purple-100 px-4 py-1.5 text-xs font-extrabold text-[#5b176e] tracking-wider uppercase">
              Connect With Us
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Contact Synergy PUF <br />
              <span className="text-[#5b176e]">Engineering Team</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Have a technical query or require site inspection? Our insulation specialists are ready to assist you.
            </p>
          </Container>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 bg-[#f8f8fa]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Office details */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Head Office</h3>
                  <div className="mt-4 flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <div className="p-3 rounded-xl bg-purple-100 text-[#5b176e] shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-gray-900 block text-base mb-1">New Delhi Office</span>
                      Plot No. 45, Okhla Industrial Estate, Phase III, New Delhi - 110020, India
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Factory & Works</h3>
                  <div className="mt-4 flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <div className="p-3 rounded-xl bg-purple-100 text-[#5b176e] shrink-0">
                      <Factory className="w-6 h-6" />
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-gray-900 block text-base mb-1">Gurugram Manufacturing Plant</span>
                      Sector 8, IMT Manesar, Gurugram, Haryana - 122050, India
                    </div>
                  </div>
                </div>

                {/* Direct Contact */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#5b176e] to-[#461056] text-white space-y-4 shadow-xl">
                  <h4 className="text-lg font-bold">Direct Channels</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-5 h-5 text-purple-300" />
                    <span>+91 98765 43210 / +91 98765 43211</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-5 h-5 text-purple-300" />
                    <span>info@synergypuf.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-purple-300" />
                    <span>Mon - Sat: 9:00 AM - 6:30 PM</span>
                  </div>
                </div>

                {/* Google Maps Placeholder */}
                <div className="rounded-2xl bg-gray-200 h-48 w-full flex items-center justify-center text-gray-500 font-semibold text-sm border border-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#5b176e]" />
                    <span>Interactive Map Location (IMT Manesar Works)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Direct Message</h3>
                  <ContactForm />
                </div>
              </div>

            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
