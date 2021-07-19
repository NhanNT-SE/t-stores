import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { verifyToken } from "../helpers/jwt-helper";

interface ICurrentUser {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: ICurrentUser;
    }
  }
}
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      throw new UnauthorizedError();
    }
    const bearer = bearerHeader.split(" ");
    const TOKEN_FROM_CLIENT = bearer[1];
    if (TOKEN_FROM_CLIENT) {
      const decoded = (await verifyToken(
        TOKEN_FROM_CLIENT,
        CONFIG.ACCESS_TOKEN_SECRET!
      )) as ICurrentUser;
      req.currentUser = { id: decoded.id, role: decoded.role };
      return next();
    }
    throw new UnauthorizedError();
  } catch (err) {
    next(err);
  }
};
export { requireAuth };
