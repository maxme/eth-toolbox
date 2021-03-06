"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getLogs = _interopRequireDefault(require("./getLogs"));

var _FileCacheManager = require("./FileCacheManager");

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
    console.error("Make sure to call web3toolbox.setup(web3) before this function");
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
    FileCacheManager: _FileCacheManager.FileCacheManager,
    RedisCacheManager: _RedisCacheManager.default
  }
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJzZXR1cCIsIndlYjMiLCJvcHRpb25zIiwiZ2xvYmFsIiwidG9vbGJveE9wdGlvbnMiLCJnZXRBbGxMb2dzRm9yQWRkcmVzc1dlYjMiLCJhZGRyZXNzIiwiY2FjaGUiLCJjb25zb2xlIiwiZXJyb3IiLCJwcm9jZXNzIiwiZXhpdCIsImxvZ3MiLCJnZXRBbGxMb2dzRm9yQWRkcmVzcyIsIkZpbGVDYWNoZU1hbmFnZXIiLCJSZWRpc0NhY2hlTWFuYWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBS0EsU0FBU0EsS0FBVCxDQUFlQyxJQUFmLEVBQTJCQyxPQUEzQixFQUF5QztBQUN2QyxNQUFJQSxPQUFKLEVBQWE7QUFDWEMsSUFBQUEsTUFBTSxDQUFDQyxjQUFQLEdBQXdCRixPQUF4QjtBQUNEOztBQUNEQyxFQUFBQSxNQUFNLENBQUNGLElBQVAsR0FBY0EsSUFBZDtBQUNEOztBQUVELFNBQVNJLHdCQUFULENBQWtDQyxPQUFsQyxFQUFtREMsS0FBbkQsRUFBa0U7QUFDaEUsTUFBSSxDQUFDSixNQUFNLENBQUNGLElBQVosRUFBa0I7QUFDaEJPLElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGdFQUFkO0FBQ0FDLElBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWI7QUFDRDs7QUFDRCxTQUFPLHNCQUFxQlIsTUFBTSxDQUFDRixJQUE1QixFQUFrQ0ssT0FBbEMsRUFBMkNDLEtBQTNDLEVBQWtESixNQUFNLENBQUNDLGNBQXpELENBQVA7QUFDRDs7ZUFFYztBQUNiSixFQUFBQSxLQUFLLEVBQUxBLEtBRGE7QUFFYlksRUFBQUEsSUFBSSxFQUFFO0FBQUVDLElBQUFBLG9CQUFvQixFQUFFUjtBQUF4QixHQUZPO0FBR2JFLEVBQUFBLEtBQUssRUFBRTtBQUFFTyxJQUFBQSxnQkFBZ0IsRUFBaEJBLGtDQUFGO0FBQW9CQyxJQUFBQSxpQkFBaUIsRUFBakJBO0FBQXBCO0FBSE0sQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWIzIGZyb20gXCJ3ZWIzXCI7XG5pbXBvcnQgZ2V0QWxsTG9nc0ZvckFkZHJlc3MgZnJvbSBcIi4vZ2V0TG9nc1wiO1xuaW1wb3J0IHsgRmlsZUNhY2hlTWFuYWdlciB9IGZyb20gXCIuL0ZpbGVDYWNoZU1hbmFnZXJcIjtcbmltcG9ydCBSZWRpc0NhY2hlTWFuYWdlciBmcm9tIFwiLi9SZWRpc0NhY2hlTWFuYWdlclwiO1xuaW1wb3J0IHsgSUNhY2hlIH0gZnJvbSBcIi4vSUNhY2hlXCI7XG5cbmRlY2xhcmUgdmFyIGdsb2JhbDogYW55O1xuXG5mdW5jdGlvbiBzZXR1cCh3ZWIzOiBXZWIzLCBvcHRpb25zOiBhbnkpIHtcbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBnbG9iYWwudG9vbGJveE9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG4gIGdsb2JhbC53ZWIzID0gd2ViMztcbn1cblxuZnVuY3Rpb24gZ2V0QWxsTG9nc0ZvckFkZHJlc3NXZWIzKGFkZHJlc3M6IHN0cmluZywgY2FjaGU6IElDYWNoZSkge1xuICBpZiAoIWdsb2JhbC53ZWIzKSB7XG4gICAgY29uc29sZS5lcnJvcihcIk1ha2Ugc3VyZSB0byBjYWxsIHdlYjN0b29sYm94LnNldHVwKHdlYjMpIGJlZm9yZSB0aGlzIGZ1bmN0aW9uXCIpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxuICByZXR1cm4gZ2V0QWxsTG9nc0ZvckFkZHJlc3MoZ2xvYmFsLndlYjMsIGFkZHJlc3MsIGNhY2hlLCBnbG9iYWwudG9vbGJveE9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNldHVwLFxuICBsb2dzOiB7IGdldEFsbExvZ3NGb3JBZGRyZXNzOiBnZXRBbGxMb2dzRm9yQWRkcmVzc1dlYjMgfSxcbiAgY2FjaGU6IHsgRmlsZUNhY2hlTWFuYWdlciwgUmVkaXNDYWNoZU1hbmFnZXIgfVxufTtcbiJdfQ==