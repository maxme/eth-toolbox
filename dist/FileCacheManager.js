"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileCacheManager = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileCacheManager =
/*#__PURE__*/
function () {
  function FileCacheManager(filename) {
    _classCallCheck(this, FileCacheManager);

    _defineProperty(this, "filename", void 0);

    _defineProperty(this, "data", void 0);

    this.filename = filename;
    this.data = this.read();
  }

  _createClass(FileCacheManager, [{
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
    value: function save() {
      _fs.default.writeFileSync(this.filename, JSON.stringify(this.data));
    }
  }, {
    key: "read",
    value: function read() {
      if (!_fs.default.existsSync(this.filename)) {
        _fs.default.writeFileSync(this.filename, JSON.stringify({}));
      }

      return JSON.parse(_fs.default.readFileSync(this.filename).toString());
    }
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

  return FileCacheManager;
}();

exports.FileCacheManager = FileCacheManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9GaWxlQ2FjaGVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbIkZpbGVDYWNoZU1hbmFnZXIiLCJmaWxlbmFtZSIsImRhdGEiLCJyZWFkIiwiZGF0YXNldCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiZnMiLCJ3cml0ZUZpbGVTeW5jIiwiSlNPTiIsInN0cmluZ2lmeSIsImV4aXN0c1N5bmMiLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHYUEsZ0I7OztBQUdYLDRCQUFZQyxRQUFaLEVBQThCO0FBQUE7O0FBQUE7O0FBQUE7O0FBQzVCLFNBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEtBQUtDLElBQUwsRUFBWjtBQUNEOzs7OzZCQUVRQyxPLEVBQWM7QUFBQTs7QUFDckI7QUFDQUMsTUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlGLE9BQVosRUFBcUJHLE9BQXJCLENBQTZCLFVBQUNDLEdBQUQ7QUFBQSxlQUFrQixLQUFJLENBQUNOLElBQUwsQ0FBVU0sR0FBVixJQUFpQkosT0FBTyxDQUFDSSxHQUFELENBQTFDO0FBQUEsT0FBN0I7QUFDRDs7O3dCQUVHQSxHLEVBQWFOLEksRUFBVztBQUMxQixXQUFLQSxJQUFMLENBQVVNLEdBQVYsSUFBaUJOLElBQWpCOztBQUNBLFVBQUlBLElBQUksS0FBSyxJQUFiLEVBQW1CO0FBQ2pCLGVBQU8sS0FBS0EsSUFBTCxDQUFVTSxHQUFWLENBQVA7QUFDRDtBQUNGOzs7d0JBRUdBLEcsRUFBYTtBQUNmLGFBQU8sS0FBS04sSUFBTCxDQUFVTSxHQUFWLENBQVA7QUFDRDs7OzJCQUVNO0FBQ0xDLGtCQUFHQyxhQUFILENBQWlCLEtBQUtULFFBQXRCLEVBQWdDVSxJQUFJLENBQUNDLFNBQUwsQ0FBZSxLQUFLVixJQUFwQixDQUFoQztBQUNEOzs7MkJBRU07QUFDTCxVQUFJLENBQUNPLFlBQUdJLFVBQUgsQ0FBYyxLQUFLWixRQUFuQixDQUFMLEVBQW1DO0FBQ2pDUSxvQkFBR0MsYUFBSCxDQUFpQixLQUFLVCxRQUF0QixFQUFnQ1UsSUFBSSxDQUFDQyxTQUFMLENBQWUsRUFBZixDQUFoQztBQUNEOztBQUNELGFBQU9ELElBQUksQ0FBQ0csS0FBTCxDQUFXTCxZQUFHTSxZQUFILENBQWdCLEtBQUtkLFFBQXJCLEVBQStCZSxRQUEvQixFQUFYLENBQVA7QUFDRDs7OzRCQUVPLENBQUUsQyxDQUVWOzs7OzhCQUNVLENBQUU7Ozs7Ozs7Ozs7O2lEQUdILEtBQUtkLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBJQ2FjaGVkRGF0YSwgSUNhY2hlIH0gZnJvbSBcIi4vSUNhY2hlXCI7XG5cbmV4cG9ydCBjbGFzcyBGaWxlQ2FjaGVNYW5hZ2VyIGltcGxlbWVudHMgSUNhY2hlIHtcbiAgZmlsZW5hbWU6IHN0cmluZztcbiAgZGF0YTogSUNhY2hlZERhdGE7XG4gIGNvbnN0cnVjdG9yKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5yZWFkKCk7XG4gIH1cblxuICBiYXRjaFNldChkYXRhc2V0OiBhbnkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuICAgIE9iamVjdC5rZXlzKGRhdGFzZXQpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiAodGhpcy5kYXRhW2tleV0gPSBkYXRhc2V0W2tleV0pKTtcbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgdGhpcy5kYXRhW2tleV0gPSBkYXRhO1xuICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICBkZWxldGUgdGhpcy5kYXRhW2tleV07XG4gICAgfVxuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldO1xuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuZmlsZW5hbWUsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xuICB9XG5cbiAgcmVhZCgpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmModGhpcy5maWxlbmFtZSkpIHtcbiAgICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5maWxlbmFtZSwgSlNPTi5zdHJpbmdpZnkoe30pKTtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHRoaXMuZmlsZW5hbWUpLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgY2xvc2UoKSB7fVxuXG4gIC8vIFRPRE86IGltcGxlbWVudCB0aGlzXG4gIGl0ZXJhdGUoKSB7fVxuXG4gIGFzeW5jIGdldEFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG59XG4iXX0=