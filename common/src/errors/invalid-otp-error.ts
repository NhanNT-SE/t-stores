import { BaseError } from "./base-error";

export class InvalidOTPError extends BaseError {
  statusCode = 400;
  constructor() {
    super("Invalid OTP Token");
    Object.setPrototypeOf(this, InvalidOTPError.prototype);
  }
  serializeErrors() {
    return [{ message: "Invalid OTP Token" }];
  }
}
