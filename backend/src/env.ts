import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    PLAID_CLIENT_SANDBOX_ID: z.string().min(1),
    PLAID_CLIENT_SANDBOX_SECRET: z.string().min(1),
    REDIS_CLIENT_URL: z.string(),
  },
  runtimeEnv: process.env,
});
