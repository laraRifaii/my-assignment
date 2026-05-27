import { ProductsResponse , ProductsResponseSchema,Product} from "@/schemas/productSchema";
const API_URL =  process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<ProductsResponse> {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    const validateData = ProductsResponseSchema.parse(data);
    console.log(validateData.data);
    return validateData;
}

export async function getProductById(id: number): Promise<ProductsResponse>{
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }
    const data = await response.json();

    const validateData = ProductsResponseSchema.parse(data);
    return validateData;
}

export async function createProduct(product: Product): Promise<ProductsResponse> {
    const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error("Failed to create product");
    }
    const data = await response.json();
    const validateData = ProductsResponseSchema.parse(data);
    return validateData;
}

export async function updateProduct(id: number, product: Product): Promise<ProductsResponse> {
    const response = await fetch(`${API_URL}/api/products/${id}/${product.status}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error("Failed to update product");
    }
    const data = await response.json();

    const validateData = ProductsResponseSchema.parse(data);
    return validateData;
}
