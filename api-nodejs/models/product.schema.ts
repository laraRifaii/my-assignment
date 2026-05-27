import { z } from "zod";

export const productStatus = z.enum(["active", "inactive"]);

export const createProductSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  price: z
    .number()
    .positive("Price must be positive")
    .min(0.01, "Price must be greater than 0"),
  status: productStatus.optional().default("active"),
});

export const productIdParamSchema = z.object({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)), "ID must be a valid number"),
});

export const updateProductStatusSchema = z.object({
  status: productStatus,
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductIdParam = z.infer<typeof productIdParamSchema>;
export type UpdateProductStatus = z.infer<typeof updateProductStatusSchema>;
export type ProductStatus = z.infer<typeof productStatus>;
