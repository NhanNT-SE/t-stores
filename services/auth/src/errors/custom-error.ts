import { BaseError } from "./base-error";

export class CustomError extends BaseError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
