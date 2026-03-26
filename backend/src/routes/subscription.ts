import { Router } from "express";
import db from "@src/db/setup.js";
import { subscription, category } from "@src/db/schema.js";
import { eq } from "drizzle-orm";
import { isAuthenticated } from "@src/middleware/auth.js";
import { logger } from "@src/shared/logger.js";
import { ERROR_MESSAGES } from "@src/shared/errors/errorMessage.js";
import AppError from "@src/shared/errors/appError.js";
import { createSubscriptionSchema } from "../models/subscriptions.js";
import { StatusCodes } from "http-status-codes";

export const subscriptionRoutes = Router();

subscriptionRoutes.get(
  "/subscriptions",
  // isAuthenticated(),
  async (req, res, next) => {
    try {
      const userSubscriptions = await db
        .select()
        .from(subscription)
        .where(eq(subscription.userId, req.user.id));

      res.status(200).json({
        data: userSubscriptions,
        success: true,
      });
    } catch (error) {
      logger.error("Failed to fetch subscriptions", {
        userId: req.user?.id,
        error: error instanceof Error ? error.message : "Unknown error",
        label: "API",
      });
      next(error);
    }
  },
);

subscriptionRoutes.post(
  "/subscription",
  isAuthenticated(),
  async (req, res, next) => {
    try {
      const validationResult = createSubscriptionSchema.safeParse(req.body);
      if (!validationResult.success) {
        throw new AppError({
          code: StatusCodes.BAD_REQUEST,
          message: ERROR_MESSAGES.VALIDATION.PARSE_BODY,
          type: "INVALID_SUBSCRIPTION_DATA",
        });
      }

      const newSubscription = await db
        .insert(subscription)
        .values({
          ...validationResult.data,
        })
        .returning();

      res.status(StatusCodes.CREATED).json({
        data: newSubscription[0],
        success: true,
      });
    } catch (error) {
      logger.error("Failed to create subscription", {
        userId: req.user?.id,
        error: error instanceof Error ? error.message : "Unknown error",
        label: "API",
      });
      next(error);
    }
  },
);
