"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../src/index"));
async function main() {
    // CK: 0x06012c8cf97bead5deae237070f9587f8e7a266d
    const address = "0x06012c8cf97bead5deae237070f9587f8e7a266d";
    const cache = new index_1.default.cache.RedisCacheManager(address);
    await cache.iterate(100000, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        if (res) {
            console.log(Object.keys(res).length);
        }
    });
}
main();
