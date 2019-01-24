"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MemoryCacheManager =
/*#__PURE__*/
function () {
  function MemoryCacheManager() {
    _classCallCheck(this, MemoryCacheManager);

    this.data = {};
  }

  _createClass(MemoryCacheManager, [{
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
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "save",
    value: function save() {} // noop
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "read",
    value: function read() {// noop
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.data;
    }
  }]);

  return MemoryCacheManager;
}();

exports.default = MemoryCacheManager;