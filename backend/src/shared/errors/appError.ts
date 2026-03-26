import { StatusCodes } from "http-status-codes";
import { ERROR_CONFIG } from "./errorConfig";

export default class AppError extends Error {
  public readonly code: StatusCodes | undefined;
  public readonly logging: boolean;
  public readonly type: string;

  constructor(params?: {
    code?: StatusCodes;
    message?: string;
    logging?: boolean;
    type?: string;
  }) {
    const { code, message, logging, type } = params || {};

    super(message || "Bad request");
    this.code = code;
    this.logging = logging || false;
    this.type = type || ERROR_CONFIG.SYSTEM.SERVER_ERROR;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}