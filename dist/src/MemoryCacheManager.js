"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryCacheManager {
    constructor() {
        this.data = {};
    }
    batchSet(dataset) {
        // eslint-disable-next-line no-return-assign
        Object.keys(dataset).forEach((key) => (this.data[key] = dataset[key]));
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
    // tslint:disable-next-line:no-empty
    save() { }
    // tslint:disable-next-line:no-empty
    close() { }
    // TODO: implement this by accounting for gap/count
    async iterate(gapSize, callback, count) {
        callback(null, this.data);
    }
    async getAll() {
        return this.data;
    }
}
exports.default = MemoryCacheManager;
