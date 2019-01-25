import MemoryCacheManager from './MemoryCacheManager';

function getLogsFromAddress(web3, address, fromBlock, toBlock) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching logs from block ${fromBlock} to ${toBlock}`);

    web3.eth.getPastLogs(
      {
        fromBlock,
        toBlock,
        address,
      },
      (err, logs) => {
        if (err) {
          return reject(err);
        }
        return resolve(logs);
      },
    );
  });
}

export async function cacheLogsForAddress(web3, address, cache, options) {
  const blockNumber = await web3.eth.getBlockNumber();
  const injectTimestamp = options && options.injectTimestamp ? options.injectTimestamp : false;
  const chunkSize = options && options.chunkSize ? options.chunkSize : 5000;
  let fromBlock = options && options.fromBlock ? options.fromBlock : 1;
  const latestBlock = (await cache.get('latestBlock')) || 1;
  if (latestBlock > fromBlock) {
    fromBlock = latestBlock;
  }
  for (let block = fromBlock; block < blockNumber;) {
    const nextBlock = Math.min(blockNumber, block + chunkSize);
    // Disable the eslint check here because in this specific case,
    // we don't want getLogs to be parallelized to avoid hammering the node.
    // eslint-disable-next-line no-await-in-loop
    const currentLogs = await getLogsFromAddress(web3, address, block, nextBlock);
    // Inject timestamp to the logs, this is often useful for ordering or analysis
    let logs = currentLogs;
    if (injectTimestamp) {
      // eslint-disable-next-line no-await-in-loop
      logs = await Promise.all(
        currentLogs.map(async log => ({
          ...log,
          timestamp: (await web3.eth.getBlock(log.blockNumber)).timestamp,
        })),
      );
    }
    const mappedLogs = logs.reduce((acc, e) => {
      acc[e.id] = e;
      return acc;
    }, {});
    if (cache) {
      cache.batchSet(mappedLogs);
      cache.set('latestBlock', nextBlock);
    }
    block = nextBlock;
  }
  cache.save();
}

export default async function getAllLogsForAddress(web3, address, _cache, options) {
  const cache = _cache || new MemoryCacheManager();
  await cacheLogsForAddress(web3, address, cache, options);
  return cache.getAll();
}
