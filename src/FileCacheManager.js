import fs from 'fs';

export default class FileCacheManager {
  constructor(filename) {
    this.filename = filename;
    this.data = this.read();
  }

  batchSet(dataset) {
    // eslint-disable-next-line no-return-assign
    Object.keys(dataset).forEach(key => (this.data[key] = dataset[key]));
  }

  set(key, data) {
    this.data[key] = data;
    if (data === null) {
      delete this.data[key];
    }
  }

  get(key) {
    return this.data[key];
  }

  save() {
    fs.writeFileSync(this.filename, JSON.stringify(this.data));
  }

  read() {
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, JSON.stringify({}));
    }
    return JSON.parse(fs.readFileSync(this.filename));
  }

  async getAll() {
    return this.data;
  }
}
