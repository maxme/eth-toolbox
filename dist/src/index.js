"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileCacheManager_1 = require("./FileCacheManager");
const getLogs_1 = __importDefault(require("./getLogs"));
const RedisCacheManager_1 = __importDefault(require("./RedisCacheManager"));
function setup(web3, options) {
    if (options) {
        global.toolboxOptions = options;
    }
    global.web3 = web3;
}
function getAllLogsForAddressWeb3(address, cache) {
    if (!global.web3) {
        console.error("Make sure to call web3toolbox.setup(web3) before this function");
        process.exit(1);
    }
    return getLogs_1.default(global.web3, address, cache, global.toolboxOptions);
}
exports.default = {
    cache: { FileCacheManager: FileCacheManager_1.FileCacheManager, RedisCacheManager: RedisCacheManager_1.default },
    logs: { getAllLogsForAddress: getAllLogsForAddressWeb3 },
    setup,
};
