import jwt from "jsonwebtoken";
import { ExpireTokenError } from "../errors/expire-token-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

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
    const token = await jwt.sign(userData, secretSignature, {
      algorithm: "HS256",
      expiresIn: tokenLife,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

const verifyToken = async (token: string, secretKey: string) => {
  try {
    const verify = await jwt.verify(token, secretKey);
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
