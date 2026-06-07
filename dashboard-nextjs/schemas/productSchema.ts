import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Product name is required").max(100, "Name too long"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().max(500, "Description too long").optional(),
  status: z.enum(["In Stock", "Out of Stock"]).default("In Stock"),
});

export const createProductSchema = ProductSchema.omit({ id: true });

export const ProductsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ProductSchema),
});
export const CreateProductResponseSchema = z.object({
  success: z.boolean(),
  data: createProductSchema,
});
export const updatedProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Name too long"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().max(500, "Description too long").optional(),
  status: z.enum(["In Stock", "Out of Stock"]).default("In Stock"),
});
export const UpdateProductResponseSchema = z.object({
  success: z.boolean(),
  data: ProductSchema,
});
export type Product = z.infer<typeof ProductSchema>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type CreateProductResponse = z.infer<typeof CreateProductResponseSchema>;
export type createProduct = z.infer<typeof createProductSchema>;
export type UpdateProductResponse = z.infer<typeof UpdateProductResponseSchema>;
export type updatedProduct = z.infer<typeof updatedProductSchema>;
