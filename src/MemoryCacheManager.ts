import { ICache, ICachedData } from "./ICache";

export default class MemoryCacheManager implements ICache {
  public data: ICachedData;
  constructor() {
    this.data = {};
  }

  public batchSet(dataset: ICachedData) {
    // eslint-disable-next-line no-return-assign
    Object.keys(dataset).forEach((key) => (this.data[key] = dataset[key]));
  }

  public set(key: string, data: any) {
    this.data[key] = data;
    if (data === null) {
      delete this.data[key];
    }
  }

  public get(key: string) {
    return this.data[key];
  }

  // tslint:disable-next-line:no-empty
  public save() {}

  // tslint:disable-next-line:no-empty
  public close() {}

  // TODO: implement this by accounting for gap/count
  public async iterate(
    gapSize: number,
    callback: (err: string | null, data: any) => void,
    count?: number,
  ) {
    callback(null, this.data);
  }

  public async getAll() {
    return this.data;
  }
}
