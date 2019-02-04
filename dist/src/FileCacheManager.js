"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FileCacheManager {
    constructor(filename) {
        this.filename = filename;
        this.data = this.read();
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
    save() {
        fs_1.default.writeFileSync(this.filename, JSON.stringify(this.data));
    }
    read() {
        if (!fs_1.default.existsSync(this.filename)) {
            fs_1.default.writeFileSync(this.filename, JSON.stringify({}));
        }
        return JSON.parse(fs_1.default.readFileSync(this.filename).toString());
    }
    // tslint:disable-next-line:no-empty
    close() { }
    // TODO: implement this by accounting for gap/count
    async iterate(gapSize, callback, count) {
        callback(null, this.data);
    }
}
exports.FileCacheManager = FileCacheManager;
