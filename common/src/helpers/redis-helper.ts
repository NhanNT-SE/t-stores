import { RedisClient } from 'redis';

export class RedisHelper {
  protected client: RedisClient;
  constructor(client: RedisClient) {
    this.client = client;
  }
  delAsync(key: string) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, numKey) => {
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
  }
  getAsync(key: string) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          if (reply) {
            resolve(reply);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  setAsync(key: string, value: string, duration: number) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, reply) => {
        if (err) {
          reject(err);
        } else if (reply) {
          resolve(reply);
        }
      });
    });
  }
}