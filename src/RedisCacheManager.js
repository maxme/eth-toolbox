import redis from 'redis';
import { promisify } from 'util';

export default class RedisCacheManager {
  constructor(mainkey, clientsOption) {
    this.mainkey = mainkey;
    this.client = redis.createClient(clientsOption);
    this.client.on('error', (err) => {
      console.log(`Error ${err}`);
    });
    this.hget = promisify(this.client.hget).bind(this.client);
    this.hgetall = promisify(this.client.hgetall).bind(this.client);
  }

  batchSet(dataset) {
    // TODO: remove stringify, could be done easily if we're sure the object is flat (no sub-object)
    // eslint-disable-next-line array-callback-return
    Object.keys(dataset).every((key) => {
      this.client.hset(this.mainkey, key, JSON.stringify(dataset[key]));
    });
  }

  set(key, data) {
    this.client.hset(this.mainkey, key, JSON.stringify(data));
  }

  async get(key) {
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

  // Note for later: leveraging redis zset would be amazing here to
  // iterate over logs sorted by blocknumber / timestamp.
}
