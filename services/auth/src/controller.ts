import { NextFunction, Request, Response } from "express";
import { CustomError } from "./errors/custom-error";
import { NotFoundError } from "./errors/not-found-error";
import { UnauthorizedError } from "./errors/unauthorized-error";
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // throw new NotFoundError();
    throw new UnauthorizedError();
    res.send("Sign in");
  } catch (error) {
    next(error);
  }
};

export { signIn };
