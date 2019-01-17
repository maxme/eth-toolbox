import getAllLogsForAddress from './getLogs';
import FileCacheManager from './FileCacheManager';

function setup(web3) {
  global.web3 = web3;
}

function getAllLogsForAddressWeb3(address, cache) {
  if (!global.web3) {
    console.error('Make sure to call web3toolbox.setup(web3) before this function');
    process.exit(1);
  }
  return getAllLogsForAddress(global.web3, address, cache);
}

export default {
  setup,
  logs: { getAllLogsForAddress: getAllLogsForAddressWeb3 },
  cache: { FileCacheManager },
};
