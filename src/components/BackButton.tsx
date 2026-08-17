"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className="inline-flex items-center gap-2.5 text-sm font-medium text-gray-700 hover:text-[#5b176e] bg-white border border-gray-200 shadow-sm px-4.5 py-2.5 rounded-none transition-all hover:-translate-x-1.5 hover:border-[#5b176e]/40 hover:shadow-md cursor-pointer mb-6 group"
    >
      <ArrowLeft className="w-4 h-4 text-[#5b176e] transition-transform group-hover:-translate-x-1" />
      <span>Back to Previous Page</span>
    </button>
  );
}
