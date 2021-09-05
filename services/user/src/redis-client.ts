import { createClient, RedisClient } from 'redis';

export class ClientRedis {
  private _client?: RedisClient;
  get client() {
    if (!this._client) {
      throw new Error('Cannot access redis client before connecting');
    }
    return this._client;
  }
  connect(host: string, port: number) {
    if (!this._client) {
      this._client = createClient({ host, port });
      return new Promise<void>((resolve, reject) => {
        this.client.on('connect', () => {
          console.log('Redis connected');
          resolve();
        });
        this.client.on('error', (err) => {
          reject(err);
        });
      });
    }
  }
}

export const redisClient = new ClientRedis();
