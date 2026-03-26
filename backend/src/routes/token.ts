import { plaidAccessToken } from "@src/db/schema.js";
import db from "@src/db/setup.js";
import { isAuthenticated } from "@src/middleware/auth.js";
import { PlaidGateway } from "@src/services/plaid.js";
import AppError from "@src/shared/errors/appError.js";
import { ERROR_CONFIG } from "@src/shared/errors/errorConfig.js";
import { ERROR_MESSAGES } from "@src/shared/errors/errorMessage.js";
import { logger } from "@src/shared/logger.js";
import { APIError } from "better-auth";
import { eq } from "drizzle-orm";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";



export const tokenRoutes = Router();

tokenRoutes.get("/access_token", isAuthenticated(), async (req, res, next) => {
    try {
        let [result] = await db.select().from(plaidAccessToken).where(eq(plaidAccessToken.userId, req.user.id))
        
        if(result){
           return res.json({
                accessToken: result.accessToken
            })
        }
        const gateway = new PlaidGateway();
        let cachedToken;
        cachedToken = await gateway.getTokenFromCache(req.user.id) 
        // what steps am I missing
        // am I allowed to simply create again?
        if(!cachedToken) { 
             await gateway.createPublicLinkToken(req.user.id);
             cachedToken = await gateway.getTokenFromCache(req.user.id) 
        } 
        logger.info("Link token retrieved from cache", {
          label: "PLAID",
          userId: req.user.id,
        });

        await gateway.exchangeToken(cachedToken as string, req.user.id);

         [result] = await db.select().from(plaidAccessToken).where(eq(plaidAccessToken.userId, req.user.id))
        res.json({
            accessToken: result.accessToken,
            timestamp: Date.now()  
        })
    } catch (error) {
       logger.error('failed to retrieve link token', {
            label: 'PLAID',
            message: error.message  
       }) 
       next(error)
    }
});
