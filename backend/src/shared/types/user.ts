import { z } from "zod";

// Base user schema with common fields
const userBase = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .nullable(),
});

// Schema for creating a user (POST)
export const createUserSchema = userBase.extend({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// Schema for updating a user (PATCH)
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be at most 255 characters")
    .optional(),
  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .nullable(),
  emailVerified: z
    .boolean()
    .optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// Full user schema (database record)
export const userSchema = userBase.extend({
  id: z.string(),
  emailVerified: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;
