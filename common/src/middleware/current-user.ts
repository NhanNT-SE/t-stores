import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers";
import { ICurrentUser } from "../interfaces/current-user";

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      return next();
    }
    const TOKEN_FROM_CLIENT = bearerHeader.split(" ")[1];
    const decoded = verifyToken(
      TOKEN_FROM_CLIENT,
      process.env.ACCESS_TOKEN_SECRET!
    ) as ICurrentUser;
    req.currentUser = { id: decoded.id, role: decoded.role };
  } catch (err) {}
  next();
};
