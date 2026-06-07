"use client";
import ProductCard from "@/components/products/productCard";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import { createProduct, getProducts } from "@/services/productService";
import { Suspense, useEffect, useMemo, useState } from "react";
import EmptyState from "@/components/states/Empty";
import { Product } from "@/schemas/productSchema";
import SearchBar from "@/components/products/SearchBar";
import { FaPlus } from "react-icons/fa";
import ProductForm from "@/components/products/productForm";
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalIsOpen = (value: boolean) => {
    setIsModalOpen(value);
  };
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const products = await getProducts();
        setProducts(products.data);
        console.log(products);
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

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }
  if (products.length === 0) {
    return <EmptyState message="No products found" />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-6">Products</h1>
          <button
            className="p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 flex items-center"
            onClick={() => modalIsOpen(true)}
          >
            <FaPlus className="mr-2" />
            Add Product
          </button>
        </div>
        <SearchBar value={search} onChange={setSearch} />
        {filteredProducts.length === 0 ? (
          <EmptyState message="No products found" />
        ) : (
          <div className="flex gap-5 justify-between flex-wrap">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onUpdated={(updated) =>
                  setProducts((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p)),
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <ProductForm
          mode="create"
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            await createProduct(data);

            const updated = await getProducts();
            setProducts(updated.data);
            setIsModalOpen(false);
          }}
        />
      )}
    </Suspense>
  );
}
