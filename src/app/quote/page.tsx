import type { Metadata } from "next";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Get Instant Quote | Synergy PUF Insulation Panels",
  description: "Request an instant price and technical quote for PUF wall panels, roofing sheets, cold room panels, and cleanroom enclosures.",
};

export default function QuotePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-16 text-center border-b border-gray-100">
          <Container>
            <span className="bg-purple-100 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#5b176e]">
              Commercial Proposal
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight leading-[1.12]">
              Get an Instant Technical <br />
              <span className="text-[#5b176e]">& Price Quote</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Provide your panel specifications, quantity, and project location to receive a custom commercial quotation within 2 business hours.
            </p>
          </Container>
        </section>

        {/* Quote Form Section */}
        <section className="py-20 bg-[#f8f8fa]">
          <Container>
            <QuoteForm />
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
