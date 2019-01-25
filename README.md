# Ethereum Toolbox

My personal toolbox for analyzing Ethereum logs, transactions, ...

## Tools

- `getAllLogsForAddress`: get all logs associated to an address from an Ethereum node.
- `FileCacheManager`: json file based cache, works fine for less than 50K logs.
- `RedisCacheManager`: redis based cache, use this if you need to manage more logs.

## TODO

- use zset in redis to order by date/blocknumber.
