import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  status: z.string(),
});

export const ProductsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(ProductSchema),
});

export type Product = z.infer<typeof ProductSchema>;

export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;