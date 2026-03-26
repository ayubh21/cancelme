export const ERROR_MESSAGES = {
  USER: {
    NOT_FOUND: "User not found",
    UPDATE_FAILED: "Failed to update user",
    DUPLICATE_EMAIL: "Email already associated with an existing account",
    REGISTER_FAILED: "Failed to register user",
    INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  },
  AUTH: {
    UNAUTHORIZED: "Unauthorized: Please login to continue",
    SESSION_NOT_FOUND: "Failed to get session",
    FORBIDDEN: "You do not have access to this resource",
  },
  SUBSCRIPTION: {
    NOT_FOUND: "Subscription not found",
    CREATE_FAILED: "Failed to create subscription",
    UPDATE_FAILED: "Failed to update subscription",
    DELETE_FAILED: "Failed to delete subscription",
    INVALID_STATUS: "Invalid subscription status",
    CATEGORY_NOT_FOUND: "Subscription category not found",
  },
  CATEGORY: {
    NOT_FOUND: "Category not found",
    CREATE_FAILED: "Failed to create category",
    UPDATE_FAILED: "Failed to update category",
    DELETE_FAILED: "Failed to delete category",
    DUPLICATE_NAME: "Category with this name already exists",
  },
  VALIDATION: {
    PARSE_BODY: "Invalid request data",
    REQUEST_BODY_EMPTY: "Request body is empty",
    MISSING_FIELDS: "Missing one or many required fields",
    INVALID_EMAIL: "Invalid email address",
    INVALID_DATE: "Invalid date format",
  },
  GENERIC: {
    BAD_REQUEST: "Bad request",
    SOMETHING_WRONG: "Something went wrong. Please try again.",
    SOMETHING_NOT_QUITE_RIGHT:
      "Something's not quite right. Please try again later.",
  },
  PLAID: {
    LINK_TOKEN_FAILED: "Failed to create Plaid link token",
    LINK_TOKEN_GET: "Failed to retrive link token from cache",
    EXCHANGE_TOKEN_FAILED: "Failed to exchange Plaid public token",
    AUTH_FAILED: "Plaid authentication failed",
    INVALID_REQUEST: "Invalid Plaid request",
    API_ERROR: "Plaid API error occurred",
    ACCESS_TOKEN_NOT_FOUND:"ACCESS_TOKEN_NOT_FOUND"
  },
} as const;
