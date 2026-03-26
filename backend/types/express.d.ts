import { auth } from "@src/lib/auth.ts";
import { User } from "@src/shared/types/user.js";
import type { NextFunction, Request, Response } from "express";
import "express-session";

declare global {
  namespace Express {
    export interface Request {
      user: typeof auth.$Infer.Session.user
    }
  }
}

export type Middleware = <_ParamsDictionary, _Body, _Query>(
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void | NextFunction> | void | NextFunction;
