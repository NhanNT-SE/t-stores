import { NextFunction, Request, Response } from "express";
import { JwtHelper, redisHelper } from "../helpers";
import { ICurrentUser } from "../interfaces/current-user";

export const currentUser = async (
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
    const decoded = JwtHelper.verifyToken(
      TOKEN_FROM_CLIENT,
      process.env.ACCESS_TOKEN_SECRET!
    ) as ICurrentUser;
    console.log("before get redis value");
    redisHelper.client.get("123456", (err, reply) => {
      if (err) {
        console.log(err);
      }
      if (reply) {
        console.log(reply);
      }
    });
    req.currentUser = decoded;
    return next();
  } catch (error) {
    next(error);
  }
};
