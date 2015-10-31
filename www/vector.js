define(function (require, exports, module) {
  "use strict";

  var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  function getXY(v) {
    if (Array.isArray(v)) {
      return v;
    }

    return [v.x, v.y];
  }

  module.exports = (function () {
    function Vector(x, y) {
      _classCallCheck(this, Vector);

      if (Array.isArray(x)) {
        y = x[1];
        x = x[0];
      }

      this.x = x;
      this.y = y;
    }

    _createClass(Vector, {
      _add: {
        value: function _add(v) {
          var _getXY = getXY(v);

          var _getXY2 = _slicedToArray(_getXY, 2);

          var x = _getXY2[0];
          var y = _getXY2[1];

          this.x += x;
          this.y += y;
          return this;
        }
      },
      add: {
        value: function add(v) {
          return this.clone()._add(v);
        }
      },
      _mult: {
        value: function _mult(v) {
          var _getXY = getXY(v);

          var _getXY2 = _slicedToArray(_getXY, 2);

          var x = _getXY2[0];
          var y = _getXY2[1];

          this.x *= x;
          this.y *= y;
          return this;
        }
      },
      mult: {
        value: function mult(v) {
          return this.clone()._mult(v);
        }
      },
      clone: {
        value: function clone() {
          return new Vector(this.x, this.y);
        }
      }
    }, {
      move: {
        value: function move(dp, point) {
          dp.x = point.x;
          dp.y = point.y;
          return dp;
        }
      },
      center: {
        value: function center(sprite) {
          sprite.anchor.x = 0.5;
          sprite.anchor.y = 0.5;
        }
      }
    });

    return Vector;
  })();
});