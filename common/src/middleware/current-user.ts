import { NextFunction, Request, Response } from 'express';
import { JwtHelper, RedisHelper } from '../helpers';
import { CurrentUser } from '..';

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!process.env.COOKIE_ACCESS_TOKEN) {
      return next();
    }
    const accessToken = req.cookies[process.env.COOKIE_ACCESS_TOKEN];

    if (!accessToken) {
      return next();
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
};
