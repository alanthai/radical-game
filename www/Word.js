define(["exports", "module", "./data/index", "./util"], function (exports, module, _dataIndex, _util) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var data = _interopRequire(_dataIndex);

  var deepClone = _util.deepClone;
  var deepEquals = _util.deepEquals;

  var dataWords = deepClone(data.words);

  /**
   * `partsCount` is a dictionary that holds the parts and its count.
   * It's used when verifying whether all parts
   */
  function getPiecesCount(parts) {
    return parts.reduce(function (map, part) {
      map[part] = (map[part] || 0) + 1;
      return map;
    }, {});
  }

  function arraysMatch(a1, a2) {
    if (a1.length !== a2.length) {
      return false;
    }return a1.every(function (e, i) {
      return e === a2[i];
    });
  }

  var Word = (function () {
    function Word(data, variant) {
      _classCallCheck(this, Word);

      this.data = data;
      this.variant = variant;
    }

    _createClass(Word, {
      buildsFrom: {
        value: function buildsFrom(pieces, variant) {
          var _this = this;

          variant = variant || this.variant;

          if (!variant) {
            return ["chinese", "english", "pinyin", "parts"].some(function (varnt) {
              return _this.buildFrom(parts, varnt);
            });
          }

          // ordered match
          return arraysMatch(this.getPieces(variant), pieces);
        }
      },
      getPieces: {
        value: function getPieces(variant) {
          variant = variant || this.variant;
          return [].concat(this.data[variant] || []);
        }
      }
    });

    return Word;
  })();

  module.exports = Word;
});