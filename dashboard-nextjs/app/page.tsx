"use client";
import ProductCard from "@/components/products/productCard";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import {
  createProduct,
  getProducts,
  deleteProduct,
} from "@/services/productService";
import { Suspense, useEffect, useMemo, useState } from "react";
import EmptyState from "@/components/states/Empty";
import { Product } from "@/schemas/productSchema";
import SearchBar from "@/components/products/SearchBar";
import { FaPlus } from "react-icons/fa";
import ProductForm from "@/components/products/productForm";
import { toast } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const products = await getProducts();
        setProducts(products.data);
      } catch (err: unknown) {
        const errWithStatus = err as { status?: number };
        const errWithMessage = err as { message?: string };

        if (errWithStatus.status === 401) {
          setError("Authentication required. Please log in again.");
        } else if (errWithStatus.status === 403) {
          setError(
            "Access denied. You don't have permission to view these products.",
          );
        } else if (errWithMessage.message) {
          setError(errWithMessage.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchValue) ||
        product.id.toString().includes(searchValue) ||
        product.price.toString().includes(searchValue)
      );
    });
  }, [products, search]);

  async function handleConfirmDelete() {
    if (deleteId === null) return;
    try {
      await deleteProduct(deleteId);
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleteId(null);
    }
  }

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (products.length === 0) return <EmptyState message="No products found" />;

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 text-sm font-medium transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus size={12} />
            Add Product
          </button>
        </div>

        <SearchBar value={search} onChange={setSearch} />

        {filteredProducts.length === 0 ? (
          <EmptyState message="No products found" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onUpdated={(updated) =>
                  setProducts((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p)),
                  )
                }
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          </div>
        )}
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ProductForm
          mode="create"
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            await createProduct(data);
            const updated = await getProducts();
            setProducts(updated.data);
            toast.success("Product created successfully");
            setIsModalOpen(false);
          }}
        />
      )}
    </Suspense>
  );
}
