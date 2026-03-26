import { APIError, BetterAuthError } from "better-auth";
import { NextFunction, Request, Response } from "express";
import AppError from "@src/shared/errors/appError.js";
import { getStatusCode } from "http-status-codes";
import { ERROR_CONFIG } from "@src/shared/errors/errorConfig.js";
import { logger } from "@src/shared/logger.js";

const ERROR_MESSAGES = {
  GENERIC: {
    SOMETHING_NOT_QUITE_RIGHT: "Something went wrong. Please try again later.",
  },
};

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    const code = err.code ?? getStatusCode(err.type);
    const msg =
      typeof err.message === "string"
        ? err.message
        : JSON.stringify(err.message);
    res.status(code).json({
      error: {
        message: msg,
        type: err.type,
        code: code,
        success: false,
      },
    });
    return;
  }
  const internalMessage = ERROR_MESSAGES.GENERIC.SOMETHING_NOT_QUITE_RIGHT;
  const errorCode = ERROR_CONFIG.SYSTEM.INTERNAL_ERROR_CODE;

  if (err instanceof SyntaxError) {
    logger.error(`${errorCode} ${err.name}`, { message: err.message });
    res.status(500).json({
      error: {
        message: internalMessage,
        type: ERROR_CONFIG.SYSTEM.SERVER_ERROR,
        code: 500,
        success: false,
        errorCode,
      },
    });
    return;
  }
  if (err instanceof APIError) {
    logger.error(errorCode, {
      error: err instanceof Error ? err.message : "APIError",
    });
    res.status(500).json({
      error: {
        message: internalMessage,
        code: 500,
        success: false,
        type: ERROR_CONFIG.SYSTEM.EXTERNAL_SERVICE_ERROR,
        errorCode,
      },
    });
    return;
  }
  if (err instanceof BetterAuthError) {
    logger.error(errorCode, { error: err.message });
    res.status(500).json({
      error: {
        message: internalMessage,
        type: ERROR_CONFIG.SYSTEM.EXTERNAL_SERVICE_ERROR,
        code: 500,
        success: false,
        errorCode,
      },
    });
    return;
  }
  logger.error(errorCode, {
    stack: err instanceof Error ? err.stack : undefined,
    message: err instanceof Error ? err.message : undefined,
  });
  res.status(500).json({
    error: {
      message: internalMessage,
      type: ERROR_CONFIG.SYSTEM.SERVER_ERROR,
      code: 500,
      success: false,
      errorCode,
    },
  });
}
