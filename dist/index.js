"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getLogs = _interopRequireDefault(require("./getLogs"));

var _FileCacheManager = _interopRequireDefault(require("./FileCacheManager"));

var _RedisCacheManager = _interopRequireDefault(require("./RedisCacheManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup(web3, options) {
  if (options) {
    global.toolboxOptions = options;
  }

  global.web3 = web3;
}

function getAllLogsForAddressWeb3(address, cache) {
  if (!global.web3) {
    console.error('Make sure to call web3toolbox.setup(web3) before this function');
    process.exit(1);
  }

  return (0, _getLogs.default)(global.web3, address, cache, global.toolboxOptions);
}

var _default = {
  setup: setup,
  logs: {
    getAllLogsForAddress: getAllLogsForAddressWeb3
  },
  cache: {
    FileCacheManager: _FileCacheManager.default,
    RedisCacheManager: _RedisCacheManager.default
  }
};
exports.default = _default;