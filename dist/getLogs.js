"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheLogsForAddress = cacheLogsForAddress;
exports.default = getAllLogsForAddress;

var _MemoryCacheManager = _interopRequireDefault(require("./MemoryCacheManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getLogsFromAddress(web3, address, fromBlock, toBlock) {
  return new Promise(function (resolve, reject) {
    console.log("Fetching logs from block ".concat(fromBlock, " to ").concat(toBlock));
    web3.eth.getPastLogs({
      fromBlock: fromBlock,
      toBlock: toBlock,
      address: address
    }, function (err, logs) {
      if (err) {
        return reject(err);
      }

      return resolve(logs);
    });
  });
}

function cacheLogsForAddress(_x, _x2, _x3, _x4) {
  return _cacheLogsForAddress.apply(this, arguments);
}

function _cacheLogsForAddress() {
  _cacheLogsForAddress = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(web3, address, cache, options) {
    var blockNumber, injectTimestamp, chunkSize, fromBlock, latestBlock, block, nextBlock, currentLogs, logs, mappedLogs;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return web3.eth.getBlockNumber();

          case 2:
            blockNumber = _context2.sent;
            injectTimestamp = options && options.injectTimestamp ? options.injectTimestamp : false;
            chunkSize = options && options.chunkSize ? options.chunkSize : 5000;
            fromBlock = options && options.fromBlock ? options.fromBlock : 1;
            _context2.next = 8;
            return cache.get('latestBlock');

          case 8:
            _context2.t0 = _context2.sent;

            if (_context2.t0) {
              _context2.next = 11;
              break;
            }

            _context2.t0 = 1;

          case 11:
            latestBlock = _context2.t0;

            if (latestBlock > fromBlock) {
              fromBlock = latestBlock;
            }

            block = fromBlock;

          case 14:
            if (!(block < blockNumber)) {
              _context2.next = 29;
              break;
            }

            nextBlock = Math.min(blockNumber, block + chunkSize); // Disable the eslint check here because in this specific case,
            // we don't want getLogs to be parallelized to avoid hammering the node.
            // eslint-disable-next-line no-await-in-loop

            _context2.next = 18;
            return getLogsFromAddress(web3, address, block, nextBlock);

          case 18:
            currentLogs = _context2.sent;
            // Inject timestamp to the logs, this is often useful for ordering or analysis
            logs = currentLogs;

            if (!injectTimestamp) {
              _context2.next = 24;
              break;
            }

            _context2.next = 23;
            return Promise.all(currentLogs.map(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(log) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = _objectSpread;
                        _context.t1 = {};
                        _context.t2 = log;
                        _context.next = 5;
                        return web3.eth.getBlock(log.blockNumber);

                      case 5:
                        _context.t3 = _context.sent.timestamp;
                        _context.t4 = {
                          timestamp: _context.t3
                        };
                        return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2, _context.t4));

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x9) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 23:
            logs = _context2.sent;

          case 24:
            mappedLogs = logs.reduce(function (acc, e) {
              acc[e.id] = e;
              return acc;
            }, {});

            if (cache) {
              cache.batchSet(mappedLogs);
              cache.set('latestBlock', nextBlock);
            }

            block = nextBlock;

          case 27:
            _context2.next = 14;
            break;

          case 29:
            cache.save();

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _cacheLogsForAddress.apply(this, arguments);
}

function getAllLogsForAddress(_x5, _x6, _x7, _x8) {
  return _getAllLogsForAddress.apply(this, arguments);
}

function _getAllLogsForAddress() {
  _getAllLogsForAddress = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(web3, address, _cache, options) {
    var cache;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cache = _cache || new _MemoryCacheManager.default();
            _context3.next = 3;
            return cacheLogsForAddress(web3, address, cache, options);

          case 3:
            return _context3.abrupt("return", cache.getAll());

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _getAllLogsForAddress.apply(this, arguments);
}