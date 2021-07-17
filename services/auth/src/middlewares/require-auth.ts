import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { verifyToken } from "../helpers/jwt-helper";

interface ICurrentUser {
  id: string;
  username: string;
  role: string;
  isMFA: boolean;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: ICurrentUser;
    }
  }
}
export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    throw new UnauthorizedError();
  }
  const bearer = bearerHeader.split(" ");
  const TOKEN_FROM_CLIENT = bearer[1];
  try {
    if (TOKEN_FROM_CLIENT) {
      const decoded = (await verifyToken(
        TOKEN_FROM_CLIENT,
        "ACCESS_TOKEN_SECRET"
      )) as ICurrentUser;
      //   const token = await Token.findOne({ owner: decoded._id });
      //   if (token.accessToken && token.accessToken === TOKEN_FROM_CLIENT) {
      //     req.user = decoded;
      //     return next();
      //   }
      req.currentUser = decoded;
      next();
      //   errorAuth("Vui lòng đăng nhập lại để tiếp tục");
    }
    throw new UnauthorizedError();
  } catch (err) {
    console.log("error in require auth", err);
    next(err);
  }
};
