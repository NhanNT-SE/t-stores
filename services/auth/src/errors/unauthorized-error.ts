import { BaseError } from "./base-error";

export class UnauthorizedError extends BaseError {
  statusCode = 401;
  constructor() {
    super("Unauthorized");
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: "Unauthorized" }];
  }
}
