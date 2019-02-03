import redis, { RedisClient } from "redis";
import { promisify } from "util";
import { ICachedData, ICache } from "./ICache";

export default class RedisCacheManager implements ICache {
  mainkey: string;
  client: RedisClient;
  hget: (arg1: string, arg2: string) => Promise<string>;
  hgetall: (arg1: string) => Promise<{ [key: string]: string }>;
  hlen: (arg1: string) => Promise<number>;
  hscan: (key: string, cursor: string, arg1: string, arg2: number) => Promise<[string, string[]]>;

  constructor(mainkey: string, clientsOption?: any) {
    this.mainkey = mainkey;
    this.client = redis.createClient(clientsOption);
    this.client.on("error", err => {
      console.log(`Error ${err}`);
    });
    this.hget = promisify(this.client.hget).bind(this.client);
    this.hgetall = promisify(this.client.hgetall).bind(this.client);
    this.hlen = promisify(this.client.hlen).bind(this.client);
    this.hscan = promisify(this.client.hscan).bind(this.client);
  }

  batchSet(dataset: ICachedData) {
    // TODO: remove stringify, could be done easily if we're sure the object is flat (no sub-object)
    Object.keys(dataset).forEach(key => {
      this.client.hset(this.mainkey, key, JSON.stringify(dataset[key]));
    });
  }

  set(key: string, data: any) {
    this.client.hset(this.mainkey, key, JSON.stringify(data));
  }

  async get(key: string) {
    // TODO: remove parse, see above
    const tmp = JSON.parse(await this.hget(this.mainkey, key));
    return tmp;
  }

  // eslint-disable-next-line class-methods-use-this
  save() {
    // noop
  }

  // eslint-disable-next-line class-methods-use-this
  read() {
    // noop
  }

  close() {
    this.client.quit();
  }

  async getAll() {
    // TODO: remove parse, this is a terrible way of doing it, see above
    const data = await this.hgetall(this.mainkey);
    // eslint-disable-next-line no-return-assign
    Object.keys(data).map(key => (data[key] = JSON.parse(data[key])));
    return data;
  }

  async iterate(gapSize: number, callback: (err: string | null, data: any) => void) {
    const len = await this.hlen(this.mainkey);
    let cursor = "0";

    for (let i = 0; i < len; i += gapSize) {
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
