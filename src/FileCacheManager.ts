import fs from "fs";
import { ICachedData, ICache } from "./ICache";

export class FileCacheManager implements ICache {
  filename: string;
  data: ICachedData;
  constructor(filename: string) {
    this.filename = filename;
    this.data = this.read();
  }

  batchSet(dataset: any) {
    // eslint-disable-next-line no-return-assign
    Object.keys(dataset).forEach((key: string) => (this.data[key] = dataset[key]));
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

  save() {
    fs.writeFileSync(this.filename, JSON.stringify(this.data));
  }

  read() {
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(this.filename).toString());
  }

  close() {}

  // TODO: implement this
  iterate() {}

  async getAll() {
    return this.data;
  }
}
