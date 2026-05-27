import { Products } from "@/types/Product";
const API_URL =  process.env.API_URL;

export async function getProducts(){
    const response = await fetch(`${API_URL}/api/products`);
    const data = await response.json();
    return data;
}

export async function getProductById(id: number){
    const response = await fetch(`${API_URL}/api/products/${id}`);
    const data = await response.json();
    return data;
}

export async function createProduct(product: Products) {
    const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
}

export async function updateProduct(id: number, product: Products) {
    const response = await fetch(`${API_URL}/api/products/${id}/${product.status}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
}
