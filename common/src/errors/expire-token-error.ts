import { BaseError } from "./base-error";

export class ExpireTokenError extends BaseError {
  statusCode = 401;
  constructor(public overdueDays: string) {
    super("Jwt expired");
    Object.setPrototypeOf(this, ExpireTokenError.prototype);
  }
  serializeErrors() {
    return [{ message: "Jwt expired", field : this.overdueDays }];
  }
}
