import { env } from "@src/env.js";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const plaidConfig = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": env.PLAID_CLIENT_SANDBOX_ID,
      "PLAID-SECRET": env.PLAID_CLIENT_SANDBOX_SECRET,
    },
  },
});

export const plaidClient = new PlaidApi(plaidConfig);
