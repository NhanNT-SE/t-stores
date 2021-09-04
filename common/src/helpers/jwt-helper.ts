import jwt from 'jsonwebtoken';
import { ExpireTokenError, UnauthorizedError } from '../errors';
import { CurrentUser } from '..';

const generateToken = (user: CurrentUser, secretSignature: string, tokenLife: string) => {
  try {
    const token = jwt.sign(user, secretSignature, {
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
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      const overdueDays = getOverdueDays(error.expiredAt);
      if (overdueDays > 24) {
        throw new UnauthorizedError();
      }
      throw new ExpireTokenError(overdueDays + '');
    }
    throw new UnauthorizedError();
  }
};

const getOverdueDays = (dateExpired: Date) => {
  const date = new Date();
  const diffTime = Math.abs(<any>date - <any>dateExpired);
  // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  return diffHours;
};
export const JwtHelper = {
  generateToken,
  verifyToken,
};
