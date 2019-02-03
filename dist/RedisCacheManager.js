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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RedisCacheManager =
/*#__PURE__*/
function () {
  function RedisCacheManager(mainkey, clientsOption) {
    _classCallCheck(this, RedisCacheManager);

    _defineProperty(this, "mainkey", void 0);

    _defineProperty(this, "client", void 0);

    _defineProperty(this, "hget", void 0);

    _defineProperty(this, "hgetall", void 0);

    _defineProperty(this, "hlen", void 0);

    _defineProperty(this, "hscan", void 0);

    this.mainkey = mainkey;
    this.client = _redis.default.createClient(clientsOption);
    this.client.on("error", function (err) {
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
                cursor = "0";
                i = 0;

              case 5:
                if (!(i < len)) {
                  _context3.next = 23;
                  break;
                }

                _context3.prev = 6;
                _context3.next = 9;
                return this.hscan(this.mainkey, cursor, "COUNT", gapSize);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWRpc0NhY2hlTWFuYWdlci50cyJdLCJuYW1lcyI6WyJSZWRpc0NhY2hlTWFuYWdlciIsIm1haW5rZXkiLCJjbGllbnRzT3B0aW9uIiwiY2xpZW50IiwicmVkaXMiLCJjcmVhdGVDbGllbnQiLCJvbiIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJoZ2V0IiwiYmluZCIsImhnZXRhbGwiLCJobGVuIiwiaHNjYW4iLCJkYXRhc2V0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJoc2V0IiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGEiLCJ0bXAiLCJwYXJzZSIsInF1aXQiLCJtYXAiLCJnYXBTaXplIiwiY2FsbGJhY2siLCJsZW4iLCJjdXJzb3IiLCJpIiwicmVzIiwiaiIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLGlCOzs7QUFRbkIsNkJBQVlDLE9BQVosRUFBNkJDLGFBQTdCLEVBQWtEO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQ2hELFNBQUtELE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtFLE1BQUwsR0FBY0MsZUFBTUMsWUFBTixDQUFtQkgsYUFBbkIsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsQ0FBWUcsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBQUMsR0FBRyxFQUFJO0FBQzdCQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsaUJBQXFCRixHQUFyQjtBQUNELEtBRkQ7QUFHQSxTQUFLRyxJQUFMLEdBQVkscUJBQVUsS0FBS1AsTUFBTCxDQUFZTyxJQUF0QixFQUE0QkMsSUFBNUIsQ0FBaUMsS0FBS1IsTUFBdEMsQ0FBWjtBQUNBLFNBQUtTLE9BQUwsR0FBZSxxQkFBVSxLQUFLVCxNQUFMLENBQVlTLE9BQXRCLEVBQStCRCxJQUEvQixDQUFvQyxLQUFLUixNQUF6QyxDQUFmO0FBQ0EsU0FBS1UsSUFBTCxHQUFZLHFCQUFVLEtBQUtWLE1BQUwsQ0FBWVUsSUFBdEIsRUFBNEJGLElBQTVCLENBQWlDLEtBQUtSLE1BQXRDLENBQVo7QUFDQSxTQUFLVyxLQUFMLEdBQWEscUJBQVUsS0FBS1gsTUFBTCxDQUFZVyxLQUF0QixFQUE2QkgsSUFBN0IsQ0FBa0MsS0FBS1IsTUFBdkMsQ0FBYjtBQUNEOzs7OzZCQUVRWSxPLEVBQXNCO0FBQUE7O0FBQzdCO0FBQ0FDLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZRixPQUFaLEVBQXFCRyxPQUFyQixDQUE2QixVQUFBQyxHQUFHLEVBQUk7QUFDbEMsUUFBQSxLQUFJLENBQUNoQixNQUFMLENBQVlpQixJQUFaLENBQWlCLEtBQUksQ0FBQ25CLE9BQXRCLEVBQStCa0IsR0FBL0IsRUFBb0NFLElBQUksQ0FBQ0MsU0FBTCxDQUFlUCxPQUFPLENBQUNJLEdBQUQsQ0FBdEIsQ0FBcEM7QUFDRCxPQUZEO0FBR0Q7Ozt3QkFFR0EsRyxFQUFhSSxJLEVBQVc7QUFDMUIsV0FBS3BCLE1BQUwsQ0FBWWlCLElBQVosQ0FBaUIsS0FBS25CLE9BQXRCLEVBQStCa0IsR0FBL0IsRUFBb0NFLElBQUksQ0FBQ0MsU0FBTCxDQUFlQyxJQUFmLENBQXBDO0FBQ0Q7Ozs7OzsrQ0FFU0osRzs7Ozs7OzhCQUVJRSxJOzt1QkFBaUIsS0FBS1gsSUFBTCxDQUFVLEtBQUtULE9BQWYsRUFBd0JrQixHQUF4QixDOzs7O0FBQXZCSyxnQkFBQUEsRyxlQUFXQyxLO2lEQUNWRCxHOzs7Ozs7Ozs7Ozs7Ozs7UUFHVDs7OzsyQkFDTyxDQUVOLEMsQ0FEQztBQUdGOzs7OzJCQUNPLENBQ0w7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS3JCLE1BQUwsQ0FBWXVCLElBQVo7QUFDRDs7Ozs7Ozs7Ozs7Ozt1QkFJb0IsS0FBS2QsT0FBTCxDQUFhLEtBQUtYLE9BQWxCLEM7OztBQUFic0IsZ0JBQUFBLEk7QUFDTjtBQUNBUCxnQkFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlNLElBQVosRUFBa0JJLEdBQWxCLENBQXNCLFVBQUFSLEdBQUc7QUFBQSx5QkFBS0ksSUFBSSxDQUFDSixHQUFELENBQUosR0FBWUUsSUFBSSxDQUFDSSxLQUFMLENBQVdGLElBQUksQ0FBQ0osR0FBRCxDQUFmLENBQWpCO0FBQUEsaUJBQXpCO2tEQUNPSSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBR0tLLE8sRUFBaUJDLFE7Ozs7Ozs7O3VCQUNYLEtBQUtoQixJQUFMLENBQVUsS0FBS1osT0FBZixDOzs7QUFBWjZCLGdCQUFBQSxHO0FBQ0ZDLGdCQUFBQSxNLEdBQVMsRztBQUVKQyxnQkFBQUEsQyxHQUFJLEM7OztzQkFBR0EsQ0FBQyxHQUFHRixHOzs7Ozs7O3VCQUVFLEtBQUtoQixLQUFMLENBQVcsS0FBS2IsT0FBaEIsRUFBeUI4QixNQUF6QixFQUFpQyxPQUFqQyxFQUEwQ0gsT0FBMUMsQzs7O0FBQVpLLGdCQUFBQSxHO3NDQUNLQSxHO0FBQVZGLGdCQUFBQSxNO0FBQ0tSLGdCQUFBQSxJLEdBQW9CLEU7O0FBQzFCLHFCQUFTVyxDQUFULEdBQWEsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxHQUFHLENBQUMsQ0FBRCxDQUFILENBQU9FLE1BQTNCLEVBQW1DRCxDQUFDLElBQUksQ0FBeEMsRUFBMkM7QUFDekM7QUFDQVgsa0JBQUFBLElBQUksQ0FBQ1UsR0FBRyxDQUFDLENBQUQsQ0FBSCxDQUFPQyxDQUFQLENBQUQsQ0FBSixHQUFrQmIsSUFBSSxDQUFDSSxLQUFMLENBQVdRLEdBQUcsQ0FBQyxDQUFELENBQUgsQ0FBT0MsQ0FBQyxHQUFHLENBQVgsQ0FBWCxDQUFsQjtBQUNEOztBQUNETCxnQkFBQUEsUUFBUSxDQUFDLElBQUQsRUFBT04sSUFBUCxDQUFSOzs7Ozs7O0FBRUFNLGdCQUFBQSxRQUFRLGVBQUksSUFBSixDQUFSOzs7QUFYcUJHLGdCQUFBQSxDQUFDLElBQUlKLE87Ozs7Ozs7Ozs7Ozs7Ozs7O1FBZ0JoQztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZGlzLCB7IFJlZGlzQ2xpZW50IH0gZnJvbSBcInJlZGlzXCI7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tIFwidXRpbFwiO1xuaW1wb3J0IHsgSUNhY2hlZERhdGEsIElDYWNoZSB9IGZyb20gXCIuL0lDYWNoZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRpc0NhY2hlTWFuYWdlciBpbXBsZW1lbnRzIElDYWNoZSB7XG4gIG1haW5rZXk6IHN0cmluZztcbiAgY2xpZW50OiBSZWRpc0NsaWVudDtcbiAgaGdldDogKGFyZzE6IHN0cmluZywgYXJnMjogc3RyaW5nKSA9PiBQcm9taXNlPHN0cmluZz47XG4gIGhnZXRhbGw6IChhcmcxOiBzdHJpbmcpID0+IFByb21pc2U8eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfT47XG4gIGhsZW46IChhcmcxOiBzdHJpbmcpID0+IFByb21pc2U8bnVtYmVyPjtcbiAgaHNjYW46IChrZXk6IHN0cmluZywgY3Vyc29yOiBzdHJpbmcsIGFyZzE6IHN0cmluZywgYXJnMjogbnVtYmVyKSA9PiBQcm9taXNlPFtzdHJpbmcsIHN0cmluZ1tdXT47XG5cbiAgY29uc3RydWN0b3IobWFpbmtleTogc3RyaW5nLCBjbGllbnRzT3B0aW9uPzogYW55KSB7XG4gICAgdGhpcy5tYWlua2V5ID0gbWFpbmtleTtcbiAgICB0aGlzLmNsaWVudCA9IHJlZGlzLmNyZWF0ZUNsaWVudChjbGllbnRzT3B0aW9uKTtcbiAgICB0aGlzLmNsaWVudC5vbihcImVycm9yXCIsIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgRXJyb3IgJHtlcnJ9YCk7XG4gICAgfSk7XG4gICAgdGhpcy5oZ2V0ID0gcHJvbWlzaWZ5KHRoaXMuY2xpZW50LmhnZXQpLmJpbmQodGhpcy5jbGllbnQpO1xuICAgIHRoaXMuaGdldGFsbCA9IHByb21pc2lmeSh0aGlzLmNsaWVudC5oZ2V0YWxsKS5iaW5kKHRoaXMuY2xpZW50KTtcbiAgICB0aGlzLmhsZW4gPSBwcm9taXNpZnkodGhpcy5jbGllbnQuaGxlbikuYmluZCh0aGlzLmNsaWVudCk7XG4gICAgdGhpcy5oc2NhbiA9IHByb21pc2lmeSh0aGlzLmNsaWVudC5oc2NhbikuYmluZCh0aGlzLmNsaWVudCk7XG4gIH1cblxuICBiYXRjaFNldChkYXRhc2V0OiBJQ2FjaGVkRGF0YSkge1xuICAgIC8vIFRPRE86IHJlbW92ZSBzdHJpbmdpZnksIGNvdWxkIGJlIGRvbmUgZWFzaWx5IGlmIHdlJ3JlIHN1cmUgdGhlIG9iamVjdCBpcyBmbGF0IChubyBzdWItb2JqZWN0KVxuICAgIE9iamVjdC5rZXlzKGRhdGFzZXQpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LmhzZXQodGhpcy5tYWlua2V5LCBrZXksIEpTT04uc3RyaW5naWZ5KGRhdGFzZXRba2V5XSkpO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0KGtleTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICB0aGlzLmNsaWVudC5oc2V0KHRoaXMubWFpbmtleSwga2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIH1cblxuICBhc3luYyBnZXQoa2V5OiBzdHJpbmcpIHtcbiAgICAvLyBUT0RPOiByZW1vdmUgcGFyc2UsIHNlZSBhYm92ZVxuICAgIGNvbnN0IHRtcCA9IEpTT04ucGFyc2UoYXdhaXQgdGhpcy5oZ2V0KHRoaXMubWFpbmtleSwga2V5KSk7XG4gICAgcmV0dXJuIHRtcDtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gIHNhdmUoKSB7XG4gICAgLy8gbm9vcFxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgcmVhZCgpIHtcbiAgICAvLyBub29wXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLmNsaWVudC5xdWl0KCk7XG4gIH1cblxuICBhc3luYyBnZXRBbGwoKSB7XG4gICAgLy8gVE9ETzogcmVtb3ZlIHBhcnNlLCB0aGlzIGlzIGEgdGVycmlibGUgd2F5IG9mIGRvaW5nIGl0LCBzZWUgYWJvdmVcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5oZ2V0YWxsKHRoaXMubWFpbmtleSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cbiAgICBPYmplY3Qua2V5cyhkYXRhKS5tYXAoa2V5ID0+IChkYXRhW2tleV0gPSBKU09OLnBhcnNlKGRhdGFba2V5XSkpKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGFzeW5jIGl0ZXJhdGUoZ2FwU2l6ZTogbnVtYmVyLCBjYWxsYmFjazogKGVycjogc3RyaW5nIHwgbnVsbCwgZGF0YTogYW55KSA9PiB2b2lkKSB7XG4gICAgY29uc3QgbGVuID0gYXdhaXQgdGhpcy5obGVuKHRoaXMubWFpbmtleSk7XG4gICAgbGV0IGN1cnNvciA9IFwiMFwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gZ2FwU2l6ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5oc2Nhbih0aGlzLm1haW5rZXksIGN1cnNvciwgXCJDT1VOVFwiLCBnYXBTaXplKTtcbiAgICAgICAgW2N1cnNvcl0gPSByZXM7XG4gICAgICAgIGNvbnN0IGRhdGE6IElDYWNoZWREYXRhID0ge307XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcmVzWzFdLmxlbmd0aDsgaiArPSAyKSB7XG4gICAgICAgICAgLy8gVE9ETzogcmVtb3ZlIHBhcnNlLCB0aGlzIGlzIGEgdGVycmlibGUgd2F5IG9mIGRvaW5nIGl0LCBzZWUgYWJvdmVcbiAgICAgICAgICBkYXRhW3Jlc1sxXVtqXV0gPSBKU09OLnBhcnNlKHJlc1sxXVtqICsgMV0pO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWxsYmFjayhlLCBudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBOb3RlIGZvciBsYXRlcjogbGV2ZXJhZ2luZyByZWRpcyB6c2V0IHdvdWxkIGJlIGFtYXppbmcgaGVyZSB0b1xuICAvLyBpdGVyYXRlIG92ZXIgbG9ncyBzb3J0ZWQgYnkgYmxvY2tudW1iZXIgLyB0aW1lc3RhbXAuXG59XG4iXX0=