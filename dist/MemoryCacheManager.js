"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MemoryCacheManager =
/*#__PURE__*/
function () {
  function MemoryCacheManager() {
    _classCallCheck(this, MemoryCacheManager);

    _defineProperty(this, "data", void 0);

    this.data = {};
  }

  _createClass(MemoryCacheManager, [{
    key: "batchSet",
    value: function batchSet(dataset) {
      var _this = this;

      // eslint-disable-next-line no-return-assign
      Object.keys(dataset).forEach(function (key) {
        return _this.data[key] = dataset[key];
      });
    }
  }, {
    key: "set",
    value: function set(key, data) {
      this.data[key] = data;

      if (data === null) {
        delete this.data[key];
      }
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.data[key];
    }
  }, {
    key: "save",
    value: function save() {}
  }, {
    key: "close",
    value: function close() {} // TODO: implement this

  }, {
    key: "iterate",
    value: function iterate() {}
  }, {
    key: "getAll",
    value: function () {
      var _getAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.data);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }]);

  return MemoryCacheManager;
}();

exports.default = MemoryCacheManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZW1vcnlDYWNoZU1hbmFnZXIudHMiXSwibmFtZXMiOlsiTWVtb3J5Q2FjaGVNYW5hZ2VyIiwiZGF0YSIsImRhdGFzZXQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsa0I7OztBQUVuQixnQ0FBYztBQUFBOztBQUFBOztBQUNaLFNBQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0Q7Ozs7NkJBRVFDLE8sRUFBc0I7QUFBQTs7QUFDN0I7QUFDQUMsTUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlGLE9BQVosRUFBcUJHLE9BQXJCLENBQTZCLFVBQUFDLEdBQUc7QUFBQSxlQUFLLEtBQUksQ0FBQ0wsSUFBTCxDQUFVSyxHQUFWLElBQWlCSixPQUFPLENBQUNJLEdBQUQsQ0FBN0I7QUFBQSxPQUFoQztBQUNEOzs7d0JBRUdBLEcsRUFBYUwsSSxFQUFXO0FBQzFCLFdBQUtBLElBQUwsQ0FBVUssR0FBVixJQUFpQkwsSUFBakI7O0FBQ0EsVUFBSUEsSUFBSSxLQUFLLElBQWIsRUFBbUI7QUFDakIsZUFBTyxLQUFLQSxJQUFMLENBQVVLLEdBQVYsQ0FBUDtBQUNEO0FBQ0Y7Ozt3QkFFR0EsRyxFQUFhO0FBQ2YsYUFBTyxLQUFLTCxJQUFMLENBQVVLLEdBQVYsQ0FBUDtBQUNEOzs7MkJBRU0sQ0FBRTs7OzRCQUNELENBQUUsQyxDQUVWOzs7OzhCQUNVLENBQUU7Ozs7Ozs7Ozs7O2lEQUdILEtBQUtMLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ2FjaGVkRGF0YSwgSUNhY2hlIH0gZnJvbSBcIi4vSUNhY2hlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbW9yeUNhY2hlTWFuYWdlciBpbXBsZW1lbnRzIElDYWNoZSB7XG4gIGRhdGE6IElDYWNoZWREYXRhO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSB7fTtcbiAgfVxuXG4gIGJhdGNoU2V0KGRhdGFzZXQ6IElDYWNoZWREYXRhKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJldHVybi1hc3NpZ25cbiAgICBPYmplY3Qua2V5cyhkYXRhc2V0KS5mb3JFYWNoKGtleSA9PiAodGhpcy5kYXRhW2tleV0gPSBkYXRhc2V0W2tleV0pKTtcbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgdGhpcy5kYXRhW2tleV0gPSBkYXRhO1xuICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICBkZWxldGUgdGhpcy5kYXRhW2tleV07XG4gICAgfVxuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldO1xuICB9XG5cbiAgc2F2ZSgpIHt9XG4gIGNsb3NlKCkge31cblxuICAvLyBUT0RPOiBpbXBsZW1lbnQgdGhpc1xuICBpdGVyYXRlKCkge31cblxuICBhc3luYyBnZXRBbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxufVxuIl19