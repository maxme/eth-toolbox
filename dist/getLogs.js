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
    process.stdout.write("Fetching logs from block ".concat(fromBlock, " to ").concat(toBlock, ": "));
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

function getBlockFactory(web3) {
  var blockCache = {}; // memoize blocks

  return (
    /*#__PURE__*/
    function () {
      var _f = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(blockNumber) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (blockCache[blockNumber]) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return web3.eth.getBlock(blockNumber);

              case 3:
                blockCache[blockNumber] = _context.sent;

              case 4:
                return _context.abrupt("return", blockCache[blockNumber]);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function f(_x) {
        return _f.apply(this, arguments);
      }

      return f;
    }()
  );
}

function cacheLogsForAddress(_x2, _x3, _x4, _x5) {
  return _cacheLogsForAddress.apply(this, arguments);
}

function _cacheLogsForAddress() {
  _cacheLogsForAddress = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(web3, address, cache, options) {
    var blockNumber, getBlock, injectTimestamp, chunkSize, fromBlock, latestBlock, block, nextBlock, currentLogs, logs, mappedLogs;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return web3.eth.getBlockNumber();

          case 2:
            blockNumber = _context3.sent;
            getBlock = getBlockFactory(web3);
            injectTimestamp = options && options.injectTimestamp ? options.injectTimestamp : false;
            chunkSize = options && options.chunkSize ? options.chunkSize : 5000;
            fromBlock = options && options.fromBlock ? options.fromBlock : 1;
            _context3.next = 9;
            return cache.get("latestBlock");

          case 9:
            _context3.t0 = _context3.sent;

            if (_context3.t0) {
              _context3.next = 12;
              break;
            }

            _context3.t0 = 1;

          case 12:
            latestBlock = _context3.t0;

            if (latestBlock > fromBlock) {
              fromBlock = latestBlock;
            }

            block = fromBlock;

          case 15:
            if (!(block < blockNumber)) {
              _context3.next = 31;
              break;
            }

            nextBlock = Math.min(blockNumber, block + chunkSize); // Disable the eslint check here because in this specific case,
            // we don't want getLogs to be parallelized to avoid hammering the node.
            // eslint-disable-next-line no-await-in-loop

            _context3.next = 19;
            return getLogsFromAddress(web3, address, block, nextBlock);

          case 19:
            currentLogs = _context3.sent;
            console.log("".concat(currentLogs.length, " logs.")); // Inject timestamp to the logs, this is often useful for ordering or analysis

            logs = currentLogs;

            if (!injectTimestamp) {
              _context3.next = 26;
              break;
            }

            _context3.next = 25;
            return Promise.all(currentLogs.map(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(log) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.t0 = _objectSpread;
                        _context2.t1 = {};
                        _context2.t2 = log;
                        _context2.next = 5;
                        return getBlock(log.blockNumber);

                      case 5:
                        _context2.t3 = _context2.sent.timestamp;
                        _context2.t4 = {
                          timestamp: _context2.t3
                        };
                        return _context2.abrupt("return", (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t4));

                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x10) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 25:
            logs = _context3.sent;

          case 26:
            mappedLogs = logs.reduce(function (acc, e) {
              acc[e.id] = e;
              return acc;
            }, {});

            if (cache) {
              cache.batchSet(mappedLogs);
              cache.set("latestBlock", nextBlock);
            }

            block = nextBlock;

          case 29:
            _context3.next = 15;
            break;

          case 31:
            cache.save();

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _cacheLogsForAddress.apply(this, arguments);
}

function getAllLogsForAddress(_x6, _x7, _x8, _x9) {
  return _getAllLogsForAddress.apply(this, arguments);
}

function _getAllLogsForAddress() {
  _getAllLogsForAddress = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(web3, address, _cache, options) {
    var cache;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cache = _cache || new _MemoryCacheManager.default();
            _context4.next = 3;
            return cacheLogsForAddress(web3, address, cache, options);

          case 3:
            return _context4.abrupt("return", cache.getAll());

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _getAllLogsForAddress.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZXRMb2dzLnRzIl0sIm5hbWVzIjpbImdldExvZ3NGcm9tQWRkcmVzcyIsIndlYjMiLCJhZGRyZXNzIiwiZnJvbUJsb2NrIiwidG9CbG9jayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwiZXRoIiwiZ2V0UGFzdExvZ3MiLCJlcnIiLCJsb2dzIiwiZ2V0QmxvY2tGYWN0b3J5IiwiYmxvY2tDYWNoZSIsImJsb2NrTnVtYmVyIiwiZ2V0QmxvY2siLCJmIiwiY2FjaGVMb2dzRm9yQWRkcmVzcyIsImNhY2hlIiwib3B0aW9ucyIsImdldEJsb2NrTnVtYmVyIiwiaW5qZWN0VGltZXN0YW1wIiwiY2h1bmtTaXplIiwiZ2V0IiwibGF0ZXN0QmxvY2siLCJibG9jayIsIm5leHRCbG9jayIsIk1hdGgiLCJtaW4iLCJjdXJyZW50TG9ncyIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJhbGwiLCJtYXAiLCJ0aW1lc3RhbXAiLCJtYXBwZWRMb2dzIiwicmVkdWNlIiwiYWNjIiwiZSIsImlkIiwiYmF0Y2hTZXQiLCJzZXQiLCJzYXZlIiwiZ2V0QWxsTG9nc0ZvckFkZHJlc3MiLCJfY2FjaGUiLCJNZW1vcnlDYWNoZU1hbmFnZXIiLCJnZXRBbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUdBLFNBQVNBLGtCQUFULENBQ0VDLElBREYsRUFFRUMsT0FGRixFQUdFQyxTQUhGLEVBSUVDLE9BSkYsRUFLdUI7QUFDckIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDQyxJQUFBQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUMsS0FBZixvQ0FBaURQLFNBQWpELGlCQUFpRUMsT0FBakU7QUFFQUgsSUFBQUEsSUFBSSxDQUFDVSxHQUFMLENBQVNDLFdBQVQsQ0FDRTtBQUNFVCxNQUFBQSxTQUFTLEVBQVRBLFNBREY7QUFFRUMsTUFBQUEs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QTtBQUFBLG1CQU9QN0IsbUJBQW1CLENBQUNuQixJQUFELEVBQU9DLE9BQVAsRUFBZ0JtQixLQUFoQixFQUF1QkMsT0FBdkIsQ0FQWjs7QUFBQTtBQUFBLDhDQVFORCxLQUFLLENBQUM2QixNQUFOLEVBUk07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWIzIGZyb20gXCJ3ZWIzXCI7XG5pbXBvcnQgTWVtb3J5Q2FjaGVNYW5hZ2VyIGZyb20gXCIuL01lbW9yeUNhY2hlTWFuYWdlclwiO1xuaW1wb3J0IHsgSUNhY2hlZERhdGEsIElDYWNoZSB9IGZyb20gXCIuL0lDYWNoZVwiO1xuXG5mdW5jdGlvbiBnZXRMb2dzRnJvbUFkZHJlc3MoXG4gIHdlYjM6IFdlYjMsXG4gIGFkZHJlc3M6IHN0cmluZyxcbiAgZnJvbUJsb2NrOiBudW1iZXIsXG4gIHRvQmxvY2s6IG51bWJlclxuKTogUHJvbWlzZTxBcnJheTxhbnk+PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYEZldGNoaW5nIGxvZ3MgZnJvbSBibG9jayAke2Zyb21CbG9ja30gdG8gJHt0b0Jsb2NrfTogYCk7XG5cbiAgICB3ZWIzLmV0aC5nZXRQYXN0TG9ncyhcbiAgICAgIHtcbiAgICAgICAgZnJvbUJsb2NrLFxuICAgICAgICB0b0Jsb2NrLFxuICAgICAgICBhZGRyZXNzXG4gICAgICB9LFxuICAgICAgKGVyciwgbG9ncykgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKGxvZ3MpO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRCbG9ja0ZhY3Rvcnkod2ViMzogV2ViMykge1xuICBjb25zdCBibG9ja0NhY2hlOiBhbnkgPSB7fTtcbiAgLy8gbWVtb2l6ZSBibG9ja3NcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGYoYmxvY2tOdW1iZXI6IG51bWJlcikge1xuICAgIGlmICghYmxvY2tDYWNoZVtibG9ja051bWJlcl0pIHtcbiAgICAgIGJsb2NrQ2FjaGVbYmxvY2tOdW1iZXJdID0gYXdhaXQgd2ViMy5ldGguZ2V0QmxvY2soYmxvY2tOdW1iZXIpO1xuICAgIH1cbiAgICByZXR1cm4gYmxvY2tDYWNoZVtibG9ja051bWJlcl07XG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjYWNoZUxvZ3NGb3JBZGRyZXNzKFxuICB3ZWIzOiBXZWIzLFxuICBhZGRyZXNzOiBzdHJpbmcsXG4gIGNhY2hlOiBJQ2FjaGUsXG4gIG9wdGlvbnM6IGFueVxuKSB7XG4gIGNvbnN0IGJsb2NrTnVtYmVyID0gYXdhaXQgd2ViMy5ldGguZ2V0QmxvY2tOdW1iZXIoKTtcbiAgY29uc3QgZ2V0QmxvY2sgPSBnZXRCbG9ja0ZhY3Rvcnkod2ViMyk7XG4gIGNvbnN0IGluamVjdFRpbWVzdGFtcCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5pbmplY3RUaW1lc3RhbXAgPyBvcHRpb25zLmluamVjdFRpbWVzdGFtcCA6IGZhbHNlO1xuICBjb25zdCBjaHVua1NpemUgPSBvcHRpb25zICYmIG9wdGlvbnMuY2h1bmtTaXplID8gb3B0aW9ucy5jaHVua1NpemUgOiA1MDAwO1xuICBsZXQgZnJvbUJsb2NrID0gb3B0aW9ucyAmJiBvcHRpb25zLmZyb21CbG9jayA/IG9wdGlvbnMuZnJvbUJsb2NrIDogMTtcbiAgY29uc3QgbGF0ZXN0QmxvY2sgPSAoYXdhaXQgY2FjaGUuZ2V0KFwibGF0ZXN0QmxvY2tcIikpIHx8IDE7XG4gIGlmIChsYXRlc3RCbG9jayA+IGZyb21CbG9jaykge1xuICAgIGZyb21CbG9jayA9IGxhdGVzdEJsb2NrO1xuICB9XG4gIGZvciAobGV0IGJsb2NrID0gZnJvbUJsb2NrOyBibG9jayA8IGJsb2NrTnVtYmVyOyApIHtcbiAgICBjb25zdCBuZXh0QmxvY2sgPSBNYXRoLm1pbihibG9ja051bWJlciwgYmxvY2sgKyBjaHVua1NpemUpO1xuICAgIC8vIERpc2FibGUgdGhlIGVzbGludCBjaGVjayBoZXJlIGJlY2F1c2UgaW4gdGhpcyBzcGVjaWZpYyBjYXNlLFxuICAgIC8vIHdlIGRvbid0IHdhbnQgZ2V0TG9ncyB0byBiZSBwYXJhbGxlbGl6ZWQgdG8gYXZvaWQgaGFtbWVyaW5nIHRoZSBub2RlLlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgY29uc3QgY3VycmVudExvZ3MgPSBhd2FpdCBnZXRMb2dzRnJvbUFkZHJlc3Mod2ViMywgYWRkcmVzcywgYmxvY2ssIG5leHRCbG9jayk7XG4gICAgY29uc29sZS5sb2coYCR7Y3VycmVudExvZ3MubGVuZ3RofSBsb2dzLmApO1xuICAgIC8vIEluamVjdCB0aW1lc3RhbXAgdG8gdGhlIGxvZ3MsIHRoaXMgaXMgb2Z0ZW4gdXNlZnVsIGZvciBvcmRlcmluZyBvciBhbmFseXNpc1xuICAgIGxldCBsb2dzID0gY3VycmVudExvZ3M7XG4gICAgaWYgKGluamVjdFRpbWVzdGFtcCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgIGxvZ3MgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgY3VycmVudExvZ3MubWFwKGFzeW5jIGxvZyA9PiAoe1xuICAgICAgICAgIC4uLmxvZyxcbiAgICAgICAgICB0aW1lc3RhbXA6IChhd2FpdCBnZXRCbG9jayhsb2cuYmxvY2tOdW1iZXIpKS50aW1lc3RhbXBcbiAgICAgICAgfSkpXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBtYXBwZWRMb2dzID0gbG9ncy5yZWR1Y2UoKGFjYywgZSkgPT4ge1xuICAgICAgYWNjW2UuaWRdID0gZTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICAgIGlmIChjYWNoZSkge1xuICAgICAgY2FjaGUuYmF0Y2hTZXQobWFwcGVkTG9ncyk7XG4gICAgICBjYWNoZS5zZXQoXCJsYXRlc3RCbG9ja1wiLCBuZXh0QmxvY2spO1xuICAgIH1cbiAgICBibG9jayA9IG5leHRCbG9jaztcbiAgfVxuICBjYWNoZS5zYXZlKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbExvZ3NGb3JBZGRyZXNzKFxuICB3ZWIzOiBXZWIzLFxuICBhZGRyZXNzOiBzdHJpbmcsXG4gIF9jYWNoZTogSUNhY2hlLFxuICBvcHRpb25zOiBhbnlcbikge1xuICBjb25zdCBjYWNoZSA9IF9jYWNoZSB8fCBuZXcgTWVtb3J5Q2FjaGVNYW5hZ2VyKCk7XG4gIGF3YWl0IGNhY2hlTG9nc0ZvckFkZHJlc3Mod2ViMywgYWRkcmVzcywgY2FjaGUsIG9wdGlvbnMpO1xuICByZXR1cm4gY2FjaGUuZ2V0QWxsKCk7XG59XG4iXX0=