"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redis = _interopRequireDefault(require("redis"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RedisCacheManager =
/*#__PURE__*/
function () {
  function RedisCacheManager(mainkey, clientsOption) {
    _classCallCheck(this, RedisCacheManager);

    this.mainkey = mainkey;
    this.client = _redis.default.createClient(clientsOption);
    this.client.on('error', function (err) {
      console.log("Error ".concat(err));
    });
    this.hget = (0, _util.promisify)(this.client.hget).bind(this.client);
    this.hgetall = (0, _util.promisify)(this.client.hgetall).bind(this.client);
    this.hlen = (0, _util.promisify)(this.client.hlen).bind(this.client);
    this.hscan = (0, _util.promisify)(this.client.hscan).bind(this.client);
  }

  _createClass(RedisCacheManager, [{
    key: "batchSet",
    value: function batchSet(dataset) {
      var _this = this;

      // TODO: remove stringify, could be done easily if we're sure the object is flat (no sub-object)
      Object.keys(dataset).forEach(function (key) {
        _this.client.hset(_this.mainkey, key, JSON.stringify(dataset[key]));
      });
    }
  }, {
    key: "set",
    value: function set(key, data) {
      this.client.hset(this.mainkey, key, JSON.stringify(data));
    }
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(key) {
        var tmp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = JSON;
                _context.next = 3;
                return this.hget(this.mainkey, key);

              case 3:
                _context.t1 = _context.sent;
                tmp = _context.t0.parse.call(_context.t0, _context.t1);
                return _context.abrupt("return", tmp);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }() // eslint-disable-next-line class-methods-use-this

  }, {
    key: "save",
    value: function save() {} // noop
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "read",
    value: function read() {// noop
    }
  }, {
    key: "close",
    value: function close() {
      this.client.quit();
    }
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.hgetall(this.mainkey);

              case 2:
                data = _context2.sent;
                // eslint-disable-next-line no-return-assign
                Object.keys(data).map(function (key) {
                  return data[key] = JSON.parse(data[key]);
                });
                return _context2.abrupt("return", data);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "iterate",
    value: function () {
      var _iterate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(gapSize, callback) {
        var len, cursor, i, res, _res, data, j;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.hlen(this.mainkey);

              case 2:
                len = _context3.sent;
                cursor = 0;
                i = 0;

              case 5:
                if (!(i < len)) {
                  _context3.next = 23;
                  break;
                }

                _context3.prev = 6;
                _context3.next = 9;
                return this.hscan(this.mainkey, cursor, 'COUNT', gapSize);

              case 9:
                res = _context3.sent;
                _res = _slicedToArray(res, 1);
                cursor = _res[0];
                data = {};

                for (j = 0; j < res[1].length; j += 2) {
                  // TODO: remove parse, this is a terrible way of doing it, see above
                  data[res[1][j]] = JSON.parse(res[1][j + 1]);
                }

                callback(null, data);
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](6);
                callback(_context3.t0, null);

              case 20:
                i += gapSize;
                _context3.next = 5;
                break;

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 17]]);
      }));

      function iterate(_x2, _x3) {
        return _iterate.apply(this, arguments);
      }

      return iterate;
    }() // Note for later: leveraging redis zset would be amazing here to
    // iterate over logs sorted by blocknumber / timestamp.

  }]);

  return RedisCacheManager;
}();

exports.default = RedisCacheManager;