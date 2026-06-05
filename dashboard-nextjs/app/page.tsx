"use client";
import ProductCard from "@/components/products/productCard";
import Loading from "@/components/states/Loading";
import Error from "@/components/states/Error";
import { getProducts } from "@/services/service";
import { useEffect, useMemo, useState } from "react";
import EmptyState from "@/components/states/Empty";
import { Product } from "@/schemas/productSchema";
import SearchBar from "@/components/products/SearchBar";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <SearchBar value={search} onChange={setSearch} />
      {filteredProducts.length === 0 ? (
        <EmptyState message="No products found" />
      ) : (
        <div className="flex gap-5 justify-between flex-wrap">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    
    </div>
  );
}
