import { createClient, RedisClient } from "redis";

class RedisHelper {
  private _client?: RedisClient;
  get client() {
    if (!this._client) {
      throw new Error("Cannot access redis client before connecting");
    }
    return this._client;
  }
  connect(host: string, port: number) {
    this._client = createClient({ host, port });
    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Redis connected");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
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
      this.client.set(key, value, "EX", duration, (err, reply) => {
        if (err) {
          reject(err);
        } else if (reply) {
          resolve(reply);
        }
      });
    });
  }
}

export const redisHelper = new RedisHelper();
