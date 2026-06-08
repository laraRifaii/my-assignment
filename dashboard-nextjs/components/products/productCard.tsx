"use client";
import { Product } from "@/schemas/productSchema";
import { useState } from "react";
import ProductForm from "./productForm";
import { updateProduct } from "@/services/productService";
import { FaPen } from "react-icons/fa";
import { IoIosTrash } from "react-icons/io";
import { toast } from "react-toastify";

type ProductCardProps = {
  product: Product;
  onUpdated: (updated: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductCard({
  product,
  onUpdated,
  onDelete,
}: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 w-72 shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-semibold text-gray-900 text-base leading-snug">
            {product.name}
          </h2>
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Edit product"
            >
              <FaPen size={12} />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete product"
            >
              <IoIosTrash size={16} />
            </button>
          </div>
        </div>

 
        {product.description && (
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

       
        <div className="border-t border-gray-100" />

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              product.status === "In Stock"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
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
            setIsEditing(false);
            toast.success("Product updated successfully"); 
          }}
        />
      )}
    </>
  );
}
