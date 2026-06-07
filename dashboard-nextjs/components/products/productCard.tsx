'use client';
type ProductCardProps ={
  product: Product;
  onUpdated: (updated: Product)=> void;
}
import { Product } from "@/schemas/productSchema";
import { useState } from "react";
import ProductForm from "./productForm";
import { updateProduct } from "@/services/productService";
import { FaPen } from "react-icons/fa";
export default function ProductCard({ product, onUpdated }: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
   <>
      <div className="border rounded-xl p-4 flex flex-col gap-2 w-72 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">{product.name}</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition"
          >
            <FaPen size={13} />
          </button>
        </div>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-gray-900">${product.price}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            product.status === "In Stock"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {product.status}
          </span>
        </div>
      </div>

      {isEditing && (
        <ProductForm
          mode="edit"
          initialData={product}
          onClose={() => setIsEditing(false)}
          onSubmit={async (data) => {
            const updated = await updateProduct(product.id, data);
            onUpdated(updated.data);
          }}
        />
      )}
    </>
  
  );
}
