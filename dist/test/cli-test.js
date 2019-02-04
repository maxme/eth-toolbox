"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const config_1 = __importDefault(require("../config"));
const index_1 = __importDefault(require("../src/index"));
const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(`https://mainnet.infura.io/v3/${config_1.default.INFURA_KEY}`));
async function main() {
    // CK: 0x06012c8cf97bead5deae237070f9587f8e7a266d - start at block 4604731
    // fizzy: 0xe083515D1541F2a9Fd0ca03f189F5D321C73B872
    const address = "0x06012c8cf97bead5deae237070f9587f8e7a266d";
    index_1.default.setup(web3, { chunkSize: 1000, fromBlock: 7100000, injectTimestamp: false });
    const cache = new index_1.default.cache.RedisCacheManager(address);
    // const cache = new toolbox.cache.FileCacheManager(address)
    try {
        await index_1.default.logs.getAllLogsForAddress(address, cache);
        await cache.iterate(2, console.log, 10);
    }
    catch (error) {
        console.log(error);
    }
    cache.close();
}
main();
