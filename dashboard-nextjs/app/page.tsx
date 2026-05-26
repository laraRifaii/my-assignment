import ProductCard from "@/components/products/productCard";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Products</h1>
      <ProductCard product={{ id: 1, name: "HP Laptop", price: 50, status: "active" }} />
    </div>
  );
}
