import { NextFunction, Response } from "express";
import { Request } from "express";
import { BaseError } from "../errors/base-error";
export const errorHandle = (err: Error, req: Request, res: Response,next:NextFunction) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.log(err);
  return res.status(500).send({
    errors: [{ message: "Internal server error" }],
  });
};
