export default class MemoryCacheManager {
  constructor() {
    this.data = {};
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

  // eslint-disable-next-line class-methods-use-this
  save() {
    // noop
  }

  // eslint-disable-next-line class-methods-use-this
  read() {
    // noop
  }

  async getAll() {
    return this.data;
  }
}
