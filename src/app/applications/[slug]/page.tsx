import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Container from "@/components/Container";
import { applications } from "@/data/applications";
import { Check, ArrowRight, Layers } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return applications.map((app) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const application = applications.find((a) => a.slug === slug);

  if (!application) {
    return { title: "Application Not Found | Synergy PUF" };
  }

  return {
    title: `${application.title} Insulation | Synergy PUF Solutions`,
    description: application.shortDescription,
  };
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { slug } = await params;
  const application = applications.find((a) => a.slug === slug);

  if (!application) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <TopBar />
      <Navbar />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-12 border-b border-gray-100">
          <Container>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#5b176e]">Home</Link>
              <span>/</span>
              <Link href="/applications" className="hover:text-[#5b176e]">Applications</Link>
              <span>/</span>
              <span className="text-[#5b176e]">{application.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-[#5b176e]">
                  {application.category}
                </span>
                <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                  {application.title}
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                  {application.description}
                </p>

                <div className="mt-8">
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 rounded-full bg-[#5b176e] px-7 py-3.5 text-base font-bold text-white shadow-lg hover:bg-[#461056] transition-all hover:scale-105"
                  >
                    <span>Request Application Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-900 shadow-2xl border border-gray-200">
                  <Image
                    src={application.image}
                    alt={application.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Benefits & Recommended Panels */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Key Engineering Benefits</h2>
                <div className="space-y-4">
                  {application.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                      <div className="p-1 rounded-full bg-[#5b176e] text-white mt-0.5">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-gray-800 font-semibold text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-[#f8f8fa] p-8 border border-gray-200">
                  <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                    <div className="p-2.5 rounded-xl bg-purple-100 text-[#5b176e]">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Recommended Panel Specifications</h3>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {application.recommendedPanels.map((rec, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700 font-bold text-sm sm:text-base">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#5b176e]" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
