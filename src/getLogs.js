import { tmpdir } from 'os';

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

export default async function getAllLogsForAddress(web3, address, cache) {
  let logs = {};
  const blockNumber = await web3.eth.getBlockNumber();
  const blockChunk = 5000;
  let fromBlock = 1;
  if (cache && cache.data.latestBlock && cache.data.latestBlock > fromBlock) {
    fromBlock = cache.data.latestBlock;
    ({ logs } = cache.data);
  }
  for (let block = fromBlock; block < blockNumber;) {
    const nextBlock = Math.min(blockNumber, block + blockChunk);
    // Disable the eslint check here because in this specific case,
    // we don't want getLogs to be parallelized to avoid hammering the node.
    // eslint-disable-next-line no-await-in-loop
    const currentLogs = await getLogsFromAddress(web3, address, block, nextBlock);
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
    logs = { ...logs, ...mappedLogs };
    if (cache) {
      cache.add({ logs });
      cache.add({ latestBlock: nextBlock });
    }
    block = nextBlock;
  }
  if (cache) {
    cache.save();
    return cache.data.logs;
  }
  return logs;
}
