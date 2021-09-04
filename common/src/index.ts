import { RedisClient } from 'redis';
import { CurrentUser } from './types';
export * from './errors';
export * from './helpers';
export * from './middleware';
export * from './types';
export * from './events';

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
      redisClient?: RedisClient;
    }
  }
}
