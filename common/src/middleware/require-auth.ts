import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser) {
      throw new UnauthorizedError();
    }
    next();
  } catch (error) {
    next(error)
  }
};
export { requireAuth };
