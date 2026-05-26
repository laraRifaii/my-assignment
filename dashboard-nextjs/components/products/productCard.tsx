import { Products } from "../../types/Product";
export default function ProductCard({ product }: { product: Products }) {
  return (
    <div className="border rounded p-4 shadow">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">Price: ${product.price}</p>
        <p className={`mb-2 ${product.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
            Status: {product.status}</p>
    </div>
    );
}