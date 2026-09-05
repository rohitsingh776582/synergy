import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import Container from "@/components/Container";
import { blogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Engineering Blog | Synergy PUF Insulation Insights",
  description: "Read technical articles on PUF foam density, cold room panel thickness selection, and industrial roof insulation.",
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50/60 via-white to-gray-50 py-16 text-center border-b border-gray-100">
          <Container>
            <span className="rounded-full bg-purple-100 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#5b176e]">
              Technical Knowledge Hub
            </span>
            <h1 data-lines-reveal className="mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight leading-[1.12]">
              Insulation Engineering <br />
              <span className="text-[#5b176e]">Blogs & Guides</span>
            </h1>
            <p data-fade-in data-delay="0.15" className="mt-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Expert insights, thermal calculation guides, and maintenance best practices for polyurethane sandwich panels.
            </p>
          </Container>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-[#f8f8fa]">
          <Container>
            <SectionHeading
              title="Latest Articles & Insights"
              subtitle="Written by our senior thermal insulation engineers."
            />

            <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {blogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          </Container>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
