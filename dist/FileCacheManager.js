"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    key: "add",
    value: function add(data) {
      var _this = this;

      // eslint-disable-next-line no-return-assign
      Object.keys(data).every(function (key) {
        return _this.data[key] = data[key];
      });
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
  }]);

  return FileCacheManager;
}();

exports.default = FileCacheManager;