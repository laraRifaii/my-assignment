'use client';
import { Product } from "@/schemas/productSchema";
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white w-64 rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <h1 className="text-lg font-semibold text-gray-800 mb-2">
        {product.name}
      </h1>
      <p className="text-xl font-bold text-blue-600">${product.price}</p>
      <p className="text-l">{product.description}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Add to Cart
      </button>
    </div>
  );
}
