import Web3 from 'web3';
import toolbox from '../src/index';
import config from '../config';

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${config.INFURA_KEY}`),
);

async function main() {
  // CK: 0x06012c8cf97bead5deae237070f9587f8e7a266d - start at block 4604731
  // fizzy: 0xe083515D1541F2a9Fd0ca03f189F5D321C73B872
  const address = '0x06012c8cf97bead5deae237070f9587f8e7a266d';
  toolbox.setup(web3, { chunkSize: 1000, fromBlock: 7100000, injectTimestamp: false });
  const cache = new toolbox.cache.RedisCacheManager(address);
  // const cache = new toolbox.cache.FileCacheManager(address)
  try {
    const logs = await toolbox.logs.getAllLogsForAddress(address, cache);
    console.log(Object.keys(logs));
  } catch (error) {
    console.log(error);
  }
  cache.close();
}

main();
