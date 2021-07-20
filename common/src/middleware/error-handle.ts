import { NextFunction, Response } from "express";
import { Request } from "express";
import { BaseError } from "../errors/base-error";
export const errorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  const { name, errors, code } = err;
  if (name === "MongoError" && code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).send({
      errors: [{ message: "Duplicated error", field }],
    });
  }
  console.log(err);
  return res.status(500).send({
    errors: [{ message: "Internal server error" }],
  });
};