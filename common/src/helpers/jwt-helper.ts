import jwt from "jsonwebtoken";
import { ExpireTokenError, UnauthorizedError } from "../errors";

const generateToken = async (
  user: any,
  secretSignature: string,
  tokenLife: string
) => {
  try {
    const userData = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(userData, secretSignature, {
      expiresIn: tokenLife,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyToken = (token: string, secretKey: string) => {
  try {
    const verify = jwt.verify(token, secretKey);
    return verify;
  } catch (error) {
    if (error.message === "jwt expired") {
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
export { verifyToken, generateToken };
