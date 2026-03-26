import { z } from "zod";

// Base subscription schema with common fields
const subscriptionBase = z.object({
  subscriptionType: z
    .string()
    .min(1, "Subscription type is required")
    .max(50, "Subscription type must be at most 50 characters"),
  status: z
    .enum(["active", "paused", "cancelled", "expired"])
    .default("active"),
  price: z
    .string()
    .or(z.number())
    .optional()
    .transform((val) => (val ? String(val) : undefined)),
  currency: z
    .string()
    .length(3, "Currency must be exactly 3 characters")
    .default("USD")
    .transform((val) => val.toUpperCase()),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  renewalDate: z.coerce.date().optional().nullable(),
  autoRenew: z.boolean().default(true),
  userId: z.string()
});

// Schema for creating a subscription (POST)
export const createSubscriptionSchema = subscriptionBase.extend({
  categoryId: z.string().min(1, "Category ID is required"),
});

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;

// Schema for updating a subscription (PATCH)
export const updateSubscriptionSchema = subscriptionBase.partial().extend({
  status: z
    .enum(["active", "paused", "cancelled", "expired"])
    .optional(),
});

export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;

// Full subscription schema (database record)
export const subscriptionSchema = subscriptionBase.extend({
  id: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Subscription = z.infer<typeof subscriptionSchema>;
