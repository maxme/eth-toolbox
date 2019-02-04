import redis, { RedisClient } from "redis";
import { promisify } from "util";
import { ICache, ICachedData } from "./ICache";

export default class RedisCacheManager implements ICache {
  public mainkey: string;
  public client: RedisClient;
  public hget: (arg1: string, arg2: string) => Promise<string>;
  public hgetall: (arg1: string) => Promise<{ [key: string]: string }>;
  public hlen: (arg1: string) => Promise<number>;
  public hscan: (
    key: string,
    cursor: string,
    arg1: string,
    arg2: number,
  ) => Promise<[string, string[]]>;

  constructor(mainkey: string, clientsOption?: any) {
    this.mainkey = mainkey;
    this.client = redis.createClient(clientsOption);
    this.client.on("error", (err) => {
      console.log(`Error ${err}`);
    });
    this.hget = promisify(this.client.hget).bind(this.client);
    this.hgetall = promisify(this.client.hgetall).bind(this.client);
    this.hlen = promisify(this.client.hlen).bind(this.client);
    this.hscan = promisify(this.client.hscan).bind(this.client);
  }

  public batchSet(dataset: ICachedData) {
    // TODO: remove stringify, could be done easily if we're sure the object is flat (no sub-object)
    Object.keys(dataset).forEach((key) => {
      this.client.hset(this.mainkey, key, JSON.stringify(dataset[key]));
    });
  }

  public set(key: string, data: any) {
    this.client.hset(this.mainkey, key, JSON.stringify(data));
  }

  public async get(key: string) {
    // TODO: remove parse, see above
    const tmp = JSON.parse(await this.hget(this.mainkey, key));
    return tmp;
  }

  // tslint:disable-next-line:no-empty
  public save() {}

  public close() {
    this.client.quit();
  }

  public async iterate(
    gapSize: number,
    callback: (err: string | null, data: any) => void,
    count?: number,
  ) {
    const len = await this.hlen(this.mainkey);
    let cursor = "0";
    if (count === undefined) {
      count = len;
    }
    gapSize = Math.min(gapSize, count);

    for (let i = 0; i < Math.min(len, count); i += gapSize) {
      try {
        const res = await this.hscan(this.mainkey, cursor, "COUNT", gapSize);
        [cursor] = res;
        const data: ICachedData = {};
        for (let j = 0; j < res[1].length; j += 2) {
          // TODO: remove parse, this is a terrible way of doing it, see above
          data[res[1][j]] = JSON.parse(res[1][j + 1]);
        }
        callback(null, data);
      } catch (e) {
        callback(e, null);
      }
    }
  }

  // Note for later: leveraging redis zset would be amazing here to
  // iterate over logs sorted by blocknumber / timestamp.
}
