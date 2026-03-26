import { auth } from "@src/lib/auth.js";
import { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { ERROR_CONFIG } from "@src/shared/errors/errorConfig.js";
import { ERROR_MESSAGES } from "@src/shared/errors/errorMessage.js";
import { Middleware } from "../../types/express.js";

export async function checkUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers as Record<string, string>),
  });
  if (session?.user.id) {
    req.user = session.user;
  }
  next();
}

export function isAuthenticated(): Middleware {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({
        error: {
          message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
          type: ERROR_CONFIG.AUTH.UNAUTHORIZED,
          code: 401,
          success: false,
        },
      });
      return;
    }
    next();
  };
}
