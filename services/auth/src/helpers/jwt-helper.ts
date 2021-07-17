import jwt from "jsonwebtoken";
import { ExpireTokenError } from "../errors/expire-token-error.js";
import { UnauthorizedError } from "../errors/unauthorized-error.js";

const verifyToken = async (token: string, secretKey: string) => {
  try {
    const verify = await jwt.verify(token, secretKey);
    return verify;
  } catch (error) {
    const message = error.message;
    if (message === "jwt expired") {
      const overdueDays = getOverdueDays(error.expiredAt);
      throw new ExpireTokenError(overdueDays + "");
    }
    throw new UnauthorizedError();
  }
};

const getOverdueDays = (dateExpired: Date) => {
  const date = new Date();
  const diffTime = Math.abs(<any>date - <any>dateExpired);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
export { verifyToken };
