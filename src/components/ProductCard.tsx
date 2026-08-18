import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col justify-between overflow-hidden bg-white border border-gray-200/80 transition-all duration-300">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
          />
          <span className="absolute top-4 left-4 bg-[#5b176e] px-3.5 py-1 text-xs font-bold text-white ">
            {product.category}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-normal text-gray-900 group-hover:text-[#5b176e] transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600 font-light line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-500 font-medium">
            <div className="flex justify-between">
              <span>Thickness:</span>
              <span className="font-bold text-gray-800">{product.specifications.thickness}</span>
            </div>
            <div className="flex justify-between">
              <span>Density:</span>
              <span className="font-bold text-gray-800">{product.specifications.density}</span>
            </div>
            <div className="flex justify-between">
              <span>Facing:</span>
              <span className="font-bold text-gray-800">{product.specifications.facingMaterial}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex gap-3">
        <Link
          href={`/products/${product.slug}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gray-300 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#5b176e] hover:text-white hover:border-[#5b176e] transition-all"
        >
          <span>View Product</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/quote"
          className="bg-[#5b176e] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#461056] transition-colors"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}
