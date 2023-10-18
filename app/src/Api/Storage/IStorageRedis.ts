export interface IStorageRedis {
  set(key: string, value: string, expireSeconds?: number): Promise<void>;

  get(key: string): Promise<string>;

  del(key: string): Promise<void>;
}
