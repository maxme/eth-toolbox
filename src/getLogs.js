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

export default async function getAllLogsForAddress(web3, address, _cache, options) {
  const blockNumber = await web3.eth.getBlockNumber();
  const chunkSize = options && options.chunkSize ? options.chunkSize : 5000;
  let fromBlock = options && options.fromBlock ? options.fromBlock : 1;
  const cache = _cache || new MemoryCacheManager();
  if (cache.get('latestBlock') && cache.get('latestBlock') > fromBlock) {
    fromBlock = cache.get('latestBlock');
  }
  for (let block = fromBlock; block < blockNumber;) {
    const nextBlock = Math.min(blockNumber, block + chunkSize);
    // Disable the eslint check here because in this specific case,
    // we don't want getLogs to be parallelized to avoid hammering the node.
    // eslint-disable-next-line no-await-in-loop
    const currentLogs = await getLogsFromAddress(web3, address, block, nextBlock);
    // Inject timestamp to the logs, this is often useful for ordering or analysis
    // eslint-disable-next-line no-await-in-loop
    const timestampInjectedLogs = await Promise.all(
      currentLogs.map(async log => ({
        ...log,
        timestamp: (await web3.eth.getBlock(log.blockNumber)).timestamp,
      })),
    );
    const mappedLogs = timestampInjectedLogs.reduce((acc, e) => {
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
  // trick to remove latestBlock from logs before returning,
  // TODO: use hset/hget
  cache.set('latestBlock', null);
  return cache.getAll();
}
