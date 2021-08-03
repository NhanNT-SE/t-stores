import { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors";
import { RoleAccount } from "../types";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }
  if (req.currentUser.role === RoleAccount.User) {
    throw new ForbiddenError();
  }
  next();
};
