"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FileCacheManager =
/*#__PURE__*/
function () {
  function FileCacheManager(filename) {
    _classCallCheck(this, FileCacheManager);

    this.filename = filename;
    this.data = this.read();
  }

  _createClass(FileCacheManager, [{
    key: "batchSet",
    value: function batchSet(dataset) {
      var _this = this;

      // eslint-disable-next-line no-return-assign
      Object.keys(dataset).every(function (key) {
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

      return JSON.parse(_fs.default.readFileSync(this.filename));
    }
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

exports.default = FileCacheManager;