export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "create-account",
    title: "Create account",
    description: "Sign up and confirm your session works.",
    status: "todo",
  },
  {
    id: "sign-in",
    title: "Sign in",
    description: "Log in and verify protected routes return 200.",
    status: "todo",
  },
  {
    id: "env-check",
    title: "Validate env",
    description: "Confirm Plaid keys and app URL are set.",
    status: "todo",
  },
  {
    id: "create-link-token",
    title: "Create link token",
    description: "Request a link token from your backend.",
    status: "todo",
  },
  {
    id: "connect-bank",
    title: "Connect bank",
    description: "Complete Plaid Link in sandbox mode.",
    status: "todo",
  },
  {
    id: "exchange-token",
    title: "Exchange token",
    description: "Exchange public token and persist access token.",
    status: "todo",
  },
  {
    id: "fetch-transactions",
    title: "Fetch transactions",
    description: "Run one transactions sync and inspect response.",
    status: "todo",
  },
];
