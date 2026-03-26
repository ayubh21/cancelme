import express from "express";
import { subscriptionRoutes } from "./subscription.js";
import { categoryRoutes } from "./category.js";
import { transactionRoutes } from "./transactions.js";
import { tokenRoutes } from "./token.js";
import { onboardingRoutes } from "./onboarding.js";

export const router = express.Router();

router.use(subscriptionRoutes);
router.use(categoryRoutes);
router.use(transactionRoutes);
router.use(tokenRoutes);
router.use(onboardingRoutes);
