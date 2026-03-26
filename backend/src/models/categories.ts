import { z } from "zod";

// Base category schema
const categoryBase = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Category name must be at most 100 characters"),
  description: z
    .string()
    .optional()
    .nullable(),
  icon: z
    .string()
    .optional()
    .nullable(),
});

// Schema for creating a category (POST)
export const createCategorySchema = categoryBase;

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

// Schema for updating a category (PATCH)
export const updateCategorySchema = categoryBase.partial();

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

// Full category schema (database record)
export const categorySchema = categoryBase.extend({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Category = z.infer<typeof categorySchema>;
