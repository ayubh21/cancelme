import { ONBOARDING_STEPS } from "@src/shared/constants/onboarding.js";
import { Router } from "express";

export const onboardingRoutes = Router();

onboardingRoutes.get("/onboarding", (_req, res) => {
  res.status(200).json({
    steps: ONBOARDING_STEPS,
  });
});
