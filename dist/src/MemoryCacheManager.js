"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryCacheManager {
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
    save() { }
    close() { }
    // TODO: implement this
    iterate() { }
    async getAll() {
        return this.data;
    }
}
exports.default = MemoryCacheManager;
