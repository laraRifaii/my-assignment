import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  status: z.enum(["In Stock", "Out of Stock"]).default("In Stock"),
});

export const ProductsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ProductSchema),
});

export type Product = z.infer<typeof ProductSchema>;

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;