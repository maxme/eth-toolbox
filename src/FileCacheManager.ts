import fs from "fs";
import { ICache, ICachedData } from "./ICache";

export class FileCacheManager implements ICache {
  public filename: string;
  public data: ICachedData;
  constructor(filename: string) {
    this.filename = filename;
    this.data = this.read();
  }

  public batchSet(dataset: any) {
    // eslint-disable-next-line no-return-assign
    Object.keys(dataset).forEach((key: string) => (this.data[key] = dataset[key]));
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

  public save() {
    fs.writeFileSync(this.filename, JSON.stringify(this.data));
  }

  public read() {
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(this.filename).toString());
  }

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
}
