import { redisClient } from "@src/app.js";
import { plaidAccessToken } from "@src/db/schema.js";
import db from "@src/db/setup.js";
import { plaidClient } from "@src/config/plaidClient.js";
import AppError from "@src/shared/errors/appError.js";
import { ERROR_CONFIG } from "@src/shared/errors/errorConfig.js";
import { ERROR_MESSAGES } from "@src/shared/errors/errorMessage.js";
import { logger } from "@src/shared/logger.js";
import { StatusCodes } from "http-status-codes";
import {
  CountryCode,
  ItemPublicTokenExchangeRequest,
  LinkTokenCreateRequest,
  Products,
} from "plaid";
import { DEFAULT_RECURRING_TRANSACTION_LIMIT } from "@src/shared/constants/transaction.js";

const DEFAULT_TTL = 3600;

export class PlaidGateway {
  public createPublicLinkToken = async (userId: string) => {
    try {
    const countryCode = CountryCode["Ca"]; 
    const request: LinkTokenCreateRequest = {
      user: {
        client_user_id: userId
      },
      client_name: "cancelme",
      transactions: {
        days_requested: DEFAULT_RECURRING_TRANSACTION_LIMIT,
      },
      products: [Products.Transactions], 
      country_codes: [countryCode],
      language: "en",
    };
    
      const response = await plaidClient.linkTokenCreate(request);    
      // poor error handling
      if(response.status != StatusCodes.OK) {
          throw new AppError({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ERROR_MESSAGES.PLAID.LINK_TOKEN_FAILED,
            type: ERROR_CONFIG.PLAID.LINK_TOKEN_FAILED,
            logging: true
          })
      }
      
      const linkToken = response.data.link_token;
      await this.saveLinkToCache(linkToken, userId);
    } catch (error) {
      logger.error("Failed to create public link token", {
        label: "PLAID",
        userId: userId,
        error: error.message
        });
    }
  };

  private exchangePublicToAccessToken = async (
    publicToken: string,
    userId: string,
  ) => {
    try { 
      const request: ItemPublicTokenExchangeRequest = {
        public_token: publicToken,
      };
      const response = await plaidClient.itemPublicTokenExchange(request);
      const accessToken = response.data.access_token;
      await db.insert(plaidAccessToken).values({
        userId,
        itemId: response.data.item_id,
        accessToken,
      });
    } catch (error) {
      logger.error("Failed to exchange public token into an access token", {
        error: error instanceof Error ? error.message : "Unknown error",
        label: "PLAID",
      });
      throw new AppError({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ERROR_MESSAGES.PLAID.EXCHANGE_TOKEN_FAILED,
        type: ERROR_CONFIG.PLAID.EXCHANGE_TOKEN_FAILED,
      });
    }
  };
  private saveLinkToCache = async (linkToken: string, userId: string) => {
    try {
      await redisClient.setEx(
        `linkToken:${userId}`,
        DEFAULT_TTL,
        linkToken
      );
      logger.info("Link token saved to cache", {
        label: "PLAID",
        userId: userId,
      });
    } catch (error) {
      logger.error("Failed to save link token to cache", {
        label: "PLAID",
        userId: userId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public getTokenFromCache = async (
    userId: string,
  ) => {
    try {
      const cacheKey = `linkToken:${userId}`;
      const cachedData = await redisClient.get(cacheKey); 
      if (cachedData) {
        return cachedData
      }
    } catch (error) {
      logger.error("Failed to retrieve link token from cache", {
        label: "PLAID",
        userId: userId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public async exchangeToken(
    publicToken: string,
    userId: string,
  ) {
    return this.exchangePublicToAccessToken(publicToken, userId);
  }
}
