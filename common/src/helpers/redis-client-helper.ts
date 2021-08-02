import { RedisClient } from "redis";

const redisDel = (client: RedisClient, key: string) => {
  return new Promise((resolve, reject) => {
    client.del(key, (err, numKey) => {
      if (err) {
        reject(err);
      } else {
        if (numKey === 1) {
          resolve(1);
        } else {
          reject(err);
        }
      }
    });
  });
};
const redisGet = (client: RedisClient, key: string) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        reject(err);
      } else if (reply) {
        resolve(reply);
      }
    });
  });
};
const redisSet = (
  client: RedisClient,
  key: string,
  value: string,
  duration: number
) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, "EX", duration, (err, reply) => {
      if (err) {
        reject(err);
      } else if (reply) {
        resolve(reply);
      }
    });
  });
};
export { redisDel, redisGet, redisSet };
