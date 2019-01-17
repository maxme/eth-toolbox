import Web3 from 'web3';
import toolbox from '../src/index';
import FileCacheManager from '../src/FileCacheManager';
import config from '../config';

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${config.INFURA_KEY}`),
);

async function main() {
  const address = '0xe083515D1541F2a9Fd0ca03f189F5D321C73B872';
  toolbox.setup(web3);
  const logs = await toolbox.logs.getAllLogsForAddress(
    address,
    new FileCacheManager(`${address}-logs.cache`),
  );
  console.log(Object.keys(logs));
}

main();
