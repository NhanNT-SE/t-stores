// import { NextFunction, Request, Response } from "express";
// import { UnauthorizedError } from "../errors";
// const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (!req.currentUser) {
//       throw new UnauthorizedError();
//     }
//     next();
//   } catch (error) {
//     next(error)
//   }
// };
// export { requireAuth };

import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import { JwtHelper, RedisHelper } from '../helpers';
import { CurrentUser } from '..';
export const requireAuth = async (scope?: string) => {
  return async function runAuthenticationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (scope === 'public') {
      next();
    } else {
      try {
        if (!process.env.COOKIE_ACCESS_TOKEN) {
          throw new UnauthorizedError();
        }
        const accessToken = req.cookies[process.env.COOKIE_ACCESS_TOKEN];
        if (!accessToken) {
          throw new UnauthorizedError();
        }
        const decoded = JwtHelper.verifyToken(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET!
        ) as CurrentUser;
        if (!req.redisClient) {
          throw new Error('Cannot access redis client before connecting');
        }
        const tokenRedis = await new RedisHelper(req.redisClient).getAsync(decoded.id);
        if (!tokenRedis || tokenRedis !== accessToken) {
          return next();
        }
        req.currentUser = decoded;
        return next();
      } catch (error) {
        next(error);
      }
    }
  };
};
