import { ICachedData, ICache } from "./ICache";

export default class MemoryCacheManager implements ICache {
  data: ICachedData;
  constructor() {
    this.data = {};
  }

  batchSet(dataset: ICachedData) {
    // eslint-disable-next-line no-return-assign
    Object.keys(dataset).forEach(key => (this.data[key] = dataset[key]));
  }

  set(key: string, data: any) {
    this.data[key] = data;
    if (data === null) {
      delete this.data[key];
    }
  }

  get(key: string) {
    return this.data[key];
  }

  save() {}
  close() {}

  // TODO: implement this
  iterate() {}

  async getAll() {
    return this.data;
  }
}
