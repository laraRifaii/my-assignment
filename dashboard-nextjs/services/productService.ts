import {
  ProductsResponse,
  ProductsResponseSchema,
  // Product,
  CreateProductResponseSchema,
  updatedProduct,
  UpdateProductResponseSchema,
} from "@/schemas/productSchema";
import type {
  createProduct,
  CreateProductResponse,
  UpdateProductResponse,
} from "@/schemas/productSchema";
import api from "@/lib/api";
import axios from "axios";

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const response = await api.get("/products");
    const validatedData = ProductsResponseSchema.parse(response.data);

    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        message: error.response?.data?.message ?? "Request failed",
      };
    }
    throw error;
  }
}

export async function getProductById(id: number): Promise<ProductsResponse> {
  try {
    const response = await api.get(`/products/${id}`);

    const validatedData = ProductsResponseSchema.parse(response.data);

    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        message: error.response?.data?.message ?? "Request failed",
      };
    }
    throw error;
  }
}

export async function createProduct(
  product: createProduct,
): Promise<CreateProductResponse> {
  try {
    const response = await api.post("/products", product);

    const validatedData = CreateProductResponseSchema.parse(response.data);

    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        message: error.response?.data?.message ?? "Request failed",
      };
    }
    throw error;
  }
}

export async function updateProduct(
  id: number,
  product: updatedProduct,
): Promise<UpdateProductResponse> {
  try {
    const response = await api.put(`/products/${id}`, product);
    const validatedData = UpdateProductResponseSchema.parse(response.data);

    return validatedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        message: error.response?.data?.message ?? "Request failed",
      };
    }
    throw error;
  }
}
export async function deleteProduct(id: number): Promise<void> {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        status: error.response?.status,
        message: error.response?.data?.message ?? "Request failed",
      };
    }
    throw error;
  }
}
