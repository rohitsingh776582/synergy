import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Container from "@/components/Container";
import { products } from "@/data/products";
import { Check, ArrowRight, ShieldCheck, Zap, Award, FileText } from "lucide-react";

import BackButton from "@/components/BackButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product Not Found | Synergy PUF" };
  }

  return {
    title: `${product.name} | Synergy PUF Specifications & Pricing`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">

      <main className="flex-1">
        {/* Breadcrumb & Hero */}
        <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-12 border-b border-gray-100">
          <Container>
            {/* Back Button with Left Arrow */}
            <BackButton />

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#5b176e]">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-[#5b176e]">Products</Link>
              <span>/</span>
              <span className="text-[#5b176e]">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="bg-purple-100 px-3.5 py-1 text-xs font-bold text-[#5b176e]">
                  {product.category}
                </span>
                <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                  {product.name}
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 bg-[#5b176e] px-7 py-3.5 text-base font-bold text-white  hover:bg-[#461056] transition-all hover:scale-105"
                  >
                    <span>Get Instant Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3.5 text-base font-semibold text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <span>Speak to Product Specialist</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900  border border-gray-200">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Specifications & Features */}
        <section className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Tech Specs */}
              <div className="lg:col-span-6">
                <div className="bg-[#f8f8fa] p-8 border border-gray-200 ">
                  <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                    <div className="p-2.5 bg-purple-100 text-[#5b176e]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Technical Specifications</h3>
                  </div>

                  <div className="mt-6 space-y-4 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-200/60">
                      <span className="font-semibold text-gray-500">Thickness Range:</span>
                      <span className="font-bold text-gray-900">{product.specifications.thickness}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200/60">
                      <span className="font-semibold text-gray-500">Core Foam Density:</span>
                      <span className="font-bold text-gray-900">{product.specifications.density}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200/60">
                      <span className="font-semibold text-gray-500">Thermal Conductivity (K-Value):</span>
                      <span className="font-bold text-gray-900">{product.specifications.thermalConductivity}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200/60">
                      <span className="font-semibold text-gray-500">Facing Metal Sheets:</span>
                      <span className="font-bold text-gray-900">{product.specifications.facingMaterial}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200/60">
                      <span className="font-semibold text-gray-500">Fire Resistance Rating:</span>
                      <span className="font-bold text-gray-900">{product.specifications.fireRating}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-gray-500">Joint Engineering:</span>
                      <span className="font-bold text-gray-900">{product.specifications.jointType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Features & Applications */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Performance Features</h3>
                  <div className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-1 bg-purple-100 text-[#5b176e] mt-0.5">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 text-sm md:text-base font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Target Sector Applications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 border border-gray-200 px-4 py-2 text-xs font-bold text-gray-800"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
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
