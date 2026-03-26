import db from "@src/db/setup.js";
import { isAuthenticated } from "@src/middleware/auth.js";
import { logger } from "better-auth";
import { Router } from "express";
import { TransactionsSyncRequest } from "plaid";
import { plaidAccessToken, user } from "@src/db/schema.js";
import { eq } from "drizzle-orm";
import AppError from "@src/shared/errors/appError.js";
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES } from "@src/shared/errors/errorMessage.js";
import { ERROR_CONFIG } from "@src/shared/errors/errorConfig.js";
import { plaidClient } from "@src/config/plaidClient.js";

export const transactionRoutes = Router();

transactionRoutes.get(
  "/transactions",
  isAuthenticated(),
  async (req, res, next) => {
    try {
      const [result] = await db
        .select()
        .from(plaidAccessToken)
        .where(eq(user.id, req.user.id));

      if (!result) {
        throw new AppError({
          code: StatusCodes.NOT_FOUND,
          message: ERROR_MESSAGES.PLAID.ACCESS_TOKEN_NOT_FOUND,
          type: ERROR_CONFIG.PLAID.ACCESS_TOKEN_NOT_FOUND,
          logging: true
        });
      }

      if (!result.isActive) {
        throw new AppError({
          code: StatusCodes.NOT_FOUND,
          message: ERROR_MESSAGES.PLAID.ACCESS_TOKEN_NOT_FOUND,
          type: ERROR_CONFIG.PLAID.ACCESS_TOKEN_NOT_FOUND,
        });
      }
      const request: TransactionsSyncRequest = {
        access_token: result.accessToken,
        cursor: result.updatedAt.toISOString(),
      };
      const response = await plaidClient.transactionsSync(request);
      logger.info("transactions succesfully retrieved");

      res.json({
        data: response.data,
        success: true,
      });
    } catch (error) {
      logger.error("Failed to fetch transactions", {
        label: "PLAID",
        message: error.message,
      });
      next(error);
    }
  },
);
