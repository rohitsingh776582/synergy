import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import Container from "@/components/Container";
import { blogs } from "@/data/blogs";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return { title: "Article Not Found | Synergy PUF" };
  }

  return {
    title: `${blog.title} | Synergy PUF Engineering Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">

      <main className="flex-1">
        <article className="py-16">
          <Container>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#5b176e] hover:underline mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all blogs</span>
            </Link>

            <span className="rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold text-[#5b176e]">
              {blog.category}
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {blog.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500 pb-8 border-b border-gray-200">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#5b176e]" />
                {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#5b176e]" />
                {blog.publishDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5b176e]" />
                {blog.readTime}
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full my-8 overflow-hidden rounded-3xl bg-gray-900 ">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Content body */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 pt-4">
              {blog.content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-3">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="text-base sm:text-lg">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </Container>
        </article>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
