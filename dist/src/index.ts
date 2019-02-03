"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getLogs_1 = __importDefault(require("./getLogs"));
const FileCacheManager_1 = __importDefault(require("./FileCacheManager"));
const RedisCacheManager_1 = __importDefault(require("./RedisCacheManager"));
function setup(web3, options) {
    if (options) {
        global.toolboxOptions = options;
    }
    global.web3 = web3;
}
function getAllLogsForAddressWeb3(address, cache) {
    if (!global.web3) {
        console.error('Make sure to call web3toolbox.setup(web3) before this function');
        process.exit(1);
    }
    return getLogs_1.default(global.web3, address, cache, global.toolboxOptions);
}
exports.default = {
    setup,
    logs: { getAllLogsForAddress: getAllLogsForAddressWeb3 },
    cache: { FileCacheManager: FileCacheManager_1.default, RedisCacheManager: RedisCacheManager_1.default },
};
