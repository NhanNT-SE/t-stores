import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors/forbidden-error";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { RoleAccount } from "../types/role-account";

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
