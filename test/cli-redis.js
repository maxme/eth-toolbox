import toolbox from '../src/index';
import config from '../config';

async function main() {
  // CK: 0x06012c8cf97bead5deae237070f9587f8e7a266d
  const address = '0x06012c8cf97bead5deae237070f9587f8e7a266d';
  const cache = new toolbox.cache.RedisCacheManager(address);
  cache.iterate(100000, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    if (res) {
      console.log(Object.keys(res).length);
    }
  });
}

main();
