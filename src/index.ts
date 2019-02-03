import Web3 from "web3";
import getAllLogsForAddress from "./getLogs";
import { FileCacheManager } from "./FileCacheManager";
import RedisCacheManager from "./RedisCacheManager";
import { ICache } from "./ICache";

declare var global: any;

function setup(web3: Web3, options: any) {
  if (options) {
    global.toolboxOptions = options;
  }
  global.web3 = web3;
}

function getAllLogsForAddressWeb3(address: string, cache: ICache) {
  if (!global.web3) {
    console.error("Make sure to call web3toolbox.setup(web3) before this function");
    process.exit(1);
  }
  return getAllLogsForAddress(global.web3, address, cache, global.toolboxOptions);
}

export default {
  setup,
  logs: { getAllLogsForAddress: getAllLogsForAddressWeb3 },
  cache: { FileCacheManager, RedisCacheManager }
};
