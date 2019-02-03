import Web3 from "web3";
import MemoryCacheManager from "./MemoryCacheManager";
import { ICachedData, ICache } from "./ICache";

function getLogsFromAddress(
  web3: Web3,
  address: string,
  fromBlock: number,
  toBlock: number
): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    process.stdout.write(`Fetching logs from block ${fromBlock} to ${toBlock}: `);

    web3.eth.getPastLogs(
      {
        fromBlock,
        toBlock,
        address
      },
      (err, logs) => {
        if (err) {
          return reject(err);
        }
        return resolve(logs);
      }
    );
  });
}

function getBlockFactory(web3: Web3) {
  const blockCache: any = {};
  // memoize blocks
  return async function f(blockNumber: number) {
    if (!blockCache[blockNumber]) {
      blockCache[blockNumber] = await web3.eth.getBlock(blockNumber);
    }
    return blockCache[blockNumber];
  };
}

export async function cacheLogsForAddress(
  web3: Web3,
  address: string,
  cache: ICache,
  options: any
) {
  const blockNumber = await web3.eth.getBlockNumber();
  const getBlock = getBlockFactory(web3);
  const injectTimestamp = options && options.injectTimestamp ? options.injectTimestamp : false;
  const chunkSize = options && options.chunkSize ? options.chunkSize : 5000;
  let fromBlock = options && options.fromBlock ? options.fromBlock : 1;
  const latestBlock = (await cache.get("latestBlock")) || 1;
  if (latestBlock > fromBlock) {
    fromBlock = latestBlock;
  }
  for (let block = fromBlock; block < blockNumber; ) {
    const nextBlock = Math.min(blockNumber, block + chunkSize);
    // Disable the eslint check here because in this specific case,
    // we don't want getLogs to be parallelized to avoid hammering the node.
    // eslint-disable-next-line no-await-in-loop
    const currentLogs = await getLogsFromAddress(web3, address, block, nextBlock);
    console.log(`${currentLogs.length} logs.`);
    // Inject timestamp to the logs, this is often useful for ordering or analysis
    let logs = currentLogs;
    if (injectTimestamp) {
      // eslint-disable-next-line no-await-in-loop
      logs = await Promise.all(
        currentLogs.map(async log => ({
          ...log,
          timestamp: (await getBlock(log.blockNumber)).timestamp
        }))
      );
    }
    const mappedLogs = logs.reduce((acc, e) => {
      acc[e.id] = e;
      return acc;
    }, {});
    if (cache) {
      cache.batchSet(mappedLogs);
      cache.set("latestBlock", nextBlock);
    }
    block = nextBlock;
  }
  cache.save();
}

export default async function getAllLogsForAddress(
  web3: Web3,
  address: string,
  _cache: ICache,
  options: any
) {
  const cache = _cache || new MemoryCacheManager();
  await cacheLogsForAddress(web3, address, cache, options);
  return cache.getAll();
}
