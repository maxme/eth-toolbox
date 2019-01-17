import fs from 'fs';

export default class FileCacheManager {
  constructor(filename) {
    this.filename = filename;
    this.data = this.read();
  }

  add(data) {
    // eslint-disable-next-line no-return-assign
    Object.keys(data).every(key => (this.data[key] = data[key]));
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
}
