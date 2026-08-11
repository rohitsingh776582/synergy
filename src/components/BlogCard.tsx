import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Blog } from "@/data/blogs";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
          />
          <span className="absolute top-4 left-4 rounded-full bg-[#5b176e] px-3.5 py-1 text-xs font-bold text-white">
            {blog.category}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {blog.publishDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#5b176e] transition-colors leading-snug">
            {blog.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#5b176e] hover:text-[#461056] group-hover:translate-x-1 transition-transform"
        >
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
